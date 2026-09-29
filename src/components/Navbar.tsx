/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  activeFilter: string;
  onSelectFilter: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSearchChange,
  searchQuery,
  activeFilter,
  onSelectFilter,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, filter?: string) => {
    setIsMobileMenuOpen(false);
    if (filter) {
      onSelectFilter(filter);
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090b]/95 backdrop-blur-md border-b border-[#25252b] py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-[#08080a]/90 via-[#08080a]/60 to-transparent py-5'
      }`}
    >
      {/* Top Bar: Strict 3-Zone Architecture */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark & Original Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400 group"
          >
            <Logo size="md" />
          </button>

          {/* Zone 2: Navigation Links (1-2 word labels, single line) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs tracking-[0.2em] uppercase font-medium">
            <button
              onClick={() => handleNavClick('catalog', 'all')}
              className={`transition-colors whitespace-nowrap hover:text-gold-300 ${
                activeFilter === 'all' ? 'text-gold-400 font-semibold' : 'text-stone-300'
              }`}
            >
              Shop Now
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'new-arrivals')}
              className={`transition-colors whitespace-nowrap hover:text-gold-300 ${
                activeFilter === 'new-arrivals' ? 'text-gold-400 font-semibold' : 'text-stone-300'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'best-sellers')}
              className={`transition-colors whitespace-nowrap hover:text-gold-300 ${
                activeFilter === 'best-sellers' ? 'text-gold-400 font-semibold' : 'text-stone-300'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'discounts')}
              className={`transition-colors whitespace-nowrap hover:text-gold-300 ${
                activeFilter === 'discounts' ? 'text-gold-400 font-semibold' : 'text-stone-300'
              }`}
            >
              Discounts
            </button>
            <button
              onClick={() => handleNavClick('spotlight')}
              className="text-stone-300 hover:text-gold-300 transition-colors whitespace-nowrap"
            >
              Craftsmanship
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="text-stone-300 hover:text-gold-300 transition-colors whitespace-nowrap"
            >
              Reviews
            </button>
          </nav>

          {/* Zone 3: Functional Interactive Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Quick Search Toggle / Input */}
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center bg-[#15151a] border border-gold-500/40 rounded-full px-3 py-1.5 transition-all w-48 sm:w-64">
                  <Search className="w-3.5 h-3.5 text-gold-400 shrink-0 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search watches, calibre..."
                    autoFocus
                    className="w-full bg-transparent text-xs text-white placeholder-stone-500 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      onSearchChange('');
                    }}
                    className="text-stone-400 hover:text-white ml-1 p-0.5"
                    aria-label="Close search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-stone-300 hover:text-gold-400 transition-colors rounded-full hover:bg-white/5"
                  aria-label="Open search bar"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-stone-300 hover:text-gold-400 transition-colors rounded-full hover:bg-white/5"
              aria-label="View Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 text-xs font-medium text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 rounded-full transition-all duration-200 shadow-[0_2px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_20px_rgba(212,175,55,0.5)] active:scale-95"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline tracking-wider uppercase font-semibold text-[11px]">Bag</span>
              <span className="w-4 h-4 bg-black text-gold-300 text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-stone-300 hover:text-gold-400 transition-colors rounded-lg hover:bg-white/5"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide Down */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0d] border-b border-[#24242b] px-6 py-6 mt-3 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 text-sm tracking-wider uppercase">
            <button
              onClick={() => handleNavClick('catalog', 'all')}
              className="flex items-center justify-between text-left py-2 text-stone-200 hover:text-gold-400 border-b border-white/5"
            >
              <span>Shop All Watches</span>
              <ArrowRight className="w-4 h-4 text-gold-500/50" />
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'new-arrivals')}
              className="flex items-center justify-between text-left py-2 text-stone-200 hover:text-gold-400 border-b border-white/5"
            >
              <span>New Arrivals</span>
              <span className="text-[10px] text-gold-400 font-mono">NEW</span>
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'best-sellers')}
              className="flex items-center justify-between text-left py-2 text-stone-200 hover:text-gold-400 border-b border-white/5"
            >
              <span>Best Sellers</span>
              <ArrowRight className="w-4 h-4 text-gold-500/50" />
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'discounts')}
              className="flex items-center justify-between text-left py-2 text-stone-200 hover:text-gold-400 border-b border-white/5"
            >
              <span>Discounts & Privilege</span>
              <span className="text-[10px] text-red-400 font-mono">UP TO 20%</span>
            </button>
            <button
              onClick={() => handleNavClick('spotlight')}
              className="flex items-center justify-between text-left py-2 text-stone-200 hover:text-gold-400 border-b border-white/5"
            >
              <span>Horological Craftsmanship</span>
              <ArrowRight className="w-4 h-4 text-gold-500/50" />
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="flex items-center justify-between text-left py-2 text-stone-200 hover:text-gold-400"
            >
              <span>Collector Reviews (Demo)</span>
              <ArrowRight className="w-4 h-4 text-gold-500/50" />
            </button>
          </div>

          <div className="pt-2 text-xs text-stone-400 flex items-center justify-between border-t border-white/5">
            <span className="font-mono text-gold-400">TIME IS YOUR STYLE</span>
            <span>Geneva, Switzerland</span>
          </div>
        </div>
      )}
    </header>
  );
};
