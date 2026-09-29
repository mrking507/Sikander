/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface WatchImageProps {
  src: string;
  alt: string;
  modelName?: string;
  collection?: string;
  className?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export const WatchImage: React.FC<WatchImageProps> = ({
  src,
  alt,
  modelName = 'SK Masterpiece',
  collection = 'Chronograph',
  className = '',
  aspectRatio = 'square',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClass = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[16/9]',
  }[aspectRatio];

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-b from-[#18181c] to-[#0c0c0e] ${aspectClass} ${className} flex items-center justify-center`}
    >
      {/* Ambient Gold Radial Glow Behind Watch */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.12),transparent_70%)] pointer-events-none" />

      {/* Primary Image */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Styled Luxury Vector Watch Dial Fallback if image unavailable */}
      {hasError && (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 select-none">
          <svg
            viewBox="0 0 200 200"
            className="w-4/5 h-4/5 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`goldBezel-${modelName}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#faecd0" />
                <stop offset="30%" stopColor="#d4af37" />
                <stop offset="70%" stopColor="#967215" />
                <stop offset="100%" stopColor="#3d2a04" />
              </linearGradient>
              <radialGradient id={`dialBg-${modelName}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1e1e24" />
                <stop offset="85%" stopColor="#09090b" />
                <stop offset="100%" stopColor="#050507" />
              </radialGradient>
            </defs>

            {/* Watch Bracelet Links Top & Bottom */}
            <rect x="75" y="0" width="50" height="25" rx="3" fill="#1b1b20" stroke="url(#goldBezel-`+modelName+`)" strokeWidth="1.5" />
            <rect x="75" y="175" width="50" height="25" rx="3" fill="#1b1b20" stroke="url(#goldBezel-`+modelName+`)" strokeWidth="1.5" />

            {/* Outer Bezel */}
            <circle cx="100" cy="100" r="75" fill="#0d0d10" stroke="url(#goldBezel-`+modelName+`)" strokeWidth="7" />
            {/* Fluted Edge Rim */}
            <circle cx="100" cy="100" r="70" stroke="#f1dc93" strokeWidth="0.8" strokeDasharray="1.5 2.5" />

            {/* Dial Face */}
            <circle cx="100" cy="100" r="67" fill={`url(#dialBg-${modelName})`} />

            {/* Dial Guilloché Rings */}
            <circle cx="100" cy="100" r="54" stroke="#d4af37" strokeWidth="0.5" strokeOpacity="0.25" />
            <circle cx="100" cy="100" r="38" stroke="#d4af37" strokeWidth="0.5" strokeOpacity="0.2" />

            {/* Sub-dials for Chronograph */}
            <circle cx="78" cy="100" r="14" fill="#08080a" stroke="#d4af37" strokeWidth="1" strokeOpacity="0.6" />
            <circle cx="122" cy="100" r="14" fill="#08080a" stroke="#d4af37" strokeWidth="1" strokeOpacity="0.6" />
            <circle cx="100" cy="122" r="14" fill="#08080a" stroke="#d4af37" strokeWidth="1" strokeOpacity="0.6" />

            {/* Hour Markers (Gold Indices) */}
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="37"
                x2="100"
                y2={i % 3 === 0 ? "44" : "41"}
                stroke="#ecd58b"
                strokeWidth={i % 3 === 0 ? "2.5" : "1.5"}
                strokeLinecap="round"
                transform={`rotate(${i * 30} 100 100)`}
              />
            ))}

            {/* SK Brand Name on Dial */}
            <text x="100" y="70" textAnchor="middle" fill="#f5eed3" fontSize="6.5" fontFamily="Cinzel, serif" fontWeight="600" letterSpacing="1">
              SK
            </text>
            <text x="100" y="76" textAnchor="middle" fill="#c59b27" fontSize="3.5" fontFamily="sans-serif" letterSpacing="0.8">
              GENÈVE
            </text>

            {/* Hour & Minute Hands */}
            <line x1="100" y1="100" x2="80" y2="78" stroke="#f6e8b5" strokeWidth="3" strokeLinecap="round" />
            <line x1="100" y1="100" x2="128" y2="92" stroke="#d4af37" strokeWidth="2.2" strokeLinecap="round" />
            {/* Red / Gold Chrono Seconds Hand */}
            <line x1="100" y1="112" x2="100" y2="46" stroke="#e04040" strokeWidth="1" strokeLinecap="round" />
            <circle cx="100" cy="100" r="3.5" fill="#fdf3cb" stroke="#7e5813" strokeWidth="0.8" />
          </svg>
          <span className="text-[10px] text-stone-400 font-mono tracking-widest uppercase mt-2">
            {collection}
          </span>
        </div>
      )}

      {/* Subtle Specular Sheen on Hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};
