"use client";

import React, { useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  tag: string;
  tagColor: string;
  headline: string;
  quote: string;
  rating: number;
  image: string;
  category: "kids" | "adults" | "tournaments";
}

const testimonials: Testimonial[] = [
  {
    name: "Pooja Agarwal",
    role: "Mother of 8yo Reyansh",
    tag: "Kids Beginner Batch",
    tagColor: "bg-sky-100 text-[#29A3DD] border-sky-200",
    headline: "From Screen Time to Chess Tactics in 2 Months!",
    quote:
      "Reyansh used to spend hours on mobile games. Since joining Elephant Chess Academy, he eagerly solves puzzle sheets before school and talks about knight forks during dinner! His focus and patience have drastically improved.",
    rating: 5,
    image: "/avatar1.jpg",
    category: "kids",
  },
  {
    name: "Karthik Venkat",
    role: "Father of Vihaan (U-14 State Rated)",
    tag: "Tournament Tier • FIDE 1420",
    tagColor: "bg-amber-100 text-amber-700 border-amber-200",
    headline: "Secured His First Official FIDE Rating!",
    quote:
      "The tournament preparation and post-game PGN breakdowns by Anshul Sir are truly world-class. He taught my son not just opening systems, but the mental stamina needed to win under clock pressure.",
    rating: 5,
    image: "/avatar2.png",
    category: "tournaments",
  },
  {
    name: "Dr. Vikram Sethi",
    role: "Adult Student & Parent",
    tag: "Adult Weekend Batch",
    tagColor: "bg-purple-100 text-purple-700 border-purple-200",
    headline: "The Best Screen-Free Mental Workout for Adults!",
    quote:
      "I joined the adult batch to play better with my daughter. The coaches make positional strategy easy to grasp without feeling dry. It has become my favorite way to de-stress on weekends.",
    rating: 5,
    image: "/avatar3.jpeg",
    category: "adults",
  },
  {
    name: "Meera Nambiar",
    role: "Mother of 11yo Ananya",
    tag: "Junior Intermediate Tier",
    tagColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    headline: "Patient Mentors Who Truly Build Confidence!",
    quote:
      "Ananya was initially shy and intimidated by chess timers. The interactive puzzle battles and patient coaching gave her so much confidence that she just clinched 2nd place in her inter-school tournament!",
    rating: 5,
    image: "/avatar1.jpg",
    category: "kids",
  },
];

export const TestimonialsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredTestimonials =
    activeFilter === "all"
      ? testimonials
      : testimonials.filter((t) => t.category === activeFilter);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-sky-50/20 to-white text-slate-900 relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[#29A3DD]/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-[#FDB813]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          {/* Rating Trust Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(10,17,40,1)]">
            <div className="flex items-center text-amber-500 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            </div>
            <span className="text-xs font-black uppercase text-slate-900 tracking-wider">
              4.9/5 • Rated by 1,000+ Kids & Parents
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 tracking-tight leading-tight uppercase">
            STORIES OF <span className="bg-gradient-to-r from-[#29A3DD] via-sky-500 to-[#FDB813] bg-clip-text text-transparent">STRATEGY & JOY</span>
          </h2>

          <p className="text-slate-600 font-semibold italic text-base md:text-lg max-w-2xl mx-auto">
            "Real experiences from families and adults who turned curiosity into lifelong chess confidence."
          </p>

          {/* Filter Pill Buttons */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {[
              { id: "all", label: "All Reviews (4)" },
              { id: "kids", label: "Kids & Juniors (2)" },
              { id: "tournaments", label: "Tournament Champions (1)" },
              { id: "adults", label: "Adult Hobbyists (1)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-2 border-black ${
                  activeFilter === tab.id
                    ? "bg-[#29A3DD] text-white shadow-[3px_3px_0px_0px_rgba(10,17,40,1)]"
                    : "bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials 2-Column Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {filteredTestimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[2rem] border-[3px] border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(10,17,40,1)] hover:-translate-y-1.5 transition-transform duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Top Row: Stars & Category Tag */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                    <span className="text-xs font-black text-slate-900 ml-1.5">5.0</span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </div>

                {/* Testimonial Headline */}
                <h3 className="text-lg sm:text-xl font-[1000] text-slate-950 uppercase tracking-tight leading-snug mb-3">
                  "{item.headline}"
                </h3>

                {/* Testimonial Body */}
                <p className="text-slate-700 text-sm md:text-[15px] font-medium leading-relaxed">
                  {item.quote}
                </p>
              </div>

              {/* Author Details Footer */}
              <div className="pt-6 mt-6 border-t-2 border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-black bg-slate-100 shadow-sm shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-950 text-sm sm:text-base leading-snug">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-bold mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* Verified Parent Badge */}
                <div className="hidden sm:flex items-center gap-1 text-[11px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;