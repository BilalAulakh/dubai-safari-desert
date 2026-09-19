"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ShieldCheck, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import ThemeToggle from "@/components/common/ThemeToggle";
import { createWhatsAppUrl } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.general
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // When on homepage and unscrolled, navbar is transparent with crisp white text
  const isTransparent = isHomePage && !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent py-4 sm:py-5 border-b border-transparent"
          : "bg-[#17120D]/95 backdrop-blur-md border-b border-[#C89B3C]/20 shadow-lg py-3 sm:py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            id="nav-brand-logo"
            aria-label="Safari Dune Tours Homepage"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#C89B3C]/50 via-[#241A12] to-[#17120D] p-0.5 shadow-[0_2px_12px_rgba(200,155,60,0.3)] group-hover:shadow-[0_4px_20px_rgba(200,155,60,0.5)] group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full rounded-[10px] bg-[#17120D] flex items-center justify-center p-1">
                <Image
                  src="/images/logo-emblem.png"
                  alt="Safari Dune Tours"
                  width={40}
                  height={40}
                  priority
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="flex flex-col drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              <span className="font-heading text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-[#E8C48A] transition-colors leading-tight">
                Safari Dune <span className="text-[#C89B3C]">Tours</span>
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.16em] text-[#E8C48A] uppercase font-medium">
                Dubai Desert Safaris
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap px-3 py-1.5 text-xs xl:text-[13px] font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-[#FDE68A] bg-white/15 font-semibold backdrop-blur-md shadow-sm border border-white/20"
                      : "text-white hover:text-[#E8C48A] hover:bg-white/10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-2 xl:gap-2.5 shrink-0">
            {/* Quick WhatsApp Link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-white/85 hover:text-emerald-400 hover:bg-white/10 transition-colors"
              title="Chat on WhatsApp"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <ThemeToggle />

            <Link
              href="/admin/login"
              onClick={() => {
                if (typeof window !== "undefined") {
                  sessionStorage.removeItem("admin_auth");
                  localStorage.removeItem("admin_auth");
                  document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                }
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg border border-[#C89B3C]/35 text-[#E8C48A] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Admin Portal (Requires Login)"
              id="nav-admin-cta"
            >
              <ShieldCheck className="w-3 h-3 text-[#C89B3C]" />
              <span>Admin</span>
            </Link>

            {/* Prominent Book Now CTA */}
            <Link
              href="/booking"
              className="btn-gold text-[11px] sm:text-xs uppercase tracking-wider py-2 px-3.5 sm:px-4 font-bold rounded-lg shadow-sm whitespace-nowrap"
              id="nav-book-now-cta"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6 text-[#C89B3C]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[62px] sm:top-[68px] bg-[#17120D]/98 border-b border-[#C89B3C]/25 px-5 pt-4 pb-7 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "text-[#E8C48A] bg-white/10 font-semibold border-l-2 border-[#C89B3C]"
                      : "text-white/85 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="/booking"
              className="btn-gold w-full text-center py-3 text-sm font-bold uppercase tracking-wider justify-center"
            >
              Book Your Safari Today
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full text-center py-2.5 text-xs uppercase tracking-wider font-semibold justify-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us Now</span>
            </a>

            <div className="flex items-center justify-between pt-2 text-xs text-white/60">
              <a
                href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center gap-1.5 hover:text-[#E8C48A] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>{SITE_CONFIG.contact.phone}</span>
              </a>

              <Link
                href="/admin/login"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    sessionStorage.removeItem("admin_auth");
                    localStorage.removeItem("admin_auth");
                    document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                  }
                  setIsOpen(false);
                }}
                className="flex items-center gap-1 text-[#E8C48A] hover:underline cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
