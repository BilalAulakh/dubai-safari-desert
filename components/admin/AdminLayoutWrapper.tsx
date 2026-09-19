"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (isLoginPage) {
      setIsAuthenticated(true);
      return;
    }

    // Verify session
    const auth =
      typeof window !== "undefined" &&
      (sessionStorage.getItem("admin_auth") === "true" ||
        localStorage.getItem("admin_auth") === "true");

    if (!auth) {
      setIsAuthenticated(false);
      router.replace("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Branded loader while verifying credentials
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#080B11] flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-10 h-10 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-widest text-amber-400 font-bold">
          Verifying Admin Access...
        </p>
      </div>
    );
  }

  // Prevent flash of protected content while redirecting
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#080B11] transition-colors">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
