"use client";

import { useMemo, useState } from "react";
import { Search, ArrowUpDown, Compass, Flame, ShieldAlert } from "lucide-react";
import { Package, PackageCategory } from "@/types";
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

type FilterCategory = "all" | PackageCategory;

interface CategoryTab {
  id: FilterCategory;
  label: string;
  icon: string;
}

const CATEGORY_TABS: CategoryTab[] = [
  { id: "all", label: "All Tours", icon: "✨" },
  { id: "desert-safari", label: "Desert Safari", icon: "🐪" },
  { id: "atv-quad", label: "ATV Quad Bikes", icon: "🏍️" },
  { id: "dune-buggy", label: "Dune Buggies", icon: "🏎️" },
  { id: "overnight", label: "Overnight Camping", icon: "🏕️" },
  { id: "special-offer", label: "Deals & BOGO", icon: "🎁" },
];

export default function PackagesCatalogFilter({
  initialPackages,
}: PackagesCatalogFilterProps) {
  const dispatch = useAppDispatch();
  const { searchQuery, selectedDuration, sortBy, items } = useAppSelector(
    (state) => state.packages
  );

  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("all");

  // Use either store packages if hydrated or initialPackages
  const allPackages = items.length > 0 ? items : initialPackages;

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<FilterCategory, number> = {
      all: allPackages.filter((p) => p.active).length,
      "desert-safari": 0,
      "atv-quad": 0,
      "dune-buggy": 0,
      overnight: 0,
      "special-offer": 0,
    };

    allPackages.forEach((pkg) => {
      if (!pkg.active) return;
      if (pkg.category && counts[pkg.category] !== undefined) {
        counts[pkg.category]++;
      }
      // Also tag special offers if discounted
      if (pkg.category === "special-offer" || (pkg.badges && pkg.badges.some((b) => b.includes("Free")))) {
        if (pkg.category !== "special-offer") counts["special-offer"]++;
      }
    });

    return counts;
  }, [allPackages]);

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

        // Category filter
        if (selectedCategory !== "all") {
          if (selectedCategory === "special-offer") {
            const isOffer =
              pkg.category === "special-offer" ||
              (pkg.badges && pkg.badges.some((b) => b.toLowerCase().includes("free")));
            if (!isOffer) return false;
          } else if (pkg.category !== selectedCategory) {
            return false;
          }
        }

        // Search filter
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          query === "" ||
          pkg.name.toLowerCase().includes(query) ||
          pkg.short_description.toLowerCase().includes(query) ||
          (pkg.badges && pkg.badges.some((b) => b.toLowerCase().includes(query))) ||
          pkg.inclusions.some((inc) => inc.toLowerCase().includes(query));

        // Duration filter
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
  }, [allPackages, selectedCategory, searchQuery, selectedDuration, sortBy]);

  return (
    <div className="space-y-8">
      {/* 1. Category Tabs Navigation */}
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2 pt-1 border-b border-[#C89B3C]/15">
        {CATEGORY_TABS.map((tab) => {
          const isSelected = selectedCategory === tab.id;
          const count = categoryCounts[tab.id] || 0;

          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm ${
                isSelected
                  ? "bg-gradient-to-r from-[#C89B3C] to-[#E8C48A] text-[#17120D] shadow-md shadow-[#C89B3C]/20 scale-102"
                  : "bg-white dark:bg-[#241A12] text-[#6B6258] dark:text-[#B8ADA2] hover:text-[#17120D] dark:hover:text-white border border-[#C89B3C]/20"
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isSelected
                    ? "bg-[#17120D] text-[#E8C48A]"
                    : "bg-[#F2E8D5] dark:bg-[#17120D] text-[#8C6214] dark:text-[#B8ADA2]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Search & Toolbar */}
      <div className="bg-white dark:bg-[#241A12] p-4 sm:p-6 rounded-2xl border border-[#C89B3C]/20 shadow-md flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-200">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-[#C89B3C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search tours (e.g. BOGO, buggy, VIP, quad)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#C89B3C]/25 bg-[#FBF7F0]/60 dark:bg-[#17120D]/60 text-[#17120D] dark:text-[#FBF7F0] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] transition-all placeholder:text-gray-400"
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
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
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

      {/* 3. Results Count Bar */}
      <div className="flex items-center justify-between text-xs text-[#6B6258] dark:text-[#B8ADA2] px-1">
        <span>
          Showing <strong>{filteredPackages.length}</strong> desert tour
          {filteredPackages.length !== 1 ? "s" : ""}
          {selectedCategory !== "all" && (
            <span> in <strong className="capitalize text-[#C89B3C]">{selectedCategory.replace("-", " ")}</strong></span>
          )}
        </span>
        {(searchQuery || selectedDuration !== "all" || selectedCategory !== "all") && (
          <button
            onClick={() => {
              dispatch(setSearchQuery(""));
              dispatch(setSelectedDuration("all"));
              setSelectedCategory("all");
            }}
            className="text-[#C89B3C] hover:underline font-semibold cursor-pointer"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* 4. Package Cards Grid */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-[#241A12] rounded-3xl border border-[#C89B3C]/20 p-8 shadow-sm">
          <p className="font-heading text-xl font-bold text-[#17120D] dark:text-[#FBF7F0]">
            No safari packages match your current search.
          </p>
          <p className="text-xs text-[#6B6258] dark:text-[#B8ADA2] mt-2">
            Try choosing a different category or clearing search terms.
          </p>
          <button
            onClick={() => {
              dispatch(setSearchQuery(""));
              dispatch(setSelectedDuration("all"));
              setSelectedCategory("all");
            }}
            className="btn-gold mt-6 px-6 py-2.5 text-xs uppercase tracking-wider font-bold cursor-pointer"
          >
            Show All Safari Tours
          </button>
        </div>
      )}
    </div>
  );
}
