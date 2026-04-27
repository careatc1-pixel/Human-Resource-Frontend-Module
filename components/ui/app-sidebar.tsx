"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { UserRound } from "lucide-react";

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
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { sidebarNavItems } from "@/global/constants/constant";

export function AppSidebar() {
  const pathname = usePathname();
  const params = useParams<{ lang?: string }>();

  const langPrefix = typeof params?.lang === "string" ? `/${params.lang}` : "";

  const getLocalizedHref = (href: string) => `${langPrefix}${href}`;

  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href={getLocalizedHref("/crm")}>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <UserRound className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Atharv HR</span>
                    <span className="truncate text-xs">CRM Panel</span>
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
                const href = getLocalizedHref(item.href);
                const isActive = pathname === href || pathname.startsWith(`${href}/`);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton tooltip={item.title} asChild isActive={isActive}>
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
