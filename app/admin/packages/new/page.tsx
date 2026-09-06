"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Package as PackageIcon,
  Check,
  Sparkles,
  Upload,
  AlertCircle,
  Eye,
} from "lucide-react";

export default function CreatePackagePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState<number>(180);
  const [duration, setDuration] = useState("6 - 7 Hours");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [mainImage, setMainImage] = useState(
    "https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=1200&auto=format&fit=crop"
  );
  const [inclusionsText, setInclusionsText] = useState(
    "Hotel Pickup & Drop-off in 4x4 Land Cruiser\n30-40 mins Dune Bashing on Lahbab red sands\nCamel Trekking & Sandboarding\nAuthentic Arabic Welcome with Gahwa & Dates\n5-Star International BBQ Buffet Dinner\nLive Sufi Tanoura & Fire Show Entertainment"
  );
  const [exclusionsText, setExclusionsText] = useState(
    "Quad bike / Dune buggy rental (optional add-on)\nAlcoholic beverages\nSouvenir photography"
  );
  const [featured, setFeatured] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Please enter a package title.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const inclusions = inclusionsText
      .split("\n")
      .map((i) => i.trim())
      .filter(Boolean);
    const exclusions = exclusionsText
      .split("\n")
      .map((e) => e.trim())
      .filter(Boolean);

    const payload = {
      name: name.trim(),
      slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      price: Number(price),
      duration: duration.trim(),
      short_description:
        shortDesc.trim() ||
        `${name.trim()} - Complete adventure with 4x4 dune bashing, camel riding, and 5-star BBQ dinner.`,
      description:
        desc.trim() ||
        `Experience the timeless magic of the Arabian desert with our premier ${name.trim()}. Enjoy luxury 4x4 pickup, adrenaline-fueled dune bashing, traditional Bedouin hospitality, and delicious dining under the desert sky.`,
      main_image: mainImage.trim(),
      inclusions,
      exclusions,
      featured,
      active: true,
    };

    try {
      const res = await fetch("/api/admin/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save package");
      }

      const data = await res.json();

      // Also persist in localStorage so client state sees it across all pages
      if (typeof window !== "undefined") {
        const existing = JSON.parse(
          localStorage.getItem("admin_custom_packages") || "[]"
        );
        localStorage.setItem(
          "admin_custom_packages",
          JSON.stringify([data.package, ...existing])
        );
      }

      setSuccessMessage("Package successfully created and published!");
      setTimeout(() => {
        router.push("/admin/packages");
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Top Breadcrumb Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/packages"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Packages List</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-[#0E1522] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-amber-600 to-amber-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <PackageIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Create New Safari Package
              </h1>
              <p className="text-xs text-amber-100">
                Fill in the details below to add a new tour to DubaiSafariDesert
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {successMessage && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-500" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-sm font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Title & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Package Title *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Royal VIP Desert Safari Experience"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="royal-vip-desert-safari"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-xs"
              />
            </div>
          </div>

          {/* Price & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Price per Person (AED) *
              </label>
              <input
                type="number"
                required
                min={50}
                max={5000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Tour Duration *
              </label>
              <input
                type="text"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 6 - 7 Hours"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Short Description (Card Teaser)
            </label>
            <textarea
              rows={2}
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="Brief 1-2 sentence overview shown on package cards..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Detailed Description
            </label>
            <textarea
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Full tour details, highlights, and itinerary description..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Main Image URL + Preview */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Main Image URL *
            </label>
            <input
              type="url"
              required
              value={mainImage}
              onChange={(e) => setMainImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            {/* Live Preview Thumbnail */}
            {mainImage && (
              <div className="mt-3 relative h-48 w-full max-w-sm rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-sm bg-slate-900">
                <img
                  src={mainImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-bold">
                  Image Preview
                </span>
              </div>
            )}
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Tour Inclusions (One per line)
              </label>
              <textarea
                rows={5}
                value={inclusionsText}
                onChange={(e) => setInclusionsText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Tour Exclusions (One per line)
              </label>
              <textarea
                rows={5}
                value={exclusionsText}
                onChange={(e) => setExclusionsText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Featured checkbox */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
            <input
              type="checkbox"
              id="featured-checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
            />
            <label
              htmlFor="featured-checkbox"
              className="text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Show in "Featured Safari Packages" on Homepage</span>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <Link
              href="/admin/packages"
              className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>
                {loading ? "Publishing..." : "Save & Publish Safari Package"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
