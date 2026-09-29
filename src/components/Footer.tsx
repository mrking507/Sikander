/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Logo } from './Logo';
import { ArrowRight, Check, Shield, MapPin, Mail, Phone, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setNewsletterSubscribed(true);
  };

  return (
    <footer className="relative bg-[#060608] border-t border-[#1c1c24] text-stone-300 pt-16 pb-12">
      {/* Upper Newsletter & VIP Salon Enclosure */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center justify-between">
          <div className="lg:col-span-6 space-y-3 text-left">
            <span className="text-xs font-mono tracking-[0.25em] text-gold-400 uppercase">
              Private Concierge & Journal
            </span>
            <h3
              className="text-2xl sm:text-3xl font-bold text-white tracking-wide font-serif"
              style={{ fontFamily: 'Cinzel, Georgia, serif' }}
            >
              The SK Horological Gazette
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 font-light max-w-lg">
              Receive private invitations to confidential timepiece launches, limited numbered series, and salon events in Geneva and London.
            </p>
          </div>

          <div className="lg:col-span-6">
            {newsletterSubscribed ? (
              <div className="flex items-center gap-3 p-4 bg-gold-500/10 border border-gold-500/30 rounded-2xl text-xs text-gold-300 font-mono">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Thank you. Your invitation to the private collector circle has been registered.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your private email address"
                  className="flex-1 bg-[#101015] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-gold-400 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-black text-xs font-bold tracking-[0.18em] uppercase rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-lg"
                >
                  <span>Request Gazette</span>
                </button>
              </form>
            )}
            <span className="text-[10px] text-stone-500 mt-2 block font-mono">
              Strictly confidential. No spam or third-party sharing.
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-left">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" showTagline={true} />
            <p className="text-xs text-stone-400 leading-relaxed font-light max-w-sm mt-3">
              Founded on the belief that TIME IS YOUR STYLE, SK Watches creates Swiss-certified chronometers and complications framed in 18K yellow gold, rose gold, and obsidian titanium.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-gold-400/90">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Rue du Rhône 42, Geneva</span>
              </span>
            </div>
          </div>

          {/* Masterworks Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-semibold">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#catalog" className="hover:text-gold-300 transition-colors">
                  Royal Chrono Series
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-gold-300 transition-colors">
                  Imperator Tourbillons
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-gold-300 transition-colors">
                  Celestial Moonphase
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-gold-300 transition-colors">
                  Elysium High Jewellery
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-gold-300 transition-colors">
                  Nautic Professional Diver
                </a>
              </li>
            </ul>
          </div>

          {/* Boutique Salons Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-semibold">
              Global Salons
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Geneva · Flagship Atelier</li>
              <li>London · New Bond Street</li>
              <li>New York · Madison Avenue</li>
              <li>Tokyo · Ginza 6-Chome</li>
              <li>Dubai · DIFC Gate Precinct</li>
            </ul>
          </div>

          {/* Concierge & Horology Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-semibold">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Bespoke Sizing & Straps</li>
              <li>5-Year International Guarantee</li>
              <li>Certificate of Horological Origin</li>
              <li>Restoration & Service Atelier</li>
              <li>Private Courier Appointment</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Quiet Copyright & Geneva Standards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-stone-500">
          <p>© {new Date().getFullYear()} SK Watches Haute Horlogerie. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span>TIME IS YOUR STYLE</span>
            <span>·</span>
            <span>Swiss Chronometer Tested</span>
            <span>·</span>
            <span>Insured Vault Dispatch</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
