"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid } from "@/components/ui/layout-grid";

const GlassCard = ({
  title,
  description,
  buttonLabel,
  route,
  icon,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  route: string;
  icon: string;
}) => {
  const router = useRouter();
  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 bg-black/30 backdrop-blur-sm rounded-xl">
      {/* Top icon */}
      <div className="text-3xl">{icon}</div>

      {/* Bottom content */}
      <div>
        <p className="font-bold text-white text-xl leading-tight">{title}</p>
        <p className="text-white/70 text-xs mt-1 leading-relaxed">{description}</p>
        <button
          onClick={() => router.push(route)}
          className="mt-4 px-4 py-1.5 bg-white/20 border border-white/30 text-white text-xs font-semibold rounded-full hover:bg-white/30 backdrop-blur-md transition"
        >
          {buttonLabel} →
        </button>
      </div>
    </div>
  );
};

const SkeletonOne = () => (
  <GlassCard
    icon="👤"
    title="Onboard Employee"
    description="Add new team members with documents, joining kit, and offer letter."
    buttonLabel="+ Add Employee"
    route="/crm/onboarding"
  />
);

const SkeletonTwo = () => (
  <GlassCard
    icon="💰"
    title="Payroll"
    description="Process monthly payouts and manage salary slabs."
    buttonLabel="View Payroll"
    route="/crm/payroll"
  />
);

const SkeletonThree = () => (
  <GlassCard
    icon="🧾"
    title="Salary"
    description="Track earned salary, deductions, and real-time calculations."
    buttonLabel="View Salary"
    route="/crm/salary"
  />
);

const SkeletonFour = () => (
  <GlassCard
    icon="📅"
    title="Attendance"
    description="Daily punch-in/out, leaves, and monthly payable days."
    buttonLabel="View Attendance"
    route="/crm/attendance"
  />
);

const SkeletonFive = () => (
  <GlassCard
    icon="📊"
    title="Reports"
    description="Analytics, heatmaps, and staff performance at a glance."
    buttonLabel="View Reports"
    route="/crm/reports"
  />
);

const SkeletonSix = () => (
  <GlassCard
    icon="🏖️"
    title="Leave Management"
    description="Apply, approve, and track leaves with balance tracking."
    buttonLabel="Manage Leaves"
    route="/crm/leave"
  />
);

const cards = [
  {
    id: 1,
    className: "md:col-span-2",
    thumbnail: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop",
    content: <SkeletonOne />,
  },
  {
    id: 2,
    className: "col-span-1",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop",
    content: <SkeletonTwo />,
  },
  {
    id: 3,
    className: "col-span-1",
    thumbnail: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&auto=format&fit=crop",
    content: <SkeletonThree />,
  },
  {
    id: 4,
    className: "md:col-span-2",
    thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop",
    content: <SkeletonFour />,
  },
  {
    id: 5,
    className: "md:col-span-2",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    content: <SkeletonFive />,
  },
  {
    id: 6,
    className: "col-span-1",
    thumbnail: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&auto=format&fit=crop",
    content: <SkeletonSix />,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen mt-24 pb-10">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, Hemant. Here&apos;s your HR overview.</p>
      </div>
      <LayoutGrid cards={cards} />
    </div>
  );
}