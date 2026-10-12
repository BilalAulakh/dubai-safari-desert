import type { CSSProperties, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // stagger in milliseconds, converted to a later start in the scroll range
}

// CSS-only reveal driven by a scroll timeline (see .scroll-reveal in globals.css).
// Content is fully visible by default, so nothing stays hidden while JS loads,
// in browsers without scroll-driven animations, or with reduced motion enabled.
export default function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const style = delay ? ({ "--reveal-offset": `${Math.min(delay / 25, 12)}%` } as CSSProperties) : undefined;

  return (
    <div className={`scroll-reveal ${className}`} style={style}>
      {children}
    </div>
  );
}
