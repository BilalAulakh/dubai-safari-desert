"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, X, ShieldCheck } from "lucide-react";

interface AdminLoginModalProps {
  open: boolean;
  onClose: () => void;
}

// Same server login as /admin/login; the password is checked by /api/admin/login
export default function AdminLoginModal({ open, onClose }: AdminLoginModalProps) {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    usernameRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        setPassword("");
        onClose();
        router.push("/admin");
        router.refresh();
        return;
      }
      setError("Invalid username or password.");
    } catch {
      setError("Could not reach the server. Please try again.");
    }
    setLoading(false);
  };

  const inputClass =
    "w-full rounded-xl border border-[#17120D]/15 bg-white px-4 py-3 text-sm text-[#17120D] placeholder:text-[#5E554C]/60 focus:border-[#C89B3C] focus:outline-none focus:ring-2 focus:ring-[#C89B3C]/30 dark:border-white/15 dark:bg-[#17120D] dark:text-white dark:placeholder:text-white/40";

  // Portal: the header's backdrop-blur would otherwise trap this fixed overlay inside the bar
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0E0A07]/70 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-login-title"
        className="relative w-full max-w-sm rounded-2xl border border-[#C89B3C]/25 bg-[#FBF7F0] p-6 shadow-2xl sm:p-7 dark:bg-[#1D150E]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg p-2 text-[#5E554C] transition-colors hover:bg-[#17120D]/5 hover:text-[#17120D] dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C89B3C]/15 text-[#8C6214] dark:text-[#E8C48A]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 id="admin-login-title" className="font-heading text-lg font-bold text-[#17120D] dark:text-white">
              Admin Login
            </h2>
            <p className="text-xs text-[#5E554C] dark:text-white/60">Team access only</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-username" className="mb-1.5 block text-xs font-semibold text-[#5E554C] dark:text-white/70">
              Username
            </label>
            <input
              ref={usernameRef}
              id="admin-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="mb-1.5 block text-xs font-semibold text-[#5E554C] dark:text-white/70">
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#5E554C] hover:text-[#17120D] dark:text-white/50 dark:hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-60">
            <Lock className="h-4 w-4" />
            <span>{loading ? "Signing in..." : "Sign In"}</span>
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
