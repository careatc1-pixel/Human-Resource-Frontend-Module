"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusItem = {
  label: string;
  className: string;
};

const STATUS_CONFIG = {
  admin: {
    Active: { label: "Active", className: "bg-green-100 text-green-700" },
    Trial: { label: "Trial", className: "bg-yellow-100 text-yellow-700" },
    Churned: { label: "Churned", className: "bg-red-100 text-red-700" },
    Suspended: { label: "Suspended", className: "bg-gray-200 text-gray-700" },
  },
  attendance: {
    present: {
      label: "Present",
      className: "bg-emerald-100 text-emerald-800",
    },
    absent: {
      label: "Absent",
      className: "bg-rose-100 text-rose-800",
    },
    late: {
      label: "Late",
      className: "bg-amber-100 text-amber-800",
    },
    "half-day": {
      label: "Half Day",
      className: "bg-blue-100 text-blue-800",
    },
    "on-leave": {
      label: "On Leave",
      className: "bg-violet-100 text-violet-800",
    },
    holiday: {
      label: "Holiday",
      className: "bg-slate-100 text-slate-700",
    },
  },
} satisfies Record<string, Record<string, StatusItem>>;

type Variant = keyof typeof STATUS_CONFIG;

type StatusBadgeProps = {
  variant: Variant;
  status: string;
};

export default function StatusBadge({
  variant,
  status,
}: StatusBadgeProps) {
  const config = STATUS_CONFIG[variant]?.[status];

  if (!config) {
    return (
      <Badge className="bg-gray-100 text-gray-500">
        Unknown
      </Badge>
    );
  }

  return (
    <Badge
      className={cn(
        "rounded-full text-xs font-medium px-2 py-1 border-0",
        config.className
      )}
    >
      {config.label}
    </Badge>
  );
}