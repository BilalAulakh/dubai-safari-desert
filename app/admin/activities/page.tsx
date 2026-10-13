"use client";

import { useEffect, useState } from "react";
import { Activity } from "@/types";
import { Plus, Edit2, Trash2, X, Loader2, Download } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=800&auto=format&fit=crop";

async function callApi(method: string, body?: unknown, query = "") {
  const res = await fetch(`/api/admin/activities${query}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(DEFAULT_IMAGE);
  const [highlightsText, setHighlightsText] = useState("");

  const loadActivities = async () => {
    try {
      const data = await callApi("GET");
      setActivities(data.activities || []);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const openCreateModal = () => {
    setEditingActivity(null);
    setName("");
    setSlug("");
    setDesc("");
    setImage(DEFAULT_IMAGE);
    setHighlightsText("");
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (act: Activity) => {
    setEditingActivity(act);
    setName(act.name);
    setSlug(act.slug);
    setDesc(act.description);
    setImage(act.image);
    setHighlightsText((act.highlights || []).join(", "));
    setError("");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || busy) return;

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      description: desc.trim(),
      image: image.trim(),
      highlights: highlightsText
        .split(",")
        .map((h) => h.trim())
        .filter(Boolean),
    };

    setBusy(true);
    setError("");
    try {
      if (editingActivity) {
        const { activity } = await callApi("PATCH", { id: editingActivity.id, ...payload });
        setActivities((prev) => prev.map((a) => (a.id === activity.id ? activity : a)));
      } else {
        const nextOrder = activities.reduce((max, a) => Math.max(max, a.sort_order), 0) + 1;
        const { activity } = await callApi("POST", { ...payload, active: true, sort_order: nextOrder });
        setActivities((prev) => [...prev, activity]);
      }
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save activity");
    } finally {
      setBusy(false);
    }
  };

  const toggleActive = async (act: Activity) => {
    setError("");
    try {
      const { activity } = await callApi("PATCH", { id: act.id, active: !act.active });
      setActivities((prev) => prev.map((a) => (a.id === activity.id ? activity : a)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update activity");
    }
  };

  const handleDelete = (id: string, actName: string) => {
    setDeleteTarget({ id, name: actName });
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);
    setError("");
    try {
      await callApi("DELETE", undefined, `?id=${encodeURIComponent(target.id)}`);
      setActivities((prev) => prev.filter((a) => a.id !== target.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete activity");
    }
  };

  const handleImportDefaults = async () => {
    setBusy(true);
    setError("");
    try {
      await callApi("POST", { action: "import-defaults" });
      await loadActivities();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to import activities");
    } finally {
      setBusy(false);
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

      {error && !isModalOpen && (
        <div className="px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-700 dark:text-rose-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-20 text-sm text-slate-500 dark:text-slate-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading activities from Supabase...</span>
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center py-16 px-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0F1624]">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No activities in Supabase yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
            The website is currently showing the built-in default activities. Import them to
            manage them here, or add your own. Once Supabase has at least one activity, the
            website shows only Supabase activities.
          </p>
          <button
            type="button"
            onClick={handleImportDefaults}
            disabled={busy}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs uppercase tracking-wider disabled:opacity-60"
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>Import Default Activities</span>
          </button>
        </div>
      ) : (
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
                onClick={() => toggleActive(act)}
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
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white dark:bg-[#0F1624] text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain border border-slate-200 dark:border-slate-800 shadow-2xl relative">
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

              {error && (
                <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">{error}</p>
              )}

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
                  disabled={busy}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider disabled:opacity-60"
                >
                  {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{busy ? "Saving..." : "Save Activity"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Desert Activity"
        itemName={deleteTarget?.name}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
