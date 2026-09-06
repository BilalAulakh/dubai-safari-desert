"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
        isDark
          ? "bg-slate-800/80 border-slate-700 text-amber-400 hover:bg-slate-700"
          : "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100 shadow-sm"
      }`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Light and Dark Mode"
      id="theme-toggle-btn"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 rotate-0 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-amber-800 -rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}
