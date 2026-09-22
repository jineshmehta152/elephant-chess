"use client";

import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useBookDemoModal } from "@/components/ui/BookDemoModal";

export function HeroSection() {
  const { openModal } = useBookDemoModal();

  const ScallopedWave = ({ flip }: { flip?: boolean }) => (
    <div className={`absolute left-0 w-full leading-[0] z-20 ${flip ? "bottom-0" : "top-0 rotate-180"}`}>
      <svg
        viewBox="0 0 1440 48"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-[30px] md:h-[45px] lg:h-[55px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 48H1440V48C1410 48 1395 36 1365 36C1335 36 1320 48 1290 48C1260 48 1245 36 1215 36C1185 36 1170 48 1140 48C1110 48 1095 36 1065 36C1035 36 1020 48 990 48C960 48 945 36 915 36C885 36 870 48 840 48C810 48 795 36 765 36C735 36 720 48 690 48C660 48 645 36 615 36C585 36 570 48 540 48C510 48 495 36 465 36C435 36 420 48 390 48C360 48 345 36 315 36C285 36 270 48 240 48C210 48 195 36 165 36C135 36 120 48 90 48C60 48 45 36 15 36C7.5 36 0 42 0 48Z"
          fill="white"
        />
      </svg>
    </div>
  );

  return (
    <div className="relative flex flex-col w-full bg-[#0A1128] overflow-hidden max-w-full">
      {/* --- HERO SECTION WITH REGENERATED FULL BACKGROUND HAPPY KIDS IMAGE & CENTERED TEXT --- */}
      <section className="relative w-full flex items-center justify-center overflow-hidden max-w-full font-sans py-16 md:py-24">
        
        {/* --- FULL BACKGROUND REGENERATED HAPPY KIDS IMAGE --- */}
        <div className="absolute inset-0 z-0">
          <img
            src="/happy-kids-generated.jpg"
            alt="Happy Kids Playing Chess at Elephant Chess Academy"
            className="w-full h-full object-cover object-center"
          />
          {/* High-Contrast Overlay Gradients for Perfect Text Visibility */}
          <div className="absolute inset-0 bg-[#0A1128]/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/20 via-[#0A1128]/20 to-[#0A1128]/20" />
        </div>

        {/* --- SCALLOPED EDGES --- */}
        <ScallopedWave />
        <ScallopedWave flip />

        {/* --- AMBIENT BRAND LIGHTING --- */}
        <div className="absolute inset-0 z-10 opacity-40 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#29A3DD]/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#FDB813]/25 rounded-full blur-[100px]" />
        </div>

        {/* --- CENTERED HERO CONTENT --- */}
        <div className="container relative z-30 mx-auto px-4 md:px-8 max-w-4xl text-center flex flex-col items-center">
          
          {/* Top Brand Tagline Badge */}
          <div className="mb-5 inline-block">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#0A1128]/90 border-2 border-[#29A3DD]/50 backdrop-blur-md shadow-xl">
               <img src="/logo.jpg" alt="Elephant Logo" className="w-6 h-6 rounded-full object-cover border border-[#29A3DD]" />
               <span className="text-white font-black text-xs md:text-sm tracking-[0.16em] uppercase">
                 Elephant Chess Academy • Joyful FIDE Certified Coaching
               </span>
            </div>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-5xl font-[1000] text-white leading-[1.1] tracking-tighter uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] max-w-3xl">
            WHERE KIDS <span className="text-[#38B6FF] italic font-serif">LOVE CHESS</span> <br className="hidden sm:block" />
            AND BUILD <span className="bg-gradient-to-r from-[#FDB813] via-amber-300 to-yellow-400 bg-clip-text text-transparent drop-shadow">CHAMPION</span> MINDS.
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-white text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Join 1,000+ happy young players developing focus, IQ, and strategic thinking with certified master coaches. Interactive batches for ages 5 to 16.
          </p>

          {/* Key Benefit Capsules */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0A1128]/85 backdrop-blur-md border border-white/30 text-xs md:text-sm font-extrabold text-white shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-[#FDB813] shrink-0" />
              <span>FIDE Certified Trainers</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0A1128]/85 backdrop-blur-md border border-white/30 text-xs md:text-sm font-extrabold text-white shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-[#38B6FF] shrink-0" />
              <span>Interactive PGN Puzzles</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0A1128]/85 backdrop-blur-md border border-white/30 text-xs md:text-sm font-extrabold text-white shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-[#FDB813] shrink-0" />
              <span>Online & Physical Batches</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full sm:w-auto">
            <button 
              onClick={() => {
                openModal();
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("open-book-demo"));
                }
              }}
              className="w-full sm:w-auto h-12 md:h-14 px-8 md:px-10 bg-gradient-to-r from-[#29A3DD] via-sky-500 to-cyan-400 hover:from-sky-400 hover:to-[#29A3DD] text-white rounded-xl text-sm md:text-base font-black uppercase tracking-wider shadow-[0_10px_30px_rgba(41,163,221,0.6)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer z-30"
            >
              <span>Book Free Demo Class</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <Link href="/courses" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto h-12 md:h-14 px-8 md:px-9 text-white bg-[#0A1128]/70 hover:bg-white/20 rounded-xl text-sm md:text-base font-bold border-2 border-white/40 backdrop-blur-md uppercase tracking-wider transition-all hover:border-white">
                Explore Courses
              </button>
            </Link>
          </div>

       

        </div>
      </section>
    </div>
  );
}

export default HeroSection;