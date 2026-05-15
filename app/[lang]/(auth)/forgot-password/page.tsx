import PosterCard from "@/components/PosterCard";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="flex w-full max-w-7xl items-center gap-10 rounded-3xl bg-slate-100 p-6 shadow-sm md:p-8">
        <div className="flex-1">
          <ForgotPasswordForm />
        </div>
        <div className="hidden flex-1 justify-center md:flex">
          <PosterCard />
        </div>
      </div>
    </div>
  );
}