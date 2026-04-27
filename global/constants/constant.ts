import type { ComponentType } from "react";
import {
	BadgeCheck,
	CalendarDays,
	ClipboardList,
	LayoutDashboard,
	Settings,
	type LucideProps,
	Users,
} from "lucide-react";

export type SidebarNavItem = {
	title: string;
	href: string;
	icon: ComponentType<LucideProps>;
};

export const sidebarNavItems: SidebarNavItem[] = [
	{
		title: "Dashboard",
		href: "/crm",
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
		title: "Settings",
		href: "/crm/settings",
		icon: Settings,
	},
];
