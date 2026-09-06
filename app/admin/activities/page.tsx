"use client";

import { useState } from "react";
import { initialActivities } from "@/lib/data/activities";
import { Activity } from "@/types";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=800&auto=format&fit=crop"
  );
  const [highlightsText, setHighlightsText] = useState("Red Dunes, Licensed Marshals");

  const openCreateModal = () => {
    setEditingActivity(null);
    setName("");
    setSlug("");
    setDesc("");
    setImage(
      "https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=800&auto=format&fit=crop"
    );
    setHighlightsText("");
    setIsModalOpen(true);
  };

  const openEditModal = (act: Activity) => {
    setEditingActivity(act);
    setName(act.name);
    setSlug(act.slug);
    setDesc(act.description);
    setImage(act.image);
    setHighlightsText((act.highlights || []).join(", "));
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const highlightsArray = highlightsText
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean);

    if (editingActivity) {
      setActivities((prev) =>
        prev.map((a) =>
          a.id === editingActivity.id
            ? {
                ...a,
                name: name.trim(),
                slug: slug.trim() || editingActivity.slug,
                description: desc.trim(),
                image: image.trim(),
                highlights: highlightsArray,
              }
            : a
        )
      );
    } else {
      const newAct: Activity = {
        id: `act-${Date.now()}`,
        name: name.trim(),
        slug:
          slug.trim() ||
          name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, ""),
        description: desc.trim(),
        image: image.trim(),
        active: true,
        sort_order: activities.length + 1,
        highlights: highlightsArray,
      };
      setActivities((prev) => [newAct, ...prev]);
    }

    setIsModalOpen(false);
  };

  const toggleActive = (id: string) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const handleDelete = (id: string, actName: string) => {
    if (confirm(`Are you sure you want to delete "${actName}"?`)) {
      setActivities((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Desert Activities Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Create and organize desert experiences showcased on the activities page.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Activity</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((act) => (
          <div
            key={act.id}
            className="bg-white dark:bg-[#0F1624] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between transition-colors"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-900">
                <img
                  src={act.image}
                  alt={act.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      act.active ? "bg-emerald-500 text-white" : "bg-slate-500 text-white"
                    }`}
                  >
                    {act.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {act.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                  {act.description}
                </p>

                {act.highlights && act.highlights.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {act.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => toggleActive(act.id)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100"
              >
                {act.active ? "Deactivate" : "Activate"}
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => openEditModal(act)}
                  className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-amber-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Edit Activity"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(act.id, act.name)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                  title="Delete Activity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white dark:bg-[#0F1624] text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSave} className="space-y-4">
              <h2 className="text-xl font-bold">
                {editingActivity ? "Edit Activity" : "Create New Activity"}
              </h2>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Activity Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Desert Sandboarding"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingActivity) {
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)+/g, "")
                      );
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <ImageUpload
                value={image}
                onChange={setImage}
                label="Activity Image (Saved to safari-images)"
                bucket="safari-images"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Brief overview of the activity..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Highlights (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sunset views, Suitable for all ages"
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider"
                >
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
