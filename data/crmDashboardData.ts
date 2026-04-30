import {
  Users,
  CalendarCheck,
  CalendarX,
  ClipboardList,
} from "lucide-react";

export type ActivityStatus = "success" | "pending" | "alert";

export const stats = [
  {
    label: "Total Employees",
    value: "124",
    delta: "+3 this month",
    deltaPositive: true,
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950",
  },
  {
    label: "Present Today",
    value: "108",
    delta: "87% attendance",
    deltaPositive: true,
    icon: CalendarCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950",
  },
  {
    label: "On Leave",
    value: "11",
    delta: "5 approved today",
    deltaPositive: null,
    icon: CalendarX,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950",
  },
  {
    label: "Open Tasks",
    value: "7",
    delta: "2 overdue",
    deltaPositive: false,
    icon: ClipboardList,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950",
  },
];

export const recentActivity: {
  id: number;
  name: string;
  initials: string;
  action: string;
  time: string;
  status: ActivityStatus;
}[] = [
  {
    id: 1,
    name: "Priya Sharma",
    initials: "PS",
    action: "Leave approved — 3 days (Sick)",
    time: "10 min ago",
    status: "success",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    initials: "RM",
    action: "Onboarding initiated",
    time: "42 min ago",
    status: "pending",
  },
  {
    id: 3,
    name: "Anita Desai",
    initials: "AD",
    action: "Payslip generated — April 2025",
    time: "1 hr ago",
    status: "success",
  },
  {
    id: 4,
    name: "Kiran Rao",
    initials: "KR",
    action: "Missed punch-in today",
    time: "2 hr ago",
    status: "alert",
  },
  {
    id: 5,
    name: "Suresh Kumar",
    initials: "SK",
    action: "Leave request — 5 days (Casual)",
    time: "3 hr ago",
    status: "pending",
  },
  {
    id: 6,
    name: "Divya Nair",
    initials: "DN",
    action: "Salary slab updated",
    time: "Yesterday",
    status: "success",
  },
];

export const pendingTasks: {
  id: number;
  label: string;
  tag: string;
  due: string;
  urgent: boolean;
}[] = [
  {
    id: 1,
    label: "Review Rahul Mehta's onboarding documents",
    tag: "Onboarding",
    due: "Today",
    urgent: true,
  },
  {
    id: 2,
    label: "Approve 5 pending leave requests",
    tag: "Leave",
    due: "Today",
    urgent: true,
  },
  {
    id: 3,
    label: "Process April payroll",
    tag: "Payroll",
    due: "Apr 30",
    urgent: false,
  },
  {
    id: 4,
    label: "Update payable days for Apr — 5 employees",
    tag: "Payroll",
    due: "Apr 30",
    urgent: false,
  },
  {
    id: 5,
    label: "Confirm Kiran Rao's attendance anomaly",
    tag: "Attendance",
    due: "Apr 28",
    urgent: false,
  },
];
