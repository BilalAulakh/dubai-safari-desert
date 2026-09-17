"use client";

import Link from "next/link";
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
} from "lucide-react";

export default function AdminSidebar() {
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

  return (
    <aside className="w-64 bg-[#0B0F17] text-slate-300 border-r border-amber-500/20 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow">
              <Compass className="w-5 h-5 text-amber-100" />
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

        {/* Navigation list */}
        <nav className="p-4 space-y-1">
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-amber-500 text-slate-950 font-bold shadow"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-amber-400"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
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
  );
}
