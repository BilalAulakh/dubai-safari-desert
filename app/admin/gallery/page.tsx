"use client";

import { useEffect, useState } from "react";
import { GalleryCategory, GalleryItem } from "@/types";
import { defaultGalleryCategories } from "@/lib/data/gallery";
import { Plus, Trash2, X, Loader2, Download, Tags } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop";

async function callApi(path: string, method: string, body?: unknown, query = "") {
  const res = await fetch(`/api/admin/${path}${query}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

const errorText = (err: unknown, fallback: string) =>
  err instanceof Error ? err.message : fallback;

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [categoriesReady, setCategoriesReady] = useState(true);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE);
  const [category, setCategory] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryLabel, setNewCategoryLabel] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const categoryLabel = (slug: string) =>
    categories.find((c) => c.slug === slug)?.label || slug;

  const loadCategories = async () => {
    try {
      const data = await callApi("gallery-categories", "GET");
      const list: GalleryCategory[] = data.categories || [];
      setCategories(list.length > 0 ? list : defaultGalleryCategories);
      setCategoriesReady(true);
    } catch {
      // Table not created yet: keep the built-in list so photos can still be added
      setCategories(defaultGalleryCategories);
      setCategoriesReady(false);
    }
  };

  const loadItems = async () => {
    try {
      const data = await callApi("gallery", "GET");
      setItems(data.items || []);
      setError("");
    } catch (err) {
      setError(errorText(err, "Failed to load gallery"));
    }
  };

  useEffect(() => {
    Promise.all([loadItems(), loadCategories()]).finally(() => setLoading(false));
  }, []);

  const openAddModal = () => {
    setTitle("");
    setImageUrl(DEFAULT_IMAGE);
    setCategory(categories[0]?.slug || "");
    setShowNewCategory(false);
    setNewCategoryLabel("");
    setCategoryError("");
    setError("");
    setIsModalOpen(true);
  };

  const addCategory = async (): Promise<GalleryCategory | null> => {
    const label = newCategoryLabel.trim();
    if (!label) return null;
    setCategoryError("");
    try {
      const nextOrder = categories.reduce((max, c) => Math.max(max, c.sort_order), 0) + 1;
      const { category: created } = await callApi("gallery-categories", "POST", {
        label,
        sort_order: nextOrder,
      });
      setCategories((prev) => [...prev, created]);
      setNewCategoryLabel("");
      return created;
    } catch (err) {
      setCategoryError(errorText(err, "Failed to add category"));
      return null;
    }
  };

  const handleInlineAddCategory = async () => {
    const created = await addCategory();
    if (created) {
      setCategory(created.slug);
      setShowNewCategory(false);
    }
  };

  const handleDeleteCategory = async (cat: GalleryCategory) => {
    if (!window.confirm(`Delete category "${cat.label}"?`)) return;
    setCategoryError("");
    try {
      await callApi("gallery-categories", "DELETE", undefined, `?id=${encodeURIComponent(cat.id)}`);
      setCategories((prev) => prev.filter((c) => c.id !== cat.id));
    } catch (err) {
      setCategoryError(errorText(err, "Failed to delete category"));
    }
  };

  const toggleActive = async (item: GalleryItem) => {
    setError("");
    try {
      const { item: updated } = await callApi("gallery", "PATCH", {
        id: item.id,
        active: !item.active,
      });
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    } catch (err) {
      setError(errorText(err, "Failed to update photo"));
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);
    setError("");
    try {
      await callApi("gallery", "DELETE", undefined, `?id=${encodeURIComponent(target.id)}`);
      setItems((prev) => prev.filter((i) => i.id !== target.id));
    } catch (err) {
      setError(errorText(err, "Failed to delete photo"));
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim() || !category || busy) return;

    setBusy(true);
    setError("");
    try {
      const nextOrder = items.reduce((max, i) => Math.max(max, i.sort_order), 0) + 1;
      const { item } = await callApi("gallery", "POST", {
        title: title.trim(),
        image_url: imageUrl.trim(),
        category,
        active: true,
        sort_order: nextOrder,
      });
      setItems((prev) => [...prev, item]);
      setIsModalOpen(false);
    } catch (err) {
      setError(errorText(err, "Failed to add photo"));
    } finally {
      setBusy(false);
    }
  };

  const handleImportDefaults = async () => {
    setBusy(true);
    setError("");
    try {
      await callApi("gallery", "POST", { action: "import-defaults" });
      await loadItems();
    } catch (err) {
      setError(errorText(err, "Failed to import photos"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Photo Gallery Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Upload and organize desert photos, category classifications, and visibility.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setCategoryError("");
              setNewCategoryLabel("");
              setIsCategoryModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            <Tags className="w-4 h-4 text-amber-500" />
            <span>Manage Categories</span>
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Photo</span>
          </button>
        </div>
      </div>

      {!categoriesReady && (
        <div className="px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs font-semibold text-amber-800 dark:text-amber-300">
          Custom categories are not enabled yet. Run <code>supabase/gallery_categories.sql</code> in
          the Supabase SQL Editor once to add your own categories.
        </div>
      )}

      {error && !isModalOpen && (
        <div className="px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-700 dark:text-rose-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-20 text-sm text-slate-500 dark:text-slate-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading gallery from Supabase...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 px-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0F1624]">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No photos in Supabase yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
            The website is currently showing the built-in default photos. Import them to manage
            them here, or add your own. Once Supabase has at least one photo, the website shows
            only Supabase photos.
          </p>
          <button
            type="button"
            onClick={handleImportDefaults}
            disabled={busy}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs uppercase tracking-wider disabled:opacity-60"
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>Import Default Photos</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#0F1624] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-900">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-[10px] font-semibold text-amber-300 uppercase">
                    {categoryLabel(item.category)}
                  </span>
                </div>

                <div className="p-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {item.title}
                  </h4>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span
                  className={`text-[10px] font-bold uppercase ${
                    item.active ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  {item.active ? "Visible" : "Hidden"}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => toggleActive(item)}
                    className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 text-[11px]"
                  >
                    {item.active ? "Hide" : "Show"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteTarget(item)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Photo Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white dark:bg-[#0F1624] text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 max-w-md w-full max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain border border-slate-200 dark:border-slate-800 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleAdd} className="space-y-4">
              <h2 className="text-xl font-bold">Add Photo to Gallery</h2>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Photo Title / Caption *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunset Dunes Panorama"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Category *
                  </label>
                  {categoriesReady && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewCategory((v) => !v);
                        setCategoryError("");
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:text-amber-500"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{showNewCategory ? "Cancel" : "New Category"}</span>
                    </button>
                  )}
                </div>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.label}
                    </option>
                  ))}
                </select>

                {showNewCategory && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      autoFocus
                      placeholder="e.g. Hot Air Balloon"
                      value={newCategoryLabel}
                      onChange={(e) => setNewCategoryLabel(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleInlineAddCategory();
                        }
                      }}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={handleInlineAddCategory}
                      className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold"
                    >
                      Add
                    </button>
                  </div>
                )}
                {categoryError && (
                  <p className="mt-1.5 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                    {categoryError}
                  </p>
                )}
              </div>

              <ImageUpload
                value={imageUrl}
                onChange={setImageUrl}
                label="Gallery Photo (Saved to safari-images)"
                bucket="safari-images"
              />

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
                  <span>{busy ? "Saving..." : "Add Photo"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manage Categories Modal */}
      {isCategoryModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white dark:bg-[#0F1624] text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 max-w-md w-full max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain border border-slate-200 dark:border-slate-800 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsCategoryModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold">Gallery Categories</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              These appear as filter tabs on the website gallery.
            </p>

            {!categoriesReady ? (
              <p className="mt-5 text-xs font-semibold text-amber-700 dark:text-amber-300">
                Run <code>supabase/gallery_categories.sql</code> in the Supabase SQL Editor first,
                then reload this page.
              </p>
            ) : (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addCategory();
                  }}
                  className="mt-5 flex gap-2"
                >
                  <input
                    type="text"
                    placeholder="New category name"
                    value={newCategoryLabel}
                    onChange={(e) => setNewCategoryLabel(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-bold uppercase tracking-wider"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </form>

                {categoryError && (
                  <p className="mt-2 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                    {categoryError}
                  </p>
                )}

                <ul className="mt-4 divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                  {categories.map((cat) => {
                    const count = items.filter((i) => i.category === cat.slug).length;
                    return (
                      <li key={cat.id} className="flex items-center justify-between px-4 py-2.5">
                        <div>
                          <p className="text-xs font-bold">{cat.label}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            {count} photo{count === 1 ? "" : "s"}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(cat)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Photo"
        itemName={deleteTarget?.title}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
