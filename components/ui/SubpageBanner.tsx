"use client";

import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import * as Icons from "lucide-react";

interface SubpageBannerProps {
  title: string;
  highlight: string;
  subtitle: string;
  breadcrumbLabel: string;
  bgImage?: string;
  widgetLeft1Icon?: string;
  widgetLeft1Label?: string;
  widgetLeft1Value?: string;
  widgetLeft2Icon?: string;
  widgetLeft2Label?: string;
  widgetLeft2Value?: string;
  widgetRightIcon?: string;
  widgetRightLabel?: string;
  widgetRightValue?: string;
}

const SubpageBanner: React.FC<SubpageBannerProps> = ({
  title,
  highlight,
  subtitle,
  breadcrumbLabel,
  bgImage = "/inter.jpg",
  widgetLeft1Icon = "BookOpen",
  widgetLeft1Label,
  widgetLeft1Value,
  widgetLeft2Icon = "Award",
  widgetLeft2Label,
  widgetLeft2Value,
  widgetRightIcon = "Globe",
  widgetRightLabel,
  widgetRightValue,
}) => {
  // Helper to dynamically render Lucide Icons by name
  const renderIcon = (iconName?: string) => {
    if (!iconName) return null;
    const LucideIcon = (Icons as any)[iconName];
    if (!LucideIcon) return null;
    return <LucideIcon className="w-5 h-5 stroke-[2.5]" />;
  };

  return (
    <div
      className="relative w-full bg-cover bg-center pt-24 pb-32 sm:pt-32 sm:pb-40 md:pt-40 md:pb-52 overflow-hidden select-none"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Deep Navy High-Tech Overlay & Matrix Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/95 via-[#0A1128]/90 to-[#0A1128]/98 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1.5px,transparent_1.5px)] [background-size:20px_20px] z-0 pointer-events-none" />

      {/* Ambient Glowing Spotlights */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#29A3DD]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#FDB813]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Chess & Elephant Subtle Watermarks */}
      <div className="absolute top-16 left-8 text-6xl opacity-10 select-none pointer-events-none animate-float hidden md:block">
        🐘
      </div>
      <div className="absolute bottom-24 right-10 text-5xl opacity-10 select-none pointer-events-none animate-bounce-slow hidden md:block">
        👑
      </div>
      <div className="absolute top-20 right-1/3 text-4xl opacity-10 select-none pointer-events-none hidden lg:block">
        ♞
      </div>

      {/* ── Floating Interactive Glassmorphism / Neo-Brutalist Badges ── */}
      
      {/* Widget 1: LEFT 1 */}
      {widgetLeft1Label && (
        <div className="hidden lg:flex absolute top-1/4 left-8 xl:left-20 bg-slate-950/70 backdrop-blur-md border-2 border-white/20 rounded-2xl p-4 items-center gap-3.5 shadow-[4px_4px_0px_0px_rgba(41,163,221,0.5)] z-10 select-none animate-float">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#29A3DD] to-sky-600 text-white flex items-center justify-center shrink-0 border border-white/30 shadow-md">
            {renderIcon(widgetLeft1Icon)}
          </div>
          <div>
            <p className="text-[9px] font-black uppercase text-sky-200 tracking-wider">{widgetLeft1Label}</p>
            <p className="text-xs font-[1000] text-white mt-0.5">{widgetLeft1Value}</p>
          </div>
        </div>
      )}

      {/* Widget 2: LEFT 2 */}
      {widgetLeft2Label && (
        <div className="hidden lg:flex absolute bottom-1/4 left-12 xl:left-32 bg-slate-950/70 backdrop-blur-md border-2 border-white/20 rounded-2xl p-4 items-center gap-3.5 shadow-[4px_4px_0px_0px_rgba(253,184,19,0.5)] z-10 select-none animate-bounce-slow">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FDB813] to-amber-500 text-slate-950 flex items-center justify-center shrink-0 border border-white/40 shadow-md">
            {renderIcon(widgetLeft2Icon)}
          </div>
          <div>
            <p className="text-[9px] font-black uppercase text-amber-200 tracking-wider">{widgetLeft2Label}</p>
            <p className="text-xs font-[1000] text-white mt-0.5">{widgetLeft2Value}</p>
          </div>
        </div>
      )}

      {/* Widget 3: RIGHT */}
      {widgetRightLabel && (
        <div className="hidden lg:flex absolute top-1/3 right-8 xl:right-24 bg-slate-950/70 backdrop-blur-md border-2 border-white/20 rounded-2xl p-4 items-center gap-3.5 shadow-[4px_4px_0px_0px_rgba(41,163,221,0.5)] z-10 select-none animate-float">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#29A3DD] to-blue-600 text-white flex items-center justify-center shrink-0 border border-white/30 shadow-md">
            {renderIcon(widgetRightIcon)}
          </div>
          <div>
            <p className="text-[9px] font-black uppercase text-sky-200 tracking-wider">{widgetRightLabel}</p>
            <p className="text-xs font-[1000] text-white mt-0.5">{widgetRightValue}</p>
          </div>
        </div>
      )}

      {/* ── Main Banner Content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Breadcrumb Navigation Capsule */}
        <nav className="inline-flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 text-[11px] sm:text-xs font-black uppercase tracking-widest text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] transition-all hover:border-white/40 mb-4 sm:mb-6">
          <Link href="/" className="hover:text-[#FDB813] transition-colors flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Home</span>
          </Link>
          <span className="text-white/40 font-bold">&gt;</span>
          <span className="text-[#FDB813] font-[1000]">{breadcrumbLabel}</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-[1000] text-white tracking-tight leading-tight mb-4 sm:mb-6 uppercase">
          {title}{" "}
          <span className="bg-gradient-to-r from-[#29A3DD] via-sky-300 to-[#FDB813] bg-clip-text text-transparent italic font-serif">
            {highlight}
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base font-bold text-sky-100 tracking-wide sm:tracking-[0.15em] leading-relaxed max-w-2xl uppercase">
          {subtitle}
        </p>

      </div>

      {/* Smooth Organic Wave Divider SVG at bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none select-none">
        <svg
          className="relative block w-full h-[40px] md:h-[60px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1130.5,123,1059.8,112.4,985.66,92.83Z"
            className="fill-[#F8FAFC]"
          />
        </svg>
      </div>

      {/* Keyframe animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: float 6s ease-in-out infinite 1.5s;
        }
      `}</style>
    </div>
  );
};

export default SubpageBanner;

