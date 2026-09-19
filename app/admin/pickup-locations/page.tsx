"use client";

import { useState, useEffect } from "react";
import { PickupLocation } from "@/types";
import {
  MapPin,
  Plus,
  Trash2,
  ExternalLink,
  Link2,
  RotateCw,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

export default function AdminPickupLocationsPage() {
  const [locations, setLocations] = useState<PickupLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const [newLocationName, setNewLocationName] = useState("");
  const [newMapUrl, setNewMapUrl] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const fetchLocations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/pickup-locations", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.locations)) {
        setLocations(data.locations);
      }
    } catch (err) {
      console.error("Failed to load pickup locations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const toggleActive = async (id: string, currentActive: boolean) => {
    setActionId(id);
    const newActive = !currentActive;

    // Optimistic UI update
    setLocations((prev) =>
      prev.map((l) => (l.id === id ? { ...l, active: newActive } : l))
    );

    try {
      await fetch("/api/admin/pickup-locations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, active: newActive }),
      });
    } catch (err) {
      console.error("Failed to toggle location status:", err);
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = (id: string, name: string) => {
    setDeleteTarget({ id, name });
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setActionId(deleteTarget.id);
    try {
      const res = await fetch(`/api/admin/pickup-locations?id=${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        const deletedId = deleteTarget.id;
        setLocations((prev) => prev.filter((l) => l.id !== deletedId));
      } else {
        alert(data.message || "Failed to delete location.");
      }
    } catch (err) {
      console.error("Failed to delete location:", err);
      alert("An error occurred while deleting the location.");
    } finally {
      setActionId(null);
      setDeleteTarget(null);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocationName.trim()) return;

    setIsSubmitting(true);
    setFeedbackMsg(null);

    try {
      const res = await fetch("/api/admin/pickup-locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newLocationName.trim(),
          map_url: newMapUrl.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.success && data.location) {
        setLocations((prev) => [...prev, data.location]);
        setNewLocationName("");
        setNewMapUrl("");
        setFeedbackMsg("Location added successfully!");
        setTimeout(() => setFeedbackMsg(null), 3000);
      } else {
        alert(data.message || "Failed to add location.");
      }
    } catch (err) {
      console.error("Failed to add location:", err);
      alert("An error occurred while adding the location.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Pickup Locations Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Supported pickup zones in Dubai available in customer booking dropdowns with optional map links.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchLocations}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm disabled:opacity-50 cursor-pointer self-start sm:self-auto"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Add New Zone Form */}
      <form
        onSubmit={handleAdd}
        className="p-5 rounded-2xl bg-white dark:bg-[#0F1624] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
      >
        <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-amber-500" />
          <span>Add New Pickup Location</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Location / Zone Name *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="e.g. Dubai Creek Harbour (Festival City)"
                value={newLocationName}
                onChange={(e) => setNewLocationName(e.target.value)}
                required
                className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Google Maps URL / Location Link (Optional)
            </label>
            <div className="relative">
              <Link2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="url"
                placeholder="e.g. https://maps.app.goo.gl/... or https://maps.google.com/..."
                value={newMapUrl}
                onChange={(e) => setNewMapUrl(e.target.value)}
                className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          {feedbackMsg ? (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>{feedbackMsg}</span>
            </span>
          ) : (
            <span className="text-[11px] text-slate-400">
              Entering a Google Maps URL allows drivers and customers to view the exact pin.
            </span>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !newLocationName.trim()}
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500 text-amber-400 dark:text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors disabled:opacity-50 cursor-pointer shrink-0"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
            <span>Add Location</span>
          </button>
        </div>
      </form>

      {/* Locations List */}
      <div className="bg-white dark:bg-[#0F1624] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-400 flex items-center justify-center gap-2 text-xs">
            <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
            <span>Loading pickup locations...</span>
          </div>
        ) : locations.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No pickup locations found. Add your first location above.
          </div>
        ) : (
          locations.map((loc) => (
            <div
              key={loc.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>

                <div className="min-w-0 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
                  <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {loc.name}
                  </span>

                  {loc.map_url && (
                    <a
                      href={loc.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[10px] font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors shrink-0 w-fit"
                      title="Open in Google Maps"
                    >
                      <ExternalLink className="w-2.5 h-2.5" />
                      <span>View Map URL</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    loc.active
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {loc.active ? "Active" : "Disabled"}
                </span>

                <button
                  type="button"
                  onClick={() => toggleActive(loc.id, loc.active)}
                  disabled={actionId === loc.id}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {loc.active ? "Disable" : "Enable"}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(loc.id, loc.name)}
                  disabled={actionId === loc.id}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  title="Delete zone"
                  aria-label={`Delete zone ${loc.name}`}
                >
                  {actionId === loc.id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-500" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Popup Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Pickup Location"
        itemName={deleteTarget?.name}
        isLoading={!!actionId}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
