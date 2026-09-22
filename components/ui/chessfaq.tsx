"use client";

import { useState } from "react";
import { Plus, Minus, MessageCircle, Phone, HelpCircle, Sparkles, ChevronDown } from "lucide-react";
import { useBookDemoModal } from "@/components/ui/BookDemoModal";

export default function ChessFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openModal } = useBookDemoModal();

  const faqs = [
    {
      question: "What is the best age for a child to start chess?",
      answer:
        "We recommend starting as early as 5 years old! At this age, children grasp board geometry, patterns, and movement rules quickly, building strong cognitive foundations for logic and patience.",
      category: "Admissions",
    },
    {
      question: "Do you offer both Online and Offline coaching batches?",
      answer:
        "Yes! We offer physical classroom batches with hands-on tournament boards, as well as live interactive online batches with digital puzzles, screen analysis, and recorded replay access.",
      category: "Format",
    },
    {
      question: "Can adult beginners or parents join without prior experience?",
      answer:
        "Absolutely! We have dedicated weekend adult batches designed as a relaxing, screen-free hobby to unwind, learn tactical thinking, and play friendly games with peers.",
      category: "Adults",
    },
    {
      question: "What is the student-to-coach ratio in each batch?",
      answer:
        "To ensure personal attention and live game correction, our batches maintain small class sizes (under 8–10 students per coach), allowing individualized feedback every session.",
      category: "Classes",
    },
    {
      question: "How does Elephant Chess Academy prepare students for FIDE ratings?",
      answer:
        "We provide structured opening repertoires, tournament clock management, pre-game opponent preparation, and coach-accompanied participation in official district, state, and national rating events.",
      category: "Tournaments",
    },
    {
      question: "How do I book a Free Trial Class?",
      answer:
        "Simply click any 'Book Free Trial' button on the website or message us directly on WhatsApp. We will evaluate your current level and assign the perfect starter batch!",
      category: "Free Trial",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-sky-50/20 to-white text-slate-900 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#29A3DD]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#FDB813]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#29A3DD] font-black text-xs uppercase tracking-widest shadow-xs">
            <Sparkles size={14} />
            <span>Parent & Student FAQs</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 tracking-tight leading-tight uppercase">
            FREQUENTLY ASKED <span className="bg-gradient-to-r from-[#29A3DD] via-sky-500 to-[#FDB813] bg-clip-text text-transparent">QUESTIONS</span>
          </h2>

          <p className="text-slate-600 font-semibold italic text-base md:text-lg max-w-2xl mx-auto">
            "Everything you need to know about our courses, schedules, age groups, and tournament journeys."
          </p>
        </div>

        {/* --- 2-COLUMN GRID (FAQS ON LEFT, DOODLE ON RIGHT) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: FAQ Accordions */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={`rounded-2xl border-[3px] border-black transition-all duration-200 cursor-pointer overflow-hidden ${
                    isOpen
                      ? "bg-white shadow-[6px_6px_0px_0px_rgba(10,17,40,1)] -translate-y-0.5"
                      : "bg-white/90 hover:bg-white shadow-[3px_3px_0px_0px_rgba(10,17,40,1)]"
                  }`}
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 text-[#29A3DD] font-black text-xs flex items-center justify-center shrink-0">
                          Q{index + 1}
                        </span>
                        <h3 className="font-black text-base sm:text-lg text-slate-950 leading-snug">
                          {faq.question}
                        </h3>
                      </div>

                      <div
                        className={`w-8 h-8 rounded-xl border-2 border-black flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen ? "bg-[#29A3DD] text-white rotate-180" : "bg-slate-100 text-slate-900"
                        }`}
                      >
                        <ChevronDown size={18} strokeWidth={3} />
                      </div>
                    </div>

                    {isOpen && (
                      <div className="pt-4 mt-4 border-t-2 border-slate-100 text-slate-700 text-sm sm:text-[15px] font-medium leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: ELEPHANT DOODLE SHOWCASE CARD */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-28 space-y-5">
              
              {/* Main Mascot Doodle Container */}
              <div className="rounded-[2.5rem] border-[3px] border-black bg-amber-400 overflow-hidden shadow-[8px_8px_0px_0px_rgba(10,17,40,1)] relative aspect-[4/5] group">
                <img
                  src="/elephant-faq.jpg"
                  alt="Elephant Chess Academy Curious Mascot"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Floating Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full border-2 border-black shadow-md flex items-center gap-1.5">
                    <span className="text-sm">💡</span>
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-900">
                      Got A Question?
                    </span>
                  </div>
                </div>

                {/* Bottom Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white z-10">
                  <span className="text-xs font-black uppercase tracking-widest text-[#FDB813] mb-1">
                    🐘 We're Here To Help
                  </span>
                  <p className="text-sm sm:text-base font-black leading-snug">
                    Speak directly with Coach Anshul to plan your child's chess roadmap.
                  </p>
                </div>
              </div>

              {/* Direct Call & WhatsApp Contact Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:+919887821721"
                  className="bg-white hover:bg-slate-50 border-[3px] border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(10,17,40,1)] flex items-center gap-3 transition-transform hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-[#29A3DD] flex items-center justify-center shrink-0">
                    <Phone size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                      Call Academy
                    </span>
                    <span className="text-xs font-black text-slate-900 block">
                      +91 98878 21721
                    </span>
                  </div>
                </a>

                <a
                  href="https://wa.me/919887821721"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-50 hover:bg-emerald-100 border-[3px] border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(10,17,40,1)] flex items-center gap-3 transition-transform hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MessageCircle size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700 block">
                      WhatsApp Us
                    </span>
                    <span className="text-xs font-black text-emerald-950 block">
                      Instant Chat
                    </span>
                  </div>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}