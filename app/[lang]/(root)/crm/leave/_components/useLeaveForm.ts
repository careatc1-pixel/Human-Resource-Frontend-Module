"use client";

import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { ZodError } from "zod";
import { leaveFormSchema, type LeaveFormData } from "./leaveForm.schema";
import { initialLeaveFormData } from "./leaveForm";

export const useLeaveForm = (
  initial: LeaveFormData = initialLeaveFormData,
) => {
  const [data, setData] = useState<LeaveFormData>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof LeaveFormData, string[]>>>({});
  const [loading, setLoading] = useState(false);

  const validateField = useCallback(
    <K extends keyof LeaveFormData>(key: K, value: LeaveFormData[K]) => {
      try {
        const fieldSchema = leaveFormSchema.shape[key as keyof typeof leaveFormSchema.shape];
        fieldSchema.parse(value);

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
    [],
  );

  const setField = useCallback(
    <K extends keyof LeaveFormData>(key: K, value: LeaveFormData[K]) => {
      setData((prev) => ({
        ...prev,
        [key]: value,
      }));

      validateField(key, value);
    },
    [validateField],
  );

  const validateLeaveData = useCallback(() => {
    try {
      const parsed = leaveFormSchema.parse(data);
      setErrors({});
      return { valid: true as const, data: parsed };
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldMap: Partial<Record<keyof LeaveFormData, string[]>> = {};

        error.issues.forEach((issue) => {
          const path = issue.path[0] as keyof LeaveFormData;
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

      return { valid: false as const };
    }
  }, [data]);

  const handleSubmit = async () => {
    if (loading) return false;

    setLoading(true);

    try {
      const result = validateLeaveData();
      if (!result.valid) return false;

      console.log("Leave application payload:", result.data);
      toast.success("Leave application ready to submit");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Leave application failed");
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
    validateField,
    validateLeaveData,
    handleSubmit,
  };
};
