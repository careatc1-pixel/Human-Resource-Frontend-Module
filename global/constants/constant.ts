import type { ComponentType } from "react";
import {
  BadgeCheck,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  Settings,
  type LucideProps,
  Users,
  ListTodo,
} from "lucide-react";

export type SidebarNavItem = {
  title: string;
  href: string;
  icon: ComponentType<LucideProps>;
  exact?: boolean;
};

export const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Dashboard",
    href: "/crm",  
	exact: true,
    icon: LayoutDashboard,
  },
  {
    title: "Staff",
    href: "/crm/staff",
    icon: Users,
  },
  {
    title: "Attendance",
    href: "/crm/attendance",
    icon: CalendarDays,
  },
  {
    title: "Leave",
    href: "/crm/leave",
    icon: BadgeCheck,
  },
  {
    title: "Onboarding",
    href: "/crm/onboarding",
    icon: ClipboardList,
  },
  {
    title: "Task",
    href: "/crm/task",
    icon: ListTodo,
  },
];
export const NAVBAR_DROPDOWN_ITEMS = [
  {
    label: "Punch In",
    shortcut: "⌘P",
    href: () => "#",
  },
  {
    label: "Punch Out",
    shortcut: "⌘P",
    href: () => "#",
  },
  {
    label: "Profile",
    shortcut: "⌘P",
    href: () => "#",
  },
  {
    label: "Settings",
    shortcut: "⌘A",
    href: () => "#",
  },
  {
    label: "Logout",
    shortcut: "⌘D",
    href: () => "#",
  },
];
