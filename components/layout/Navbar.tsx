"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Menu, X, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md shadow-lg border-b border-amber-900/10 dark:border-amber-500/20 py-3"
          : "bg-white/90 dark:bg-[#0B0F17] border-b border-slate-200 dark:border-white/10 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            id="nav-brand-logo"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-amber-100" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                Dubai<span className="text-amber-500">Safari</span>Desert
              </span>
              <span className="text-[10px] tracking-widest text-amber-700 dark:text-amber-200/70 uppercase font-semibold">
                Premium Adventures
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-white/10 font-bold"
                      : "text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-md transition-all hover:shadow-amber-500/20 hover:scale-[1.02]"
              id="nav-book-now-cta"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white/98 dark:bg-[#0B0F17]/98 border-b border-slate-200 dark:border-amber-500/20 px-4 pt-3 pb-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-white/10 font-semibold"
                      : "text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3">
            <Link
              href="/booking"
              className="w-full py-3 text-center text-sm font-bold uppercase tracking-wider rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md"
            >
              Book Your Safari
            </Link>

            <a
              href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>Call Direct: {SITE_CONFIG.contact.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
