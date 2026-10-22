"use client";

import { useEffect, useRef } from "react";

interface CountUpProps {
  value: number;
  decimals?: number;
  suffix?: string;
  durationMs?: number;
}

// Both server and client format with en-US so the rendered text matches on hydration
function format(n: number, decimals: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// Renders the final value up front (no flash, no layout shift) and counts up once when
// it first scrolls into view. Reduced-motion users keep the final value.
export default function CountUp({ value, decimals = 0, suffix = "", durationMs = 1600 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const run = () => {
      const start = performance.now();
      el.textContent = format(0, decimals) + suffix;
      const tick = (now: number) => {
        const t = Math.min((now - start) / durationMs, 1);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        el.textContent = format(value * eased, decimals) + suffix;
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect(); // fires once
          run();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, decimals, suffix, durationMs]);

  return (
    <span ref={ref}>
      {format(value, decimals)}
      {suffix}
    </span>
  );
}
