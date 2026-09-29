/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Tag, Copy, Check, ArrowRight } from 'lucide-react';

interface SaleBannerProps {
  onExploreDiscounts: () => void;
}

export const SaleBanner: React.FC<SaleBannerProps> = ({ onExploreDiscounts }) => {
  const [copied, setCopied] = useState(false);
  const promoCode = 'SKROYAL';

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative overflow-hidden py-10 bg-[#0e0e12] border-y border-[#262630]">
      {/* Subtle gold ornamental accents */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gold-400/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gold-400/[0.04] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#14141a] via-[#191922] to-[#14141a] border border-gold-500/20 rounded-2xl p-6 sm:p-8 relative">
          {/* Left: Privilege Information */}
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-gold-400 uppercase">
              <Tag className="w-3.5 h-3.5" />
              <span>Collector's Archive Privilege</span>
            </div>
            <h3
              className="text-2xl sm:text-3xl font-bold text-white tracking-wide font-serif"
              style={{ fontFamily: 'Cinzel, Georgia, serif' }}
            >
              Exclusive Seasonal Privileges Up To 20% Off
            </h3>
            <p className="text-sm text-stone-300 max-w-xl font-light">
              Acquire certified Swiss chronographs and grand complications with bespoke complimentary courier delivery and insured vault dispatch.
            </p>
          </div>

          {/* Right: Code Snippet & Action Button */}
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            {/* Promo Code Box */}
            <div className="flex items-center bg-[#0a0a0d] border border-gold-500/40 rounded-xl px-4 py-2.5 gap-3">
              <div className="text-left">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-mono">Privilege Code</span>
                <span className="text-sm font-mono font-bold tracking-widest text-gold-300">{promoCode}</span>
              </div>
              <button
                onClick={handleCopy}
                className="p-1.5 hover:bg-gold-500/10 rounded-lg text-stone-300 hover:text-gold-400 transition-colors"
                title="Copy code to clipboard"
                aria-label="Copy code to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* View Discounts Button */}
            <button
              onClick={onExploreDiscounts}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-black text-xs font-bold tracking-[0.15em] uppercase rounded-xl shadow-lg transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>Explore Discounts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
