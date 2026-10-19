"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

interface ThemeToggleProps {
  // "onDark" for the always-navy site header; default follows the page theme (admin)
  variant?: "default" | "onDark";
}

export default function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- avoid a hydration mismatch on the icon
    setMounted(true);
  }, []);

  const shape = "flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200";
  const look =
    variant === "onDark"
      ? "border-white/15 text-sand-50/85 hover:border-amber-300/60 hover:text-amber-300"
      : "border-line bg-surface text-ink hover:border-amber-500";

  if (!mounted) {
    return <div className={`${shape} ${look}`} aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${shape} ${look}`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Light and Dark Mode"
      id="theme-toggle-btn"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
