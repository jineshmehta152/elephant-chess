"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, MessageCircle, HelpCircle, ArrowUp } from "lucide-react";

const faqData = [
  {
    question: "What makes FutureMind Skills Academy different?",
    answer: "Unlike traditional tutoring, we focus on high-impact cognitive skills like Chess, Coding, and Memory Mastery. Our curriculum is designed to build logic and critical thinking, which are essential for future success in any field.",
  },
  {
    question: "At what age should my child start these programs?",
    answer: "Most of our programs, including Chess and Memory training, are ideal for ages 5 and up. Coding and Logic modules are typically introduced at ages 7-8 to ensure they have the foundational reasoning skills to succeed.",
  },
  {
    question: "Are the programs available online or only at the campus?",
    answer: "We offer a hybrid approach. While our campus provides a great collaborative environment, we also offer high-quality interactive online sessions for students who prefer learning from home.",
  },
  {
    question: "How do you track a student's progress?",
    answer: "Every student undergoes periodic assessments. For skills like Chess, we track Elo ratings and tournament performance. For Coding and Logic, progress is measured through project completion and problem-solving speed.",
  },
  {
    question: "Can I choose multiple programs for my child?",
    answer: "Absolutely! Many of our students combine Chess with Coding or Memory training. We design our schedules to be flexible, allowing children to develop a well-rounded set of future-ready skills.",
  },
  {
    question: "Do you offer a trial session before enrollment?",
    answer: "Yes, we believe parents should see the value firsthand. You can book a free demo session for any of our programs to see our teaching methodology and how your child responds to the trainer.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative bg-white py-16 md:py-24 px-4 overflow-hidden" id="faq">
      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* --- CENTERED HEADER --- */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#01539D] text-xs font-bold uppercase tracking-widest mb-6">
            <HelpCircle className="w-4 h-4" />
            Support Center
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Got Questions? <span className="text-[#46B94A]">We Have Answers.</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Everything you need to know about our specialized skill programs and enrollment process.
          </p>
        </div>

        {/* --- COMPACT ACCORDION LIST --- */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`group border rounded-2xl transition-all duration-300 ${
                  isOpen ? 'border-[#01539D] bg-[#01539D]/[0.02]' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`font-bold text-lg md:text-xl pr-8 transition-colors ${
                    isOpen ? 'text-[#01539D]' : 'text-slate-800 group-hover:text-[#01539D]'
                  }`}>
                    {item.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen ? 'bg-[#01539D] text-white rotate-180' : 'bg-slate-50 text-slate-400'
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden px-6">
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed border-t border-slate-100/50 pt-4">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- COMPACT CTA BOX --- */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between p-8 rounded-3xl bg-slate-50 border border-slate-100">
          <div className="mb-6 sm:mb-0 text-center sm:text-left">
            <h3 className="text-slate-900 font-black text-xl mb-1">Still confused?</h3>
            <p className="text-slate-500 font-medium">Chat with our counselor for clarity.</p>
          </div>
          <a 
            href="https://wa.me/919887821721" 
            className="flex items-center gap-2 px-8 py-4 bg-[#46B94A] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#3da341] transition-all shadow-lg shadow-green-100 active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* Floating Scroll To Top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 z-50 w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl transition-all hover:bg-[#01539D] hover:-translate-y-2 active:scale-90 text-white ${
          showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" strokeWidth={3} />
      </button>
    </section>
  );
}