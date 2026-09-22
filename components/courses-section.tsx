"use client";

import React, { useState } from "react";
import { useBookDemoModal } from "@/components/ui/BookDemoModal";
import { Bookmark, CheckCircle2, Brain, BarChart2, Shield, ChevronRight } from "lucide-react";

interface ProgramData {
  id: string;
  programNo: string;
  tabTitle: string;
  badgeLabel: string;
  subCategory: string;
  mainTitle: string;
  image: string;
  description: string;
  cognitiveFocus: string;
  masteryCurve: string;
  masteryPercentage: number;
  outcomes: string[];
}

const programs: ProgramData[] = [
  {
    id: "beginner",
    programNo: "PROGRAM 01",
    tabTitle: "BEGINNER COURSE",
    badgeLabel: "PROGRAM 01",
    subCategory: "FOUNDATIONAL RULES & PIECE ACTIVATION",
    mainTitle: "BEGINNER COURSE",
    image: "/level-beginner-elephant.jpg",
    description:
      "Master piece movement, fundamental rules, spatial reasoning, and basic checkmate patterns under expert guidance.",
    cognitiveFocus: "SPATIAL REASONING",
    masteryCurve: "85%",
    masteryPercentage: 85,
    outcomes: [
      "Board Vision & Piece Movement Mastery",
      "Core Opening Principles (Center Control & Castling)",
      "Essential Checkmate Patterns (Rook & Queen Mate)",
      "Basic Tactical Safety & En Passant Rules",
    ],
  },
  {
    id: "adv-beginner",
    programNo: "PROGRAM 02",
    tabTitle: "ADVANCED BEGINNER",
    badgeLabel: "PROGRAM 02",
    subCategory: "TACTICAL VISION & COMBINATIONS",
    mainTitle: "ADVANCED BEGINNER",
    image: "/level-adv-beginner-elephant.jpg",
    description:
      "Deepen tactical awareness, eliminate one-move blunders, calculate basic combinations, and build solid opening setups.",
    cognitiveFocus: "TACTICAL CALCULATION",
    masteryCurve: "80%",
    masteryPercentage: 80,
    outcomes: [
      "Tactical Pins, Skewers & Double Attacks",
      "Center Dominance & Rapid Piece Development",
      "Elementary King & Pawn Endgame Technique",
      "2–3 Move Calculation Depth in Live Matches",
    ],
  },
  {
    id: "intermediate",
    programNo: "PROGRAM 03",
    tabTitle: "INTERMEDIATE MASTERY",
    badgeLabel: "PROGRAM 03",
    subCategory: "POSITIONAL PLANNING & ACTIVE ENDGAMES",
    mainTitle: "INTERMEDIATE MASTERY",
    image: "/level-intermediate-elephant.jpg",
    description:
      "Formulate middle-game strategies, exploit pawn weaknesses, control open files, and navigate complex tactical positions.",
    cognitiveFocus: "POSITIONAL LOGIC",
    masteryCurve: "75%",
    masteryPercentage: 75,
    outcomes: [
      "Middle-Game Positional Planning & Outposts",
      "Open File Control & Active Rook Activity",
      "Complex Tactical Combinations & Deflections",
      "Practical King & Pawn Endgame Conversions",
    ],
  },
  {
    id: "advanced-expert",
    programNo: "PROGRAM 04",
    tabTitle: "ADVANCED EXPERT",
    badgeLabel: "PROGRAM 04",
    subCategory: "TOURNAMENT PREPARATION & FIDE NORMS",
    mainTitle: "ADVANCED EXPERT",
    image: "/level-grandmaster-elephant.jpg",
    description:
      "Comprehensive competitive training featuring structured opening databases, candidate move discipline, and titled-player coaching.",
    cognitiveFocus: "GRANDMASTER STRATEGY",
    masteryCurve: "95%",
    masteryPercentage: 95,
    outcomes: [
      "Personalized Opening Repertoire Construction",
      "Candidate Move Calculation Discipline",
      "Prophylaxis & Positional Pawn Sacrifices",
      "FIDE Tournament Clock & Increment Control",
    ],
  },
];

