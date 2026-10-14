import type { Package } from "@/types";
import PackageCard, { toPackageCardData } from "@/components/packages/PackageCard";
import ScrollReveal from "@/components/common/ScrollReveal";
import { HOMEPAGE_GROUP_SIZE, HOMEPAGE_PACKAGE_GROUPS, PACKAGE_FILTERS } from "@/lib/config/packageGroups";

interface FeaturedPackagesProps {
  packages: Package[];
}

// Homepage shows a short, grouped selection; the full catalogue lives on /packages
export default function FeaturedPackages({ packages }: FeaturedPackagesProps) {
  const bySlug = new Map(packages.filter((p) => p.active).map((p) => [p.slug, p]));

  // Flatten the configured groups into one ordered list (no group headings on the page)
  const homepagePackages: Package[] = [];
  const shown = new Set<string>(); // a package appears at most once

  for (const group of HOMEPAGE_PACKAGE_GROUPS) {
    const max = group.max ?? HOMEPAGE_GROUP_SIZE;
    const groupPackages = group.slugs
      .map((slug) => bySlug.get(slug))
      .filter((p): p is Package => Boolean(p) && !shown.has(p!.slug))
      .slice(0, max);
    for (const filterId of group.fill ?? []) {
      const filter = PACKAGE_FILTERS.find((f) => f.id === filterId);
      if (!filter) continue;
      for (const pkg of bySlug.values()) {
        if (groupPackages.length >= max) break;
        if (filter.matches(pkg) && !shown.has(pkg.slug) && !groupPackages.includes(pkg)) {
          groupPackages.push(pkg);
        }
      }
    }
    groupPackages.forEach((p) => shown.add(p.slug));
    homepagePackages.push(...groupPackages);
  }

  return (
    <section className="section-y overflow-hidden bg-page">
      <div className="container-page">
        <ScrollReveal>
          <div className="mb-12 max-w-2xl lg:mb-16">
            <p className="kicker">Curated Safari Experiences</p>
            <h2 className="mt-5 font-display text-h2 font-semibold text-ink">
              Signature Dubai Desert Safaris & Tours
            </h2>
            <p className="mt-5 text-body-lg text-muted">
              Explore our hand-picked collection of red dune bashes, quad bike adventures, and authentic Bedouin camps.
            </p>
          </div>
        </ScrollReveal>

        {/* One continuous grid, in group order: full-width on mobile, two columns on tablet, three on desktop */}
        {homepagePackages.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {homepagePackages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={toPackageCardData(pkg)} priority={i < 3} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
