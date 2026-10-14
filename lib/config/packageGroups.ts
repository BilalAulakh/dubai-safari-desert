import type { Package } from "@/types";

type GroupablePackage = Pick<Package, "slug" | "category" | "badges">;

// Browsing groups shared by the /packages filter tabs and the homepage.
// A package's group comes from its category, with VIP/private desert safaris split out.
export type PackageFilterId = "all" | "classic" | "private-vip" | "adrenaline" | "overnight";

export interface PackageFilter {
  id: Exclude<PackageFilterId, "all">;
  label: string;
  matches: (pkg: GroupablePackage) => boolean;
}

// Slug or badge mentions VIP/private (e.g. the half-day tour is a "Private Jeep")
const isPrivateOrVip = (p: GroupablePackage) =>
  /(^|-)(vip|private)(-|$)/.test(p.slug) || (p.badges ?? []).some((b) => /\b(vip|private)\b/i.test(b));

export const PACKAGE_FILTERS: PackageFilter[] = [
  {
    id: "classic",
    label: "Classic",
    matches: (p) =>
      (p.category === "desert-safari" || p.category === "special-offer") && !isPrivateOrVip(p),
  },
  {
    id: "private-vip",
    label: "Private & VIP",
    matches: (p) => p.category === "desert-safari" && isPrivateOrVip(p),
  },
  {
    id: "adrenaline",
    label: "Quad Bikes & Buggies",
    matches: (p) => p.category === "atv-quad" || p.category === "dune-buggy",
  },
  {
    id: "overnight",
    label: "Overnight",
    matches: (p) => p.category === "overnight",
  },
];

export function isPackageFilterId(value: string | null): value is PackageFilterId {
  return value === "all" || PACKAGE_FILTERS.some((f) => f.id === value);
}

// Homepage package section. Reorder or swap slugs here; no JSX changes needed.
// A group with `filter` renders one category card linking to /packages?category=<filter>.
export type HomepageGroup =
  | { title: string; slugs: string[] }
  | { title: string; filter: Exclude<PackageFilterId, "all">; cardTitle: string };

export const HOMEPAGE_PACKAGE_GROUPS: HomepageGroup[] = [
  {
    title: "Classic Desert Safaris",
    slugs: ["evening-desert-safari", "morning-desert-safari", "buy-1-get-1-free-desert-safari"],
  },
  {
    title: "Private & VIP",
    slugs: ["vip-desert-safari", "vip-private-desert-safari-dubai"],
  },
  {
    title: "Adrenaline",
    filter: "adrenaline",
    cardTitle: "Quad Bikes & Dune Buggies",
  },
];
