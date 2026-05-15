"use client";

import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { ZodError } from "zod";
import { forgotPasswordFormSchema } from "./forgotPasswordForm.schema";

export type ForgotPasswordFormData = {
  email: string;
};

const initialData: ForgotPasswordFormData = {
  email: "",
};

export const useForgotPasswordForm = () => {
  const [data, setData] = useState<ForgotPasswordFormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof ForgotPasswordFormData, string[]>>>({});
  const [loading, setLoading] = useState(false);

  const validateField = useCallback((key: keyof ForgotPasswordFormData, value: string) => {
    try {
      forgotPasswordFormSchema.shape[key].parse(value.trim());

      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });

      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        setErrors((prev) => ({
          ...prev,
          [key]: err.issues.map((issue) => issue.message),
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [key]: ["Invalid value"],
        }));
      }

      return false;
    }
  }, []);

  const setField = useCallback((key: keyof ForgotPasswordFormData, value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));

    validateField(key, value);
  }, [validateField]);

  const handleSubmit = useCallback(async () => {
    if (loading) return false;

    setLoading(true);

    try {
      const normalized = {
        email: data.email.trim(),
      };

      const parsed = forgotPasswordFormSchema.parse(normalized);
      setErrors({});

      toast.success(`Reset instructions sent to ${parsed.email}`);
      setData(initialData);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Partial<Record<keyof ForgotPasswordFormData, string[]>> = {};

        error.issues.forEach((issue) => {
          const path = issue.path[0] as keyof ForgotPasswordFormData;
          if (!path) return;

          fieldErrors[path] = fieldErrors[path] || [];
          fieldErrors[path]!.push(issue.message);
        });

        setErrors(fieldErrors);

        if (error.issues.length > 0) {
          toast.error(error.issues[0].message);
        }
      } else {
        toast.error("Failed to send reset instructions");
      }

      return false;
    } finally {
      setLoading(false);
    }
  }, [data.email, loading]);

  return {
    state: {
      data,
      setField,
    },
    errors,
    loading,
    validateField,
    handleSubmit,
  };
};
