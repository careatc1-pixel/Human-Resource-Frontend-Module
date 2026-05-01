import { AdminNavbar } from "@/global/elements/navbar";
import "../../../globals.css";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
