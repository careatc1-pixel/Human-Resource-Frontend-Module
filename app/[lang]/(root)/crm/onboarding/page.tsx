import type { Metadata } from "next";
import { OnboardingForm } from "./_components/OnboardingForm";

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Employee onboarding form for new hires.",
};

export default function OnboardingPage() {
  return (
    <div className="space-y-6 pb-10">
      <OnboardingForm />
    </div>
  );
}