import type { Metadata } from "next";
import Navbar from "@/components/common_components/Navbar";
import { AppSidebar } from "@/components/ui/app-sidebar";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "CRM",
  description: "Human Resource CRM workspace",
};

export default function CrmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-40 flex gap-2 px-4">
          <SidebarTrigger />
        </header>
        <div className="flex min-h-[calc(100svh-3.5rem)] flex-1 flex-col p-4 md:p-6">
          <Navbar/>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
