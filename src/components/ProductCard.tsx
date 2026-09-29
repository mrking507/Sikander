/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Watch } from '../types/watch';
import { WatchImage } from './WatchImage';
import { Eye, ShoppingBag, Heart, Star, Check } from 'lucide-react';

interface ProductCardProps {
  watch: Watch;
  isWishlisted: boolean;
  onToggleWishlist: (watchId: string) => void;
  onQuickView: (watch: Watch) => void;
  onAddToCart: (watch: Watch) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  watch,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(watch);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(watch.id);
  };

  return (
    <div
      onClick={() => onQuickView(watch)}
      className="group relative flex flex-col justify-between bg-[#111115] hover:bg-[#14141a] rounded-2xl border border-[#23232c] hover:border-gold-500/40 p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.85),0_0_25px_rgba(212,175,55,0.08)] cursor-pointer select-none"
    >
      {/* Top Media Container */}
      <div className="relative w-full overflow-hidden rounded-xl bg-[#09090b]">
        {/* Edition Tag / Discount / New Tag (Single subtle tag as per design discipline) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start pointer-events-none">
          {watch.isOnSale && watch.discountPercent && (
            <span className="px-2.5 py-1 bg-red-950/80 border border-red-500/30 text-red-200 text-[10px] font-mono uppercase tracking-wider rounded backdrop-blur-md">
              -{watch.discountPercent}% Off
            </span>
          )}
          {watch.isNewArrival && !watch.isOnSale && (
            <span className="px-2.5 py-1 bg-gold-950/80 border border-gold-500/40 text-gold-300 text-[10px] font-mono uppercase tracking-wider rounded backdrop-blur-md">
              New Arrival
            </span>
          )}
          {watch.isBestSeller && !watch.isNewArrival && !watch.isOnSale && (
            <span className="px-2.5 py-1 bg-stone-900/80 border border-stone-700 text-stone-300 text-[10px] font-mono uppercase tracking-wider rounded backdrop-blur-md">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 ${
            isWishlisted
              ? 'bg-gold-500/20 text-gold-400 border border-gold-500/50'
              : 'bg-black/50 text-stone-400 hover:text-white border border-white/10 hover:bg-black/80'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-gold-400' : ''}`} />
        </button>

        {/* Watch Image with Ambient Glow & Error Fallback */}
        <WatchImage
          src={watch.images[0]}
          alt={watch.name}
          modelName={watch.name}
          collection={watch.collection}
          aspectRatio="square"
          className="transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Quick View Overlay Action */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/80 border border-gold-500/40 rounded-full text-xs text-gold-300 font-medium tracking-wider backdrop-blur-md shadow-lg">
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </div>
        </div>
      </div>

      {/* Product Content & Typography */}
      <div className="mt-4 flex flex-col flex-grow justify-between space-y-3">
        <div>
          {/* Collection Kicker */}
          <div className="flex items-center justify-between text-xs text-stone-400 font-mono tracking-widest uppercase">
            <span>{watch.collection}</span>
            <div className="flex items-center gap-1 text-gold-400">
              <Star className="w-3.5 h-3.5 fill-gold-400" />
              <span className="text-[11px] tabular-nums font-semibold">{watch.rating.toFixed(2)}</span>
            </div>
          </div>

          {/* Watch Title */}
          <h4
            className="mt-1 text-base font-semibold text-white tracking-wide group-hover:text-gold-300 transition-colors line-clamp-1 font-serif"
            style={{ fontFamily: 'Cinzel, Georgia, serif' }}
          >
            {watch.name}
          </h4>

          {/* Subtitle / Key Spec Note */}
          <p className="text-xs text-stone-400 line-clamp-1 mt-0.5 font-light">
            {watch.subtitle}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
          {/* Price with Tabular Numerals */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-white tabular-nums tracking-wide font-mono">
                ${watch.price.toLocaleString()}
              </span>
              {watch.originalPrice && (
                <span className="text-xs text-stone-500 line-through tabular-nums font-mono">
                  ${watch.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-500 font-mono tracking-wider">
              {watch.specs.caseDiameter} · {watch.specs.movement.split(' ')[0]}
            </span>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleAddToCartClick}
            aria-label={`Add ${watch.name} to shopping bag`}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
              addedAnimation
                ? 'bg-emerald-500 text-black'
                : 'bg-gold-500/15 hover:bg-gold-500 text-gold-300 hover:text-black border border-gold-500/30'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
