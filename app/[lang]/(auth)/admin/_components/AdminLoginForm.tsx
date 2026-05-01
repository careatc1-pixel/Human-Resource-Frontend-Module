"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ShieldCheck, LockKeyhole, UserRound, KeyRound } from "lucide-react";
import Link from "next/link";
import { useSigninForm } from "./useAdminForm";
const LabelInputContainer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2", className)} {...props} />
);

const BottomGradient = () => (
  <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
);


const AdminLoginForm = () => {
     const {
    state: { data, setField },
    errors,
    loading,
    step,
    sendOtp,
    verifyOtpAndLogin,
  } = useSigninForm();

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === "credentials") {
      await sendOtp();
    } else {
      await verifyOtpAndLogin();
    }
  };
  return (
   <div className="mx-auto w-full max-w-md rounded-none bg-slate-200 p-4 shadow-input md:rounded-2xl md:p-8 dark:bg-black">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
        <ShieldCheck className="h-4 w-4" />
        Admin Access
      </div>

      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Atharv Tech Co.
      </h2>

      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Sign in to the admin dashboard to manage attendance, payroll, leave, and team operations.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Admin Email</Label>
          <div className="relative">
            <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              id="email"
              value={data.email}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="admin@atharvtech.com"
              type="email"
              className="pl-10"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email[0]}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-neutral-500 hover:text-neutral-700"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              id="password"
              value={data.password}
              onChange={(e) => setField("password", e.target.value)}
              placeholder="••••••••"
              type="password"
              className="pl-10"
            />
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password[0]}</p>
          )}
        </LabelInputContainer>

        {step === "otp" && (
          <LabelInputContainer className="mb-4">
            <Label htmlFor="otp">Enter OTP</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                id="otp"
                value={data.otp}
                onChange={(e) => setField("otp", e.target.value)}
                placeholder="Enter 6 digit OTP"
                type="text"
                className="pl-10 tracking-widest"
              />
            </div>
            {errors.otp && (
              <p className="text-xs text-red-500">{errors.otp[0]}</p>
            )}
          </LabelInputContainer>
        )}

        <button
          disabled={loading}
          className="group/btn relative block h-10 w-full rounded-md bg-linear-to-br from-black to-neutral-600 font-medium text-white disabled:opacity-60"
          type="submit"
        >
          {loading
            ? "Please wait..."
            : step === "credentials"
            ? "Send OTP →"
            : "Verify & Login →"}
          <BottomGradient />
        </button>

        <p className="mt-4 text-xs text-neutral-500">
          By continuing, you confirm this device is authorized for admin access.
        </p>
      </form>
    </div>
  )
}

export default AdminLoginForm