export const CoursesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("beginner");
  const { openModal } = useBookDemoModal();

  const currentProgram = programs.find((p) => p.id === activeTab) || programs[0];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-sky-50/30 to-slate-50 relative overflow-hidden">
      
      {/* Ambient Brand Glowing Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[#29A3DD]/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#FDB813]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Vector Doodle Elements */}
      <div className="absolute top-12 left-10 text-4xl opacity-20 select-none pointer-events-none animate-pulse">
        🐘
      </div>
      <div className="absolute top-28 right-16 text-3xl opacity-20 select-none pointer-events-none">
        👑
      </div>
      <div className="absolute bottom-16 left-16 text-3xl opacity-20 select-none pointer-events-none">
        ⭐
      </div>
      <div className="absolute bottom-24 right-12 text-4xl opacity-20 select-none pointer-events-none">
        ♟️
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#29A3DD] font-black text-xs uppercase tracking-widest shadow-xs">
            <span>🐘</span>
            <span>STRUCTURED CHESS PATHWAY</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 tracking-tight leading-none uppercase">
            FEATURED CHESS <span className="bg-gradient-to-r from-[#29A3DD] via-sky-500 to-[#FDB813] bg-clip-text text-transparent">COURSES</span>
          </h2>

          <p className="text-slate-600 font-semibold italic text-base md:text-lg">
            "Watch your child grow from playful beginner to crowned master strategist."
          </p>
        </div>

        {/* --- MAIN HIGH-CONTRAST CARD CONTAINER --- */}
        <div className="rounded-[2rem] md:rounded-[2.5rem] border-[3px] border-black bg-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

          {/* Top 4-Tab Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 bg-[#141414] border-b-[3px] border-black">
            {programs.map((program) => {
              const isActive = activeTab === program.id;
              return (
                <button
                  key={program.id}
                  onClick={() => setActiveTab(program.id)}
                  className={`py-4 px-3 text-center transition-all cursor-pointer border-r-[2px] border-black last:border-r-0 ${
                    isActive
                      ? "bg-[#c07828] text-black"
                      : "bg-[#141414] text-white hover:bg-[#202020]"
                  }`}
                >
                  <span
                    className={`text-[10px] sm:text-xs font-black uppercase tracking-widest block mb-1 ${
                      isActive ? "text-black/80" : "text-slate-400"
                    }`}
                  >
                    {program.programNo}
                  </span>
                  <span
                    className={`text-xs sm:text-sm md:text-base font-[1000] uppercase tracking-tight leading-tight ${
                      isActive ? "text-black" : "text-white"
                    }`}
                  >
                    {program.tabTitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 md:p-12 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

              {/* LEFT COLUMN: Photo Card & Metrics Box */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                
                {/* Image Container with Badge */}
                <div className="rounded-3xl border-[3px] border-black overflow-hidden relative aspect-[4/3] sm:aspect-[16/11] bg-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group">
                  {/* Overlay Badge */}
                  <div className="absolute top-4 left-4 bg-[#2563eb] text-white font-[1000] text-[11px] uppercase tracking-widest px-3.5 py-1 rounded-full border-2 border-black shadow-sm z-10">
                    {currentProgram.badgeLabel}
                  </div>

                  <img
                    src={currentProgram.image}
                    alt={currentProgram.mainTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Bottom Metrics Pill Box */}
                <div className="rounded-2xl border-[3px] border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
                  {/* Cognitive Focus */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center shrink-0">
                      <Brain className="w-4 h-4 text-slate-900 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block leading-none">
                        COGNITIVE FOCUS
                      </span>
                      <span className="text-xs sm:text-sm font-[1000] uppercase text-black block mt-1 leading-tight">
                        {currentProgram.cognitiveFocus}
                      </span>
                    </div>
                  </div>

                  {/* Mastery Curve */}
                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block leading-none">
                        MASTERY CURVE
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-16 sm:w-20 h-2.5 bg-slate-200 border border-black rounded-full overflow-hidden inline-block">
                          <div
                            className="bg-[#2563eb] h-full rounded-full transition-all duration-500"
                            style={{ width: currentProgram.masteryCurve }}
                          />
                        </div>
                        <span className="text-xs sm:text-sm font-[1000] text-black">
                          {currentProgram.masteryCurve}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Details & Action Button */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                
                {/* Subcategory & Title */}
                <div className="space-y-2">
                  <div className="text-[#b47226] text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Bookmark className="w-4 h-4 fill-[#b47226] stroke-[#b47226]" />
                    <span>{currentProgram.subCategory}</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] italic uppercase text-black tracking-tight leading-none">
                    {currentProgram.mainTitle}
                  </h2>

                  <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed pt-1">
                    {currentProgram.description}
                  </p>
                </div>

                {/* Learning Outcomes Box */}
                <div className="rounded-2xl border-[3px] border-black p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-[1000] uppercase tracking-wide text-black">
                    <CheckCircle2 className="w-4 h-4 text-black fill-black text-white stroke-[2.5]" />
                    <span>LEARNING OUTCOMES:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 pt-1">
                    {currentProgram.outcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                        <span className="text-black font-black text-sm leading-none">•</span>
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={openModal}
                  className="w-full py-4 px-6 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-[1000] text-xs sm:text-sm md:text-base uppercase tracking-wider rounded-2xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2.5 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <Shield className="w-5 h-5 stroke-[2.5]" />
                  <span>BOOK TRIAL SESSION FOR {currentProgram.mainTitle}</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CoursesSection;
