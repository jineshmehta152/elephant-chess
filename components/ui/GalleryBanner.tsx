"use client";

import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Trophy, Sparkles } from 'lucide-react';

interface GalleryBannerProps {
  bgImage?: string;
}

const GalleryBanner: React.FC<GalleryBannerProps> = ({ bgImage = "/blog3.jpeg" }) => {
  return (
    <div
      className="relative w-full bg-cover bg-center overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 border-b border-white/10 select-none"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark Navy Overlay & Matrix Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/95 via-[#0A1128]/90 to-[#0A1128]/98 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1.5px,transparent_1.5px)] [background-size:20px_20px] z-0 pointer-events-none" />

      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#29A3DD]/15 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FDB813]/15 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4"></div>

      {/* Floating Mascot & Chess Watermarks */}
      <div className="absolute top-20 right-[15%] opacity-10 text-white transform rotate-12 hidden lg:block text-6xl">
        🐘
      </div>
      
      <div className="absolute bottom-10 left-[10%] opacity-10 text-[#FDB813] transform -rotate-12 hidden lg:block text-5xl">
        👑
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
          <Trophy className="w-4 h-4 text-[#FDB813]" />
          <span className="text-[10px] md:text-xs font-black text-sky-200 uppercase tracking-[0.2em]">
            Visual Moments & Celebrations
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-[1000] text-white mb-6 tracking-tight leading-none uppercase">
          Academy <span className="bg-gradient-to-r from-[#29A3DD] via-sky-300 to-[#FDB813] bg-clip-text text-transparent italic">Moments</span>
        </h1>
        
        {/* Description */}
        <p className="text-base md:text-lg text-sky-100 max-w-2xl mb-10 leading-relaxed font-semibold">
          Glimpses of students mastering tactics, receiving championship trophies, and celebrating chess victories.
        </p>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-3 text-sm font-bold bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/20 shadow-md">
          <Link href="/" className="text-slate-300 hover:text-[#FDB813] transition-colors flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          
          <ChevronRight className="w-4 h-4 text-slate-400" strokeWidth={3} />
          
          <span className="text-[#FDB813] font-black uppercase tracking-widest text-xs">
            Gallery Showcase
          </span>
        </nav>

      </div>

    </div>
  );
};

export default GalleryBanner;