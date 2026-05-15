"use client";

import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { ZodError } from "zod";
import { onboardingFormSchema, type OnboardingFormData } from "./onboarding.schema";
import { initialOnboardingData } from "./onboarding";

export const useOnboardingForm = (initial: OnboardingFormData = initialOnboardingData) => {
  const [data, setData] = useState<OnboardingFormData>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof OnboardingFormData, string[]>>>({});
  const [loading, setLoading] = useState(false);

  const validateField = useCallback(
    <K extends keyof OnboardingFormData>(key: K, value: OnboardingFormData[K]) => {
      try {
        const fieldSchema = onboardingFormSchema.shape[key as keyof typeof onboardingFormSchema.shape];
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
    <K extends keyof OnboardingFormData>(key: K, value: OnboardingFormData[K]) => {
      setData((prev) => ({
        ...prev,
        [key]: value,
      }));

      validateField(key, value);
    },
    [validateField],
  );

  const validateStep = useCallback((step: number): boolean => {
    const stepFields: (keyof OnboardingFormData)[] = {
      1: ["firstName", "lastName", "email", "phone", "dateOfBirth", "gender"],
      2: ["role", "department", "manager", "salary", "joiningDate"],
      3: ["aadhaar", "pan", "photo", "resume"],
      4: ["laptop", "sim", "idCard"],
      5: ["password", "confirmPassword", "inviteEmail"],
    }[step] ?? [];

    let isValid = true;
    const stepData = Object.fromEntries(stepFields.map((k) => [k, data[k]]));

    try {
      onboardingFormSchema.pick(Object.fromEntries(stepFields.map((k) => [k, true])) as any).parse(stepData);
      const newErrors = { ...errors };
      stepFields.forEach((k) => delete newErrors[k]);
      setErrors(newErrors);
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldMap: Partial<Record<keyof OnboardingFormData, string[]>> = {};
        error.issues.forEach((issue) => {
          const path = issue.path[0] as keyof OnboardingFormData;
          if (path) {
            fieldMap[path] = fieldMap[path] || [];
            fieldMap[path]!.push(issue.message);
          }
        });
        setErrors((prev) => ({ ...prev, ...fieldMap }));
        isValid = false;
      }
    }

    if (!isValid) {
      toast.error("Please fill all required fields correctly");
    }

    return isValid;
  }, [data, errors]);

  const nextStep = useCallback(() => {
    if (validateStep(data.currentStep)) {
      setData((prev) => ({
        ...prev,
        currentStep: Math.min(prev.currentStep + 1, 5),
      }));
    }
  }, [data.currentStep, validateStep]);

  const prevStep = useCallback(() => {
    setData((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
    }));
  }, []);

  const handleSubmit = async () => {
    if (loading) return false;

    setLoading(true);

    try {
      const parsed = onboardingFormSchema.parse(data);
      setErrors({});

      console.log("Onboarding payload:", parsed);
      toast.success("Employee onboarded successfully!");
      setData({ ...initialOnboardingData, currentStep: 1 });
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldMap: Partial<Record<keyof OnboardingFormData, string[]>> = {};
        error.issues.forEach((issue) => {
          const path = issue.path[0] as keyof OnboardingFormData;
          if (path) {
            fieldMap[path] = fieldMap[path] || [];
            fieldMap[path]!.push(issue.message);
          }
        });
        setErrors(fieldMap);
        toast.error(error.issues[0]?.message ?? "Validation failed");
      } else {
        toast.error("Onboarding failed");
      }

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
    validateStep,
    nextStep,
    prevStep,
    handleSubmit,
  };
};
