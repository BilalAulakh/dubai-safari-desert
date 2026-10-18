import { cache } from "react";
import { getPackages } from "./store";
import { formatPrice } from "@/lib/utils";

// Single source of truth for site-wide "from AED X" claims. Derived from the
// active packages in Supabase so marketing copy can never drift from real prices.
// Never hardcode a starting price anywhere else; call these instead.

export const getPriceRange = cache(async (): Promise<{ min: number; max: number } | null> => {
  const prices = (await getPackages())
    .map((p) => Number(p.price))
    .filter((n) => Number.isFinite(n) && n > 0);
  if (prices.length === 0) return null;
  return { min: Math.min(...prices), max: Math.max(...prices) };
});

export async function getStartingPrice(): Promise<number | null> {
  return (await getPriceRange())?.min ?? null;
}

// JSON-LD priceRange, e.g. "AED 89 - AED 1,499"
export async function getPriceRangeLabel(): Promise<string | undefined> {
  const range = await getPriceRange();
  return range ? `${formatPrice(range.min)} - ${formatPrice(range.max)}` : undefined;
}

// Dev-only guard: warn loudly if a component is about to render a starting
// price that doesn't match the cheapest active package.
export async function warnIfStartingPriceDrifts(rendered: number | null, where: string) {
  if (process.env.NODE_ENV !== "development") return;
  const derived = await getStartingPrice();
  if (rendered !== derived) {
    console.warn(
      `[pricing] ${where} renders a starting price of ${rendered ?? "none"}, but the cheapest active package is ${derived ?? "none"}. Use getStartingPrice() instead of a hardcoded value.`
    );
  }
}
