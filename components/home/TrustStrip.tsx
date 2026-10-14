import { Star, ShieldCheck, Users, CalendarCheck, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";

interface TrustStripProps {
  /** Computed from approved Supabase reviews; omitted when there are none */
  rating?: { average: number; count: number } | null;
}

interface TrustItem {
  icon: LucideIcon;
  value: string;
  label: string;
}

// Proof points directly under the hero. Every value is real or hidden:
// rating comes from live reviews, license and guest count only show once filled in config.
export default function TrustStrip({ rating }: TrustStripProps) {
  const { licenseNumber, guestsServed, freeCancellationHours } = SITE_CONFIG.trust;

  const items: TrustItem[] = [
    ...(rating && rating.count > 0
      ? [{
          icon: Star,
          value: `${rating.average.toFixed(1)} / 5`,
          label: `Guest rating from ${rating.count} review${rating.count === 1 ? "" : "s"}`,
        }]
      : []),
    {
      icon: ShieldCheck,
      value: "Licensed operator",
      label: licenseNumber ? `License No. ${licenseNumber}` : "Licensed marshals",
    },
    ...(guestsServed ? [{ icon: Users, value: guestsServed, label: "Guests served" }] : []),
    {
      icon: CalendarCheck,
      value: "Free cancellation",
      label: `Up to ${freeCancellationHours} hours before pickup`,
    },
    { icon: MapPin, value: "Pay on tour day", label: "Free hotel pickup across Dubai" },
  ];

  return (
    <section aria-label="Why guests trust us" className="border-b border-line bg-surface">
      <ul className="container-page grid grid-cols-1 gap-x-8 gap-y-8 py-10 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none lg:py-12">
        {items.map(({ icon: Icon, value, label }) => (
          <li key={value} className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1 ring-line">
              <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-h4 font-semibold text-ink">{value}</span>
              <span className="block text-small text-muted">{label}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
