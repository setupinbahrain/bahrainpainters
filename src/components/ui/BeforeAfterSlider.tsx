"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[600px] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={onMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={onTouchMove}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0 bg-gray-200">
        <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
          <span className="text-secondary font-bold text-2xl drop-shadow-md">AFTER: Premium Wallpaper</span>
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 bg-gray-300"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-white/50">
          <span className="text-gray-600 font-bold text-2xl drop-shadow-md">BEFORE: Faded Paint</span>
        </div>
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary z-10 w-4 h-4 md:w-6 md:h-6">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary z-10 w-4 h-4 md:w-6 md:h-6 absolute right-1">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}
