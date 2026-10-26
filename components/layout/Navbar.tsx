"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import ThemeToggle from "@/components/common/ThemeToggle";
import AdminLoginModal from "@/components/layout/AdminLoginModal";
import { createWhatsAppUrl, toInternationalPhone } from "@/lib/utils";

// Desktop bar keeps to the pages that help someone choose and book;
// the drawer and footer carry the full list (FAQ, Blog, Home)
const PRIMARY_HREFS = ["/packages", "/activities", "/gallery", "/reviews", "/about", "/contact"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const closeAdminLogin = useCallback(() => setAdminLoginOpen(false), []);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.general
  );
  const phoneHref = `tel:${toInternationalPhone(SITE_CONFIG.contact.phone)}`;
  const primaryLinks = SITE_CONFIG.navLinks.filter((l) => PRIMARY_HREFS.includes(l.href));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset UI on navigation
    setIsOpen(false);
  }, [pathname]);

  // Transparent over the homepage hero; a solid night-navy bar everywhere else
  const isTransparent = isHomePage && !scrolled && !isOpen;

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent py-4 sm:py-5"
          : "bg-dune-900/95 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_-12px_rgba(10,15,36,0.6)] py-2.5 sm:py-3"
      }`}
    >
      <div className="container-page">
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5" id="nav-brand-logo" aria-label="Safari Dune Tours Homepage">
            <img
              src="/images/logo-emblem.svg"
              alt=""
              width={48}
              height={48}
              className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11"
            />
            <div className="flex flex-col">
              <span className="font-display text-[19px] font-semibold leading-none tracking-tight text-sand-50 sm:text-xl">
                Safari Dune <span className="text-amber-300">Tours</span>
              </span>
              <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-amber-300/80 sm:text-[10px]">
                Dubai Desert Safaris
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {primaryLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors duration-200 after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:bg-amber-300 after:transition-transform after:duration-300 ${
                    isActive
                      ? "text-amber-300 after:scale-x-100"
                      : "text-sand-50/85 hover:text-sand-50 after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <a
              href={phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-sand-50/90 transition-colors hover:text-amber-300 xl:inline-flex"
            >
              <Phone className="h-4 w-4 text-amber-300" aria-hidden="true" />
              <span>{toInternationalPhone(SITE_CONFIG.contact.phone)}</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-sand-50/85 transition-colors hover:border-amber-300/60 hover:text-amber-300"
              title="Chat on WhatsApp"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <ThemeToggle variant="onDark" />
            <button
              type="button"
              onClick={() => setAdminLoginOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-sand-50/85 transition-colors hover:border-amber-300/60 hover:text-amber-300"
              title="Admin Login"
              aria-label="Admin Login"
            >
              <ShieldCheck className="h-4 w-4" />
            </button>
            <Link href="/booking" className="btn-gold btn-sm ml-1" id="nav-book-now-cta">
              Book Now
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle variant="onDark" />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-sand-50 transition-colors hover:border-amber-300/60"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer: full link list */}
      {isOpen && (
        <div className="fixed inset-x-0 top-[64px] max-h-[85vh] overflow-y-auto border-b border-amber-500/20 bg-dune-900 px-5 pb-7 pt-3 shadow-2xl sm:top-[70px] lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`border-b border-white/5 py-3.5 font-display text-xl transition-colors ${
                    isActive ? "text-amber-300" : "text-sand-50/90 hover:text-amber-300"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 flex flex-col gap-3">
            <Link href="/booking" className="btn-gold btn-lg w-full">
              Book Your Safari
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-lg w-full">
              <MessageCircle className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <a href={phoneHref} className="mt-1 flex items-center justify-center gap-2 text-sm text-sand-400 hover:text-amber-300">
              <Phone className="h-4 w-4 text-amber-300" aria-hidden="true" />
              <span>{toInternationalPhone(SITE_CONFIG.contact.phone)}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setAdminLoginOpen(true);
              }}
              className="flex items-center justify-center gap-2 text-sm text-amber-300 hover:underline"
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>
      )}

      <AdminLoginModal open={adminLoginOpen} onClose={closeAdminLogin} />
    </header>
  );
}
