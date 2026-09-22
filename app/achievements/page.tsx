"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SubpageBanner from "@/components/ui/SubpageBanner";

interface DynamicAchievement {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  year: string;
  studentName?: string;
}

export default function AchievementsPage() {
  const [dynamicAchievements, setDynamicAchievements] = useState<DynamicAchievement[]>([]);

  useEffect(() => {
    fetch("/api/achievements")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setDynamicAchievements(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const fallbackAchievements = [
    {
      name: "Viha Jain",
      level: "Elite",
      subtitle: "Outstanding Performance In",
      heading: "Inter-School Chess",
      desc: "Secured 2nd Place in Team Competition and 3rd Place Individually on the First Board.",
      image: "/avatar1.jpg",
      flagCode: "in",
      country: "India",
      gradient: "from-[#0B4398] via-[#0052CC] to-[#0B4398]",
      pillText: "text-[#0B4398]",
    },
    {
      name: "Aamir Yassar",
      level: "Rated",
      subtitle: "Officially Achieved",
      heading: "FIDE Rating",
      desc: "Earned official international recognition and a global chess ranking from FIDE.",
      image: "/avatar2.png",
      flagCode: "in",
      country: "India",
      gradient: "from-[#E11D48] via-[#c2143b] to-[#E11D48]",
      pillText: "text-[#E11D48]",
    },
    {
      name: "Aaryash",
      level: "Rising Star",
      subtitle: "Podium Finish At",
      heading: "Seigle Cup 2026",
      desc: "Demonstrated exceptional strategy to be crowned Runner-Up in this prestigious tournament.",
      image: "/avatar3.jpeg",
      flagCode: "us",
      country: "USA",
      gradient: "from-[#0B4398] via-[#0052CC] to-[#0B4398]",
      pillText: "text-[#0B4398]",
    },
    {
      name: "Sanya Reddy",
      level: "Champion",
      subtitle: "Champion",
      heading: "USA Open Chess",
      desc: "Won first prize in the USA Open Chess Tournament in the under-14 category.",
      image: "/avatar1.jpg",
      flagCode: "us",
      country: "USA",
      gradient: "from-[#E11D48] via-[#c2143b] to-[#E11D48]",
      pillText: "text-[#E11D48]",
    },
  ];

  const displayAchievements = [
    ...dynamicAchievements.map((item, idx) => ({
      name: item.studentName || item.title,
      level: item.category || "Trophy",
      subtitle: `${item.year} Milestone`,
      heading: item.title,
      desc: item.description,
      image: item.imageUrl,
      flagCode: "in",
      country: "India",
      gradient: idx % 2 === 0 ? "from-[#0B4398] via-[#0052CC] to-[#0B4398]" : "from-[#E11D48] via-[#c2143b] to-[#E11D48]",
      pillText: idx % 2 === 0 ? "text-[#0B4398]" : "text-[#E11D48]",
    })),
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Redesigned Banner */}
      <SubpageBanner
        title="Student"
        highlight="Glory."
        subtitle="Celebrating trophies, national medals, and international FIDE rating milestones."
        breadcrumbLabel="Achievements"
        bgImage="/mission.png"
        widgetLeft1Icon="Trophy"
        widgetLeft1Label="Rated"
        widgetLeft1Value="50+ Active Players"
        widgetLeft2Icon="Award"
        widgetLeft2Label="Medals"
        widgetLeft2Value="120+ Tournament Wins"
        widgetRightIcon="Shield"
        widgetRightLabel="Affiliation"
        widgetRightValue="FIDE Registered"
      />

      {/* Homepage Student Achievements & Milestones Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white text-slate-900 relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-rose-50/40 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[#E11D48] text-xs font-black uppercase tracking-widest px-4 py-1.5 bg-rose-50 rounded-full border border-rose-100 inline-block">
              Hall Of Fame
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Student Achievements & <span className="bg-gradient-to-r from-[#0B4398] to-[#E11D48] bg-clip-text text-transparent italic font-serif">Milestones</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg font-light max-w-2xl mx-auto">
              Celebrating our brilliant young grandmasters in the making who crossed rating barriers and clinched national gold medals.
            </p>
          </div>

          {/* Achievements Grid */}
          {displayAchievements.length === 0 ? (
            <div className="text-center py-20 text-slate-500 font-semibold bg-slate-50 border border-slate-150 rounded-3xl mt-10 w-full">
              ♟ No achievements uploaded yet. Check back later!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10">
              {displayAchievements.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`relative bg-gradient-to-br ${item.gradient} rounded-[2rem] p-6 pt-20 pb-8 border border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group`}
                >
                  {/* Overlapping student photo at the top-left */}
                  <div className="absolute -top-10 left-6 z-20">
                    <div className="relative w-24 h-24 rounded-[1.25rem] border-[4px] border-white bg-slate-100 shadow-md overflow-hidden rotate-2 group-hover:rotate-6 transition-transform duration-300">
                      {/* Floating Crown Badge */}
                      <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-[10px] text-white shadow-sm z-30 select-none">
                        👑
                      </div>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Name & Level in top-right corner */}
                  <div className="absolute top-5 right-6 text-right z-20">
                    <h3 className="text-white font-black uppercase text-sm sm:text-base tracking-tight leading-none">
                      {item.name}
                    </h3>
                    <span className="text-white/80 font-black uppercase text-[9px] tracking-widest mt-1 inline-block">
                      {item.level}
                    </span>
                  </div>

                  {/* Card Content Details */}
                  <div className="mt-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Highlight Stripe */}
                      <div className="w-10 h-1 bg-amber-500 mb-4 rounded-full" />
                      
                      {/* Subtitle */}
                      <span className="text-white/80 font-bold uppercase text-[9px] tracking-widest block mb-1">
                        {item.subtitle}
                      </span>
                      
                      {/* Main Achievement Header */}
                      <h4 className="text-xl font-black text-amber-300 tracking-tight leading-snug mb-3 uppercase">
                        {item.heading}
                      </h4>
                      
                      {/* Description */}
                      <p className="text-white/90 text-xs sm:text-sm font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Bottom Pill Badge & Flag Row */}
                    <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/15">
                      {/* Verified Pill */}
                      <div className="bg-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex items-center justify-center text-[7px] text-white">★</span>
                        <span className={`font-black text-[9px] uppercase tracking-wider ${item.pillText}`}>
                          ELEPHANT VERIFIED
                        </span>
                      </div>

                      {/* Flag Pill */}
                      <div className="bg-white px-2 py-1 h-7 rounded-lg shadow-sm flex items-center justify-center select-none overflow-hidden border border-slate-100">
                        <img 
                          src={`https://flagcdn.com/w40/${item.flagCode}.png`}
                          alt={item.country}
                          className="w-5.5 h-3.5 object-cover rounded-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Rating Milestones Strip */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-4xl font-black text-[#0B4398]">250+</p>
            <p className="text-xs font-semibold text-slate-600 mt-1">Official FIDE Rated Students</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-4xl font-black text-[#E11D48]">48</p>
            <p className="text-xs font-semibold text-slate-600 mt-1">State & National Gold Medals</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-4xl font-black text-amber-500">1200+</p>
            <p className="text-xs font-semibold text-slate-600 mt-1">Average FIDE Rating Gain</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-4xl font-black text-emerald-600">95%</p>
            <p className="text-xs font-semibold text-slate-600 mt-1">Tournament Qualification Rate</p>
          </div>
        </div>
      </section>

      {/* Gallery of Excellence Auto-Scrolling Marquee Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
            Gallery of <span className="text-[#E11D48]">Excellence</span>
          </h2>
          <p className="text-slate-500 text-xs md:text-sm font-black uppercase tracking-widest leading-relaxed">
            Capturing the moments of victory across tournaments
          </p>
        </div>

        {/* Endless Marquee Loop Wrapper */}
        <div className="relative w-full overflow-hidden select-none py-4">
          {/* Subtle overlay gradients on sides for depth */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling Row */}
          <div className="flex gap-6 w-max animate-marquee">
            {/* Set 1 */}
            {[
              "/about-academy-classroom.jpg",
              "/about-chess-match.jpg",
              "/demo.png",
              "/galbg.png",
              "/abourrr.png",
              "/hero1.png",
              "/hero2.png",
              "/hero3.png"
            ].map((imgSrc, index) => (
              <div
                key={index}
                className="w-64 h-80 rounded-[2rem] overflow-hidden border border-slate-200/80 shadow-sm shrink-0 bg-slate-50 transition-all duration-300 hover:scale-102 hover:shadow-md"
              >
                <img
                  src={imgSrc}
                  alt={`Moment of victory ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {/* Set 2 (Duplicated for seamless loop) */}
            {[
              "/about-academy-classroom.jpg",
              "/about-chess-match.jpg",
              "/demo.png",
              "/galbg.png",
              "/abourrr.png",
              "/hero1.png",
              "/hero2.png",
              "/hero3.png"
            ].map((imgSrc, index) => (
              <div
                key={`dup-${index}`}
                className="w-64 h-80 rounded-[2rem] overflow-hidden border border-slate-200/80 shadow-sm shrink-0 bg-slate-50 transition-all duration-300 hover:scale-102 hover:shadow-md"
              >
                <img
                  src={imgSrc}
                  alt={`Moment of victory duplicated ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#0B122F] hover:bg-slate-900 text-white font-extrabold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Join the hall of fame</span>
          </Link>
        </div>

        {/* Marquee Animation Keyframes Style */}
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-50%, 0, 0);
            }
          }
          .animate-marquee {
            animation: marquee 35s linear infinite;
          }
        `}</style>
      </section>

      {/* Unique Victory Vault CTA — Brand Colors */}
      <section className="py-14 px-4 md:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#041C32] via-[#0B4398] to-[#041C32] border-2 border-[#E11D48]/30 shadow-[0_20px_60px_rgba(4,28,50,0.5)] p-8 md:p-12">
            
            {/* Ambient Brand Radial Glows */}
            <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-[#29A3DD]/50 blur-3xl pointer-events-none" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#FDB813]/25 blur-3xl pointer-events-none" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-sky-600/10 blur-3xl pointer-events-none" />

            {/* Giant Faint Elephant Watermark */}
            <div className="absolute right-6 bottom-0 text-[180px] text-white/[0.06] font-black select-none pointer-events-none leading-none hidden lg:block">
              🐘
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Heading & Offer */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  🏆 Champion Production Hub
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                  Ready to write your <br />
                  <span className="italic text-[#E11D48]">
                    victory story?
                  </span>
                </h2>

                <p className="text-blue-100 text-xs md:text-sm leading-relaxed max-w-lg">
                  Every champion listed in our Hall of Fame started with a single evaluation session. Book a free 45-minute diagnostic test with our Master Coach to discover your child's rating potential.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/bookdemo"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#E11D48] hover:bg-[#be1239] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-[0_6px_25px_rgba(225,29,72,0.4)]"
                  >
                    <span>Claim Free Assessment</span>
                    <span>🏆</span>
                  </Link>

                  <a
                    href="https://wa.me/919887821721"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span>Talk to Coach</span>
                    <span>💬</span>
                  </a>
                </div>
              </div>

              {/* Right Column: 3 Brand Feature Cards */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                {[
                  {
                    icon: "🏆",
                    title: "120+ Gold Medals",
                    subtitle: "State & National Swiss Championships",
                    accent: "border-[#E11D48]/40 bg-[#E11D48]/15 text-white"
                  },
                  {
                    icon: "👑",
                    title: "50+ FIDE Rated Players",
                    subtitle: "Active International Global Rankings",
                    accent: "border-blue-400/40 bg-blue-500/15 text-white"
                  },
                  {
                    icon: "🎯",
                    title: "FIDE Master Mentorship",
                    subtitle: "Structured 1-on-1 Tournament Repertoire",
                    accent: "border-emerald-400/40 bg-emerald-500/15 text-white"
                  }
                ].map((card, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-xs"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border ${card.accent}`}>
                      {card.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-black text-sm leading-tight">{card.title}</h4>
                      <p className="text-blue-200 text-[10px] font-medium mt-0.5">{card.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
