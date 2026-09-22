"use client";
import React from "react";
import Link from "next/link";
import SubpageBanner from "@/components/ui/SubpageBanner";
import { DemoBookingCTA } from "@/components/demo-booking-cta";
import { useBookDemoModal } from "@/components/ui/BookDemoModal";
import {
  ShieldCheck,
  Crown,
  Brain,
  Zap,
  Trophy,
  Eye,
  Target,
  Award,
  BookOpen,
  Globe,
  Users,
  TrendingUp,
  Swords,
  BarChart3,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Clock,
  Compass,
  Star,
} from "lucide-react";

export default function AboutPage() {
  const { openModal } = useBookDemoModal();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      
      {/* ── Subpage Banner ── */}
      <SubpageBanner
        title="About"
        highlight="Elephant Chess."
        subtitle="Nurturing tactical prodigies, state & national champions, and confident strategic thinkers through FIDE-certified grandmaster pedagogy."
        breadcrumbLabel="About Us"
        bgImage="/chess.webp"
        widgetLeft1Icon="Award"
        widgetLeft1Label="Pedagogy"
        widgetLeft1Value="15+ Yrs Mastery"
        widgetLeft2Icon="Users"
        widgetLeft2Label="Champions"
        widgetLeft2Value="500+ Students"
        widgetRightIcon="Sparkles"
        widgetRightLabel="Standard"
        widgetRightValue="FIDE Affiliated Hub"
      />

      {/* ── 1. The Academy Story & Origin ── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Neo-Brutalist Layered Frames */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[340px] sm:min-h-[440px] md:min-h-[520px]">
            {/* Background Geometric Accent */}
            <div className="absolute inset-0 bg-[#29A3DD]/10 rounded-[3rem] border-[3px] border-black -rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />

            {/* Primary Large Image */}
            <div className="relative w-[72%] aspect-[3/4] rounded-[2.5rem] overflow-hidden border-[3px] border-black bg-slate-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-10 group">
              <img
                src="/about-academy-classroom.jpg"
                alt="Students analyzing chess positions with mentor at Elephant Chess Academy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Secondary Overlapping Image */}
            <div className="absolute right-0 sm:right-4 bottom-2 w-[54%] aspect-[4/3] rounded-[2rem] overflow-hidden border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_rgba(253,184,19,1)] z-20 group">
              <img
                src="/about-chess-match.jpg"
                alt="Elephant Chess Academy tournament matchplay"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Floating Neo-Brutalist Badge */}
            <div className="absolute left-0 bottom-10 bg-[#FDB813] text-slate-950 p-4 sm:p-5 rounded-2xl border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] z-30 flex flex-col items-center justify-center text-center w-28 sm:w-32 select-none -rotate-6 hover:rotate-0 transition-transform">
              <Trophy className="w-6 h-6 stroke-[2.5]" />
              <span className="text-xl sm:text-2xl font-[1000] mt-1 leading-none">15+</span>
              <span className="text-[8px] font-[1000] uppercase tracking-widest mt-0.5 whitespace-nowrap">Years Legacy</span>
            </div>
          </div>

          {/* Right Column: Mission Story & Pill Grid */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border-2 border-black text-[#29A3DD] font-[1000] text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Compass className="w-3.5 h-3.5" />
                <span>ORIGIN & STRATEGIC VISION</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] text-slate-950 uppercase tracking-tight leading-tight">
                ANCIENT ROOTS. <br />
                <span className="bg-gradient-to-r from-[#29A3DD] via-sky-500 to-[#FDB813] bg-clip-text text-transparent">
                  MODERN CHAMPIONS.
                </span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base font-semibold leading-relaxed">
                Founded with a conviction that chess is the ultimate training ground for the young mind, <strong className="text-slate-950 font-black">Elephant Chess Academy</strong> unites India's rich chess heritage with cutting-edge grandmaster pedagogy, tactical software drills, and tournament psychology.
              </p>
              
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                From our physical academy hub in Danavai Peta, Rajamahendravaram to our live digital studio connecting students across India and abroad, we nurture students from their first pawn push to FIDE international rating milestones.
              </p>
            </div>

            {/* 2x2 Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                {
                  icon: ShieldCheck,
                  title: "FIDE Standard",
                  desc: "Structured syllabus mapped to international standards.",
                  color: "bg-sky-50 text-[#29A3DD] border-sky-300"
                },
                {
                  icon: Crown,
                  title: "Master Faculty",
                  desc: "Mentorship by rated coaches and seasoned arbiters.",
                  color: "bg-amber-50 text-amber-600 border-amber-300"
                },
                {
                  icon: Brain,
                  title: "Calculation Depth",
                  desc: "Candidate-move method and tactical pattern recognition.",
                  color: "bg-purple-50 text-purple-600 border-purple-300"
                },
                {
                  icon: Zap,
                  title: "Proven Results",
                  desc: "State titles, district cups & rapid FIDE rating leaps.",
                  color: "bg-emerald-50 text-emerald-600 border-emerald-300"
                }
              ].map((feat, idx) => {
                const IconComp = feat.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-start gap-3 hover:-translate-y-0.5 transition-transform"
                  >
                    <div className={`w-10 h-10 rounded-xl border border-black flex items-center justify-center shrink-0 ${feat.color}`}>
                      <IconComp className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="font-[1000] text-xs uppercase tracking-tight text-slate-950">{feat.title}</h4>
                      <p className="text-[11px] font-medium text-slate-500 leading-snug mt-0.5">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Academy Motto Bar */}
            <div className="flex items-center gap-3.5 p-4 rounded-2xl border-2 border-black bg-slate-950 text-white shadow-[4px_4px_0px_0px_rgba(253,184,19,1)]">
              <span className="text-2xl">🐘</span>
              <div className="flex-1 min-w-0">
                <p className="font-[1000] text-xs uppercase tracking-wider text-[#FDB813]">Elephant Chess Academy</p>
                <p className="text-[11px] font-medium text-slate-300 truncate">Building the grandmasters and analytical leaders of tomorrow.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 2. Mission & Vision Dual Showcase ── */}
      <section className="py-20 bg-white border-y-[3px] border-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border-2 border-black text-amber-700 font-[1000] text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Target className="w-3.5 h-3.5" />
              <span>GUIDING PRINCIPLES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] text-slate-950 uppercase tracking-tight leading-tight">
              MISSION &{" "}
              <span className="bg-gradient-to-r from-[#29A3DD] to-[#FDB813] bg-clip-text text-transparent">
                VISION.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Mission Card (Deep Navy Neo-Brutalist) */}
            <div className="rounded-[2.5rem] border-[3px] border-black bg-[#0A1128] text-white p-8 sm:p-10 shadow-[8px_8px_0px_0px_rgba(41,163,221,1)] flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 text-[140px] text-white/[0.03] font-black select-none pointer-events-none leading-none">
                🎯
              </div>

              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#29A3DD] border-2 border-black flex items-center justify-center text-white text-xl shadow-[2px_2px_0px_0px_rgba(253,184,19,1)]">
                  <Target className="w-6 h-6 stroke-[2.5]" />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-[1000] text-white uppercase tracking-tight">
                  Our Mission
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                  To make <strong className="text-[#FDB813] font-black">elite, FIDE-standard chess coaching accessible</strong> to every aspiring student. We use chess as a transformative vehicle to sharpen mental toughness, logical reasoning, memory retention, and fearless decision-making under pressure.
                </p>

                <ul className="space-y-2.5 pt-4 border-t border-white/15 text-xs font-bold text-sky-100">
                  {[
                    "FIDE-Rated Grandmaster & National Instructors",
                    "Scientific calculation and endgame progression",
                    "Low 1:6 batch ratios for personalized diagnostics"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-md bg-[#29A3DD] border border-black flex items-center justify-center text-white font-black text-[10px] shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Vision Card (Golden Yellow Accent) */}
            <div className="rounded-[2.5rem] border-[3px] border-black bg-[#FDB813] text-slate-950 p-8 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 text-[140px] text-slate-950/[0.05] font-black select-none pointer-events-none leading-none">
                👑
              </div>

              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border-2 border-black flex items-center justify-center text-white text-xl shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                  <Eye className="w-6 h-6 stroke-[2.5]" />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-[1000] text-slate-950 uppercase tracking-tight">
                  Our Vision
                </h3>

                <p className="text-slate-900 text-xs sm:text-sm font-bold leading-relaxed">
                  To establish <strong className="underline decoration-black decoration-2">Rajamahendravaram and India</strong> as a recognized global powerhouse for youth chess excellence, creating state champions, international title-holders, and lifelong critical thinkers.
                </p>

                <ul className="space-y-2.5 pt-4 border-t border-black/20 text-xs font-black text-slate-950 uppercase tracking-wider">
                  {[
                    "District, State & National Title Success",
                    "Vibrant Community of Youth Competitors",
                    "Weekly Rated Classical & Blitz Tournaments"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-md bg-slate-950 border border-black flex items-center justify-center text-white font-black text-[10px] shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 3. Head Coach & Leadership Spotlight ── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Head Coach Photo Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Angled Background Shadow Block */}
            <div className="absolute inset-0 bg-[#FDB813] rounded-[2.5rem] border-[3px] border-black rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />

            {/* Coach Photo Container */}
            <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-[2.5rem] overflow-hidden border-[3px] border-black bg-slate-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-10">
              <img
                src="/anshul-bangad.jpg"
                alt="Coach Anshul Bangad - Co-Founder & Head Coach"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Floating FIDE Tag */}
            <div className="absolute -left-3 sm:-left-6 bottom-8 bg-white border-2 border-black rounded-2xl p-3.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#29A3DD] text-white flex items-center justify-center font-bold shrink-0">
                🏆
              </div>
              <div>
                <p className="text-[9px] font-[1000] uppercase text-[#29A3DD] tracking-wider">FIDE Instructor</p>
                <p className="text-xs font-[1000] text-slate-950">Head Coach & Mentor</p>
              </div>
            </div>
          </div>

          {/* Right Column: Coach Credentials & Story */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border-2 border-black text-[#29A3DD] font-[1000] text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Crown className="w-3.5 h-3.5" />
                <span>LEADERSHIP & COACHING DESK</span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-[1000] text-slate-950 uppercase tracking-tight leading-tight">
                COACH ANSHUL <span className="bg-gradient-to-r from-[#29A3DD] to-[#FDB813] bg-clip-text text-transparent">BANGAD.</span>
              </h3>
              <p className="text-xs font-[1000] uppercase tracking-wider text-slate-500">Co-Founder & Head Coach, Elephant Chess Academy</p>
            </div>

            <div className="space-y-4 text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed">
              <p>
                With over a decade of competitive tournament experience and dedicated coaching practice, Coach Anshul Bangad has mentored hundreds of students from absolute fundamentals to FIDE rated status and state podiums.
              </p>
              <p>
                His specialized training framework prioritizes deep positional intuition, active piece geometry, endgame conversion, and clock management in competitive classical and rapid formats.
              </p>
            </div>

            {/* FIDE Credentials Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              {[
                { icon: ShieldCheck, label: "FIDE Certified", color: "text-[#29A3DD]" },
                { icon: Target, label: "Tactical Specialist", color: "text-amber-600" },
                { icon: Users, label: "500+ Students Mentored", color: "text-purple-600" },
                { icon: Trophy, label: "State Podiums", color: "text-emerald-600" },
                { icon: Brain, label: "GM Openings Prep", color: "text-rose-600" },
                { icon: Zap, label: "Active Arbiter", color: "text-teal-600" },
              ].map((pill, idx) => {
                const IconComp = pill.icon;
                return (
                  <div key={idx} className="p-3 bg-white rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                    <IconComp className={`w-4 h-4 shrink-0 ${pill.color}`} />
                    <span className="text-[11px] font-[1000] text-slate-900 uppercase tracking-tight truncate">{pill.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Quote Box */}
            <div className="p-5 rounded-2xl bg-[#0A1128] text-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(253,184,19,1)]">
              <p className="italic text-xs sm:text-sm font-bold text-sky-100 leading-relaxed">
                "We do not merely teach how the pieces move. We teach our students how to think clearly, maintain composure, and execute strategic plans in both chess and life."
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ── 4. The Elephant 4-Pillar Pedagogical System ── */}
      <section className="py-20 bg-white border-y-[3px] border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border-2 border-black text-purple-700 font-[1000] text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Brain className="w-3.5 h-3.5" />
              <span>THE LEARNING ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] text-slate-950 uppercase tracking-tight leading-tight">
              OUR TEACHING{" "}
              <span className="bg-gradient-to-r from-[#29A3DD] to-[#FDB813] bg-clip-text text-transparent">
                METHODOLOGY.
              </span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-semibold max-w-2xl mx-auto">
              A structured, algorithmic approach to building master-level positional understanding and tactical accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Tactical Pattern Radar",
                desc: "Pins, forks, skewers, deflection, and candidate-move tree calculation to eliminate tournament blunders.",
                icon: Zap,
                accent: "bg-sky-400",
              },
              {
                step: "02",
                title: "Positional Strategy",
                desc: "Pawn structure control, outposts, open files, piece coordination, and long-term space advantages.",
                icon: Brain,
                accent: "bg-purple-400",
              },
              {
                step: "03",
                title: "Endgame Mastery",
                desc: "Opposition, the rule of the square, Lucena & Philidor positions, and rook-and-pawn promotion mechanics.",
                icon: Target,
                accent: "bg-amber-400",
              },
              {
                step: "04",
                title: "Tournament Psychology",
                desc: "Mental endurance for 4-hour classical matches, resilience after losses, and time management.",
                icon: Trophy,
                accent: "bg-emerald-400",
              },
              {
                step: "05",
                title: "AI & Engine Game Review",
                desc: "Deep game diagnostics with Stockfish engines to identify key mistake thresholds and improve accuracy.",
                icon: BarChart3,
                accent: "bg-rose-400",
              },
              {
                step: "06",
                title: "Weekly Arena Battles",
                desc: "Live simulated tournament matches every Sunday with FIDE clocks and performance rating leaderboards.",
                icon: Swords,
                accent: "bg-teal-400",
              },
            ].map((method, idx) => {
              const IconComp = method.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border-[3px] border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl border-2 border-black bg-slate-950 text-white flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <IconComp className="w-6 h-6 stroke-[2.5]" />
                      </div>
                      <span className="font-[1000] text-2xl text-slate-300">{method.step}</span>
                    </div>

                    <h3 className="font-[1000] text-lg text-slate-950 uppercase tracking-tight leading-snug">
                      {method.title}
                    </h3>

                    <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                      {method.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-[1000] uppercase tracking-wider text-[#29A3DD]">
                    <span>Standard Pillar {method.step}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 5. Why Choose Us (6-Grid Feature Pillars) ── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border-2 border-black text-emerald-700 font-[1000] text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Award className="w-3.5 h-3.5" />
              <span>THE ELEPHANT ADVANTAGE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] text-slate-950 uppercase tracking-tight leading-tight">
              WHY CHOOSE <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#29A3DD] to-[#FDB813] bg-clip-text text-transparent">
                ELEPHANT CHESS?
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Certified FIDE Coaches",
                desc: "Learn directly from active tournament competitors and certified national arbiters with verified coaching credentials.",
                icon: Award,
                badge: "Verified Pedagogy",
              },
              {
                title: "Intimate 1:6 Batches",
                desc: "Micro cohort groups ensure your child receives individualized attention, move-by-move feedback, and zero generic lessons.",
                icon: Users,
                badge: "Micro Batches",
              },
              {
                title: "Online & Physical Centers",
                desc: "Flexible hybrid options available at our Danavai Peta campus and our interactive live digital video studio.",
                icon: Globe,
                badge: "Flexible Hybrid",
              },
              {
                title: "Live Sunday Arenas",
                desc: "Weekly timed arena battles with live rating calculations, match pairing algorithms, and trophy awards.",
                icon: Swords,
                badge: "Weekly Matchplay",
              },
              {
                title: "1-on-1 Parent Diagnostic Reviews",
                desc: "Regular quarterly milestone consultations with detailed rating progression graphs and puzzle accuracy reports.",
                icon: BarChart3,
                badge: "Transparent Reports",
              },
              {
                title: "Tournament Travel Support",
                desc: "Comprehensive on-site guidance, pairing analysis, and psychological support at district, state, and national events.",
                icon: Trophy,
                badge: "Podium Focused",
              },
            ].map((adv, idx) => {
              const IconComp = adv.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border-[3px] border-black bg-white p-7 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(253,184,19,1)] hover:-translate-y-1 transition-all duration-300 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl border-2 border-black bg-[#FDB813] text-slate-950 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <IconComp className="w-6 h-6 stroke-[2.5]" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-sky-50 border border-black text-[#29A3DD] text-[10px] font-[1000] uppercase tracking-wider">
                        {adv.badge}
                      </span>
                    </div>

                    <h3 className="font-[1000] text-lg text-slate-950 uppercase tracking-tight">
                      {adv.title}
                    </h3>

                    <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                      {adv.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-[1000] text-[#29A3DD]">
                    <span>✓ Guaranteed Standard</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 6. Core Values ── */}
      <section className="py-20 bg-slate-950 text-white border-y-[3px] border-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-12 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#FDB813] font-[1000] text-xs uppercase tracking-widest">
              <Star className="w-3.5 h-3.5" />
              <span>THE GRANDMASTER MINDSET</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] text-white uppercase tracking-tight leading-tight">
              OUR CORE{" "}
              <span className="bg-gradient-to-r from-[#29A3DD] via-sky-300 to-[#FDB813] bg-clip-text text-transparent">
                VALUES.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Discipline",
                desc: "Cultivating focus, consistent tactical habits, and deep patience through daily study routines.",
              },
              {
                num: "02",
                title: "Critical Thinking",
                desc: "Evaluating positions objectively, calculating variations without guessing, and weighing risk vs reward.",
              },
              {
                num: "03",
                title: "Sportsmanship",
                desc: "Respecting opponents, accepting victories and defeats with equal grace, and upholding tournament ethics.",
              },
              {
                num: "04",
                title: "Confidence",
                desc: "Overcoming fear of higher-rated opponents and trusting personal calculations on the 64 squares.",
              },
              {
                num: "05",
                title: "Lifelong Learning",
                desc: "Analyzing past errors constructively, researching master games, and staying curious.",
              },
              {
                num: "06",
                title: "Integrity",
                desc: "Absolute commitment to fair play, clock rules, and ethical gameplay in all rated tournaments.",
              },
            ].map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl border-2 border-white/20 bg-white/5 hover:bg-white/10 hover:border-[#FDB813] transition-all backdrop-blur-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-xl bg-[#29A3DD] text-white font-[1000] text-xs flex items-center justify-center border border-white/30">
                    {val.num}
                  </span>
                  <span className="text-xs text-[#FDB813] font-bold">Pillar {val.num}</span>
                </div>
                <h3 className="text-lg font-[1000] text-white uppercase tracking-tight">{val.title}</h3>
                <p className="text-xs text-sky-100 font-medium leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7. Endless Auto-Scrolling Marquee Gallery ── */}
      <section className="py-20 bg-white overflow-hidden space-y-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border-2 border-black text-[#29A3DD] font-[1000] text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span>🏆 MOMENTS OF VICTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-[1000] text-slate-950 uppercase tracking-tight">
              ACADEMY HALL OF FAME.
            </h2>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-950 hover:bg-[#29A3DD] text-white text-xs font-[1000] uppercase tracking-wider transition-all border-2 border-black shadow-[3px_3px_0px_0px_rgba(253,184,19,1)] hover:-translate-y-0.5 shrink-0"
          >
            <span>Explore Full Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Marquee Row */}
        <div className="relative w-full overflow-hidden select-none py-2">
          <div className="flex gap-5 w-max animate-marquee">
            {[
              "/about-academy-classroom.jpg",
              "/about-chess-match.jpg",
              "/demo.png",
              "/galbg.png",
              "/abourrr.png",
              "/hero1.png",
              "/hero2.png",
              "/hero3.png",
              "/anshul-bangad.jpg",
              "/inter.jpg",
            ].map((imgSrc, index) => (
              <div
                key={index}
                className="w-64 h-80 rounded-3xl overflow-hidden border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0 bg-slate-900"
              >
                <img
                  src={imgSrc}
                  alt={`Elephant Chess victory ${index}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
            {/* Duplicated for seamless loop */}
            {[
              "/about-academy-classroom.jpg",
              "/about-chess-match.jpg",
              "/demo.png",
              "/galbg.png",
              "/abourrr.png",
              "/hero1.png",
              "/hero2.png",
              "/hero3.png",
              "/anshul-bangad.jpg",
              "/inter.jpg",
            ].map((imgSrc, index) => (
              <div
                key={`dup-${index}`}
                className="w-64 h-80 rounded-3xl overflow-hidden border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0 bg-slate-900"
              >
                <img
                  src={imgSrc}
                  alt={`Elephant Chess victory duplicate ${index}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </section>

      {/* ── 8. Compact Demo Booking CTA ── */}
      <DemoBookingCTA />

    </div>
  );
}
