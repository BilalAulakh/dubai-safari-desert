"use client";

import { useState } from "react";
import { initialGalleryItems } from "@/lib/data/gallery";
import { GalleryItem } from "@/types";
import { Plus, Trash2, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(initialGalleryItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
  );
  const [category, setCategory] = useState<GalleryItem["category"]>("desert");

  const toggleActive = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
    );
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((item) => item.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: title.trim(),
      image_url: imageUrl.trim(),
      category,
      active: true,
      sort_order: items.length + 1,
    };

    setItems([newItem, ...items]);
    setTitle("");
    setIsModalOpen(false);
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

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Photo</span>
        </button>
      </div>

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
                  {item.category}
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
                  onClick={() => toggleActive(item.id)}
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

      {/* Add Photo Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white dark:bg-[#0F1624] text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative">
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
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as GalleryItem["category"])
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="desert">Desert Landscapes</option>
                  <option value="dune-bashing">Dune Bashing</option>
                  <option value="camp">Bedouin Camp</option>
                  <option value="food">BBQ & Dining</option>
                  <option value="entertainment">Live Shows</option>
                  <option value="activities">Activities</option>
                </select>
              </div>

              <ImageUpload
                value={imageUrl}
                onChange={setImageUrl}
                label="Gallery Photo (Saved to safari-images)"
                bucket="safari-images"
              />

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
                  Add Photo
                </button>
              </div>
            </form>
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
