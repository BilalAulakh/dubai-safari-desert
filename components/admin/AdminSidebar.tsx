"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Package as PackageIcon,
  Compass,
  Image as ImageIcon,
  Star,
  MessageSquare,
  HelpCircle,
  MapPin,
  BookOpen,
  Search,
  Settings,
  ExternalLink,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({
  isOpen = false,
  onClose = () => {},
}: AdminSidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
    { href: "/admin/blog", label: "Blog Articles", icon: BookOpen },
    { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
    { href: "/admin/packages", label: "Safari Packages", icon: PackageIcon },
    { href: "/admin/activities", label: "Activities", icon: Compass },
    { href: "/admin/gallery", label: "Photo Gallery", icon: ImageIcon },
    { href: "/admin/reviews", label: "Customer Reviews", icon: Star },
    { href: "/admin/comments", label: "Blog Comments", icon: MessageSquare },
    { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
    { href: "/admin/pickup-locations", label: "Pickup Locations", icon: MapPin },
    { href: "/admin/seo", label: "SEO Management", icon: Search },
    { href: "/admin/settings", label: "Site Settings", icon: Settings },
  ];

  const renderNavLinks = () => (
    <nav className="p-3 sm:p-4 space-y-1">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              isActive
                ? "bg-amber-500 text-slate-950 font-bold shadow"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon
              className={`w-4 h-4 shrink-0 ${
                isActive ? "text-slate-950" : "text-amber-400"
              }`}
            />
            <span className="truncate">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* 1. Desktop Sidebar (Hidden on < lg screens) */}
      <aside className="hidden lg:flex w-64 bg-[#0B0F17] text-slate-300 border-r border-amber-500/20 flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto z-20">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/30 to-[#17120D] p-1 border border-amber-500/40 flex items-center justify-center text-white shadow">
                <Image
                  src="/images/logo-emblem.png"
                  alt="Dubai Safari Admin"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-base font-extrabold text-white block">
                  Dubai<span className="text-amber-500">Safari</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-amber-400 font-bold block">
                  Admin Center
                </span>
              </div>
            </Link>
          </div>

          {/* Nav links */}
          {renderNavLinks()}
        </div>

        {/* Footer link to public website */}
        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-amber-400 hover:bg-white/5 transition-colors"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* 2. Mobile Backdrop (Only when open on mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* 3. Mobile Slide-Over Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#0B0F17] text-slate-300 z-50 flex flex-col justify-between border-r border-amber-500/20 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
        }`}
      >
        <div>
          {/* Mobile Brand Header with Close Button */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link
              href="/admin"
              onClick={onClose}
              className="flex items-center gap-2.5"
            >
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/30 to-[#17120D] p-1 border border-amber-500/40 flex items-center justify-center text-white shadow">
                <Image
                  src="/images/logo-emblem.png"
                  alt="Dubai Safari Admin"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-sm font-extrabold text-white block">
                  Dubai<span className="text-amber-500">Safari</span>
                </span>
                <span className="text-[8px] uppercase tracking-widest text-amber-400 font-bold block">
                  Admin Center
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation list */}
          {renderNavLinks()}
        </div>

        {/* Footer link to public website */}
        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            target="_blank"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-amber-400 hover:bg-white/5 transition-colors"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </>
  );
}
