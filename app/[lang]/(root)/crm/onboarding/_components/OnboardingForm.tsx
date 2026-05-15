"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight, Loader2, Save } from "lucide-react";
import InputField from "@/global/elements/inputs/inputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useOnboardingForm } from "./useOnboardingForm";
import { initialOnboardingData } from "./onboarding";

function ErrorText({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mt-1 text-xs text-destructive">{children}</p>;
}

function DateField({
  label,
  value,
  onChange,
  error,
  required,
}: {
  label: string;
  value: Date | null;
  onChange: (date: Date | undefined) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label className="ml-1">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
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

function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: "Personal Info" },
    { num: 2, label: "Work Info" },
    { num: 3, label: "Documents" },
    { num: 4, label: "Assets" },
    { num: 5, label: "Account Setup" },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, idx) => (
          <div key={step.num} className="flex items-center flex-1">
            <div
              className={cn(
                "flex items-center justify-center h-10 w-10 rounded-full border-2 font-semibold text-sm",
                step.num <= currentStep
                  ? "bg-slate-950 text-white border-slate-950"
                  : "bg-muted border-muted-foreground/30"
              )}
            >
              {step.num}
            </div>
            <div className="ml-2 flex-1">
              <p className="text-xs font-medium text-foreground">{step.label}</p>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1 mx-2",
                  step.num < currentStep ? "bg-slate-950" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function OnboardingForm() {
  const { state: { data, setField }, errors, loading, nextStep, prevStep, handleSubmit } = useOnboardingForm(initialOnboardingData);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Employee Management</p>
          <h1 className="text-2xl font-semibold tracking-tight mt-1">Onboard New Employee</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete all steps to successfully onboard a new employee.
          </p>
        </div>
      </div>

      <Card className="border border-border/60 shadow-sm">
        <CardContent className="pt-6">
          {/* Step Indicator */}
          <StepIndicator currentStep={data.currentStep} />

          {/* Form Content */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (data.currentStep === 5) {
                handleSubmit();
              } else {
                nextStep();
              }
            }}
            className="space-y-6"
          >
            {/* Step 1 — Personal Info */}
            {data.currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField
                    id="firstName"
                    label="First Name"
                    value={data.firstName}
                    onChangeAction={(value) => setField("firstName", value)}
                    placeholder="John"
                    error={errors.firstName?.[0]}
                    required
                  />
                  <InputField
                    id="lastName"
                    label="Last Name"
                    value={data.lastName}
                    onChangeAction={(value) => setField("lastName", value)}
                    placeholder="Doe"
                    error={errors.lastName?.[0]}
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <InputField
                    id="email"
                    label="Email"
                    type="email"
                    value={data.email}
                    onChangeAction={(value) => setField("email", value)}
                    placeholder="john@company.com"
                    error={errors.email?.[0]}
                    required
                  />
                  <InputField
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    value={data.phone}
                    onChangeAction={(value) => setField("phone", value)}
                    placeholder="9876543210"
                    error={errors.phone?.[0]}
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <DateField
                    label="Date of Birth"
                    value={data.dateOfBirth}
                    onChange={(date) => date && setField("dateOfBirth", date)}
                    error={errors.dateOfBirth?.[0]}
                    required
                  />
                  <div className="space-y-2">
                    <Label className="ml-1">
                      Gender
                      <span className="text-destructive"> *</span>
                    </Label>
                    <Select value={data.gender} onValueChange={(value) => setField("gender", value as "Male" | "Female" | "Other")}>
                      <SelectTrigger className={cn(errors.gender && "border-destructive/50")}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <ErrorText>{errors.gender?.[0]}</ErrorText>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 — Work Info */}
            {data.currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Work Information</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField
                    id="role"
                    label="Role/Designation"
                    value={data.role}
                    onChangeAction={(value) => setField("role", value)}
                    placeholder="Software Engineer"
                    error={errors.role?.[0]}
                    required
                  />
                  <InputField
                    id="department"
                    label="Department"
                    value={data.department}
                    onChangeAction={(value) => setField("department", value)}
                    placeholder="Engineering"
                    error={errors.department?.[0]}
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <InputField
                    id="manager"
                    label="Reporting Manager"
                    value={data.manager}
                    onChangeAction={(value) => setField("manager", value)}
                    placeholder="Manager Name"
                    error={errors.manager?.[0]}
                    required
                  />
                  <InputField
                    id="salary"
                    label="Annual Salary"
                    type="number"
                    value={data.salary}
                    onChangeAction={(value) => setField("salary", value)}
                    placeholder="500000"
                    error={errors.salary?.[0]}
                    required
                  />
                </div>

                <DateField
                  label="Joining Date"
                  value={data.joiningDate}
                  onChange={(date) => date && setField("joiningDate", date)}
                  error={errors.joiningDate?.[0]}
                  required
                />
              </div>
            )}

            {/* Step 3 — Documents */}
            {data.currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Documents</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField
                    id="aadhaar"
                    label="Aadhaar Number"
                    value={data.aadhaar}
                    onChangeAction={(value) => setField("aadhaar", value)}
                    placeholder="123456789012"
                    error={errors.aadhaar?.[0]}
                  />
                  <InputField
                    id="pan"
                    label="PAN"
                    value={data.pan}
                    onChangeAction={(value) => setField("pan", value)}
                    placeholder="AAAAA0000A"
                    error={errors.pan?.[0]}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <InputField
                    id="photo"
                    label="Photo URL"
                    value={data.photo}
                    onChangeAction={(value) => setField("photo", value)}
                    placeholder="https://..."
                    error={errors.photo?.[0]}
                  />
                  <InputField
                    id="resume"
                    label="Resume URL"
                    value={data.resume}
                    onChangeAction={(value) => setField("resume", value)}
                    placeholder="https://..."
                    error={errors.resume?.[0]}
                  />
                </div>
              </div>
            )}

            {/* Step 4 — Assets */}
            {data.currentStep === 4 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Assets Allocation</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="ml-1">
                      Laptop
                      <span className="text-destructive"> *</span>
                    </Label>
                    <Select value={data.laptop} onValueChange={(value) => setField("laptop", value as "Yes" | "No")}>
                      <SelectTrigger className={cn(errors.laptop && "border-destructive/50")}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <ErrorText>{errors.laptop?.[0]}</ErrorText>
                  </div>

                  <div className="space-y-2">
                    <Label className="ml-1">
                      SIM Card
                      <span className="text-destructive"> *</span>
                    </Label>
                    <Select value={data.sim} onValueChange={(value) => setField("sim", value as "Yes" | "No")}>
                      <SelectTrigger className={cn(errors.sim && "border-destructive/50")}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <ErrorText>{errors.sim?.[0]}</ErrorText>
                  </div>

                  <div className="space-y-2">
                    <Label className="ml-1">
                      ID Card
                      <span className="text-destructive"> *</span>
                    </Label>
                    <Select value={data.idCard} onValueChange={(value) => setField("idCard", value as "Yes" | "No")}>
                      <SelectTrigger className={cn(errors.idCard && "border-destructive/50")}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <ErrorText>{errors.idCard?.[0]}</ErrorText>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5 — Account Setup */}
            {data.currentStep === 5 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Account Setup</h2>
                <div className="grid gap-4">
                  <InputField
                    id="password"
                    label="Password"
                    type="password"
                    value={data.password}
                    onChangeAction={(value) => setField("password", value)}
                    placeholder="••••••••"
                    error={errors.password?.[0]}
                    required
                  />
                  <InputField
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={data.confirmPassword}
                    onChangeAction={(value) => setField("confirmPassword", value)}
                    placeholder="••••••••"
                    error={errors.confirmPassword?.[0]}
                    required
                  />
                </div>

                <InputField
                  id="inviteEmail"
                  label="Invitation Email"
                  type="email"
                  value={data.inviteEmail}
                  onChangeAction={(value) => setField("inviteEmail", value)}
                  placeholder="invite@company.com"
                  error={errors.inviteEmail?.[0]}
                  required
                />
              </div>
            )}

            {/* Step Navigation */}
            <div className="flex justify-between gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={data.currentStep === 1 || loading}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="ml-auto"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {data.currentStep === 5 ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? "Submitting..." : "Submit"}
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
