"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ShieldCheck, LockKeyhole, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useSigninForm } from "@/app/[lang]/(auth)/signin/_components/useSigninForm";
type Props = ReturnType<typeof useSigninForm>;

export default function SigninForm({
  state: { data, setField },
  errors,
  loading,
  validateField,
  handleSubmit,
}: Props) {
  const { t } = useTranslation();
  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-white p-4 shadow-input md:rounded-2xl md:p-8 dark:bg-black">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
        <ShieldCheck className="h-4 w-4" />
        Secure Access
      </div>

      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Athar Tech Co.
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        {t("auth.adminDescription")}
      </p>

      <form
        className="my-8"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit();
        }}
      >
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">{t("auth.adminEmail")}</Label>
          <div className="relative">
            <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              id="email"
              placeholder={t("auth.adminEmailPlaceholder")}
              type="email"
              className="pl-10"
              autoComplete="email"
              value={data.email}
              onChange={(e) => setField("email", e.target.value)}
              onBlur={(e) => validateField?.("email", e.target.value)}
            />

            {errors.email && (
              <p className="text-xs text-red-500">{errors.email[0]}</p>
            )}
          </div>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="password">{t("auth.password")}</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              {t("auth.forgotPassword")}
            </Link>
          </div>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              className="pl-10"
              autoComplete="current-password"
              value={data.password}
              onChange={(e) => setField("password", e.target.value)}
              onBlur={(e) => validateField?.("password", e.target.value)}
            />

            {errors.password && (
              <p className="text-xs text-red-500">{errors.password[0]}</p>
            )}
          </div>
        </LabelInputContainer>

        <button
          disabled={loading}
          className="group/btn relative block h-10 w-full rounded-md bg-linear-to-br from-black to-neutral-600 font-medium text-white disabled:opacity-60"
          type="submit"
        >
          {loading ? "Signing in..." : "Sign In"} →
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
