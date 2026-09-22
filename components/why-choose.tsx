"use client";

import React from "react";
import { Trophy, Swords, Puzzle, ClipboardCheck, Users, Target, Zap } from "lucide-react";
import { useBookDemoModal } from "@/components/ui/BookDemoModal";

export const WhyChooseUsSection: React.FC = () => {
  const { openModal } = useBookDemoModal();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-sky-50/40 to-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#29A3DD]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-sky-100 border border-sky-200 text-[#29A3DD] text-xs font-black uppercase tracking-widest shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-[#29A3DD]" />
            <span>THE ELEPHANT ADVANTAGE</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl lg:text-5xl font-[1000] text-slate-900 tracking-tight leading-none uppercase">
            WHY CHOOSE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#29A3DD] via-sky-500 to-[#FDB813]">
              ELEPHANT CHESS
            </span>
          </h2>

          {/* Subtitle Quote */}
          <p className="text-slate-600 font-semibold italic text-base md:text-xl">
            "Turning passion into performance through strategic thinking."
          </p>
        </div>

        {/* --- MAIN 3-COLUMN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* LEFT COLUMN: 3 Cards */}
          <div className="lg:col-span-4 space-y-5">
            {/* Card 1: Weekend Tournaments */}
            <div className="bg-white rounded-2xl p-5 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(10,17,40,1)] hover:-translate-y-1 transition-transform duration-200 flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-white border-2 border-slate-900 text-slate-900 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#29A3DD] group-hover:text-white transition-colors">
                <Trophy className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase tracking-tight group-hover:text-[#29A3DD] transition-colors">
                  WEEKEND TOURNAMENTS
                </h3>
                <p className="text-slate-600 text-xs font-medium leading-snug mt-0.5">
                  Competitive online & offline tournaments every weekend to test your skills.
                </p>
              </div>
            </div>

            {/* Card 2: Training Camps */}
            <div className="bg-white rounded-2xl p-5 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(10,17,40,1)] hover:-translate-y-1 transition-transform duration-200 flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-[#FDB813] border-2 border-slate-900 text-slate-950 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#29A3DD] group-hover:text-white transition-colors">
                <Swords className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase tracking-tight group-hover:text-[#29A3DD] transition-colors">
                  TRAINING CAMPS
                </h3>
                <p className="text-slate-600 text-xs font-medium leading-snug mt-0.5">
                  Intensive masterclasses designed to break plateaus quickly.
                </p>
              </div>
            </div>

            {/* Card 3: Puzzle Contests */}
            <div className="bg-white rounded-2xl p-5 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(10,17,40,1)] hover:-translate-y-1 transition-transform duration-200 flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-sky-100 border-2 border-slate-900 text-[#29A3DD] flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#29A3DD] group-hover:text-white transition-colors">
                <Puzzle className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase tracking-tight group-hover:text-[#29A3DD] transition-colors">
                  PUZZLE CONTESTS
                </h3>
                <p className="text-slate-600 text-xs font-medium leading-snug mt-0.5">
                  Daily tactics challenges to sharpen calculation and vision.
                </p>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: ELEPHANT MASCOT EMBLEM */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center py-6">
            <div className="relative group">
              {/* Outer Dashed Ring */}
              <div className="w-68 h-68 md:w-76 md:h-76 rounded-full border-4 border-dashed border-[#29A3DD]/50 animate-[spin_60s_linear_infinite] absolute -inset-3" />

              {/* Central Mascot Circle with Thick Border & Doodle Image */}
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-full bg-amber-400 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(10,17,40,1)] flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/elephant-doodle.jpg"
                  alt="Elephant Chess Academy Mascot Doodle"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

               
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3 Cards */}
          <div className="lg:col-span-4 space-y-5">
            {/* Card 4: Student Reports */}
            <div className="bg-white rounded-2xl p-5 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(10,17,40,1)] hover:-translate-y-1 transition-transform duration-200 flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-[#FDB813] border-2 border-slate-900 text-slate-950 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#29A3DD] group-hover:text-white transition-colors">
                <ClipboardCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase tracking-tight group-hover:text-[#29A3DD] transition-colors">
                  STUDENT REPORTS
                </h3>
                <p className="text-slate-600 text-xs font-medium leading-snug mt-0.5">
                  Monthly data to track progress, rating gains, and accountability.
                </p>
              </div>
            </div>

            {/* Card 5: Hybrid Sessions */}
            <div className="bg-white rounded-2xl p-5 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(10,17,40,1)] hover:-translate-y-1 transition-transform duration-200 flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-sky-100 border-2 border-slate-900 text-[#29A3DD] flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#29A3DD] group-hover:text-white transition-colors">
                <Users className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase tracking-tight group-hover:text-[#29A3DD] transition-colors">
                  HYBRID SESSIONS
                </h3>
                <p className="text-slate-600 text-xs font-medium leading-snug mt-0.5">
                  Interactive online classes and focused offline classroom sessions.
                </p>
              </div>
            </div>

            {/* Card 6: Tournament Prep */}
            <div className="bg-white rounded-2xl p-5 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(10,17,40,1)] hover:-translate-y-1 transition-transform duration-200 flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-amber-400 border-2 border-slate-900 text-slate-950 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#29A3DD] group-hover:text-white transition-colors">
                <Target className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase tracking-tight group-hover:text-[#29A3DD] transition-colors">
                  TOURNAMENT PREP
                </h3>
                <p className="text-slate-600 text-xs font-medium leading-snug mt-0.5">
                  Expert opening prep and pro-level mindset coaching.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* --- BOTTOM PILL BADGE BUTTON --- */}
        <div className="text-center mt-14">
          <button
            onClick={openModal}
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white border-2 border-slate-900 rounded-full font-black text-xs md:text-sm uppercase tracking-widest text-slate-900 shadow-[4px_4px_0px_0px_rgba(10,17,40,1)] hover:bg-[#29A3DD] hover:text-white hover:border-[#29A3DD] transition-all duration-200 cursor-pointer"
          >
            PROFESSIONAL TRAINING FOR ALL AGE GROUPS
          </button>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUsSection;