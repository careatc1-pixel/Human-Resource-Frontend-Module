
"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, Save, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { AllocatedLeavesCard } from "./AllocatedLeavesCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";


import { useLeaveForm } from "./useLeaveForm";
import { initialLeaveFormData, leaveTypeOptions, seriesOptions } from "./leaveForm";
import type { LeaveFormData } from "./leaveForm.schema";

type EmployeeOption = {
  value: string;
  label: string;
  company: string;
  department: string;
  designation: string;
  leaveApproverEmail: string;
  leaveApproverName: string;
};

const employeeOptions: EmployeeOption[] = [
  {
    value: "LIGI0301 - Hemant Bhatnagar",
    label: "LIGI0301 - Hemant Bhatnagar",
    company: "ArthavTech Solutions",
    department: "UI Department - LIT",
    designation: "Associate JavaScript Developer",
    leaveApproverEmail: "n.vikas@Arthav.com",
    leaveApproverName: "n.Vikas@Arthav.com",
  },
  {
    value: "LIGI0320 - Priya Nair",
    label: "LIGI0320 - Priya Nair",
    company: "Leader IT",
    department: "Product Design",
    designation: "Senior UI Designer",
    leaveApproverEmail: "m.rao@Arthav.com",
    leaveApproverName: "m.rao@Arthav.com",
  },
];

function ErrorText({ children }: { children?: string }) {
  if (!children) return null;

  return <p className="mt-1 text-xs text-destructive">{children}</p>;
}

function DateField({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: Date | null;
  onChange: (date: Date | undefined) => void;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="ml-1">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              error && "border-destructive/50"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "dd-MM-yyyy") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value ?? undefined}
            onSelect={onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <ErrorText>{error}</ErrorText>
    </div>
  );
}

function FieldShell({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="ml-1">
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </Label>
      {children}
      <ErrorText>{error}</ErrorText>
    </div>
  );
}

function LeaveTypeBadge({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
      {value}
    </span>
  );
}

export function LeaveApplicationForm() {
  const params = useParams<{ lang?: string }>();
  const lang = typeof params?.lang === "string" ? params.lang : "en";

  const { state: { data, setField }, errors, loading, handleSubmit } = useLeaveForm(initialLeaveFormData);

  const selectedEmployee = employeeOptions.find((option) => option.value === data.employeeId + " - " + data.employeeName)
    ?? employeeOptions[0];

  const onEmployeeChange = (value: string | null) => {
    const next = employeeOptions.find((option) => option.value === value) ?? employeeOptions[0];

    setField("employeeId", next.value.split(" - ")[0] ?? data.employeeId);
    setField("employeeName", next.value.split(" - ")[1] ?? data.employeeName);
    setField("company", next.company);
    setField("department", next.department);
    setField("designation", next.designation);
    setField("leaveApproverEmail", next.leaveApproverEmail);
    setField("leaveApproverName", next.leaveApproverName);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Leave Management</p>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">New Leave Application</h1>
            <LeaveTypeBadge value={data.status} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Apply for leave using the company-approved workflow and validate the request before saving.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={async () => {
            await handleSubmit();
          }}
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save
        </Button>
      </div>

      <div className="grid gap-3 xl:grid-cols-[360px_minmax(0,1fr)]">
        <div className="space-y-3">
<Card className="border border-border/60 shadow-sm">
            <CardHeader className="">
              <CardTitle >Application Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Employee</p>
                <p >{selectedEmployee.label}</p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-xl bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">Posting date</p>
                  <p className="mt-1 font-medium">{format(data.postingDate, "dd-MM-yyyy")}</p>
                </div>
                <div className="rounded-xl bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">Requested days</p>
                  <p className="mt-1 font-medium">
                    {Math.max(
                      Math.ceil((data.toDate.getTime() - data.fromDate.getTime()) / (1000 * 60 * 60 * 24)) + 1,
                      1,
                    )} day(s)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <AllocatedLeavesCard /> 
       
        </div>

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Leave Application Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-0">
            <div className="grid gap-4 md:grid-cols-2">
              <FieldShell label="Employee" required error={errors.employeeId?.[0] || errors.employeeName?.[0]}>
                <Combobox value={selectedEmployee.value} onValueChange={onEmployeeChange}>
                  <ComboboxInput showTrigger showClear={false} placeholder="Search employee" />
                  <ComboboxContent>
                    <ComboboxList>
                      {employeeOptions.map((employee) => (
                        <ComboboxItem key={employee.value} value={employee.value}>
                          {employee.label}
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </FieldShell>

              <FieldShell label="Employee Name">
                <Input value={data.employeeName} readOnly className="bg-muted/30" />
              </FieldShell>

              <FieldShell label="Leave Type" required error={errors.leaveType?.[0]}>
                <Select value={data.leaveType} onValueChange={(value) => setField("leaveType", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    {leaveTypeOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldShell>

              <FieldShell label="Series" required error={errors.series?.[0]}>
                <Select value={data.series} onValueChange={(value) => setField("series", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select series" />
                  </SelectTrigger>
                  <SelectContent>
                    {seriesOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldShell>

              <DateField
                label="Posting Date"
                value={data.postingDate}
                onChange={(date) => date && setField("postingDate", date)}
                error={errors.postingDate?.[0]}
              />

              <FieldShell label="Status" required error={errors.status?.[0]}>
                <Select value={data.status} onValueChange={(value) => setField("status", value as LeaveFormData["status"])}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Submitted">Submitted</SelectItem>
                  </SelectContent>
                </Select>
              </FieldShell>

              <DateField
                label="From Date"
                value={data.fromDate}
                onChange={(date) => date && setField("fromDate", date)}
                error={errors.fromDate?.[0]}
              />

              <DateField
                label="To Date"
                value={data.toDate}
                onChange={(date) => date && setField("toDate", date)}
                error={errors.toDate?.[0]}
              />

              <FieldShell label="Company" error={errors.company?.[0]}>
                <Input value={data.company} readOnly className="bg-muted/30" />
              </FieldShell>

              <FieldShell label="Department" error={errors.department?.[0]}>
                <Input value={data.department} readOnly className="bg-muted/30" />
              </FieldShell>

              <FieldShell label="Designation" error={errors.designation?.[0]}>
                <Input value={data.designation} readOnly className="bg-muted/30" />
              </FieldShell>

              <FieldShell label="Leave Approver" error={errors.leaveApproverEmail?.[0]}>
                <Input value={data.leaveApproverEmail} readOnly className="bg-muted/30" />
              </FieldShell>
            </div>

            <FieldShell label="Reason" required error={errors.reason?.[0]}>
              <Textarea
                value={data.reason}
                onChange={(event) => setField("reason", event.target.value)}
                placeholder="Share the reason for your leave request"
                rows={5}
              />
            </FieldShell>

            <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-foreground">
                <p>Leave approver: {data.leaveApproverName}</p>
                <p>Workspace: {lang.toUpperCase()}</p>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => console.log("draft")}>Save as Draft</Button>
                <Button type="button" onClick={async () => { await handleSubmit(); }}>
                  Submit Application
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}