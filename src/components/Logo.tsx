import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function Logo({ className = "", size = 48, showText = false }: LogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      {/* Centralized SVG Emblem mirroring the Raven & Shark illustration */}
      <div 
        className="relative flex items-center justify-center transition-transform duration-500 hover:scale-105"
        style={{ width: size, height: size }}
      >
        {/* Subtle dark purple glow behind the emblem to elevate from page blackness */}
        <div className="absolute inset-0 bg-[#5a108f]/20 rounded-full blur-xl animate-pulse-slow"></div>
        
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
        >
          <defs>
            {/* Rich original purple radial gradient background matching the attached image */}
            <radialGradient id="originalLogoBg" cx="50%" cy="50%" r="50%" fx="45%" fy="45%">
              <stop offset="0%" stopColor="#5a108f" />
              <stop offset="60%" stopColor="#310654" />
              <stop offset="100%" stopColor="#150126" />
            </radialGradient>
            
            {/* Vignette ring overlay for the circular emblem edge */}
            <radialGradient id="originalInnerShadow" cx="50%" cy="50%" r="50%">
              <stop offset="85%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
            </radialGradient>
          </defs>

          {/* Background circle of the original logo */}
          <circle cx="50" cy="50" r="47" fill="url(#originalLogoBg)" />
          {/* Inner shadow overlay for organic depth */}
          <circle cx="50" cy="50" r="47" fill="url(#originalInnerShadow)" />

          {/* Original elements in solid pitch black silhouette */}
          
          {/* 1. Large Crescent Brush Stroke (C-shape outer ring wrapping left) */}
          <path
            d="M 45,84 C 28,84 12,68 12,48 C 12,28 28,12 48,12 C 60,12 72,18 78,28 C 80,31 77,34 74,32 C 68,26 58,20 48,20 C 32,20 20,32 20,48 C 20,64 32,76 48,76 C 54,76 60,74 65,71 C 67,70 69,72 67,74 C 60,80 53,84 45,84 Z"
            fill="#050505"
          />

          {/* Dynamic sweeping ring tail/flair accentuating the G/C shape */}
          <path
            d="M 74,22 C 81,29 84,40 82,50 C 81,54 77,53 78,49 C 79,42 77,33 71,27 C 69,25 72,20 74,22 Z"
            fill="#050505"
          />

          {/* 2. Soaring Raven at the Top-Left */}
          <g>
            {/* Left wing pointing up-left */}
            <path
              d="M 38,30 C 33,26 24,18 18,14 C 17,13 16,14 17,16 C 19,20 23,26 26,30 C 21,29 16,28 14,29 C 13,29 13,31 15,32 C 18,34 24,35 28,34 C 24,36 19,39 17,41 C 16,42 17,43 19,43 C 23,42 29,38 34,34"
              fill="#050505"
            />
            {/* Right wing extending back */}
            <path
              d="M 38,30 C 40,25 44,18 48,15 C 49,14 50,15 49,17 C 47,21 44,27 42,31 C 45,30 49,30 52,31 C 53,31 53,33 51,33 C 48,34 43,34 39,34"
              fill="#050505"
            />
            {/* Raven Head and Beak facing right-down */}
            <path
              d="M 38,30 C 39,32 41,34 44,35 C 46,35 47,34 45,33 C 42,32 40,30 38,30 Z"
              fill="#050505"
            />
            {/* Tail feathers extending down-left */}
            <path
              d="M 36,32 C 34,36 32,41 31,43 C 31,44 32,44 33,43 C 35,41 37,36 37,32 Z"
              fill="#050505"
            />
          </g>

          {/* 3. Aggressive Shark on the Right-Center */}
          <g>
            {/* Main body, back, and tail */}
            <path
              d="M 88,52 C 86,46 80,41 72,40 C 64,39 56,41 48,43 C 44,44 42,46 44,48 C 45,49 47,48 49,47 C 54,45 61,44 68,45 C 76,46 82,50 85,55 C 88,60 88,67 86,72 C 83,76 78,80 72,82 C 67,83 66,81 68,79 C 74,76 79,71 82,65 C 84,60 85,55 88,52 Z"
              fill="#050505"
            />
            
            {/* Ferocious open mouth with teeth detail (uses original background gradient as fill to act as negative space) */}
            <path
              d="M 48,43 C 47,44 46,46 48,48 C 50,50 53,52 56,53 C 58,54 59,52 57,51 C 55,50 53,48 51,46 L 53,46 L 52,48 L 50,47 L 51,49 L 49,47 L 48,43 Z"
              fill="url(#originalLogoBg)"
            />
            <path
              d="M 48,43 C 44,44 42,46 44,48 C 45,49 47,48 49,47 Z"
              fill="#050505"
            />

            {/* Dorsal Fin (pointing backwards) */}
            <path
              d="M 72,40 C 73,34 76,28 81,25 C 81,24 82,25 81,27 C 79,31 77,36 75,40 Z"
              fill="#050505"
            />

            {/* Pectoral Fin (pointing downwards-left) */}
            <path
              d="M 62,45 C 60,49 57,55 54,60 C 53,61 54,62 55,61 C 58,57 62,52 64,46 Z"
              fill="#050505"
            />

            {/* Splashing Waves / Liquid at the bottom */}
            <path
              d="M 28,76 C 33,78 39,81 46,81 C 53,81 60,78 65,73 C 61,75 56,76 51,76 C 45,76 39,73 34,70 C 31,68 29,71 28,73 C 27,75 26,78 22,80 C 20,81 22,82 24,82 C 27,82 28,79 28,76 Z"
              fill="#050505"
            />
            <path
              d="M 38,78 C 42,80 47,82 52,82 C 58,82 63,79 67,75 C 64,77 59,78 55,78 C 49,78 44,76 40,73 C 38,71 37,73 38,78 Z"
              fill="#050505"
              opacity="0.3"
            />
          </g>
        </svg>
      </div>

      {showText && (
        <span className="font-display text-2xl font-bold tracking-[0.25em] text-white uppercase mt-1">
          Moræ
        </span>
      )}
    </div>
  );
}
