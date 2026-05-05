"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { ZodError } from "zod";
import { registerFormData } from "./registerForm";
import { registerFormDataSchema } from "./registerForm.schema";

export const initRegisterData: registerFormData = {
  companyName: "",
  fullName: "",
  industry: "",
  gstNumber: "",
  couponCode: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const useRegisterForm = (initial: registerFormData = initRegisterData) => {
  const router = useRouter();
  const params = useParams();
  const lang = (params?.lang as string) ?? "en";

  const [data, setData] = useState<registerFormData>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof registerFormData, string[]>>>({});
  const [loading, setLoading] = useState(false);
  const [couponVerified, setCouponVerified] = useState(false);
  const [verifyingCoupon, setVerifyingCoupon] = useState(false);
  

  const validateField = useCallback(
    <K extends keyof registerFormData>(key: K, value: registerFormData[K]) => {
      const normalizedValue = typeof value === "string" ? value.trim() : value;

      if (key === "confirmPassword" && normalizedValue !== data.password.trim()) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: ["Passwords do not match"],
        }));
        return false;
      }

      const fieldSchema = registerFormDataSchema.shape[key as keyof typeof registerFormDataSchema.shape];

      try {
        fieldSchema.parse(normalizedValue);

        setErrors((prev) => {
          const copy = { ...prev };
          delete copy[key];
          return copy;
        });

        return true;
      } catch (error) {
        if (error instanceof ZodError) {
          setErrors((prev) => ({
            ...prev,
            [key]: error.issues.map((issue) => issue.message),
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            [key]: ["Invalid value"],
          }));
        }

        return false;
      }
    },
    [data.password]
  );

  const setField = useCallback(
    <K extends keyof registerFormData>(key: K, value: registerFormData[K]) => {
      setData((prev) => ({
        ...prev,
        [key]: value,
      }));

      if (key === "couponCode") {
        setCouponVerified(false);
      }

      validateField(key, value);
    },
    [validateField]
  );

  const handleVerifyCoupon = useCallback(async () => {
    if (verifyingCoupon) return false;

    setVerifyingCoupon(true);

    try {
      const couponCode = data.couponCode.trim();

      if (!couponCode) {
        setErrors((prev) => ({
          ...prev,
          couponCode: ["Coupon code is required"],
        }));
        setCouponVerified(false);
        return false;
      }

      if (couponCode.toUpperCase() !== "ATHARV2026") {
        setErrors((prev) => ({
          ...prev,
          couponCode: ["Invalid coupon code"],
        }));
        setCouponVerified(false);
        toast.error("Invalid coupon code");
        return false;
      }

      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.couponCode;
        return copy;
      });

      setCouponVerified(true);
      toast.success("Coupon verified");
      return true;
    } finally {
      setVerifyingCoupon(false);
    }
  }, [data.couponCode, verifyingCoupon]);

  const validateRegisterData = useCallback((): {
    valid: true;
    data: registerFormData;
  } | {
    valid: false;
  } => {
    try {
      const parsed = registerFormDataSchema.parse({
        companyName: data.companyName.trim(),
        fullName: data.fullName.trim(),
        industry: data.industry.trim(),
        gstNumber: (data.gstNumber ?? "").trim(),
        couponCode: data.couponCode.trim(),
        email: data.email.trim(),
        password: data.password.trim(),
        confirmPassword: data.confirmPassword.trim(),
      });

      setErrors({});
      return { valid: true, data: parsed };
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldMap: Partial<Record<keyof registerFormData, string[]>> = {};

        error.issues.forEach((issue) => {
          const path = issue.path[0] as keyof registerFormData;
          if (path) {
            fieldMap[path] = fieldMap[path] || [];
            fieldMap[path]!.push(issue.message);
          }
        });

        setErrors(fieldMap);
        toast.error(error.issues[0]?.message ?? "Validation failed");
      } else {
        toast.error("Validation failed");
      }

      return { valid: false };
    }
  }, [data]);

  const handleSubmit = async () => {
    if (loading) return false;

    setLoading(true);

    try {
      if (!couponVerified) {
        toast.error("Please verify coupon code before proceeding");
        return false;
      }

      const result = validateRegisterData();
      if (!result.valid) return false;

      console.log("Register payload:", {
        companyName: result.data.companyName,
        fullName: result.data.fullName,
        industry: result.data.industry,
        gstNumber: result.data.gstNumber,
        couponCode: result.data.couponCode,
        email: result.data.email,
        password: result.data.password,
      });

      toast.success("Account created successfully");
      await router.replace(`/${lang}/signin`);
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    state: {
      data,
      setField,
    },
    errors,
    loading,
    couponVerified,
    verifyingCoupon,
    validateField,
    handleVerifyCoupon,
    handleSubmit,
  };
};
