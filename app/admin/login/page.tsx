"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Compass, Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, KeyRound } from "lucide-react";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Default credentials
  const DEMO_EMAIL = "admin@dubaisafaridesert.com";
  const DEMO_PASSWORD = "Bilaljutt2339@";

  const handleAutofill = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      // Accepts either full email or "admin" username
      const isValidUser =
        cleanEmail === DEMO_EMAIL.toLowerCase() ||
        cleanEmail === "admin";
      const isValidPassword = cleanPassword === DEMO_PASSWORD;

      if (isValidUser && isValidPassword) {
        if (typeof window !== "undefined") {
          localStorage.setItem("admin_auth", "true");
          document.cookie = "admin_auth=true; path=/; max-age=86400";
        }
        router.push("/admin");
      } else {
        setError("Invalid credentials. Please use the credentials shown below.");
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#080B11] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navbar Bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow">
            <Compass className="w-5 h-5 text-amber-100" />
          </div>
          <span className="text-sm font-extrabold text-white">
            Dubai<span className="text-amber-500">Safari</span>Desert
          </span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 mt-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4 shadow-lg">
            <KeyRound className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Admin Management Portal
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Sign in to manage safari packages, bookings, activities, and gallery
          </p>
        </div>

        {/* Credentials Info Box */}
        <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Login Credentials:</span>
              </p>
              <div className="text-xs font-mono space-y-0.5 text-slate-200 pt-1">
                <p>
                  <strong className="text-amber-300">Email:</strong> {DEMO_EMAIL} (or <code className="bg-white/10 px-1 rounded">admin</code>)
                </p>
                <p>
                  <strong className="text-amber-300">Password:</strong> {DEMO_PASSWORD}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAutofill}
              className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-bold uppercase tracking-wider transition-colors shrink-0 shadow"
            >
              Auto-fill
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="mt-6 bg-[#0E1522] py-8 px-6 sm:px-10 rounded-2xl border border-slate-800 shadow-2xl">
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email or Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dubaisafaridesert.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-sm font-extrabold uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? "Signing in..." : "Sign In to Admin Panel"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-amber-400 transition-colors font-medium"
            >
              &larr; Return to Live Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
