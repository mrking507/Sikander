/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WatchSpecs {
  caseMaterial: string;
  caseDiameter: string;
  movement: string;
  waterResistance: string;
  powerReserve: string;
  strap: string;
  dialFinish: string;
  crystal: string;
}

export interface Watch {
  id: string;
  name: string;
  subtitle: string;
  collection: 'Chronograph' | 'Skeleton Tourbillon' | 'Grand Complication' | 'Royal Heritage' | 'Celestial Night';
  category: 'mens' | 'womens' | 'unisex';
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  editionTag?: string;
  images: string[];
  description: string;
  horologicalDetails: string;
  specs: WatchSpecs;
  features: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  inStock: boolean;
  stockCount?: number;
}

export interface CustomerReview {
  id: string;
  author: string;
  role: string;
  location: string;
  watchModel: string;
  rating: number;
  date: string;
  headline: string;
  reviewText: string;
  verifiedBuyer: boolean;
  isDemoNotice: boolean;
}

export interface CartItem {
  watch: Watch;
  quantity: number;
  selectedStrap: string;
}
