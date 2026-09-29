/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Watch } from '../types/watch';
import { WatchImage } from './WatchImage';
import { X, ShoppingBag, Heart, Star, ShieldCheck, Truck, RefreshCw, Check } from 'lucide-react';

interface ProductQuickViewProps {
  watch: Watch | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (watchId: string) => void;
  onAddToCart: (watch: Watch, strap: string, quantity: number) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  watch,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (!watch) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedStrap, setSelectedStrap] = useState(watch.specs.strap.split('&')[0].trim());
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const strapOptions = [
    watch.specs.strap.split('&')[0].trim(),
    'Bespoke Hand-stitched Matte Alligator',
    'Solid 18K Gold & Titanium Link Bracelet',
  ];

  const handleAdd = () => {
    onAddToCart(watch, selectedStrap, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#101014] border border-[#2b2b36] rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,55,0.12)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-white bg-black/50 hover:bg-black/80 rounded-full border border-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Gallery & Primary Imagery */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-[#0a0a0d] border-b md:border-b-0 md:border-r border-[#202028]">
            <div className="relative">
              {/* Primary Image Display */}
              <div className="rounded-2xl overflow-hidden border border-gold-500/20 shadow-2xl bg-black">
                <WatchImage
                  src={watch.images[activeImageIdx] || watch.images[0]}
                  alt={watch.name}
                  modelName={watch.name}
                  collection={watch.collection}
                  aspectRatio="square"
                  className="w-full"
                />
              </div>

              {/* Thumbnail Selector */}
              {watch.images.length > 1 && (
                <div className="flex items-center gap-3 mt-4">
                  {watch.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIdx(i)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIdx === i ? 'border-gold-400 scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${watch.name} view ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Micro Horology Highlights */}
            <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                <span>5-Year Manufacture Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Insured Armoured Shipping</span>
              </div>
            </div>
          </div>

          {/* Right Column: Horological Specifications & Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between bg-[#111116]">
            <div className="space-y-4">
              {/* Collection & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-gold-400 uppercase">
                  {watch.collection}
                </span>
                <div className="flex items-center gap-1.5 text-gold-400">
                  <Star className="w-4 h-4 fill-gold-400" />
                  <span className="text-xs font-semibold tabular-nums text-white">
                    {watch.rating.toFixed(2)}
                  </span>
                  <span className="text-xs text-stone-400">({watch.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3
                  className="text-2xl sm:text-3xl font-bold text-white tracking-wide font-serif"
                  style={{ fontFamily: 'Cinzel, Georgia, serif' }}
                >
                  {watch.name}
                </h3>
                <p className="text-sm text-stone-300 font-light mt-1">{watch.subtitle}</p>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 py-2 border-y border-white/10">
                <span className="text-3xl font-bold text-white tabular-nums font-mono">
                  ${watch.price.toLocaleString()}
                </span>
                {watch.originalPrice && (
                  <span className="text-base text-stone-500 line-through tabular-nums font-mono">
                    ${watch.originalPrice.toLocaleString()}
                  </span>
                )}
                {watch.isOnSale && (
                  <span className="text-xs font-mono px-2 py-0.5 bg-red-900/60 text-red-200 border border-red-500/30 rounded">
                    Privilege Savings Applied
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                {watch.description}
              </p>

              {/* Horological Specifications Table */}
              <div className="bg-[#0b0b0e] border border-[#23232c] rounded-xl p-3.5 space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-stone-400">Movement Calibre</span>
                  <span className="text-white text-right font-medium">{watch.specs.movement}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-stone-400">Case Dimension</span>
                  <span className="text-white font-medium">{watch.specs.caseDiameter}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-stone-400">Case Material</span>
                  <span className="text-white font-medium">{watch.specs.caseMaterial}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-stone-400">Power Reserve</span>
                  <span className="text-white font-medium">{watch.specs.powerReserve}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-400">Water Resistance</span>
                  <span className="text-white font-medium">{watch.specs.waterResistance}</span>
                </div>
              </div>

              {/* Strap Choice Selector */}
              <div>
                <label className="block text-xs font-mono text-stone-400 uppercase tracking-wider mb-2">
                  Strap Selection
                </label>
                <div className="space-y-1.5">
                  {strapOptions.map((st, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedStrap(st)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        selectedStrap === st
                          ? 'bg-gold-500/15 border border-gold-400 text-gold-200'
                          : 'bg-[#15151b] border border-white/5 text-stone-300 hover:border-white/20'
                      }`}
                    >
                      <span className="line-clamp-1">{st}</span>
                      {selectedStrap === st && <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module Actions */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center bg-[#17171d] border border-[#2b2b35] rounded-xl px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-stone-300 hover:text-white font-mono text-base"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-mono font-bold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-stone-300 hover:text-white font-mono text-base"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-xs font-bold tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer shadow-lg ${
                    isAdded
                      ? 'bg-emerald-500 text-black'
                      : 'bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-black shadow-gold-500/20 active:scale-98'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag · ${(watch.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(watch.id)}
                  aria-label="Toggle wishlist"
                  className={`p-3 rounded-xl border transition-colors ${
                    isWishlisted
                      ? 'bg-gold-500/20 border-gold-500 text-gold-400'
                      : 'bg-[#17171d] border-[#2b2b35] text-stone-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-gold-400' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
                <span>SK Atelier Geneva No. {watch.id.toUpperCase()}</span>
                <span>In Stock & Insured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
