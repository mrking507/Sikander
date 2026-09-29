/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Watch } from '../types/watch';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { WatchImage } from './WatchImage';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistWatches: Watch[];
  onRemoveFromWishlist: (watchId: string) => void;
  onAddToCart: (watch: Watch) => void;
  onQuickView: (watch: Watch) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistWatches,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-[#0e0e12] border-l border-[#262633] text-stone-200 shadow-2xl flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-gold-400 fill-gold-400" />
              <h3
                className="text-lg font-bold text-white tracking-wider font-serif"
                style={{ fontFamily: 'Cinzel, Georgia, serif' }}
              >
                Saved Masterpieces
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 bg-[#171720] border border-white/10 rounded-full text-gold-300">
                {wishlistWatches.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistWatches.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                <div className="w-16 h-16 rounded-full bg-[#16161c] border border-white/10 flex items-center justify-center text-stone-500">
                  <Heart className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white">Your Wishlist is Empty</h4>
                  <p className="text-xs text-stone-400 mt-1 max-w-xs">
                    Tap the heart icon on any timepiece to save it to your private portfolio.
                  </p>
                </div>
              </div>
            ) : (
              wishlistWatches.map((w) => (
                <div
                  key={w.id}
                  className="flex gap-4 p-3 bg-[#131318] border border-[#22222c] rounded-xl hover:border-gold-500/20 transition-colors"
                >
                  <div
                    className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-black border border-white/10 cursor-pointer"
                    onClick={() => {
                      onClose();
                      onQuickView(w);
                    }}
                  >
                    <WatchImage
                      src={w.images[0]}
                      alt={w.name}
                      modelName={w.name}
                      aspectRatio="square"
                      className="w-full h-full"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4
                          onClick={() => {
                            onClose();
                            onQuickView(w);
                          }}
                          className="text-xs font-semibold text-white font-serif line-clamp-1 hover:text-gold-300 cursor-pointer"
                        >
                          {w.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(w.id)}
                          className="text-stone-500 hover:text-red-400 p-1 transition-colors"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-stone-400 block mt-0.5 font-light">
                        {w.specs.caseMaterial}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5">
                      <span className="text-xs font-mono font-bold text-white tabular-nums">
                        ${w.price.toLocaleString()}
                      </span>

                      <button
                        onClick={() => {
                          onAddToCart(w);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1 bg-gold-400 hover:bg-gold-300 text-black text-[11px] font-bold uppercase rounded-lg transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
