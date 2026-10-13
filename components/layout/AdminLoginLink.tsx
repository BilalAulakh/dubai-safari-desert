"use client";

import Link from "next/link";

// Clears any stale admin session before opening the login page
export default function AdminLoginLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href="/admin/login"
      onClick={() => {
        sessionStorage.removeItem("admin_auth");
        localStorage.removeItem("admin_auth");
        document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }}
      className={className}
    >
      {children}
    </Link>
  );
}
