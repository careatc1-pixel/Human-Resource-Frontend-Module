"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { ZodError } from "zod";
import { signInFormData } from "./signinForm";
import { signinFormDataSchema } from "./signinform.schema";

// --- initial state ---
export const initSigninData: signInFormData = {
  email: "",
  password: "",
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

  // --- field validation ---
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

  // --- setters ---
  const setField = useCallback(
    <K extends keyof signInFormData>(key: K, value: signInFormData[K]) => {
      setData((prev: signInFormData) => ({
        ...prev,
        [key]: value,
      }));

      validateField(key, value);
    },
    [validateField],
  );

  const setFieldMany = useCallback((patch: Partial<signInFormData>) => {
    setData((prev: signInFormData) => ({
      ...prev,
      ...patch,
    }));

    setErrors((prev) => {
      const copy = { ...prev };
      (Object.keys(patch) as (keyof signInFormData)[]).forEach((k) => {
        if (copy[k]) delete copy[k];
      });
      return copy;
    });
  }, []);

  // --- full validation ---
  const validateSigninData = useCallback((): {
    valid: boolean;
    data?: signInFormData;
  } => {
    try {
      const normalized = {
        ...data,
        email: data.email.trim(),
        password: data.password.trim(),
      };

      const parsed = signinFormDataSchema.parse(normalized);
      setErrors({});
      return { valid: true, data: parsed };
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

        if (error.issues.length) {
          toast.error(error.issues[0].message);
        }
      } else {
        toast.error("Validation failed");
      }

      return { valid: false };
    }
  }, [data]);

  // --- submit ---
  const handleSubmit = async () => {
    if (loading) return false;

    setLoading(true);

    try {
      const result = validateSigninData();
      if (!result.valid) return false;

      const payload = {
        email: result.data?.email ?? "",
        password: result.data?.password ?? "",
      };
      console.log("Submitting signin with payload:", payload);
      //   await signin.mutateAsync(payload);

      //   const res = await fetchUserData();
      //   dispatch(setUser(res.data));

      await router.replace(`/${lang}`);

      return true;
    } catch (err) {
      console.error(err);
      toast.error("Signin failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reset = useCallback(() => {
    setData(initial ?? initSigninData);
    setErrors({});
    setLoading(false);
  }, [initial]);

  return {
    state: {
      data,
      setField,
      setFieldMany,
    },
    errors,
    loading,
    validateField,
    validateSigninData,
    handleSubmit,
    reset,
  };
};
