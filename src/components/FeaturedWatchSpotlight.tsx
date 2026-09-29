/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Watch } from '../types/watch';
import { WatchImage } from './WatchImage';
import { ArrowRight, Compass, Shield, Sparkles, Layers } from 'lucide-react';

interface FeaturedWatchSpotlightProps {
  watch: Watch;
  onQuickView: (watch: Watch) => void;
  onAddToCart: (watch: Watch) => void;
}

export const FeaturedWatchSpotlight: React.FC<FeaturedWatchSpotlightProps> = ({
  watch,
  onQuickView,
  onAddToCart,
}) => {
  return (
    <section id="spotlight" className="relative py-20 bg-[#09090c] border-t border-[#1e1e26] overflow-hidden">
      {/* Horological ambient background */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Showcase & Macro Perspective */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md">
              {/* Outer Golden Geometric Frame */}
              <div className="absolute -inset-4 border border-gold-500/20 rounded-3xl -rotate-1 pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-black group">
                <WatchImage
                  src={watch.images[0]}
                  alt={watch.name}
                  modelName={watch.name}
                  collection={watch.collection}
                  aspectRatio="square"
                  className="w-full transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#0d0d11]/90 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gold-400 font-mono uppercase tracking-wider block">Spotlight Piece</span>
                    <span className="text-sm font-semibold text-white font-serif">{watch.name}</span>
                  </div>
                  <button
                    onClick={() => onQuickView(watch)}
                    className="px-3.5 py-1.5 bg-gold-400 hover:bg-gold-300 text-black text-xs font-bold font-mono tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    INSPECT
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Horological Storytelling & Calibre Architecture */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-gold-400 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Horlogerie Spotlight</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] font-serif"
              style={{ fontFamily: 'Cinzel, Georgia, serif' }}
            >
              The Architecture of <br />
              <span className="gold-gradient-text">Absolute Precision</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              {watch.horologicalDetails}
            </p>

            {/* 4 Complication Pill Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#111116] border border-[#22222b]">
                <Layers className="w-4 h-4 text-gold-400 mb-2" />
                <h5 className="text-xs font-semibold text-white tracking-wider uppercase font-mono">Manufacture Calibre</h5>
                <p className="text-[11px] text-stone-400 mt-1">{watch.specs.movement}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#111116] border border-[#22222b]">
                <Compass className="w-4 h-4 text-gold-400 mb-2" />
                <h5 className="text-xs font-semibold text-white tracking-wider uppercase font-mono">Sustained Reserve</h5>
                <p className="text-[11px] text-stone-400 mt-1">{watch.specs.powerReserve} continuous kinetic reserve</p>
              </div>

              <div className="p-4 rounded-xl bg-[#111116] border border-[#22222b]">
                <Shield className="w-4 h-4 text-gold-400 mb-2" />
                <h5 className="text-xs font-semibold text-white tracking-wider uppercase font-mono">Precious Metal</h5>
                <p className="text-[11px] text-stone-400 mt-1">{watch.specs.caseMaterial}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#111116] border border-[#22222b]">
                <Sparkles className="w-4 h-4 text-gold-400 mb-2" />
                <h5 className="text-xs font-semibold text-white tracking-wider uppercase font-mono">Dial Craft</h5>
                <p className="text-[11px] text-stone-400 mt-1">{watch.specs.dialFinish}</p>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => onAddToCart(watch)}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-black text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.35)] transition-all cursor-pointer active:scale-95"
              >
                <span>Acquire Timepiece</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onQuickView(watch)}
                className="px-6 py-3.5 border border-white/20 hover:border-gold-400 text-stone-300 hover:text-white text-xs font-semibold tracking-[0.18em] uppercase rounded-full transition-colors cursor-pointer"
              >
                Full Technical Dossier
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
