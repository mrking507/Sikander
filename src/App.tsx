/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { WATCHES } from './data/watches';
import { DEMO_REVIEWS } from './data/reviews';
import { Watch, CartItem, CustomerReview } from './types/watch';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { SaleBanner } from './components/SaleBanner';
import { ProductCatalog } from './components/ProductCatalog';
import { FeaturedWatchSpotlight } from './components/FeaturedWatchSpotlight';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ProductQuickView } from './components/ProductQuickView';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Sparkles, Check } from 'lucide-react';

export default function App() {
  // Catalog State
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // E-Commerce Readiness State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      watch: WATCHES[0],
      quantity: 1,
      selectedStrap: 'Integrated Black Matte Alligator & Gold Clasp',
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['sk-imperator-tourbillon']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewWatch, setQuickViewWatch] = useState<Watch | null>(null);

  // Reviews Data State
  const [reviews, setReviews] = useState<CustomerReview[]>(DEMO_REVIEWS);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (watch: Watch, strap?: string, quantity: number = 1) => {
    const chosenStrap = strap || watch.specs.strap.split('&')[0].trim();
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.watch.id === watch.id && item.selectedStrap === chosenStrap
      );
      if (existing) {
        return prev.map((item) =>
          item.watch.id === watch.id && item.selectedStrap === chosenStrap
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { watch, quantity, selectedStrap: chosenStrap }];
    });
    showToast(`Added "${watch.name}" to shopping bag`);
  };

  const handleUpdateQuantity = (watchId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(watchId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.watch.id === watchId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (watchId: string) => {
    setCartItems((prev) => prev.filter((item) => item.watch.id !== watchId));
    showToast('Removed timepiece from shopping bag');
  };

  // Wishlist operations
  const handleToggleWishlist = (watchId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(watchId);
      const targetWatch = WATCHES.find((w) => w.id === watchId);
      const name = targetWatch ? targetWatch.name : 'Timepiece';
      if (exists) {
        showToast(`Removed "${name}" from saved list`);
        return prev.filter((id) => id !== watchId);
      } else {
        showToast(`Added "${name}" to saved list`);
        return [...prev, watchId];
      }
    });
  };

  const handleRemoveFromWishlist = (watchId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== watchId));
  };

  // Navigation handlers
  const handleShopNow = () => {
    setActiveFilter('all');
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreNewArrivals = () => {
    setActiveFilter('new-arrivals');
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreDiscounts = () => {
    setActiveFilter('discounts');
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddReview = (newReview: Omit<CustomerReview, 'id' | 'date' | 'verifiedBuyer' | 'isDemoNotice'>) => {
    const fullReview: CustomerReview = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      verifiedBuyer: true,
      isDemoNotice: true,
    };
    setReviews((prev) => [fullReview, ...prev]);
    showToast('Demo review published to the feed');
  };

  const wishlistWatches = WATCHES.filter((w) => wishlistIds.includes(w.id));
  const spotlightWatch = WATCHES.find((w) => w.id === 'sk-imperator-tourbillon') || WATCHES[1];

  return (
    <div className="min-h-screen bg-[#080809] text-stone-200 flex flex-col font-sans selection:bg-gold-400 selection:text-black">
      {/* Top Bar Navigation */}
      <Navbar
        cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onSelectFilter={(filter) => {
          setActiveFilter(filter);
          document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Full-Width HD Watch Hero Banner */}
        <HeroBanner
          flagshipWatches={WATCHES.filter((w) => w.isFeatured || w.isBestSeller)}
          onShopNow={handleShopNow}
          onExploreNewArrivals={handleExploreNewArrivals}
          onQuickView={(w) => setQuickViewWatch(w)}
        />

        {/* Luxury Sale Banner / Privilege Archive */}
        <SaleBanner onExploreDiscounts={handleExploreDiscounts} />

        {/* Master Catalog: Shop Now, New Arrivals, Best Sellers, Discounts */}
        <ProductCatalog
          watches={WATCHES}
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedGender={selectedGender}
          onGenderChange={setSelectedGender}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(w) => setQuickViewWatch(w)}
          onAddToCart={(w) => handleAddToCart(w)}
        />

        {/* Featured Horology Spotlight Piece */}
        <FeaturedWatchSpotlight
          watch={spotlightWatch}
          onQuickView={(w) => setQuickViewWatch(w)}
          onAddToCart={(w) => handleAddToCart(w)}
        />

        {/* Customer Reviews Section (Clearly Labelled Demo) */}
        <ReviewsSection reviews={reviews} onAddReview={handleAddReview} />
      </main>

      {/* Premium Luxury Footer */}
      <Footer />

      {/* Quick View Modal */}
      <ProductQuickView
        watch={quickViewWatch}
        onClose={() => setQuickViewWatch(null)}
        isWishlisted={quickViewWatch ? wishlistIds.includes(quickViewWatch.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Shopping Bag Drawer (Primed for Payment System in next phase) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onBrowseShop={() => {
          document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Slide-out Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistWatches={wishlistWatches}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(w) => {
          handleAddToCart(w);
          setIsWishlistOpen(false);
          setIsCartOpen(true);
        }}
        onQuickView={(w) => setQuickViewWatch(w)}
      />

      {/* Luxury Gold Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 bg-[#131318]/95 border border-gold-400/60 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.2)] text-xs font-mono text-gold-200 backdrop-blur-md animate-in slide-in-from-bottom duration-300">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>{toastMessage}</span>
          <Check className="w-3.5 h-3.5 text-emerald-400" />
        </div>
      )}
    </div>
  );
}
