"use client";

import InputField from "@/global/elements/inputs/inputField";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRegisterForm } from "./useRegisterForm";


export default function RegisterForm() {
  const { state: { data, setField }, errors, loading, couponVerified, verifyingCoupon, validateField, handleVerifyCoupon, handleSubmit } = useRegisterForm();
  const params = useParams<{ lang?: string }>();
  const lang = typeof params?.lang === "string" ? params.lang : "en";

  return (
    <div className="">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 md:p-8">
        <div className="mb-6">
          <p className=" font-medium text-neutral-500">Create account</p>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Register your organization
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Create your workspace and start managing your team.
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit();
          }}
        >
          <InputField
            id="companyName"
            label="Company name"
            value={data.companyName}
            onChangeAction={(value) => setField("companyName", value)}
            onBlur={(e) => validateField?.("companyName", e.target.value)}
            placeholder="Atharv Tech Co."
            error={errors.companyName?.[0]}
            required
          />
          <InputField
            id="fullName"
            label="Full name"
            value={data.fullName}
            onChangeAction={(value) => setField("fullName", value)}
            onBlur={(e) => validateField?.("fullName", e.target.value)}
            placeholder="Ahsan Khan"
            error={errors.fullName?.[0]}
            required
          />
          <InputField
            id="industry"
            label="Industry"
            value={data.industry}
            onChangeAction={(value) => setField("industry", value)}
            onBlur={(e) => validateField?.("industry", e.target.value)}
            placeholder="e.g. Fintech, SaaS, Healthcare"
            error={errors.industry?.[0]}
            required
          />
          <InputField
            id="gstNumber"
            label="GST Number"
            value={data.gstNumber}
            onChangeAction={(value) => setField("gstNumber", value)}
            onBlur={(e) => validateField?.("gstNumber", e.target.value)}
            placeholder="22AAAAA0000A1Z5"
            error={errors.gstNumber?.[0]}
          />

          <InputField
            id="email"
            label="Work email"
            type="email"
            value={data.email}
            onChangeAction={(value) => setField("email", value)}
            onBlur={(e) => validateField?.("email", e.target.value)}
            placeholder="you@company.com"
            error={errors.email?.[0]}
            required
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            value={data.password}
            onChangeAction={(value) => setField("password", value)}
            onBlur={(e) => validateField?.("password", e.target.value)}
            placeholder="Minimum 8 characters"
            error={errors.password?.[0]}
            required
          />
          <InputField
            id="confirmPassword"
            label="Confirm password"
            type="password"
            value={data.confirmPassword}
            onChangeAction={(value) => setField("confirmPassword", value)}
            onBlur={(e) => validateField?.("confirmPassword", e.target.value)}
            placeholder="Repeat password"
            error={errors.confirmPassword?.[0]}
            required
          />


  <div className="flex items-center gap-4">
  <InputField
    id="couponCode"
    label="Coupon code"
    value={data.couponCode}
    onChangeAction={(value) => setField("couponCode", value)}
    onBlur={(e) => validateField?.("couponCode", e.target.value)}
    placeholder="Enter coupon code"
    error={errors.couponCode?.[0]}
    required
    className="flex-1" 
  />

  <button
    type="button"
    onClick={handleVerifyCoupon}
    disabled={verifyingCoupon || couponVerified}
    className="h-8 px-5 rounded-md bg-black text-sm font-medium text-white transition-opacity disabled:opacity-60"
  >
    {verifyingCoupon ? "Verifying..." : couponVerified ? "Verified" : "Verify"}
  </button>
</div>

        

          <button
            type="submit"
            disabled={loading}
            className="h-10 w-full rounded-xl bg-slate-950 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center  text-neutral-600 dark:text-neutral-300">
          Already have an account?{" "}
          <Link href={`/${lang}/signin`} className="font-medium text-blue-600 hover:text-blue-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
