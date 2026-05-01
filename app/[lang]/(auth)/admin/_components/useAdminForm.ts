"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { ZodError } from "zod";
import { signInFormData } from "./adminForm";
import { signinFormDataSchema } from "./adminForm.schema";
// --- initial state ---
export const initSigninData: signInFormData = {
  email: "",
  password: "",
  otp: "",
};

export const useSigninForm = (initial: signInFormData = initSigninData) => {
  const router = useRouter();
  const params = useParams();
  const lang = (params?.lang as string) ?? "en";

  const [data, setData] = useState<signInFormData>(initial);
  const [errors, setErrors] = useState<
    Partial<Record<keyof signInFormData, string[]>>
  >({});
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState<"credentials" | "otp">("credentials");

  const validateField = useCallback(
    <K extends keyof signInFormData>(key: K, value: signInFormData[K]) => {
      const normalizedValue = typeof value === "string" ? value.trim() : value;

      const fieldSchema =
        signinFormDataSchema.shape[
          key as keyof typeof signinFormDataSchema.shape
        ];

      try {
        fieldSchema.parse(normalizedValue);

        setErrors((prev) => {
          const copy = { ...prev };
          delete copy[key];
          return copy;
        });

        return true;
      } catch (err) {
        if (err instanceof ZodError) {
          const messages = err.issues.map((i) => i.message);
          setErrors((prev) => ({ ...prev, [key]: messages }));
        } else {
          setErrors((prev) => ({
            ...prev,
            [key]: ["Invalid value"],
          }));
        }
        return false;
      }
    },
    [],
  );

  const setField = useCallback(
    <K extends keyof signInFormData>(key: K, value: signInFormData[K]) => {
      setData((prev:any) => ({
        ...prev,
        [key]: value,
      }));

      validateField(key, value);
    },
    [validateField],
  );

  const validateSigninData = useCallback(() => {
    try {
      if (step === "credentials") {
        const parsed = signinFormDataSchema
          .pick({ email: true, password: true })
          .parse({
            email: data.email.trim(),
            password: data.password.trim(),
          });

        setErrors({});
        return { valid: true, data: parsed };
      }

      if (step === "otp") {
        const parsed = signinFormDataSchema
          .pick({ otp: true })
          .parse({
            otp: data.otp?.trim(),
          });

        setErrors({});
        return { valid: true, data: parsed };
      }

      return { valid: false };
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldMap: Partial<Record<keyof signInFormData, string[]>> = {};

        error.issues.forEach((issue) => {
          const path = issue.path[0] as keyof signInFormData;
          if (path) {
            fieldMap[path] = fieldMap[path] || [];
            fieldMap[path]!.push(issue.message);
          }
        });

        setErrors(fieldMap);
        toast.error(error.issues[0]?.message);
      } else {
        toast.error("Validation failed");
      }

      return { valid: false };
    }
  }, [data, step]);

  const sendOtp = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const result = validateSigninData();
      if (!result.valid) return;

      const payload = {
        email: data.email,
        password: data.password,
      };
      console.log("Sending OTP:", payload);
      toast.success("OTP sent successfully 🚀");
      setStep("otp");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpAndLogin = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const result = validateSigninData();
      if (!result.valid) return;

      const payload = {
        email: data.email,
        password: data.password,
        otp: data.otp,
      };

      console.log("Verifying OTP:", payload);
      const isAdmin = true;

      if (!isAdmin) {
        toast.error("Not authorized as admin");
        return;
      }

      toast.success("Admin login successful 🎉");

      await router.replace(`/${lang}/adminpanel`);
    } catch (err) {
      console.error(err);
      toast.error("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const reset = useCallback(() => {
    setData(initial);
    setErrors({});
    setLoading(false);
    setStep("credentials");
  }, [initial]);

  return {
    state: {
      data,
      setField,
    },
    errors,
    loading,
    step,
    sendOtp,
    verifyOtpAndLogin,
    reset,
  };
};