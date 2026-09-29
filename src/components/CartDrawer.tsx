/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartItem } from '../types/watch';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { WatchImage } from './WatchImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (watchId: string, quantity: number) => void;
  onRemoveItem: (watchId: string) => void;
  onBrowseShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onBrowseShop,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [checkoutNotice, setCheckoutNotice] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + item.watch.price * item.quantity,
    0
  );

  const discountAmount = (rawSubtotal * appliedDiscount) / 100;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SKROYAL') {
      setAppliedDiscount(15);
      setPromoError('');
    } else {
      setPromoError('Invalid privilege code. Try SKROYAL for 15% off.');
    }
  };

  const handleCheckoutClick = () => {
    setCheckoutNotice(true);
  };

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
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h3
                className="text-lg font-bold text-white tracking-wider font-serif"
                style={{ fontFamily: 'Cinzel, Georgia, serif' }}
              >
                Shopping Bag
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 bg-[#171720] border border-white/10 rounded-full text-gold-300">
                {cartItems.reduce((acc, it) => acc + it.quantity, 0)} Items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Insured Courier Progress */}
          <div className="px-6 py-2.5 bg-[#14141c] border-b border-white/5 text-[11px] font-mono text-stone-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Complimentary Armoured Vault Delivery</span>
            </div>
            <span className="text-gold-400 font-semibold">Active</span>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-full bg-[#16161c] border border-white/10 flex items-center justify-center text-stone-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white">Your Bag is Empty</h4>
                  <p className="text-xs text-stone-400 mt-1 max-w-xs">
                    Discover our collection of Geneva handcrafted black-and-gold timepieces.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onBrowseShop();
                  }}
                  className="px-6 py-2.5 bg-gold-400 hover:bg-gold-300 text-black text-xs font-bold font-mono tracking-widest uppercase rounded-full transition-colors cursor-pointer"
                >
                  Browse Collection
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.watch.id}-${item.selectedStrap}`}
                  className="flex gap-4 p-3 bg-[#131318] border border-[#22222c] rounded-xl hover:border-gold-500/20 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-black border border-white/10">
                    <WatchImage
                      src={item.watch.images[0]}
                      alt={item.watch.name}
                      modelName={item.watch.name}
                      aspectRatio="square"
                      className="w-full h-full"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-semibold text-white font-serif line-clamp-1">
                          {item.watch.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.watch.id)}
                          className="text-stone-500 hover:text-red-400 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-stone-400 block line-clamp-1 mt-0.5 font-light">
                        {item.selectedStrap}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5">
                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-[#0c0c0e] border border-white/10 rounded-lg px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.watch.id, Math.max(1, item.quantity - 1))}
                          className="text-stone-400 hover:text-white font-mono text-xs px-1"
                        >
                          -
                        </button>
                        <span className="text-xs font-mono font-bold text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.watch.id, item.quantity + 1)}
                          className="text-stone-400 hover:text-white font-mono text-xs px-1"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-mono font-bold text-gold-300 tabular-nums">
                        ${(item.watch.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#0b0b0e] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Privilege code (SKROYAL)"
                      className="w-full bg-[#15151c] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-gold-400 uppercase font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1b1b24] hover:bg-gold-500/20 text-xs font-mono uppercase tracking-wider text-gold-300 border border-white/10 rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedDiscount > 0 && (
                  <span className="text-[10px] text-emerald-400 font-mono block">
                    Privilege code applied: 15% discount deducted
                  </span>
                )}
                {promoError && (
                  <span className="text-[10px] text-red-400 font-mono block">
                    {promoError}
                  </span>
                )}
              </form>

              {/* Subtotals */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal</span>
                  <span className="tabular-nums">${rawSubtotal.toLocaleString()}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Privilege Discount ({appliedDiscount}%)</span>
                    <span className="tabular-nums">-${discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-400">
                  <span>Insured Global Courier</span>
                  <span className="text-gold-400">Complimentary</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span>Estimated Total</span>
                  <span className="text-gold-300 tabular-nums">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Ready for Checkout Notification (Future Payment System) */}
              {checkoutNotice && (
                <div className="p-3 bg-gold-500/10 border border-gold-500/40 rounded-xl text-left space-y-1 animate-in fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold text-gold-300">
                    <ShieldCheck className="w-4 h-4 text-gold-400" />
                    <span>Cart primed for Payment & Admin Integration</span>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-normal font-light">
                    This front-end cart state is structured for the upcoming Stripe/Payment system and Admin order management module.
                  </p>
                </div>
              )}

              {/* Proceed to Checkout Action */}
              <button
                onClick={handleCheckoutClick}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-black text-xs font-bold tracking-[0.2em] uppercase rounded-xl shadow-lg transition-all duration-200 cursor-pointer active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
