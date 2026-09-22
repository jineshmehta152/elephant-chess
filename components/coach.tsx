"use client";

import React from "react";
import { CheckCircle2, Sparkles, MessageCircle, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";
import { useBookDemoModal } from "@/components/ui/BookDemoModal";

export const CoachSection: React.FC = () => {
  const { openModal } = useBookDemoModal();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-sky-50/30 to-white text-slate-900 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#29A3DD]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#FDB813]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#29A3DD] font-black text-xs uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academy Leadership</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 tracking-tight leading-tight uppercase">
            CO-FOUNDER & <span className="bg-gradient-to-r from-[#29A3DD] via-sky-500 to-[#FDB813] bg-clip-text text-transparent">CHIEF MENTOR</span>
          </h2>

          <p className="text-slate-600 font-semibold italic text-base md:text-lg">
            "Guiding young minds and adult hobbyists to discover the strategic joy of chess."
          </p>
        </div>

        {/* --- CO-FOUNDER SHOWCASE CARD --- */}
        <div className="rounded-[2.5rem] border-[3px] border-black bg-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(10,17,40,1)] p-6 sm:p-10 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: Co-Founder Photo & Floating Badges */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-[2rem] border-[3px] border-black overflow-hidden shadow-[6px_6px_0px_0px_rgba(10,17,40,1)] bg-slate-900 group">
                <img
                  src="/anshul-bangad.jpg"
                  alt="Anshul Bangad - Co-Founder of Elephant Chess Academy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />

                {/* Top Co-Founder Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3.5 py-1.5 bg-[#FDB813] text-slate-950 font-black text-xs uppercase tracking-widest rounded-full border-2 border-black shadow-sm flex items-center gap-1.5">
                    👑 CO-FOUNDER
                  </span>
                </div>

                {/* Bottom Overlay Gradient with Name */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent z-10 flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-black uppercase tracking-widest text-[#29A3DD] mb-0.5">
                    Elephant Chess Academy
                  </span>
                  <h3 className="text-2xl font-black text-white leading-tight">
                    Anshul Bangad
                  </h3>
                </div>
              </div>

              {/* Floating Stat Badges Row */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-[360px] mt-4">
                <div className="bg-sky-50 border-2 border-black rounded-2xl p-3 text-center shadow-[3px_3px_0px_0px_rgba(10,17,40,1)]">
                  <p className="text-lg font-black text-slate-900 leading-none">15+ Years</p>
                  <p className="text-[10px] font-black uppercase text-[#29A3DD] tracking-wider mt-1">Chess Experience</p>
                </div>
                <div className="bg-amber-50 border-2 border-black rounded-2xl p-3 text-center shadow-[3px_3px_0px_0px_rgba(10,17,40,1)]">
                  <p className="text-lg font-black text-slate-900 leading-none">1,000+ Kids</p>
                  <p className="text-[10px] font-black uppercase text-amber-600 tracking-wider mt-1">Mentored & Trained</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Bio, Philosophy & Credentials */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Role Title Block */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-[#29A3DD] font-black text-xs uppercase tracking-wider mb-2 border border-sky-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>FIDE Rated International Coach</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-[1000] text-slate-950 uppercase tracking-tight">
                  Anshul Bangad
                </h3>
                <p className="text-sm font-black text-[#29A3DD] uppercase tracking-wider mt-1">
                  Co-Founder & Head of Academy Training
                </p>
              </div>

              {/* Philosophy Quote */}
              <div className="bg-slate-50 border-l-4 border-[#29A3DD] p-4 rounded-r-2xl">
                <p className="text-slate-700 text-sm md:text-base font-medium italic leading-relaxed">
                  "Chess is a mirror of life. When we teach children and adults to calculate moves, anticipate threats, and stay calm under pressure, we are not just teaching chess — we are building lifelong confidence and sharp decision-makers."
                </p>
              </div>

              {/* Credentials / Key Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Credentials & Academy Highlights:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#29A3DD] shrink-0 stroke-[2.5]" />
                    <span>FIDE Rated International Master Mentor</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#29A3DD] shrink-0 stroke-[2.5]" />
                    <span>State & National Level Champion Producer</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#29A3DD] shrink-0 stroke-[2.5]" />
                    <span>Structured 4-Tier Progressive Syllabus</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#29A3DD] shrink-0 stroke-[2.5]" />
                    <span>Patient, Interactive Child Psychology</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3.5">
                <button
                  onClick={openModal}
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-[#29A3DD] to-[#FDB813] hover:opacity-95 text-slate-950 font-[1000] text-xs sm:text-sm uppercase tracking-wider rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(10,17,40,1)] flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Book Free Evaluation With Co-Founder</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/919887821721"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 px-6 bg-white hover:bg-slate-50 text-slate-900 font-[1000] text-xs sm:text-sm uppercase tracking-wider rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(10,17,40,1)] flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CoachSection;