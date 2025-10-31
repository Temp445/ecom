'use client';

import React from "react";
import { Filter } from "lucide-react";

interface Category {
  _id?: string;
  Name: string;
}

interface FiltersSidebarProps {
  showFilters: boolean;
  setShowFilters: (val: boolean) => void;
  categories: any[]; 
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  clearFilters: () => void;
}

export default function FiltersSidebar({
  showFilters,
  setShowFilters,
  categories,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  clearFilters,
}: FiltersSidebarProps) {
  const toggleCategory = (categoryId?: string) => {
    if (!categoryId) return;
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const normalized = categories
    .map((item) => {
      if (item && typeof item === "object" && item.category && item.category._id) {
        return { _id: item.category._id, Name: item.category.Name };
      }
      if (item && typeof item === "object" && item._id) {
        return { _id: item._id, Name: item.Name };
      }
      return null;
    })
    .filter(Boolean) as Category[];

  const uniqueCategories = Array.from(
    new Map(normalized.map((c) => [c._id, c])).values()
  );

  return (
    <aside className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-64 flex-shrink-0`}>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Filter size={20} /> Filters
          </h2>
          <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Clear all
          </button>
        </div>

        {uniqueCategories.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-slate-800 mb-3">Categories</h3>
            <div className="space-y-2">
              {uniqueCategories.map((category) => (
                <label key={category._id} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={category._id ? selectedCategories.includes(category._id) : false}
                    onChange={() => toggleCategory(category._id)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-600 group-hover:text-slate-900">
                    {category.Name || "Unnamed"}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="font-semibold text-slate-800 mb-3">Price Range</h3>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-sm text-slate-600">
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Sort By */}
        <div>
          <h3 className="font-semibold text-slate-800 mb-3">Sort By</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
