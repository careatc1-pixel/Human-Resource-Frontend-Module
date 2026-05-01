"use client";

import {
  Bell,
  ChevronRight,
  Clock,
  LogOut,
  PanelLeft,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

import {
  NAVBAR_DROPDOWN_ITEMS,
  sidebarNavItems,
} from "@/global/constants/constant";

export const AUTH_ROUTES = ["login", "register", "password-reset"];

export function AppNavbar() {
  const { t } = useTranslation();
  const pathname = usePathname() ?? "/";
  const { toggleSidebar } = useSidebar();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement | null>(null);
  const notifBtnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const segments = pathname.split("/").filter(Boolean);
  const lang = segments[0] || "en";

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !btnRef.current?.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }

      if (
        !notifRef.current?.contains(e.target as Node) &&
        !notifBtnRef.current?.contains(e.target as Node)
      ) {
        setNotifOpen(false);
      }
    }

    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setNotifOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);

    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-border bg-background/90 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {" "}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-md hover:bg-muted transition"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
          <span className="font-medium text-foreground">Atharv HR</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => setIsPunchedIn((v) => !v)}
            className={`flex items-center gap-1.5 rounded-xl px-3 text-sm font-medium transition-all ${
              isPunchedIn
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            {isPunchedIn ? t("nav.punchOut") : t("nav.punchIn")}
          </Button>

          {/* Bell */}
          <div className="relative" ref={notifRef}>
            <button
              ref={notifBtnRef}
              onClick={() => setNotifOpen((v) => !v)}
              className="relative p-1.5 rounded-full hover:bg-muted transition"
            >
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-card border border-border shadow-xl py-2 z-50">
                {/* Header */}
                <div className="px-4 py-2 border-b border-border font-semibold text-sm">
                  Notifications
                </div>

                {/* Notification Items */}
                <div className="max-h-72 overflow-y-auto">
                  {[
                    { title: "New employee added", time: "2 min ago" },
                    { title: "Leave request pending", time: "10 min ago" },
                    { title: "Payroll processed", time: "1 hr ago" },
                  ].map((n, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 hover:bg-muted transition cursor-pointer"
                    >
                      <p className="text-sm text-foreground">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.time}</p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-border mt-1">
                  <button className="w-full text-center py-2 text-sm hover:bg-muted">
                    View all
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Avatar + Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              ref={btnRef}
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={dropdownOpen}
              className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-muted transition"
            >
              <div className="w-8 h-8 rounded-full border border-slate-400 overflow-hidden flex items-center justify-center bg-slate-200 text-xs font-semibold text-slate-700">
                SG
              </div>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                Shivam Ghosh
              </span>
            </button>

            {dropdownOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-52 rounded-xl bg-card border border-border shadow-xl py-1 text-sm z-50"
              >
                <div className="px-4 py-2 border-b border-border">
                  <p className="font-semibold text-foreground truncate">
                    Shivam Ghosh
                  </p>
                </div>

                {NAVBAR_DROPDOWN_ITEMS.map((it) => (
                  <Link
                    key={it.label}
                    href={"#"}
                    className="flex items-center justify-between px-4 py-2 hover:bg-muted transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span>{it.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {it.shortcut}
                    </span>
                  </Link>
                ))}

                <div className="border-t border-border mt-1" />
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-muted transition text-left text-red-500"
                  onClick={() => {}}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const params = useParams<{ lang?: string }>();
  const [activeItem, setActiveItem] = useState<string>("");
  const langPrefix = typeof params?.lang === "string" ? `/${params.lang}` : "";

  const getHref = (href: string) => `${langPrefix}${href}`;

  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar
        collapsible="icon"
        variant="inset"
        className="bg-background/90 backdrop-blur-md"
      >
        {" "}
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href={getHref("/dashboard")}>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <UserRound className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Atharv HR</span>
                    <span className="truncate text-xs">HR Panel</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>
              {sidebarNavItems.map((item) => {
                const href = getHref(item.href);
              const isActive = item.exact
                  ? pathname === href
                  : pathname === href || pathname.startsWith(href + '/');
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      asChild
                      isActive={isActive}
                    >
                      <Link href={href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  );
}

export function AdminNavbar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b sticky top-0 z-50">
      <h1 className="text-lg font-semibold text-slate-800">
        Admin Panel
      </h1>

      <Button variant="outline">
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </div>
  );
}