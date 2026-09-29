/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { WatchImage } from './WatchImage';
import { ArrowRight, ShieldCheck, Sparkles, Award, Clock } from 'lucide-react';
import { Watch } from '../types/watch';

interface HeroBannerProps {
  flagshipWatches: Watch[];
  onShopNow: () => void;
  onExploreNewArrivals: () => void;
  onQuickView: (watch: Watch) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  flagshipWatches,
  onShopNow,
  onExploreNewArrivals,
  onQuickView,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const currentWatch = flagshipWatches[selectedIdx] || flagshipWatches[0];

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-[#070709]">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle radial gold aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.13),transparent_70%)] blur-2xl" />
        {/* Fine gold concentric horological grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:48px_48px] opacity-[0.035]" />
        {/* Vignette mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-[#070709]/80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Editorial Brand & Core Tagline */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Quiet Editorial Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] uppercase text-gold-400/90">
              <span className="w-6 h-[1px] bg-gold-400" />
              <span>SK Watches · Geneva Manufacture</span>
              <span className="w-6 h-[1px] bg-gold-400" />
            </div>

            {/* Dominant Headline: TIME IS YOUR STYLE */}
            <h1
              className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance font-serif"
              style={{ fontFamily: 'Cinzel, Georgia, serif' }}
            >
              TIME IS YOUR <br />
              <span className="gold-gradient-text drop-shadow-[0_2px_20px_rgba(212,175,55,0.35)]">
                STYLE
              </span>
            </h1>

            {/* Subtitle / Brand Mission */}
            <p className="text-base sm:text-lg text-stone-300 max-w-xl leading-relaxed font-light">
              Where peerless Geneva mechanics embrace the boldness of solid 18K gold and obsidian
              aesthetics. Sculpted for discerning collectors who command their moment.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.55)] transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreNewArrivals}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-gold-500/40 hover:border-gold-400 text-stone-200 hover:text-gold-300 bg-white/[0.02] hover:bg-white/[0.06] text-xs font-semibold tracking-[0.2em] uppercase rounded-full backdrop-blur-sm transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>New Arrivals</span>
              </button>
            </div>

            {/* Selected Watch Micro-Specs Bar */}
            <div className="pt-6 border-t border-white/10 max-w-lg">
              <div className="grid grid-cols-3 gap-4 text-xs font-mono text-stone-400">
                <div>
                  <span className="text-[10px] text-stone-500 block uppercase tracking-wider">Calibre</span>
                  <span className="text-stone-200 font-medium">{currentWatch.specs.movement.split(' ')[1] || 'SK-8800'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 block uppercase tracking-wider">Gold Standard</span>
                  <span className="text-stone-200 font-medium">18K Solid Gold</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 block uppercase tracking-wider">Power Reserve</span>
                  <span className="text-stone-200 font-medium tabular-nums">{currentWatch.specs.powerReserve}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Full-Width Showcase HD Watch Banner with Interactive Selector */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Glowing Backdrop Ring */}
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-gold-500/20 animate-spin-slow duration-[90s]" />
              <div className="absolute inset-6 rounded-full border border-gold-400/10 border-dashed" />
              <div className="absolute inset-12 rounded-full bg-gradient-to-tr from-[#121215] to-[#1c1c22] shadow-[0_20px_50px_rgba(0,0,0,0.9)]" />

              {/* Watch Display Card with Smooth Switch */}
              <div className="relative z-10 w-full h-full p-4 flex flex-col items-center justify-center group cursor-pointer" onClick={() => onQuickView(currentWatch)}>
                <div className="w-64 h-64 sm:w-72 sm:h-72 transition-transform duration-500 hover:scale-105">
                  <WatchImage
                    src={currentWatch.images[0]}
                    alt={currentWatch.name}
                    modelName={currentWatch.name}
                    collection={currentWatch.collection}
                    aspectRatio="square"
                    className="rounded-2xl border border-gold-500/25 shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
                  />
                </div>

                {/* Floating Inspection Pill */}
                <div className="mt-3 flex items-center gap-2 px-3 py-1 bg-black/80 border border-gold-500/40 rounded-full text-[11px] text-gold-300 font-mono tracking-wider backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-3 h-3 text-gold-400" />
                  <span>Inspect Masterpiece · ${currentWatch.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Quick Watch Selector Toggles */}
            <div className="flex items-center gap-2 mt-4 p-1.5 bg-[#121216] border border-[#26262e] rounded-full">
              {flagshipWatches.slice(0, 3).map((w, idx) => (
                <button
                  key={w.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-full transition-all duration-200 cursor-pointer ${
                    selectedIdx === idx
                      ? 'bg-gold-400 text-black font-bold shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {w.collection.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Assurance Horology Bar at Base */}
      <div className="relative border-t border-[#1e1e24] bg-[#0c0c0e]/80 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-stone-300">
            <div className="flex items-center gap-3">
              <Award className="w-4 h-4 text-gold-400 shrink-0" />
              <div className="text-left">
                <span className="text-xs font-semibold text-white block">Geneva Certification</span>
                <span className="text-[11px] text-stone-400">COSC Chronometer Tested</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
              <div className="text-left">
                <span className="text-xs font-semibold text-white block">5-Year Global Warranty</span>
                <span className="text-[11px] text-stone-400">Manufacture Backed</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-gold-400 shrink-0" />
              <div className="text-left">
                <span className="text-xs font-semibold text-white block">Insured Global Courier</span>
                <span className="text-[11px] text-stone-400">Armoured Delivery Service</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
              <div className="text-left">
                <span className="text-xs font-semibold text-white block">Bespoke Fitting</span>
                <span className="text-[11px] text-stone-400">Complimentary Bracelet Sizing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
