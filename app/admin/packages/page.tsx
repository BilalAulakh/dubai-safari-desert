"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { initialPackages } from "@/lib/data/packages";
import { Package } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Plus, Edit2, Trash2, Eye, X, Check, Sparkles } from "lucide-react";

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  // Sync custom packages from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_custom_packages");
      if (stored) {
        const custom: Package[] = JSON.parse(stored);
        if (custom.length > 0) {
          setPackages([...custom, ...initialPackages]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Form fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState<number>(150);
  const [duration, setDuration] = useState("6 - 7 Hours");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [mainImage, setMainImage] = useState(
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
  );
  const [inclusionsText, setInclusionsText] = useState(
    "Hotel Pickup & Drop-off in 4x4 Land Cruiser\n30-40 mins dune bashing\nCamel ride & Sandboarding\nBBQ Dinner buffet with live shows"
  );
  const [exclusionsText, setExclusionsText] = useState(
    "Alcoholic beverages\nQuad bike rental"
  );
  const [featured, setFeatured] = useState(false);

  const openCreateModal = () => {
    setEditingPackage(null);
    setName("");
    setSlug("");
    setPrice(150);
    setDuration("6 - 7 Hours");
    setShortDesc("");
    setDesc("");
    setMainImage(
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
    );
    setInclusionsText(
      "Hotel Pickup & Drop-off in 4x4 Land Cruiser\n30-40 mins dune bashing\nCamel ride & Sandboarding\nBBQ Dinner buffet with live shows"
    );
    setExclusionsText("Alcoholic beverages\nQuad bike rental");
    setFeatured(false);
    setIsModalOpen(true);
  };

  const openEditModal = (pkg: Package) => {
    setEditingPackage(pkg);
    setName(pkg.name);
    setSlug(pkg.slug);
    setPrice(pkg.price);
    setDuration(pkg.duration);
    setShortDesc(pkg.short_description);
    setDesc(pkg.description);
    setMainImage(pkg.main_image);
    setInclusionsText(pkg.inclusions.join("\n"));
    setExclusionsText(pkg.exclusions.join("\n"));
    setFeatured(pkg.featured);
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingPackage) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const inclusionsArray = inclusionsText
      .split("\n")
      .map((i) => i.trim())
      .filter(Boolean);
    const exclusionsArray = exclusionsText
      .split("\n")
      .map((i) => i.trim())
      .filter(Boolean);

    if (editingPackage) {
      // Update existing
      setPackages((prev) =>
        prev.map((p) =>
          p.id === editingPackage.id
            ? {
                ...p,
                name: name.trim(),
                slug: slug.trim() || editingPackage.slug,
                price: Number(price),
                duration: duration.trim(),
                short_description: shortDesc.trim(),
                description: desc.trim(),
                main_image: mainImage.trim(),
                inclusions: inclusionsArray,
                exclusions: exclusionsArray,
                featured,
              }
            : p
        )
      );
    } else {
      // Add new
      const newPkg: Package = {
        id: `pkg-${Date.now()}`,
        name: name.trim(),
        slug:
          slug.trim() ||
          name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, ""),
        short_description:
          shortDesc.trim() ||
          "Exciting Dubai desert safari experience with hotel pickup and Arabian hospitality.",
        description:
          desc.trim() ||
          "Experience the best of the Dubai dunes with professional licensed safari drivers and authentic desert camp amenities.",
        price: Number(price),
        duration: duration.trim() || "6 Hours",
        featured,
        active: true,
        main_image: mainImage.trim(),
        gallery: [
          mainImage.trim(),
          "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1000&auto=format&fit=crop",
        ],
        inclusions:
          inclusionsArray.length > 0
            ? inclusionsArray
            : ["4x4 Dune Bashing", "Camel Ride", "BBQ Buffet"],
        exclusions: exclusionsArray,
        itinerary: [
          {
            time: "02:30 PM",
            title: "Hotel Pickup",
            description: "Pickup from your hotel in a luxury 4x4.",
            sort_order: 1,
          },
          {
            time: "04:00 PM",
            title: "Dune Bashing",
            description: "Exciting drive on high red dunes.",
            sort_order: 2,
          },
          {
            time: "06:00 PM",
            title: "Camp Entertainment & Dinner",
            description: "BBQ dinner buffet and live stage performances.",
            sort_order: 3,
          },
        ],
        pickup_info: "Pickups available across Dubai hotels and apartments.",
        cancellation_policy: "Free cancellation up to 24 hours prior to departure.",
      };

      setPackages((prev) => [newPkg, ...prev]);
    }

    setIsModalOpen(false);
  };

  const toggleActive = (id: string) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  const toggleFeatured = (id: string) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const handleDelete = (id: string, pkgName: string) => {
    if (confirm(`Are you sure you want to delete the package "${pkgName}"?`)) {
      setPackages((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Safari Packages Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Create new safari tours, update prices, manage descriptions, and toggle bestsellers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/packages/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-105 active:scale-95"
            id="btn-add-new-package"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create New Package</span>
          </Link>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <span>Quick Popup</span>
          </button>
        </div>
      </div>

      {/* Grid of Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white dark:bg-[#0F1624] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between transition-colors"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-900">
                <img
                  src={pkg.main_image}
                  alt={pkg.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      pkg.active
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-500 text-white"
                    }`}
                  >
                    {pkg.active ? "Active" : "Inactive"}
                  </span>
                  {pkg.featured && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                      Bestseller
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {pkg.short_description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">
                    Duration: {pkg.duration}
                  </span>
                  <span className="font-bold text-amber-700 dark:text-amber-400 text-sm">
                    {formatPrice(pkg.price)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
              <button
                type="button"
                onClick={() => toggleActive(pkg.id)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100"
              >
                {pkg.active ? "Deactivate" : "Activate"}
              </button>

              <button
                type="button"
                onClick={() => openEditModal(pkg)}
                className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Edit Package"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleDelete(pkg.id, pkg.name)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"
                title="Delete Package"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <Link
                href={`/packages/${pkg.slug}`}
                target="_blank"
                className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                title="Preview public page"
              >
                <Eye className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Package Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white dark:bg-[#0F1624] text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSave} className="space-y-4">
              <h2 className="text-xl font-bold">
                {editingPackage ? "Edit Safari Package" : "Create New Safari Package"}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Package Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunset Luxury Desert Safari"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    URL Slug (lowercase-with-hyphens) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="sunset-luxury-desert-safari"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Starting Price (AED) *
                  </label>
                  <input
                    type="number"
                    required
                    min="10"
                    max="10000"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tour Duration *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 6 - 7 Hours"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Main Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={mainImage}
                  onChange={(e) => setMainImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Short Description (Card preview)
                </label>
                <textarea
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="A concise 1-2 sentence highlight of the safari experience..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Detailed Description
                </label>
                <textarea
                  rows={4}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Complete tour details and experience summary..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Included Highlights (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={inclusionsText}
                    onChange={(e) => setInclusionsText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Exclusions (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={exclusionsText}
                    onChange={(e) => setExclusionsText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                />
                <label
                  htmlFor="featured-checkbox"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Feature this tour as a Bestseller on the Homepage
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow hover:from-amber-400 hover:to-amber-500"
                >
                  {editingPackage ? "Save Changes" : "Create Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
