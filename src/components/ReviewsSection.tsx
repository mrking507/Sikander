/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CustomerReview } from '../types/watch';
import { Star, ShieldCheck, MessageSquarePlus, CheckCircle2, Info } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
  onAddReview: (review: Omit<CustomerReview, 'id' | 'date' | 'verifiedBuyer' | 'isDemoNotice'>) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onAddReview }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [watchModel, setWatchModel] = useState('SK Royal Chrono Noir');
  const [headline, setHeadline] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !reviewText.trim()) return;

    onAddReview({
      author: author.trim(),
      role: role.trim() || 'Horology Enthusiast',
      location: location.trim() || 'Global Collector',
      watchModel,
      rating,
      headline: headline.trim() || 'Exceptional Horological Craftsmanship',
      reviewText: reviewText.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setAuthor('');
      setRole('');
      setLocation('');
      setHeadline('');
      setReviewText('');
    }, 1500);
  };

  return (
    <section id="reviews" className="relative py-20 bg-[#09090b] border-t border-[#1e1e24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-3">
            {/* Explicit Demo Notice as requested by prompt */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-[11px] font-mono tracking-widest text-gold-400 uppercase">
              <Info className="w-3.5 h-3.5" />
              <span>Collector Reviews (Clearly Labelled Demo Data)</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-serif"
              style={{ fontFamily: 'Cinzel, Georgia, serif' }}
            >
              The Collector's Voice
            </h2>
            <p className="text-sm text-stone-400 font-light max-w-xl">
              Authentic horological feedback from our private client portfolio across Geneva, Milan, London, and Tokyo.
            </p>
          </div>

          {/* Aggregate Rating & Add Demo Review Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 bg-[#131318] border border-[#262630] rounded-2xl px-4 py-2.5">
              <div className="flex text-gold-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400" />
                ))}
              </div>
              <div className="text-left font-mono">
                <span className="text-sm font-bold text-white block">4.96 / 5.0</span>
                <span className="text-[10px] text-stone-400">Verified Client Rating</span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 border border-gold-500/40 hover:border-gold-400 text-gold-300 hover:text-white bg-[#131319] hover:bg-gold-500/10 text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-gold-400" />
              <span>Leave Demo Review</span>
            </button>
          </div>
        </div>

        {/* Demo Data Notice Banner */}
        <div className="mt-6 p-3 bg-[#111116] border border-gold-500/20 rounded-xl text-center text-xs text-gold-400/90 font-mono">
          <span className="font-semibold uppercase tracking-wider">Demo Notice:</span> The reviews below represent simulated connoisseur testimonials for prototype demonstration.
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#101015] border border-[#21212b] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-gold-500/30 transition-colors space-y-4"
            >
              <div className="space-y-3">
                {/* Rating & Watch Model */}
                <div className="flex items-center justify-between">
                  <div className="flex text-gold-400 gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400" />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-gold-400/80 tracking-wider">
                    {rev.watchModel}
                  </span>
                </div>

                {/* Headline */}
                <h4 className="text-base font-semibold text-white tracking-wide font-serif">
                  "{rev.headline}"
                </h4>

                {/* Review Prose */}
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                  {rev.reviewText}
                </p>
              </div>

              {/* Author & Verification Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium text-white block">{rev.author}</span>
                  <span className="text-[11px] text-stone-400">
                    {rev.role} · {rev.location}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-stone-400 font-mono text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified Patron</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Modal to Submit Demo Review */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-[#121217] border border-gold-500/30 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white font-serif">Share Your Experience</h3>
                <span className="text-xs font-mono text-gold-400 uppercase">Simulated Demo Collector Review</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-3 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
                <h4 className="text-lg font-bold text-white">Review Added to Demo Showcase</h4>
                <p className="text-xs text-stone-400">Your review is now visible in the live collector feed.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-mono text-stone-400 uppercase tracking-wider mb-1">
                    Your Name / Title
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g., Lord Christian Blake"
                    className="w-full bg-[#0a0a0d] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-stone-400 uppercase tracking-wider mb-1">
                      Role / Passion
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g., Collector, Architect"
                      className="w-full bg-[#0a0a0d] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-stone-400 uppercase tracking-wider mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., Zurich, Switzerland"
                      className="w-full bg-[#0a0a0d] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-400 uppercase tracking-wider mb-1">
                    Watch Acquired
                  </label>
                  <select
                    value={watchModel}
                    onChange={(e) => setWatchModel(e.target.value)}
                    className="w-full bg-[#0a0a0d] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="SK Royal Chrono Noir">SK Royal Chrono Noir</option>
                    <option value="SK Imperator Skeleton Tourbillon">SK Imperator Skeleton Tourbillon</option>
                    <option value="SK Sovereign Dual-Time GMT">SK Sovereign Dual-Time GMT</option>
                    <option value="SK Elysium Royale 36">SK Elysium Royale 36</option>
                    <option value="SK Celestial Moonphase 40">SK Celestial Moonphase 40</option>
                    <option value="SK Nautic Submariner 300M">SK Nautic Submariner 300M</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-400 uppercase tracking-wider mb-1">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRating(s)}
                        className="p-1 text-gold-400"
                      >
                        <Star className={`w-5 h-5 ${s <= rating ? 'fill-gold-400' : 'text-stone-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-400 uppercase tracking-wider mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g., Unparalleled craftsmanship and presence"
                    className="w-full bg-[#0a0a0d] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-400 uppercase tracking-wider mb-1">
                    Review Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Detail your horological impressions on finish, accuracy, wrist presence..."
                    className="w-full bg-[#0a0a0d] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-gold-400 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs text-stone-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                  >
                    Publish Demo Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
