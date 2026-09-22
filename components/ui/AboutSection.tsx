"use client";

import React from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  Brain, 
  MessageSquare, 
  Target, 
  Zap,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const AboutSection: React.FC = () => {
  const pillars = [
    { 
        icon: Brain, 
        title: "Strategic Mindset", 
        desc: "Professional Chess & Logic training to build foresight and decision-making skills.",
        accent: "border-[#01539D] text-[#01539D]" 
    },
    { 
        icon: Cpu, 
        title: "Future Technology", 
        desc: "Hands-on Coding, AI, and Robotics to transform children from users to creators.",
        accent: "border-[#46B94A] text-[#46B94A]" 
    },
    { 
        icon: MessageSquare, 
        title: "Effective Expression", 
        desc: "Communication workshops that build confidence and public speaking abilities.",
        accent: "border-[#01539D] text-[#01539D]" 
    },
  ];

  const features = [
    "World-Class Mentors",
    "FIDE Certified Coaches",
    "Individual Progress Tracking",
    "Modern Skill Curriculum",
    "Innovation-First Learning",
    "Proven Success Rate"
  ];

  return (
    <div className="bg-white font-sans">
      
      {/* --- VISION HERO SECTION --- */}
      <section className="relative py-16 md:py-28 px-6 overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#46B94A]/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Visual Side */}
          <div className="w-full lg:w-1/2 relative order-2 lg:order-1">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                    src="/gallery-7.jpg" 
                    alt="Learning Environment" 
                    className="w-full aspect-[7/5] object-cover"
                />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-10 -right-6 md:right-0 z-20 bg-[#01539D] text-white p-8 rounded-[2.5rem] shadow-xl">
                <p className="text-4xl font-black mb-1">10+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Years of Shaping<br/>Grandmaster Minds</p>
            </div>
            {/* Floating Element */}
            <div className="absolute -top-10 -left-6 z-20 bg-white p-5 rounded-3xl shadow-xl border border-slate-50 animate-bounce duration-[4000ms]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#46B94A]/10 flex items-center justify-center text-[#46B94A]">
                        <Zap size={20} fill="currentColor" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm italic">Innovation First</span>
                </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-slate-50 border border-slate-100">
              <Sparkles className="w-4 h-4 text-[#46B94A]" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">Our DNA</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
              Preparing Kids for a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01539D] to-[#46B94A]">
                World Yet To Be Defined.
              </span>
            </h2>

            <p className="text-slate-600 text-lg md:text-xl mb-10 leading-relaxed font-medium">
              FutureMind Skills Academy is more than just a training center. We are an ecosystem dedicated to nurturing 
              <span className="text-slate-900 font-bold"> critical thinking, digital literacy, and leadership</span> 
              qualities in the next generation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {features.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#46B94A]" />
                  <span className="text-slate-700 text-sm md:text-base font-bold">{item}</span>
                </div>
              ))}
            </div>

            <Link href="/programs" className="inline-flex items-center gap-3 bg-[#01539D] text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#01427a] transition-all shadow-xl shadow-blue-100">
              Explore Our Vision
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: COGNITIVE PILLARS --- */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">The Three Pillars of Success</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#01539D] to-[#46B94A] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <div 
                key={i} 
                className={`group bg-white p-10 rounded-[2.5rem] border-b-8 ${pillar.accent} transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl shadow-slate-200/50`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center ${pillar.accent.split(' ')[1]} mb-8 group-hover:scale-110 transition-transform`}>
                  <pillar.icon size={32} />
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-4">{pillar.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: ACADEMY PHILOSOPHY --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 italic mb-12">
                "Our goal is not just to teach skills, but to ignite a lifelong passion for learning and problem-solving."
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 pt-12 border-t border-slate-100">
                <div className="text-center">
                    <p className="text-5xl font-black text-[#01539D] mb-2">500+</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Minds</p>
                </div>
                <div className="hidden md:block w-px h-12 bg-slate-200" />
                <div className="text-center">
                    <p className="text-5xl font-black text-[#46B94A] mb-2">25+</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Expert Mentors</p>
                </div>
                <div className="hidden md:block w-px h-12 bg-slate-200" />
                <div className="text-center">
                    <p className="text-5xl font-black text-[#01539D] mb-2">100%</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Future Ready</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- FOOTER CALL TO ACTION --- */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-16 rounded-[3rem] bg-gradient-to-br from-[#01539D] to-[#01427a] text-white text-center relative overflow-hidden">
             {/* Decorative pattern */}
             <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="smallgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#smallgrid)" />
                </svg>
             </div>

             <h2 className="relative z-10 text-3xl md:text-5xl font-black mb-6">Build Their Future Today</h2>
             <p className="relative z-10 text-blue-100 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto">
                Join our academy and give your child the tools to navigate and lead in the 21st century.
             </p>
             <Link href="/contact" className="relative z-10 group inline-flex items-center gap-4 bg-[#46B94A] text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all hover:bg-[#3da341] shadow-2xl active:scale-95">
                Apply For Admission
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
             </Link>
        </div>
      </section>

    </div>
  );
};

export default AboutSection;