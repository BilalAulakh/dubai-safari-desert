"use client";

import { ViewTransition } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

// Footer arrives as a prop so it stays a server component and ships no client JS
export default function AppShell({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <div className="min-h-screen flex flex-col">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Keyed by path so each page gets its own enter/exit animation (see "Page transitions"
            in globals.css). Not a template.tsx: Next 16.3 logs a false "key" error for templates in dev. */}
        <ViewTransition key={pathname} enter="page-enter" exit="page-exit" default="none">
          <div>{children}</div>
        </ViewTransition>
      </main>
      {footer}
      {/* Reserves room for the fixed mobile action bar so it never covers the page end */}
      <div className="h-[calc(3.75rem+1px+env(safe-area-inset-bottom))] sm:hidden" aria-hidden="true" />
      <FloatingWhatsApp />
    </>
  );
}
