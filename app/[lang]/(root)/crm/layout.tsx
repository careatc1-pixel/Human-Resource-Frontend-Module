import type { Metadata } from "next";

import { AppNavbar, AppSidebar } from "@/global/elements/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "CRM",
  description: "Human Resource CRM workspace",
};


export default function CrmLayout({ children }: { children: React.ReactNode }) {

  return (
   <SidebarProvider>   {/* ✅ THIS FIXES YOUR ERROR */}
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <AppNavbar />
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}