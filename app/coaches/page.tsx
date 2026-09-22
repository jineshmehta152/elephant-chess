"use client";
import React from "react";
import Link from "next/link";
import SubpageBanner from "@/components/ui/SubpageBanner";

export default function CoachesPage() {
  const coaches = [
    {
      name: "Anshul Bangad",
      title: "Co-Founder & Head Coach",
      fideRating: "FIDE Rated Instructor",
      experience: "15+ Years Experience",
      qualifications: "FIDE Certified Instructor, Senior Master Mentor, Opening & Tactics Specialist",
      specialization: "Positional Strategy, Calculation Depth, Classical Repertoire, Endgame Mastery",
      achievements: [
        "Co-Founder of Elephant Chess Academy",
        "Mentored 1,000+ Young Prodigies & Tournament Winners",
        "Produced District & State Level Championship Medalists",
      ],
      bio: "As Co-Founder and Head Coach at Elephant Chess Academy, Anshul Bangad is dedicated to transforming aspiring learners into confident, strategic thinkers and FIDE-rated champions through structured calculation frameworks.",
      avatar: "👑",
      image: "/anshul-bangad.jpg",
      bg: "from-amber-600 via-slate-900 to-slate-950",
    },
    {
      name: "G Karthik Gopal",
      title: "Founder & Head Coach",
      fideRating: "1848 FIDE",
      experience: "Founder & Head Coach",
      qualifications: "Arena Grand Master, Senior National Arbiter, National Instructor, Chess in Schools Trainer",
      specialization: "Clear Thinking, Accurate Calculation, Tactical Awareness, Strategic Decision-making",
      achievements: [
        "Founder of Elephant Chess Academy",
        "Certified Senior National Arbiter",
        "National Instructor & Chess in Schools Trainer",
      ],
      bio: "As the Founder of Elephant Chess Academy, G. Karthik Gopal is passionate about creating a structured and progressive learning environment for young chess players. With a strong understanding of the game and a practical approach to coaching, he helps students develop both confidence and competitive skills.",
      avatar: "👑",
      image: "/coach2.jpg",
      bg: "from-blue-700 to-slate-900",
    },
    {
      name: "G Hema Chandra Mouli",
      title: "Lead Coach",
      fideRating: "1987 FIDE",
      experience: "Lead Coach",
      qualifications: "Arena Grand Master, FIDE Arbiter, National Instructor, Chess in Schools Trainer",
      specialization: "Positional Strategy, Calculation Depth, Classical Repertoire, Endgame Mastery",
      achievements: [
        "FIDE ID: 5021626 Lead Coach",
        "Active FIDE Certified Arbiter",
        "Trained numerous rated players in India",
      ],
      bio: "G Hema Chandra Mouli focuses on building strong positional fundamentals, calculation depth, and advanced endgame techniques to help students achieve chess mastery.",
      avatar: "⚡",
      image: "/founder.jpg",
      bg: "from-rose-700 to-slate-900",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Redesigned Banner */}
      <SubpageBanner
        title="Fide Certified"
        highlight="Mentors."
        subtitle="Learn directly from International Masters, FIDE Trainers, and Senior Experts."
        breadcrumbLabel="Coaches"
        bgImage="/chess-grandmaster.png"
        widgetLeft1Icon="Crown"
        widgetLeft1Label="Mentors"
        widgetLeft1Value="IM & FIDE Trainers"
        widgetLeft2Icon="Award"
        widgetLeft2Label="Experience"
        widgetLeft2Value="15+ Yrs Average"
        widgetRightIcon="Zap"
        widgetRightLabel="Approach"
        widgetRightValue="Interactive PGNs"
      />

      {/* ── Intro Section ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#29A3DD]" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Meet the team</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#041C32] leading-tight">
                Coached by the{" "}
                <span className="text-[#29A3DD] italic">Best.</span>
              </h2>
              <p className="text-slate-500 text-base leading-relaxed max-w-lg">
                Every coach at Elephant Chess Academy is a FIDE-certified professional with real competitive tournament experience. We don't just teach chess — we've played it at the highest levels.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
                Our coaching philosophy is built on three pillars: deep positional understanding, tactical sharpness, and the mental resilience that separates good players from great ones.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4 border-t border-slate-100">
                {[
                  { val: "3",     label: "Expert Coaches" },
                  { val: "15+",   label: "Avg. Years Experience" },
                  { val: "2000+", label: "Students Trained" },
                  { val: "500+",  label: "Trophies Guided" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-black text-[#041C32]">{s.val}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: coach avatar teaser cards */}
            <div className="flex flex-col gap-4">
              {[
                { name: "Anshul Bangad", role: "Co-Founder & Head Coach · FIDE Instructor", icon: "👑", color: "from-amber-600 to-slate-900" },
                { name: "G Karthik Gopal", role: "Founder & Head Coach · 1848 FIDE", icon: "⭐", color: "from-blue-700 to-slate-900" },
                { name: "G Hema Chandra Mouli", role: "Lead Coach · 1987 FIDE", icon: "⚡", color: "from-rose-700 to-slate-900" },
              ].map((c, i) => (
                <div key={i} className={`flex items-center gap-4 bg-gradient-to-r ${c.color} rounded-2xl p-4 shadow-md`}>
                  <div className="w-12 h-12 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-2xl shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="font-black text-white text-sm">{c.name}</p>
                    <p className="text-xs text-blue-200 font-semibold">{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coaches Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          {coaches.map((c, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 hover:shadow-xl transition-all"
            >
              {/* Left Profile Box */}
              <div className={`lg:col-span-4 p-8 bg-gradient-to-br ${c.bg} text-white flex flex-col items-center justify-center text-center space-y-4`}>
                <div className="w-28 h-28 rounded-full bg-slate-900 border-4 border-white/20 overflow-hidden flex items-center justify-center shadow-2xl relative">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="px-3 py-1 bg-amber-400/20 text-amber-300 font-extrabold text-xs rounded-full border border-amber-400/30">
                  {c.fideRating}
                </span>
                <h2 className="text-2xl font-black">{c.name}</h2>
                <p className="text-xs font-semibold text-blue-200">{c.title}</p>
                <p className="text-xs text-slate-300">⏱ Experience: {c.experience}</p>
              </div>

              {/* Right Profile Details */}
              <div className="lg:col-span-8 p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-slate-600 text-sm leading-relaxed italic">{c.bio}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Qualifications</p>
                      <p className="text-xs font-semibold text-slate-900">{c.qualifications}</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Coaching Specialization</p>
                      <p className="text-xs font-semibold text-slate-900">{c.specialization}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Achievements</p>
                    <ul className="space-y-1 text-xs text-slate-700 font-medium">
                      {c.achievements.map((ach, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-amber-500">🏆</span> {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href="/bookdemo"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-[#0B4398] text-white font-bold text-xs transition-colors"
                  >
                    Request Trial Class with {c.name.split(" ")[1]} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Call To Action Section ── */}
      <section className="py-20 bg-[#041C32] text-white relative overflow-hidden">
        {/* Decorative background grids/shapes */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            READY TO DEVELOP <br />
            <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-[#E11D48] bg-clip-text text-transparent uppercase italic">
              GRANDMASTER POTENTIAL?
            </span>
          </h2>
          <p className="text-blue-100 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light">
            Whether your child is a complete beginner or looking to raise their competitive FIDE rating, our master coaches provide the structured training, calculation discipline, and psychological preparation needed to reach the top.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/bookdemo"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#E11D48] hover:bg-[#be1239] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-rose-900/30"
            >
              <span>Book Free Trial Class</span>
              <span>♟️</span>
            </Link>
            <a
              href="https://wa.me/919887821721"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:-translate-y-0.5"
            >
              <span>Talk to Counselors</span>
              <span>💬</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
