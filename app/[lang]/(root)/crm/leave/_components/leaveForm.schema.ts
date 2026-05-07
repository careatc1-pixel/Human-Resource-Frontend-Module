import { z } from "zod";

export const leaveFormSchema = z
  .object({
    employeeId: z.string().trim().min(1, "Employee is required"),
    employeeName: z.string().trim().min(1, "Employee name is required"),
    leaveType: z.string().trim().min(1, "Leave type is required"),
    series: z.string().trim().min(1, "Series is required"),
    postingDate: z.date({ message: "Posting date is required" }),
    fromDate: z.date({ message: "From date is required" }),
    toDate: z.date({ message: "To date is required" }),
    reason: z.string().trim().min(10, "Reason must be at least 10 characters"),
    company: z.string().trim().min(1, "Company is required"),
    department: z.string().trim().min(1, "Department is required"),
    designation: z.string().trim().min(1, "Designation is required"),
    leaveApproverEmail: z
      .string()
      .trim()
      .min(1, "Leave approver is required")
      .email("Enter a valid email address"),
    leaveApproverName: z.string().trim().min(1, "Leave approver name is required"),
    status: z.enum(["Open", "Submitted"]),
  })
  .refine((data) => data.fromDate <= data.toDate, {
    message: "To date must be on or after from date",
    path: ["toDate"],
  });

export type LeaveFormData = z.infer<typeof leaveFormSchema>;
