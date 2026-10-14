"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import ThemeToggle from "@/components/common/ThemeToggle";
import AdminLoginModal from "@/components/layout/AdminLoginModal";
import { createWhatsAppUrl, toInternationalPhone } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
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

  const closeAdminLogin = useCallback(() => setAdminLoginOpen(false), []);

  // When on homepage and unscrolled, navbar is transparent with crisp white text
  const isTransparent = isHomePage && !scrolled;

  // Over the hero video everything is white; on the solid bar text follows the theme
  const tone = isTransparent
    ? {
        text: "text-white",
        sub: "text-[#E8C48A]",
        link: "text-white/90 hover:text-white hover:bg-white/10",
        active: "text-[#F3D7A4] bg-white/12",
        icon: "text-white/80 hover:text-white hover:bg-white/10",
      }
    : {
        text: "text-[#17120D] dark:text-white",
        sub: "text-[#8C6214] dark:text-[#E8C48A]",
        link: "text-[#3D342B] hover:text-[#17120D] hover:bg-[#17120D]/5 dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10",
        active: "text-[#8C6214] bg-[#C89B3C]/12 dark:text-[#F3D7A4] dark:bg-white/10",
        icon: "text-[#5E554C] hover:text-[#17120D] hover:bg-[#17120D]/5 dark:text-white/75 dark:hover:text-white dark:hover:bg-white/10",
      };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent py-4 sm:py-5 border-b border-transparent"
          : "bg-white/90 dark:bg-[#17120D]/90 backdrop-blur-xl border-b border-[#17120D]/8 dark:border-white/10 shadow-[0_1px_12px_rgba(23,18,13,0.06)] py-2.5 sm:py-3"
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
            {!isTransparent && (
              <img
                src="/images/logo-emblem-96.webp"
                alt=""
                width={48}
                height={48}
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain group-hover:scale-105 transition-transform duration-300 dark:hidden"
              />
            )}
            <img
              src="/images/logo-emblem-dark-96.webp"
              srcSet="/images/logo-emblem-dark-96.webp 1x, /images/logo-emblem-dark-192.webp 2x"
              alt=""
              width={48}
              height={48}
              className={`w-10 h-10 sm:w-11 sm:h-11 object-contain group-hover:scale-105 transition-transform duration-300 ${isTransparent ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" : "hidden dark:block"}`}
            />
            <div className={`flex flex-col ${isTransparent ? "drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" : ""}`}>
              <span className={`font-heading text-[17px] sm:text-lg font-extrabold tracking-tight leading-none transition-colors ${tone.text}`}>
                Safari Dune <span className="text-[#C89B3C]">Tours</span>
              </span>
              <span className={`mt-1 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-semibold ${tone.sub}`}>
                Dubai Desert Safaris
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`whitespace-nowrap px-2.5 xl:px-3 py-2 text-[13px] xl:text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive ? `${tone.active} font-semibold` : tone.link
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-1.5 xl:gap-2 shrink-0">
            {/* Quick WhatsApp Link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors ${tone.icon}`}
              title="Chat on WhatsApp"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setAdminLoginOpen(true)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${tone.icon}`}
              title="Admin Login"
              aria-label="Admin Login"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            {/* Prominent Book Now CTA */}
            <Link
              href="/booking"
              className="btn-gold btn-sm"
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
              className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#C89B3C] ${tone.icon}`}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                      ? "text-[#F3D7A4] bg-white/10 font-semibold"
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
              className="btn-gold w-full text-center"
            >
              Book Your Safari
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full text-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <div className="flex items-center justify-between pt-2 text-sm text-white/70">
              <a
                href={`tel:${toInternationalPhone(SITE_CONFIG.contact.phone)}`}
                className="flex items-center gap-1.5 hover:text-[#E8C48A] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>{SITE_CONFIG.contact.phone}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setAdminLoginOpen(true);
                }}
                className="flex items-center gap-1 text-[#E8C48A] hover:underline cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <AdminLoginModal open={adminLoginOpen} onClose={closeAdminLogin} />
    </header>
  );
}
