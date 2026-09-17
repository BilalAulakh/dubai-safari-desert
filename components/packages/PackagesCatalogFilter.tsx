"use client";

import { useMemo } from "react";
import { Search, ArrowUpDown } from "lucide-react";
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
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [allPackages, searchQuery, selectedDuration, sortBy]);

  return (
    <div className="space-y-10">
      {/* Search & Filter Toolbar */}
      <div className="bg-white dark:bg-[#241A12] p-5 sm:p-7 rounded-2xl border border-[#C89B3C]/20 shadow-md flex flex-col md:flex-row items-center justify-between gap-5 transition-colors duration-200">
        {/* Search Bar */}
        <div className="relative w-full md:w-88">
          <Search className="w-4 h-4 text-[#C89B3C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search safaris, BBQ, camel rides, quad..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#C89B3C]/20 bg-[#FBF7F0]/60 dark:bg-[#17120D]/60 text-[#17120D] dark:text-[#FBF7F0] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] transition-all"
          />
        </div>

        {/* Duration Tags & Sort Dropdown */}
        <div className="w-full md:w-auto flex flex-wrap items-center justify-between md:justify-end gap-3">
          {/* Duration Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {durations.map((dur) => (
              <button
                key={dur}
                onClick={() => dispatch(setSelectedDuration(dur))}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDuration === dur
                    ? "bg-[#C89B3C] text-[#17120D] font-bold shadow-sm"
                    : "bg-[#F2E8D5] dark:bg-[#17120D] text-[#6B6258] dark:text-[#B8ADA2] hover:text-[#17120D] dark:hover:text-white"
                }`}
              >
                {dur === "all" ? "All Durations" : dur}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 ml-auto md:ml-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#C89B3C]" />
            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value as any))}
              className="text-xs font-semibold bg-[#F2E8D5] dark:bg-[#17120D] text-[#17120D] dark:text-[#FBF7F0] border border-[#C89B3C]/20 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#C89B3C] cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Package Results Count */}
      <div className="flex items-center justify-between text-xs text-[#6B6258] dark:text-[#B8ADA2] px-1">
        <span>
          Showing <strong>{filteredPackages.length}</strong> luxury safari tour
          {filteredPackages.length !== 1 ? "s" : ""}
        </span>
        {(searchQuery || selectedDuration !== "all") && (
          <button
            onClick={() => {
              dispatch(setSearchQuery(""));
              dispatch(setSelectedDuration("all"));
            }}
            className="text-[#C89B3C] hover:underline font-semibold"
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
        <div className="text-center py-20 bg-white dark:bg-[#241A12] rounded-3xl border border-[#C89B3C]/20 p-8 shadow-sm">
          <p className="font-heading text-xl font-bold text-[#17120D] dark:text-[#FBF7F0]">
            No safari packages match your current search.
          </p>
          <p className="text-xs text-[#6B6258] dark:text-[#B8ADA2] mt-2">
            Try adjusting your search keywords or resetting duration filters.
          </p>
          <button
            onClick={() => {
              dispatch(setSearchQuery(""));
              dispatch(setSelectedDuration("all"));
            }}
            className="btn-gold mt-6 px-6 py-2.5 text-xs uppercase tracking-wider font-bold"
          >
            Show All Safari Tours
          </button>
        </div>
      )}
    </div>
  );
}
