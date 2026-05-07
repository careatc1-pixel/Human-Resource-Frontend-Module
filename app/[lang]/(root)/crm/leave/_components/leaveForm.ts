import type { LeaveFormData } from "./leaveForm.schema";

export const initialLeaveFormData: LeaveFormData = {
  employeeId: "LIGI0301",
  employeeName: "Hemant Bhatnagar",
  leaveType: "Casual Leave",
  series: "HR-LAP-.YYYY.-",
  postingDate: new Date("2026-05-06T00:00:00.000Z"),
  fromDate: new Date("2026-05-06T00:00:00.000Z"),
  toDate: new Date("2026-05-06T00:00:00.000Z"),
  reason: "",
  company: "Arthav Private Limited",
  department: "UI Department - LIT",
  designation: "Associate Developer",
  leaveApproverEmail: "n.Vikas@arthavgroup.com",
  leaveApproverName: "n.Vikas@arthavgroup.com",
  status: "Open",
};

export const leaveTypeOptions = [
  "Casual Leave",
  "Earned Leave",
  "Leave Without Pay",
  "Paternity Leave",
  "Sick Leave",
];

export const seriesOptions = ["HR-LAP-.YYYY.-", "HR-LAP-.YY.-"];
