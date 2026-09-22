"use client";

import React from 'react';
import { 
  MonitorPlay, 
  Gamepad2, 
  ShieldCheck, 
  Library, 
  Wifi, 
  Users,
  CheckCircle2
} from 'lucide-react';

export default function LearningEnvironment() {
  return (
    <section className="py-20 bg-slate-50 font-sans overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* --- Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <Wifi className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
              Digital Campus
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            A Classroom Without <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Boundaries.
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            We combine world-class pedagogy with cutting-edge technology. 
            Experience an interactive, safe, and engaging environment from the comfort of your home.
          </p>
        </div>

        {/* --- Bento Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Main Visual (Live Classes) - Spans 7 cols */}
          <div className="md:col-span-7 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden relative group min-h-[400px]">
            <div className="absolute inset-0">
               <img 
                 src="https://images.unsplash.com/photo-1593642632823-8f7853670c40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                 alt="Student on Laptop" 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <div className="bg-amber-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-slate-900">
                 <MonitorPlay className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Live Interactive Sessions</h3>
              <p className="text-slate-200 text-sm max-w-md">
                Two-way audio/video classes via Zoom/Meet. Real-time doubt solving, screen sharing, and digital whiteboards make learning seamless.
              </p>
            </div>
          </div>

          {/* Card 2: Tools (Right Top) - Spans 5 cols */}
          <div className="md:col-span-5 bg-white rounded-[2rem] border border-slate-100 shadow-lg p-8 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-blue-600">
               <Gamepad2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Premium Platforms</h3>
            <p className="text-slate-500 text-sm mb-6">
              We train on professional platforms like <span className="font-semibold text-slate-700">Lichess, Chess.com</span>, and specialized Robotics simulators.
            </p>
            
            {/* Platform Logos / Badges */}
            <div className="flex gap-3">
               <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">Lichess.org</span>
               <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">Chess.com</span>
               <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">Zoom</span>
            </div>
          </div>

          {/* Card 3: Resources (Left Bottom) - Spans 4 cols */}
          <div className="md:col-span-4 bg-white rounded-[2rem] border border-slate-100 shadow-lg p-8 hover:-translate-y-1 transition-transform duration-300">
             <div className="bg-purple-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-purple-600">
               <Library className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Resource Library</h3>
            <p className="text-slate-500 text-sm">
              Access recorded sessions, PDFs, puzzles, and assignments 24/7 through our student portal.
            </p>
          </div>

          {/* Card 4: Safety (Middle Bottom) - Spans 4 cols */}
          <div className="md:col-span-4 bg-white rounded-[2rem] border border-slate-100 shadow-lg p-8 hover:-translate-y-1 transition-transform duration-300">
             <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-green-600">
               <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Safe & Monitored</h3>
            <p className="text-slate-500 text-sm">
              A secure digital environment. Classes are monitored to ensure discipline and child safety.
            </p>
          </div>

          {/* Card 5: Community (Right Bottom) - Spans 4 cols */}
          <div className="md:col-span-4 bg-amber-500 rounded-[2rem] shadow-lg p-8 flex flex-col justify-between text-white relative overflow-hidden">
             {/* Decor */}
             <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
             
             <div>
                <Users className="w-10 h-10 mb-4 text-slate-900" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Competitive Spirit</h3>
                <p className="text-slate-900/80 text-sm font-medium">
                  Weekly internal tournaments, leaderboards, and inter-academy leagues.
                </p>
             </div>
             
             <div className="mt-6 flex items-center gap-2 text-slate-900 text-xs font-bold uppercase tracking-wide">
                <CheckCircle2 className="w-4 h-4" />
                <span>Join the squad</span>
             </div>
          </div>

        </div>

      </div>
    </section>
  );
}