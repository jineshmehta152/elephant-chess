"use client";

import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Star, Sparkles, BookOpen } from 'lucide-react';

const ChessBanner: React.FC = () => {
  return (
    <div className="relative w-full bg-[#0A1128] overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20 border-b border-white/10">
      
      {/* --- Background Decorative Elements --- */}
      <div className="absolute inset-0 opacity-[0.06]" 
           style={{ backgroundImage: 'radial-gradient(#29A3DD 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* Glowing Spotlights */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#29A3DD]/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/3 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FDB813]/20 rounded-full blur-[80px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      {/* Floating Elements */}
      <div className="absolute top-24 left-10 md:left-20 opacity-20 text-[#FDB813] animate-bounce-slow">
        <Star className="w-12 h-12 fill-[#FDB813]" />
      </div>

      <div className="absolute top-1/3 right-10 md:right-32 opacity-10 text-sky-300 transform rotate-12 hidden md:block">
        <BookOpen className="w-24 h-24" />
      </div>

      <div className="absolute bottom-20 left-1/3 text-[#29A3DD] opacity-30 animate-pulse">
        <Sparkles className="w-8 h-8" />
      </div>

      {/* --- Main Content --- */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-[1000] text-white mb-6 tracking-tight uppercase">
          Elephant Chess <span className="bg-gradient-to-r from-[#29A3DD] via-sky-300 to-[#FDB813] bg-clip-text text-transparent italic">Academy</span>
        </h1>
        
        <p className="text-sm md:text-base text-sky-100 max-w-2xl mb-8 leading-relaxed font-semibold">
          Where young minds master the art of grand strategy, tactical calculation, and the joy of championship victory.
        </p>

        {/* Breadcrumb Navigation */}
        <nav className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
          <Link href="/" className="text-slate-300 hover:text-[#FDB813] transition-colors flex items-center gap-1.5 text-xs font-bold">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" strokeWidth={3} />
          
          <span className="text-[#FDB813] font-black text-xs uppercase tracking-wider">
            Chess Academy
          </span>
        </nav>

      </div>

      {/* --- CSS Animation --- */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
};

export default ChessBanner;