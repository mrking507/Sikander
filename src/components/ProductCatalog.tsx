/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { Watch } from '../types/watch';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Search, RotateCcw } from 'lucide-react';

interface ProductCatalogProps {
  watches: Watch[];
  activeFilter: string;
  onSelectFilter: (category: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  selectedGender: string;
  onGenderChange: (gender: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (watchId: string) => void;
  onQuickView: (watch: Watch) => void;
  onAddToCart: (watch: Watch) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  watches,
  activeFilter,
  onSelectFilter,
  searchQuery,
  onClearSearch,
  sortBy,
  onSortChange,
  selectedGender,
  onGenderChange,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  // Filter logic
  const filteredWatches = useMemo(() => {
    return watches
      .filter((w) => {
        // Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            w.name.toLowerCase().includes(q) ||
            w.collection.toLowerCase().includes(q) ||
            w.specs.movement.toLowerCase().includes(q) ||
            w.specs.caseMaterial.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Category / Collection Filter
        if (activeFilter === 'new-arrivals') {
          if (!w.isNewArrival) return false;
        } else if (activeFilter === 'best-sellers') {
          if (!w.isBestSeller) return false;
        } else if (activeFilter === 'discounts') {
          if (!w.isOnSale) return false;
        } else if (activeFilter === 'chronograph') {
          if (w.collection !== 'Chronograph') return false;
        } else if (activeFilter === 'tourbillon') {
          if (w.collection !== 'Skeleton Tourbillon') return false;
        }

        // Gender Filter
        if (selectedGender !== 'all') {
          if (w.category !== selectedGender && w.category !== 'unisex') return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // Default curated order
      });
  }, [watches, activeFilter, searchQuery, selectedGender, sortBy]);

  const filterTabs = [
    { id: 'all', label: 'All Pieces' },
    { id: 'new-arrivals', label: 'New Arrivals' },
    { id: 'best-sellers', label: 'Best Sellers' },
    { id: 'discounts', label: 'Privilege Discounts' },
    { id: 'chronograph', label: 'Chronographs' },
    { id: 'tourbillon', label: 'Tourbillons' },
  ];

  return (
    <section id="catalog" className="relative py-20 bg-[#08080a] border-t border-[#1a1a22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading & Tagline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="text-xs font-mono tracking-[0.3em] text-gold-400 uppercase">
              Curated Haute Horlogerie
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-serif"
              style={{ fontFamily: 'Cinzel, Georgia, serif' }}
            >
              The Master Collection
            </h2>
            <p className="text-sm text-stone-400 font-light max-w-lg">
              Each timepiece is individually calibrated, certified in Geneva, and finished with solid 18K gold and obsidian accents.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-3 font-mono text-xs text-stone-400">
            <span>Displaying {filteredWatches.length} of {watches.length} Timepieces</span>
          </div>
        </div>

        {/* Filter Navigation Bar (Interactive Filter Controls conforming to Zero-Pill discipline) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 pb-4 border-b border-white/10">
          {/* Category Tabs (Segmented Button Controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onSelectFilter(tab.id)}
                className={`px-4 py-2 text-xs font-mono tracking-wider rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-gold-500/20 text-gold-300 border border-gold-400 font-semibold shadow-sm'
                    : 'bg-[#121217] text-stone-400 hover:text-white border border-white/5 hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Controls: Gender & Sort Dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Gender Toggle */}
            <div className="flex items-center bg-[#121217] border border-white/10 rounded-xl p-1 text-xs font-mono">
              <button
                onClick={() => onGenderChange('all')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  selectedGender === 'all' ? 'bg-[#22222c] text-gold-300 font-medium' : 'text-stone-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => onGenderChange('mens')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  selectedGender === 'mens' ? 'bg-[#22222c] text-gold-300 font-medium' : 'text-stone-400 hover:text-white'
                }`}
              >
                Gentlemen
              </button>
              <button
                onClick={() => onGenderChange('womens')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  selectedGender === 'womens' ? 'bg-[#22222c] text-gold-300 font-medium' : 'text-stone-400 hover:text-white'
                }`}
              >
                Ladies
              </button>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-[#121217] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-stone-300">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold-400" />
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer font-mono"
              >
                <option value="featured" className="bg-[#121217] text-white">Curated</option>
                <option value="price-desc" className="bg-[#121217] text-white">Price: High to Low</option>
                <option value="price-asc" className="bg-[#121217] text-white">Price: Low to High</option>
                <option value="rating" className="bg-[#121217] text-white">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Search Notification */}
        {searchQuery && (
          <div className="flex items-center justify-between p-3 bg-[#15151c] border border-gold-500/30 rounded-xl text-xs font-mono text-stone-300">
            <span>
              Searching for: <strong className="text-gold-400">"{searchQuery}"</strong> ({filteredWatches.length} results)
            </span>
            <button
              onClick={onClearSearch}
              className="inline-flex items-center gap-1 text-gold-300 hover:text-white underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear search</span>
            </button>
          </div>
        )}

        {/* Product Cards Grid: 3-column desktop layout conforming to E-Commerce Guidelines */}
        {filteredWatches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredWatches.map((watch) => (
              <ProductCard
                key={watch.id}
                watch={watch}
                isWishlisted={wishlistIds.includes(watch.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 bg-[#101015] border border-white/5 rounded-2xl p-8">
            <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center text-stone-500">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white font-serif">No Timepieces Match Your Selection</h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              Please adjust your filters or search terms to explore our full catalogue of handcrafted masterworks.
            </p>
            <button
              onClick={() => {
                onSelectFilter('all');
                onGenderChange('all');
                onClearSearch();
              }}
              className="px-6 py-2.5 bg-gold-400 hover:bg-gold-300 text-black text-xs font-mono uppercase font-bold rounded-full transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
