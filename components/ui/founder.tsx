"use client";

import React from "react";
import { 
  User, 
  Award, 
  GraduationCap, 
  CheckCircle2,
  Quote,
  Star,
  Globe,
  Trophy,
  ShieldCheck
} from "lucide-react";

const FounderSection: React.FC = () => {
  return (
    <section className="relative py-12 md:py-20 bg-white overflow-hidden font-sans">
      
      {/* --- Background Texture --- */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#01539D 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        
        {/* --- CENTERED HEADER --- */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-blue-50 border border-blue-100">
            <User className="w-3.5 h-3.5 text-[#01539D]" />
            <span className="text-[10px] md:text-xs font-bold text-[#01539D] uppercase tracking-[0.2em]">Our Leadership</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            The Mastery <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01539D] to-[#46B94A]">Behind the Academy</span>
          </h2>
        </div>

        {/* --- WIDE HORIZONTAL LAYOUT --- */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 xl:gap-16">
          
          {/* LEFT: Image Container */}
          <div className="lg:w-1/3 shrink-0">
            <div className="relative h-full min-h-[400px] md:min-h-[500px] rounded-[2.5rem] overflow-hidden border-[6px] border-white shadow-2xl bg-slate-900 group">
              <img 
                src="/profile5.jpg" // Ensure this image path is correct
                alt="Ravindra Raju" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-3xl font-black text-white tracking-tight mb-1">Ravindra Raju</h3>
                <p className="text-[#46B94A] font-black uppercase tracking-widest text-xs flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 fill-[#46B94A]" /> International Coach
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Content Area */}
          <div className="lg:w-2/3 flex flex-col justify-center">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-14">
              
              {/* Internal Col 1: Bio & Philosophy */}
              <div className="space-y-6">
                <div className="relative">
                  <Quote className="absolute -top-6 -left-6 w-12 h-12 text-slate-100 -z-10" />
                  <p className="text-xl text-slate-700 font-bold leading-relaxed italic">
                    "Chess is the gymnasium of the mind. We don't just teach moves; we cultivate strategic vision for life."
                  </p>
                </div>
                <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">
                  A globally recognized mentor with over <strong>25 years</strong> of professional coaching experience. 
                  As a certified <strong>FIDE Instructor</strong>, Ravindra Raju has shaped thousands of young minds, 
                  producing national champions and top-tier strategic thinkers across the globe.
                </p>
                
                <div className="flex flex-wrap gap-3 pt-4">
                  <div className="px-4 py-2 rounded-xl bg-[#01539D] text-white text-[11px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-100">
                    <GraduationCap className="w-4 h-4" /> FIDE Instructor
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-[#46B94A] text-white text-[11px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-green-100">
                    <Globe className="w-4 h-4" /> International Coach
                  </div>
                </div>
              </div>

              {/* Internal Col 2: Credentials Grid */}
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col justify-center">
                <div className="grid grid-cols-1 gap-6">
                  {[
                    { icon: <Trophy />, title: "25+ Years", desc: "Global Mentorship Experience", color: "text-[#01539D]" },
                    { icon: <ShieldCheck />, title: "FIDE Certified", desc: "World Chess Federation Instructor", color: "text-[#46B94A]" },
                    { icon: <Globe />, title: "5000+ Students", desc: "Trained Internationally", color: "text-[#01539D]" },
                    { icon: <CheckCircle2 />, title: "Professional Strategy", desc: "Logic & Cognitive Development", color: "text-[#46B94A]" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-5 group">
                      <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center ${item.color} shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300`}>
                        {React.cloneElement(item.icon as React.ReactElement, { size: 22, strokeWidth: 2.5 })}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-sm md:text-base">{item.title}</h4>
                        <p className="text-xs md:text-sm text-slate-500 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Stats Ribbon */}
            <div className="mt-12 pt-10 border-t border-slate-100 flex flex-wrap gap-10 md:gap-20 justify-center lg:justify-start">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-[#01539D]">25+</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Years of Excellence</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-[#46B94A]">FI</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">FIDE Designation</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-[#01539D]">50+</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Titles Produced</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FounderSection;