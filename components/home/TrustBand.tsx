import { BadgeCheck, Car, Clock, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import CountUp from "@/components/common/CountUp";

// Placeholders show only in development, so a TODO never reaches a visitor
const isDev = process.env.NODE_ENV !== "production";

interface Stat {
  key: string;
  label: string;
  value: number | null;
  decimals?: number;
  note?: string;
  logo?: { name: string; src: string | null };
}

function formatCount(n: number) {
  return n.toLocaleString("en-US");
}

export default function TrustBand() {
  const { trust } = SITE_CONFIG;

  const stats: Stat[] = [
    {
      key: "google",
      label: "Google rating",
      value: trust.googleRating,
      decimals: 1,
      note:
        trust.googleReviewCount !== null
          ? `${formatCount(trust.googleReviewCount)} Google reviews`
          : isDev
            ? "TODO: Google review count"
            : undefined,
      logo: { name: "Google", src: trust.logos.google },
    },
    {
      key: "tripadvisor",
      label: "TripAdvisor reviews",
      value: trust.tripadvisorReviewCount,
      logo: { name: "TripAdvisor", src: trust.logos.tripadvisor },
    },
    { key: "guests", label: "Guests served", value: trust.guestsServed },
    { key: "years", label: "Years operating", value: trust.yearsOperating },
  ];

  const visibleStats = isDev ? stats : stats.filter((s) => s.value !== null);

  const credentials = [
    ...(trust.licenseNumber || isDev
      ? [
          {
            icon: BadgeCheck,
            text: trust.licenseNumber ? `DTCM / DED licence ${trust.licenseNumber}` : "TODO: DTCM / DED licence number",
          },
        ]
      : []),
    { icon: MapPin, text: "Lahbab red dunes" },
    { icon: Car, text: "Own 4x4 Land Cruiser fleet" },
    { icon: Clock, text: `Free cancellation up to ${trust.freeCancellationHours}h` },
  ];

  return (
    <section aria-label="Why guests book with us" className="relative border-y border-white/10 bg-dune-900">
      <div className="container-page py-12 sm:py-14">
        {visibleStats.length > 0 && (
          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {visibleStats.map((s) => (
              <li key={s.key} className="text-center">
                <p className="font-display text-4xl font-semibold leading-none tabular-nums lining-nums text-accent-500 sm:text-5xl">
                  {s.value === null ? (
                    "TODO"
                  ) : (
                    <CountUp value={s.value} decimals={s.decimals ?? 0} />
                  )}
                </p>
                <p className="mt-3 text-small font-semibold text-sand-50">{s.label}</p>
                {s.note && <p className="mt-1 text-small text-sand-400">{s.note}</p>}
                {s.logo && (
                  <div className="mt-3 flex h-6 items-center justify-center">
                    {s.logo.src ? (
                      <img src={s.logo.src} alt={`${s.logo.name} logo`} className="h-6 w-auto" />
                    ) : (
                      isDev && <span className="text-[11px] text-sand-400">TODO: {s.logo.name} logo</span>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <ul
          className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-3 ${
            visibleStats.length > 0 ? "mt-10 border-t border-white/10 pt-8" : ""
          }`}
        >
          {credentials.map((c) => (
            <li key={c.text} className="inline-flex items-center gap-2 text-small font-medium text-sand-100">
              <c.icon className="h-4 w-4 text-accent-500" aria-hidden="true" />
              <span>{c.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
