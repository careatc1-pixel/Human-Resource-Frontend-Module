import type { Metadata } from "next";

import { staffEmployees } from "@/data/staffEmployees";

import { StaffTable } from "./_components/staff-table";

export const metadata: Metadata = {
  title: "Staff",
  description: "Employee directory and staff management table.",
};

export default function StaffPage() {
  return (
    <div className="space-y-6 pb-10">
      <section className="space-y-2">
     
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Employee directory</h1>
            <p className="text-sm text-muted-foreground">
              Track every employee working across your company groups from one responsive table.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">A001 &gt; B001 &gt; C001</p>
        </div>
      </section>

      <StaffTable employees={staffEmployees} />
    </div>
  );
}