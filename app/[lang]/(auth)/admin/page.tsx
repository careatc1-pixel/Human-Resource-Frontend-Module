
"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ShieldCheck, LockKeyhole, UserRound } from "lucide-react";

const LabelInputContainer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2", className)} {...props} />
);

const BottomGradient = () => (
  <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
);

const Page = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Admin login submitted");
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-white p-4 shadow-input md:rounded-2xl md:p-8 dark:bg-black">
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
            <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              id="email"
              placeholder="admin@atharvtech.com"
              type="email"
              className="pl-10"
              autoComplete="email"
            />
          </div>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="password">Password</Label>
            <a
              href="/forgot-password"
              className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              className="pl-10"
              autoComplete="current-password"
            />
          </div>
        </LabelInputContainer>
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-linear-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign in to Admin Panel &rarr;
          <BottomGradient />
        </button>
        <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
          By continuing, you confirm this device is authorized for admin access.
        </p>
      </form>
    </div>
  );
};

export default Page;
