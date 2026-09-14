"use client";

import { useMemo } from "react";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Package } from "@/types";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  setSearchQuery,
  setSelectedDuration,
  setSortBy,
} from "@/lib/redux/slices/packagesSlice";
import PackageCard from "./PackageCard";

interface PackagesCatalogFilterProps {
  initialPackages: Package[];
}

export default function PackagesCatalogFilter({
  initialPackages,
}: PackagesCatalogFilterProps) {
  const dispatch = useAppDispatch();
  const { searchQuery, selectedDuration, sortBy, items } = useAppSelector(
    (state) => state.packages
  );

  // Use either store packages if hydrated or initialPackages
  const allPackages = items.length > 0 ? items : initialPackages;

  // Compute available duration tags
  const durations = useMemo(() => {
    const list = new Set(allPackages.map((p) => p.duration));
    return ["all", ...Array.from(list)];
  }, [allPackages]);

  // Filter & Sort
  const filteredPackages = useMemo(() => {
    return allPackages
      .filter((pkg) => {
        if (!pkg.active) return false;

        const matchesSearch =
          searchQuery.trim() === "" ||
          pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.inclusions.some((inc) =>
            inc.toLowerCase().includes(searchQuery.toLowerCase())
          );

        const matchesDuration =
          selectedDuration === "all" || pkg.duration === selectedDuration;

        return matchesSearch && matchesDuration;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        // Default "featured"
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [allPackages, searchQuery, selectedDuration, sortBy]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Toolbar */}
      <div className="bg-white dark:bg-[#0F1624] p-4 sm:p-6 rounded-2xl border border-amber-900/10 dark:border-white/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search tours, BBQ, camel rides..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
          />
        </div>

        {/* Duration Tags & Sort Dropdown */}
        <div className="w-full md:w-auto flex flex-wrap items-center justify-between md:justify-end gap-3">
          {/* Duration Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {durations.map((dur) => (
              <button
                key={dur}
                onClick={() => dispatch(setSelectedDuration(dur))}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDuration === dur
                    ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {dur === "all" ? "All Durations" : dur}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 ml-auto md:ml-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value as any))}
              className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Package Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>
          Showing <strong>{filteredPackages.length}</strong> safari adventure
          {filteredPackages.length !== 1 ? "s" : ""}
        </span>
        {(searchQuery || selectedDuration !== "all") && (
          <button
            onClick={() => {
              dispatch(setSearchQuery(""));
              dispatch(setSelectedDuration("all"));
            }}
            className="text-amber-600 dark:text-amber-400 hover:underline font-semibold"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Package Cards Grid */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-[#0F1624] rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <p className="text-base font-bold text-slate-800 dark:text-white">
            No safari packages found matching your criteria.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search query or selecting "All Durations".
          </p>
          <button
            onClick={() => {
              dispatch(setSearchQuery(""));
              dispatch(setSelectedDuration("all"));
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider"
          >
            Show All Packages
          </button>
        </div>
      )}
    </div>
  );
}
