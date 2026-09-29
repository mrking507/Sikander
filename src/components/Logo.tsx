/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
}) => {
  const sizeMap = {
    sm: { icon: 30, text: 'text-base', subtext: 'text-[9px]' },
    md: { icon: 38, text: 'text-lg', subtext: 'text-[10px]' },
    lg: { icon: 52, text: 'text-2xl', subtext: 'text-[11px]' },
  };

  const { icon, text, subtext } = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Handcrafted Luxury Emblem */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:rotate-6"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="35%" stopColor="#E2BD54" />
              <stop offset="70%" stopColor="#C59B27" />
              <stop offset="100%" stopColor="#7E5813" />
            </linearGradient>
            <linearGradient id="innerDial" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#18181D" />
              <stop offset="100%" stopColor="#0B0B0E" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Octagonal Bezel */}
          <polygon
            points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30"
            fill="url(#innerDial)"
            stroke="url(#goldGradient)"
            strokeWidth="3.5"
          />

          {/* Minute Track Ring */}
          <circle
            cx="50"
            cy="50"
            r="38"
            stroke="#554418"
            strokeWidth="1"
            strokeDasharray="2 3"
          />

          {/* 4 Cardinal Screws */}
          <circle cx="50" cy="11" r="2.2" fill="url(#goldGradient)" />
          <circle cx="89" cy="50" r="2.2" fill="url(#goldGradient)" />
          <circle cx="50" cy="89" r="2.2" fill="url(#goldGradient)" />
          <circle cx="11" cy="50" r="2.2" fill="url(#goldGradient)" />

          {/* Interlocked Luxury Monogram 'SK' */}
          {/* Letter S */}
          <path
            d="M34 64 C30 58, 30 50, 42 49 C49 48, 52 44, 51 40 C50 35, 43 34, 38 37 C34 39, 32 44, 32 44"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M32 44 C34 39, 40 33, 49 33 C60 33, 62 43, 56 48 C50 52, 38 54, 38 61 C38 68, 47 69, 52 66"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Letter K */}
          <path
            d="M60 30 L60 70"
            stroke="url(#goldGradient)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M48 48 L68 31"
            stroke="url(#goldGradient)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M51 45 L69 69"
            stroke="url(#goldGradient)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Central Precision Jewel Point */}
          <circle cx="50" cy="50" r="2" fill="#FFE885" />
        </svg>
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col tracking-wider">
        <span
          className={`font-serif ${text} font-bold tracking-[0.22em] text-white transition-colors duration-200 group-hover:text-gold-300`}
          style={{ fontFamily: 'Cinzel, Georgia, serif' }}
        >
          SK <span className="text-gold-400 font-medium">WATCHES</span>
        </span>
        {showTagline ? (
          <span className={`text-gold-400/80 font-mono ${subtext} tracking-[0.35em] uppercase`}>
            Time is Your Style
          </span>
        ) : (
          <span className={`text-stone-400 font-mono ${subtext} tracking-[0.28em] uppercase`}>
            Haute Horlogerie
          </span>
        )}
      </div>
    </div>
  );
};
