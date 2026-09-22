"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface BookDemoContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const BookDemoContext = createContext<BookDemoContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const useBookDemoModal = () => useContext(BookDemoContext);

export const openBookDemoModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-book-demo"));
  }
};

export function BookDemoProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openModal = useCallback(() => {
    setSubmitted(false);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleCustomEvent = () => {
      setSubmitted(false);
      setIsOpen(true);
    };

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('[data-book-demo], a[href*="bookdemo"]');
      if (clickable) {
        e.preventDefault();
        setSubmitted(false);
        setIsOpen(true);
      }
    };

    window.addEventListener("open-book-demo", handleCustomEvent);
    document.addEventListener("click", handleGlobalClick, true);

    return () => {
      window.removeEventListener("open-book-demo", handleCustomEvent);
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <BookDemoContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}

      {/* Global Split Book Demo Modal Pop-up (Left: Contact Info | Right: Form) */}
      <div
        className={`fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto ${
          isOpen ? "flex" : "hidden"
        }`}
        onClick={closeModal}
      >
        <div
          className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 grid grid-cols-1 lg:grid-cols-12 my-auto z-[100000]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            ✕
          </button>

          {/* ── LEFT COLUMN: Contact Details & Academy Credentials ── */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0A1128] via-[#29A3DD] to-[#0A1128] text-white p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Background Ambient Glows & Watermark */}
            <div className="absolute -left-16 -top-16 w-60 h-60 rounded-full bg-[#29A3DD]/40 blur-3xl pointer-events-none" />
            <div className="absolute -right-16 -bottom-16 w-60 h-60 rounded-full bg-[#FDB813]/25 blur-3xl pointer-events-none" />
            <div className="absolute right-4 bottom-4 text-[140px] text-white/[0.06] font-black select-none pointer-events-none leading-none">
              🐘
            </div>

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Free 45-Min Evaluation
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                  Book Your Free <br />
                  <span className="italic text-[#FDB813]">Demo Class.</span>
                </h2>
                <p className="text-blue-100 text-xs mt-2 leading-relaxed font-medium">
                  Evaluate your child's chess level with our FIDE-certified coach. No payment or credit card required.
                </p>
              </div>

              {/* Contact Details List */}
              <div className="space-y-4 text-xs pt-2 border-t border-white/15">
                <div className="flex items-start gap-3">
                  <span className="text-lg">📍</span>
                  <div>
                    <p className="font-black text-white">Academy Center</p>
                    <p className="text-slate-200 text-[11px] leading-relaxed">
                      Danavai Peta, Rajamahendravaram, AP 533103
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-lg">📞</span>
                  <div>
                    <p className="font-black text-white">Direct Helpline</p>
                    <p className="text-slate-200 text-[11px]">
                      +91 98878 21721 / +91 62812 50967
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-lg">💬</span>
                  <div>
                    <p className="font-black text-white">WhatsApp Support</p>
                    <a
                      href="https://wa.me/919887821721"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-300 text-[11px] font-bold hover:underline"
                    >
                      +91 98878 21721 (Instant Reply)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-lg">✉️</span>
                  <div>
                    <p className="font-black text-white">Email Address</p>
                    <p className="text-slate-200 text-[11px] break-all">
                      elephantchessacademy@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FIDE Footer Accreditation */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/15 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-[#FDB813] flex items-center justify-center font-bold text-sm shrink-0 border border-amber-300/30">
                🛡️
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-white tracking-wider">FIDE Certified Academy</p>
                <p className="text-[9px] text-sky-200 font-semibold">International Standards • Ages 5-16</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Interactive Booking Form ── */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 bg-white flex flex-col justify-center">
            {submitted ? (
              <div className="py-10 px-4 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto">
                  🎉
                </div>
                <h3 className="text-2xl font-black text-[#0A1128]">Demo Class Reserved!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed font-medium">
                  Thank you! Our head coach will WhatsApp or call you within 2 hours to confirm your child's 1-on-1 evaluation timing.
                </p>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left text-xs space-y-1.5 max-w-xs mx-auto font-medium">
                  <p className="font-bold text-[#0A1128]">Next Steps:</p>
                  <p className="text-slate-600">1. Keep your phone handy for our call.</p>
                  <p className="text-slate-600">2. Prepare a laptop/tablet for online trial.</p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-8 py-3 bg-[#0A1128] hover:bg-[#29A3DD] text-white font-black rounded-xl text-xs uppercase tracking-widest transition-colors shadow-md cursor-pointer"
                >
                  Done & Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  const payload = {
                    name: formData.get("name") as string,
                    age: formData.get("age") as string,
                    phone: formData.get("phone") as string,
                    email: formData.get("email") as string,
                    level: formData.get("level") as string,
                    mode: formData.get("mode") as string,
                    source: "Book Demo Modal",
                  };
                  try {
                    fetch("/api/enquiry", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload),
                    });
                  } catch (err) {
                    console.error(err);
                  }
                  setSubmitted(true);
                }}
                className="space-y-4 text-xs text-left"
              >
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-black text-[#0A1128]">Schedule Evaluation</h3>
                  <p className="text-slate-500 text-[11px] font-semibold">Fill in student details for customized batch placement.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="font-extrabold text-[#0A1128] block mb-1">Student Full Name *</label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#29A3DD] focus:bg-white text-slate-900 transition-all font-semibold"
                    />
                  </div>

                  <div>
                    <label className="font-extrabold text-[#0A1128] block mb-1">Student Age / Grade *</label>
                    <input
                      name="age"
                      type="text"
                      required
                      placeholder="e.g. 9 Years / Grade 4"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#29A3DD] focus:bg-white text-slate-900 transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-extrabold text-[#0A1128] block mb-1">Parent Phone / WhatsApp *</label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#29A3DD] focus:bg-white text-slate-900 transition-all font-semibold"
                    />
                  </div>

                  <div>
                    <label className="font-extrabold text-[#0A1128] block mb-1">Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="name@example.com"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#29A3DD] focus:bg-white text-slate-900 transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-extrabold text-[#0A1128] block mb-1">Current Skill Level *</label>
                    <select name="level" className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#29A3DD] focus:bg-white text-slate-900 font-semibold">
                      <option>Absolute Beginner (Knows piece moves/zero prior)</option>
                      <option>Casual Player (Unrated, plays with family)</option>
                      <option>Intermediate (Knows tactics, 1000+ online)</option>
                      <option>Rated Competitor (FIDE Rated player)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-extrabold text-[#0A1128] block mb-1">Preferred Mode *</label>
                    <select name="mode" className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#29A3DD] focus:bg-white text-slate-900 font-semibold">
                      <option>💻 Live Online Interactive Batch</option>
                      <option>🏛️ Offline Physical Branch Center</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-[#29A3DD] via-sky-500 to-[#0A1128] hover:from-sky-400 hover:to-[#29A3DD] text-white font-black text-xs uppercase tracking-widest shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  Confirm Free Trial Booking →
                </button>

                <p className="text-[10px] text-slate-400 text-center font-semibold">
                  🔒 100% Free Evaluation. Your details are strictly confidential with Elephant Chess Academy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </BookDemoContext.Provider>
  );
}

export default BookDemoProvider;
