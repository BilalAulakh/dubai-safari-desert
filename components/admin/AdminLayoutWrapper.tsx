"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

// Access is enforced server-side: proxy.ts redirects pages, API handlers call requireAdmin()
export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [sidebarOpenFor, setSidebarOpenFor] = useState<string | null>(null);
  // Sidebar closes on navigation because it is tied to the path it was opened on
  const sidebarOpen = sidebarOpenFor === pathname;

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#080B11] transition-colors relative">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpenFor(null)}
      />
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <AdminHeader
          onToggleSidebar={() => setSidebarOpenFor(sidebarOpen ? null : pathname)}
        />
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
