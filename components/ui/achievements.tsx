"use client";

import React from 'react';
import { Trophy, Award, Medal, Star, Target, Crown, CheckCircle2 } from 'lucide-react';

export default function AchievementsSection() {
  const stats = [
    { label: "Students Trained", value: "2,000+", icon: <UsersIcon /> },
    { label: "Trophies Won", value: "150+", icon: <Trophy /> },
    { label: "Rated Players", value: "50+", icon: <Star /> },
    { label: "Success Rate", value: "100%", icon: <CheckCircle2 /> },
  ];

  const milestones = [
    {
      year: '2024',
      title: 'National Champions',
      subtitle: 'Excellence in Competitive Chess',
      description: '5 students secured Gold at the National Youth Championship, setting a new academy record.',
      icon: <Crown className="w-6 h-6 text-white" />,
      bg: "bg-slate-900",
      accent: "border-amber-500"
    },
    {
      year: '2023',
      title: 'Global Recognition',
      subtitle: 'International Standards',
      description: 'Voted "Top 10 Emerging Academies" by Chess.com. expanded curriculum to include Robotics.',
      icon: <Award className="w-6 h-6 text-slate-900" />,
      bg: "bg-amber-400",
      accent: "border-slate-900"
    },
    {
      year: '2022',
      title: 'FIDE Rated Squad',
      subtitle: 'Professional Development',
      description: 'A milestone year where 50+ students officially achieved their opening FIDE ratings.',
      icon: <Target className="w-6 h-6 text-white" />,
      bg: "bg-slate-800",
      accent: "border-slate-700"
    },
    {
      year: '2021',
      title: 'Tournament Sweep',
      subtitle: 'District Domination',
      description: 'Secured 100+ victories across U-9, U-11, and U-15 categories in state-level tournaments.',
      icon: <Medal className="w-6 h-6 text-slate-900" />,
      bg: "bg-white",
      accent: "border-slate-200"
    },
  ];

  const certifications = [
    "Affiliated with Chess Federation of India",
    "Excellence in Youth Training Award '23",
    "Certified STEM Educators (Robotics)",
  ];

  return (
    <section className="relative py-20 bg-white font-sans overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-20 z-0"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-50 z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* --- PART 1: HEADER & STATS BAR --- */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20 items-end">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              <span>Hall of Fame</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              A Legacy of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">
                Unbeatable Results.
              </span>
            </h2>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed border-l-4 border-amber-500 pl-4">
              We don't just teach; we transform potential into performance. 
              Our track record speaks for the quality of education at Elephant Chess Academy.
            </p>
          </div>

          {/* Floating Stats Card */}
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-3 mb-2 text-amber-500">
                    {/* Icon Wrapper */}
                    {React.cloneElement(stat.icon as React.ReactElement, { size: 24, strokeWidth: 2 })}
                  </div>
                  <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-sm font-semibold text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- PART 2: MILESTONE CARDS (The New Achievements UI) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {milestones.map((item, index) => (
            <div 
              key={index} 
              className={`
                group relative p-1 rounded-2xl transition-all duration-300 hover:scale-105
                bg-gradient-to-b from-slate-100 to-white hover:from-amber-400 hover:to-amber-500
              `}
            >
              <div className="h-full bg-white rounded-xl p-6 relative overflow-hidden border border-slate-100">
                
                {/* Year Tag */}
                <div className="absolute top-0 right-0 px-4 py-2 bg-slate-900 rounded-bl-xl text-white font-bold text-sm z-10">
                  {item.year}
                </div>

                {/* Icon Circle */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-lg ${item.bg}`}>
                  {item.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-4">
                  {item.subtitle}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Decorative Bottom Bar */}
                <div className={`absolute bottom-0 left-0 w-full h-1 ${index % 2 === 0 ? 'bg-amber-500' : 'bg-slate-900'}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* --- PART 3: CERTIFICATIONS STRIP --- */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-10 relative overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Trophy size={200} textAnchor="middle" fill="white" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Officially Recognized</h3>
              <p className="text-slate-400 text-sm"> Accredited by leading educational and sports bodies.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-slate-900" />
                  </div>
                  <span className="text-sm font-semibold text-white">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// Helper Icon for Stats
function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  );
}