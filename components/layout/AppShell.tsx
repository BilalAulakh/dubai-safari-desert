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
      <FloatingWhatsApp />
    </>
  );
}
