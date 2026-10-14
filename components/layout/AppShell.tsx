"use client";

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
      <main className="flex-1">{children}</main>
      {footer}
      {/* Reserves room for the fixed mobile action bar so it never covers the page end */}
      <div className="h-[calc(3.75rem+1px+env(safe-area-inset-bottom))] sm:hidden" aria-hidden="true" />
      <FloatingWhatsApp />
    </>
  );
}
