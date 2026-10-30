import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  /** "dark" for text over dark bands (default), "light" for text on the page background */
  tone?: "dark" | "light";
}

export default function Breadcrumbs({ items, className = "", tone = "dark" }: BreadcrumbsProps) {
  const light = tone === "light";
  const allItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    ...items,
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${SITE_CONFIG.url}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center text-xs ${light ? "text-muted" : "text-sand-400"} overflow-x-auto no-scrollbar ${className}`}
      >
        <ol className="flex items-center space-x-1.5 whitespace-nowrap">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;

            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500/60 mx-1 shrink-0" />
                )}

                {isLast || !item.href ? (
                  <span
                    className={`font-medium ${light ? "text-ink" : "text-amber-300"}`}
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={`${light ? "hover:text-ink" : "hover:text-white"} transition-colors flex min-h-11 items-center gap-1`}
                  >
                    {index === 0 && <Home className="w-3 h-3 text-amber-500 shrink-0" />}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
