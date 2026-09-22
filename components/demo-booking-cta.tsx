"use client";

import React from "react";
import { Sparkles, ArrowRight, MessageCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { useBookDemoModal } from "@/components/ui/BookDemoModal";

export const DemoBookingCTA: React.FC = () => {
  const { openModal } = useBookDemoModal();

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* --- COMPACT HIGH-CONTRAST HERO CTA BANNER --- */}
        <div className="rounded-[2rem] md:rounded-[2.5rem] border-[3px] border-black bg-gradient-to-br from-[#0A1128] via-[#10224d] to-[#0A1128] text-white p-8 sm:p-10 md:p-12 shadow-[8px_8px_0px_0px_rgba(253,184,19,1)] relative overflow-hidden">
          
          {/* Subtle Background Glows & Mascot Accent */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#29A3DD]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#FDB813]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-6 -bottom-8 text-8xl opacity-10 select-none pointer-events-none font-black hidden lg:block">
            🐘
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* LEFT COLUMN: Heading, Subtitle & Trust Points */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#FDB813] font-black text-xs uppercase tracking-widest backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Free 45-Minute Trial Class</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-[1000] text-white uppercase tracking-tight leading-tight">
                READY TO SPARK YOUR CHILD'S <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[#29A3DD] via-sky-300 to-[#FDB813] bg-clip-text text-transparent">
                  STRATEGIC GENIUS?
                </span>
              </h2>

              <p className="text-sky-100 text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-xl">
                Get a personalized tactical skill evaluation with Coach Anshul. Discover your child's learning style and receive a custom development roadmap.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 pt-1 text-xs font-bold text-white/90">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FDB813] shrink-0" />
                  <span>1-on-1 Skill Assessment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FDB813] shrink-0" />
                  <span>FIDE Certified Coaching</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FDB813] shrink-0" />
                  <span>No Commitment Required</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Action Buttons */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center">
              <button
                onClick={openModal}
                className="w-full py-4 px-6 bg-[#FDB813] hover:bg-amber-400 text-slate-950 font-[1000] text-sm uppercase tracking-wider rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-2.5 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <span>Claim Free Demo Slot</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <a
                href="https://wa.me/919887821721?text=Hi%20Elephant%20Chess%20Academy,%20I%20would%20like%20to%20book%20a%20free%20trial%20class"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-[1000] text-sm uppercase tracking-wider rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-2.5 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default DemoBookingCTA;