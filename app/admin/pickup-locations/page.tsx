"use client";

import { useState } from "react";
import { initialPickupLocations } from "@/lib/data/pickupLocations";
import { PickupLocation } from "@/types";
import { MapPin, Plus, Trash2 } from "lucide-react";

export default function AdminPickupLocationsPage() {
  const [locations, setLocations] = useState<PickupLocation[]>(initialPickupLocations);
  const [newLocationName, setNewLocationName] = useState("");

  const toggleActive = (id: string) => {
    setLocations((prev) =>
      prev.map((l) => (l.id === id ? { ...l, active: !l.active } : l))
    );
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete zone "${name}"?`)) {
      setLocations((prev) => prev.filter((l) => l.id !== id));
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocationName.trim()) return;
    const newLoc: PickupLocation = {
      id: `loc-${Date.now()}`,
      name: newLocationName.trim(),
      active: true,
      sort_order: locations.length + 1,
    };
    setLocations([...locations, newLoc]);
    setNewLocationName("");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Pickup Locations Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Supported pickup zones in Dubai available in customer booking dropdowns.
        </p>
      </div>

      {/* Add new zone */}
      <form
        onSubmit={handleAdd}
        className="p-4 rounded-2xl bg-white dark:bg-[#0F1624] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-3"
      >
        <input
          type="text"
          placeholder="New pickup zone (e.g. Dubai Creek Harbour, Festival City)..."
          value={newLocationName}
          onChange={(e) => setNewLocationName(e.target.value)}
          className="flex-1 w-full text-xs px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500 text-amber-400 dark:text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Zone</span>
        </button>
      </form>

      {/* List */}
      <div className="bg-white dark:bg-[#0F1624] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/30"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                {loc.name}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-[10px] font-bold uppercase ${
                  loc.active ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"
                }`}
              >
                {loc.active ? "Active" : "Disabled"}
              </span>

              <button
                type="button"
                onClick={() => toggleActive(loc.id)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {loc.active ? "Disable" : "Enable"}
              </button>

              <button
                type="button"
                onClick={() => handleDelete(loc.id, loc.name)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                title="Delete zone"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
