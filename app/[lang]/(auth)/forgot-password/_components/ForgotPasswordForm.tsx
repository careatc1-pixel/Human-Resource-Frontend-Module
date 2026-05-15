"use client";

import InputField from "@/global/elements/inputs/inputField";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useForgotPasswordForm } from "./useForgotPasswordForm";

export default function ForgotPasswordForm() {
  const { t } = useTranslation();
  const params = useParams<{ lang?: string }>();
  const lang = typeof params?.lang === "string" ? params.lang : "en";
  const {
    state: { data, setField },
    errors,
    loading,
    validateField,
    handleSubmit,
  } = useForgotPasswordForm();

  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-white p-4 shadow-input md:rounded-2xl md:p-8 dark:bg-black">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
        <ShieldCheck className="h-4 w-4" />
        {t("auth.resetAccess")}
      </div>

      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        {t("auth.resetPasswordTitle")}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        {t("auth.resetPasswordDescription")}
      </p>

      <form
        className="my-8 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit();
        }}
      >
        <InputField
          id="email"
          label={t("auth.email")}
          type="email"
          value={data.email}
          onChangeAction={(value) => setField("email", value)}
          onBlur={(e) => validateField?.("email", e.target.value)}
          placeholder={t("auth.resetPasswordPlaceholder")}
          error={errors.email?.[0]}
          required
        />

        <button
          disabled={loading}
          className="h-10 w-full rounded-md bg-linear-to-br from-black to-neutral-600 font-medium text-white disabled:opacity-60"
          type="submit"
        >
          {loading ? t("auth.resetPasswordLoading") : t("auth.resetPasswordCta")} →
         
        </button>
      </form>

      <div className="space-y-4 text-center text-neutral-600 dark:text-neutral-300">
        <p className="text-sm">{t("auth.resetPasswordHelper")}</p>
        <Link
          href={`/${lang}/signin`}
          className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("auth.backToSignIn")}
        </Link>
      </div>
    </div>
  );
}
