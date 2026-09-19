"use client";

import { useRouter } from "next/navigation";
import { ShieldCheck, LogOut, User, Menu } from "lucide-react";
import ThemeToggle from "@/components/common/ThemeToggle";

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export default function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_auth");
      localStorage.removeItem("admin_auth");
      document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    router.push("/admin/login");
  };

  return (
    <header className="h-16 bg-white dark:bg-[#0B0F17] border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 flex items-center justify-between transition-colors sticky top-0 z-30 shrink-0">
      {/* Left: Mobile Hamburger & Title */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 -ml-1 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden focus:outline-none focus:ring-2 focus:ring-amber-500 shrink-0 cursor-pointer"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5 text-amber-500" />
        </button>

        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden sm:inline truncate">
          Management Portal
        </span>
        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block shrink-0" />

        <div className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 sm:px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="hidden sm:inline">Admin Authenticated</span>
          <span className="sm:hidden">Admin</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <ThemeToggle />

        <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-800 text-amber-400 flex items-center justify-center font-bold shrink-0">
            <User className="w-4 h-4" />
          </div>
          <span className="hidden md:inline">Operations Director</span>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          title="Sign Out"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer shrink-0"
        >
          <LogOut className="w-4 h-4 text-rose-500 shrink-0" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
