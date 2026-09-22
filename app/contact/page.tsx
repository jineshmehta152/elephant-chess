"use client";
import React, { useState } from "react";
import Link from "next/link";
import SubpageBanner from "@/components/ui/SubpageBanner";
import ChessFAQSection from "@/components/ui/chessfaq";
import { useBookDemoModal } from "@/components/ui/BookDemoModal";
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Send,
  Calendar,
  Award,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { openModal } = useBookDemoModal();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      {/* ── Subpage Banner ── */}
      <SubpageBanner
        title="Get In"
        highlight="Touch."
        subtitle="Have questions about admissions, trial classes, or batch timings? We're here to help."
        breadcrumbLabel="Contact Us"
        bgImage="/about-chess-match.jpg"
        widgetLeft1Icon="Phone"
        widgetLeft1Label="Direct Helpline"
        widgetLeft1Value="+91 98878 21721"
        widgetLeft2Icon="Mail"
        widgetLeft2Label="Official Desk"
        widgetLeft2Value="elephantchessacademy@gmail.com"
        widgetRightIcon="Clock"
        widgetRightLabel="Response Time"
        widgetRightValue="< 2 Hours Guaranteed"
      />

      {/* ── Main Contact & Form Section ── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative overflow-hidden">
        {/* Subtle Ambient Glowing Background */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#29A3DD]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#FDB813]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border-2 border-black text-[#29A3DD] font-[1000] text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CONNECT WITH OUR HEAD COACH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] text-slate-950 uppercase tracking-tight leading-tight">
            LET'S TALK{" "}
            <span className="bg-gradient-to-r from-[#29A3DD] via-sky-500 to-[#FDB813] bg-clip-text text-transparent">
              CHESS.
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-semibold max-w-2xl mx-auto">
            Whether you are booking a beginner trial class, evaluating skill levels, or aiming for national FIDE tournament preparation, our doors are always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── Left Column: 4 Neo-Brutalist Contact Cards (5 cols) ── */}
          <div className="lg:col-span-5 space-y-5">

            {/* Academy Center Location */}
            <div className="rounded-3xl border-[3px] border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl border-2 border-black bg-[#29A3DD] text-white flex items-center justify-center text-xl shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <MapPin className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-[1000] uppercase tracking-wider text-[#29A3DD] block">
                    Academy Center
                  </span>
                  <h3 className="font-[1000] text-lg text-slate-950 uppercase tracking-tight">
                    Main Physical Hub
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 leading-relaxed pt-0.5">
                    Danavai Peta, Rajamahendravaram, Andhra Pradesh — 533103
                  </p>
                </div>
              </div>
            </div>

            {/* Phone & WhatsApp Quick Card */}
            <div className="rounded-3xl border-[3px] border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl border-2 border-black bg-emerald-500 text-white flex items-center justify-center text-xl shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Phone className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="space-y-2 flex-1">
                  <div>
                    <span className="text-[10px] font-[1000] uppercase tracking-wider text-emerald-600 block">
                      Direct Helplines
                    </span>
                    <h3 className="font-[1000] text-lg text-slate-950 uppercase tracking-tight">
                      Phone & WhatsApp
                    </h3>
                  </div>

                  <div className="text-xs font-bold text-slate-800 space-y-0.5">
                    <p>📞 +91 98878 21721</p>
                    <p>📱 +91 62812 50967</p>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2">
                    <a
                      href="tel:+919887821721"
                      className="px-4 py-2 bg-slate-950 text-white rounded-xl text-[10px] font-[1000] uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_rgba(41,163,221,1)] hover:bg-[#29A3DD] transition-all"
                    >
                      Call Now
                    </a>
                    <a
                      href="https://wa.me/919887821721?text=Hi%20Elephant%20Chess%20Academy,%20I%20would%20like%20to%20enquire%20about%20chess%20courses."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-[10px] font-[1000] uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-emerald-600 transition-all flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Us</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Support Card */}
            <div className="rounded-3xl border-[3px] border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl border-2 border-black bg-[#FDB813] text-slate-950 flex items-center justify-center text-xl shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Mail className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-[1000] uppercase tracking-wider text-amber-700 block">
                    Email Desk
                  </span>
                  <h3 className="font-[1000] text-lg text-slate-950 uppercase tracking-tight">
                    Official Inquiries
                  </h3>
                  <p className="text-xs font-bold text-slate-700 break-all pt-0.5">
                    elephantchessacademy@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Academy Timings */}
            <div className="rounded-3xl border-[3px] border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
                <Clock className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                <h3 className="font-[1000] text-sm uppercase tracking-wider text-slate-950">
                  Operating Hours
                </h3>
              </div>

              <div className="space-y-2 text-xs font-semibold">
                <div className="flex justify-between items-center text-slate-700">
                  <span>Monday – Saturday:</span>
                  <span className="font-black text-slate-950">9:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span>Sunday (Weekly Arena):</span>
                  <span className="font-black text-[#29A3DD]">8:00 AM – 6:00 PM</span>
                </div>
              </div>
            </div>

          </div>

          {/* ── Right Column: Interactive Neo-Brutalist Form (7 cols) ── */}
          <div className="lg:col-span-7">
            <div className="rounded-[2.5rem] border-[3px] border-black bg-white p-8 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
              
              <div className="space-y-2 pb-4 border-b border-slate-100">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-[1000] text-[10px] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Fast Callback Guaranteed</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-[1000] text-slate-950 uppercase tracking-tight">
                  Send a Direct Message
                </h3>

                <p className="text-xs sm:text-sm font-medium text-slate-500">
                  Our head coaching coordinator will review your child's background and contact you within 2 hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 sm:p-10 rounded-3xl border-2 border-black bg-emerald-50 text-center space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-black flex items-center justify-center text-3xl mx-auto shadow-sm">
                    🎉
                  </div>
                  <h4 className="text-2xl font-[1000] text-slate-950 uppercase tracking-tight">
                    Inquiry Received!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Elephant Chess Academy. Coach Anshul and the team will WhatsApp or call you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-slate-950 hover:bg-[#29A3DD] text-white font-[1000] rounded-xl text-xs uppercase tracking-widest transition-all border-2 border-black shadow-[3px_3px_0px_0px_rgba(253,184,19,1)] cursor-pointer"
                  >
                    Send Another Message
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
                      message: formData.get("message") as string,
                      source: "Contact Page Form",
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
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-[1000] text-slate-950 uppercase text-[11px] block mb-1">
                        Student Full Name *
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="e.g. Aarav Sharma"
                        className="w-full p-3.5 rounded-xl bg-slate-50 border-2 border-black focus:outline-none focus:bg-white text-slate-900 transition-all font-semibold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      />
                    </div>

                    <div>
                      <label className="font-[1000] text-slate-950 uppercase text-[11px] block mb-1">
                        Student Age / Grade *
                      </label>
                      <input
                        name="age"
                        type="text"
                        required
                        placeholder="e.g. 9 Years / Grade 4"
                        className="w-full p-3.5 rounded-xl bg-slate-50 border-2 border-black focus:outline-none focus:bg-white text-slate-900 transition-all font-semibold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-[1000] text-slate-950 uppercase text-[11px] block mb-1">
                        Parent WhatsApp / Phone *
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        required
                        placeholder="+91 98878 21721"
                        className="w-full p-3.5 rounded-xl bg-slate-50 border-2 border-black focus:outline-none focus:bg-white text-slate-900 transition-all font-semibold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      />
                    </div>

                    <div>
                      <label className="font-[1000] text-slate-950 uppercase text-[11px] block mb-1">
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="parent@example.com"
                        className="w-full p-3.5 rounded-xl bg-slate-50 border-2 border-black focus:outline-none focus:bg-white text-slate-900 transition-all font-semibold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-[1000] text-slate-950 uppercase text-[11px] block mb-1">
                        Current Skill Level *
                      </label>
                      <select name="level" className="w-full p-3.5 rounded-xl bg-slate-50 border-2 border-black focus:outline-none focus:bg-white text-slate-900 font-semibold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <option>Beginner (Knows piece moves / zero prior)</option>
                        <option>Casual Player (Unrated, plays with family)</option>
                        <option>Intermediate (Tactics, 1000–1400 online)</option>
                        <option>FIDE Rated Competitor (1400+ FIDE)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-[1000] text-slate-950 uppercase text-[11px] block mb-1">
                        Preferred Mode *
                      </label>
                      <select name="mode" className="w-full p-3.5 rounded-xl bg-slate-50 border-2 border-black focus:outline-none focus:bg-white text-slate-900 font-semibold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <option>💻 Live Online Interactive Batches</option>
                        <option>🏛️ Physical Center (Danavai Peta)</option>
                        <option>🎯 1-on-1 Personalized Mentorship</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-[1000] text-slate-950 uppercase text-[11px] block mb-1">
                      Your Message or Questions
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Share any tournament history, preferred trial timings, or specific learning goals..."
                      className="w-full p-3.5 rounded-xl bg-slate-50 border-2 border-black focus:outline-none focus:bg-white text-slate-900 transition-all font-semibold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#FDB813] hover:bg-amber-400 text-slate-950 font-[1000] text-xs uppercase tracking-wider border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <p className="text-[10px] text-slate-400 font-bold text-center pt-1">
                    🔒 Strictly confidential. No spam policy from Elephant Chess Academy.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── Google Maps Integration Section ── */}
      <section className="py-20 bg-white border-y-[3px] border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border-2 border-black text-[#29A3DD] font-[1000] text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <MapPin className="w-3.5 h-3.5" />
                <span>VISIT OUR CAMPUS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] text-slate-950 uppercase tracking-tight leading-tight">
                FIND US ON{" "}
                <span className="bg-gradient-to-r from-[#29A3DD] to-[#FDB813] bg-clip-text text-transparent">
                  GOOGLE MAPS.
                </span>
              </h2>
            </div>
            
            <a
              href="https://maps.google.com/?q=Danavai+Peta+Rajamahendravaram+AP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-[#29A3DD] text-white text-xs font-[1000] uppercase tracking-wider transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(253,184,19,1)] shrink-0 hover:-translate-y-0.5"
            >
              <span>Get GPS Directions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Embedded Google Map Frame */}
          <div className="relative w-full h-[420px] rounded-[2.5rem] overflow-hidden border-[3px] border-black bg-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <iframe
              title="Elephant Chess Academy Location"
              src="https://maps.google.com/maps?q=Danavai%20Peta%2C%20Rajamahendravaram%2C%20Andhra%20Pradesh%20533103&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Floating Location Pill */}
            <div className="absolute bottom-5 left-5 bg-white p-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden sm:flex items-center gap-3.5 max-w-sm">
              <div className="w-10 h-10 rounded-xl bg-[#29A3DD] border border-black text-white flex items-center justify-center text-lg font-bold shrink-0">
                🐘
              </div>
              <div>
                <p className="font-[1000] text-slate-950 text-xs uppercase tracking-tight">Elephant Chess Academy</p>
                <p className="text-[10px] font-bold text-slate-500">Danavai Peta, Rajamahendravaram, AP 533103</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FAQ Section (With Custom Doodle Mascot) ── */}
      <ChessFAQSection />

      {/* ── Direct Coach Hotline CTA Banner ── */}
      <section className="py-14 md:py-20 px-4 sm:px-6 md:px-8 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#0A1128] via-[#10224d] to-[#0A1128] border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(253,184,19,1)] p-8 sm:p-12 md:p-14 text-white">
            
            {/* Background Spotlights */}
            <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full bg-[#29A3DD]/30 blur-3xl pointer-events-none" />
            <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-[#FDB813]/20 blur-3xl pointer-events-none" />
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[160px] text-white/[0.04] font-black select-none pointer-events-none leading-none hidden lg:block">
              🐘
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#FDB813] font-[1000] text-[10px] uppercase tracking-widest backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Instant Head Coach Helpline</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-[1000] text-white uppercase tracking-tight leading-tight">
                  STILL HAVE QUESTIONS? <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-[#29A3DD] via-sky-300 to-[#FDB813] bg-clip-text text-transparent">
                    SPEAK WITH COACH ANSHUL.
                  </span>
                </h2>

                <p className="text-sky-100 text-xs sm:text-sm font-medium leading-relaxed max-w-lg">
                  Get personalized guidance on tournament roadmap, rating goals, and trial class schedule directly from our FIDE-certified instructor.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="tel:+919887821721"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FDB813] hover:bg-amber-400 text-slate-950 font-[1000] text-xs uppercase tracking-wider rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all hover:-translate-y-0.5"
                  >
                    <span>📞 Call: +91 98878 21721</span>
                  </a>

                  <button
                    onClick={openModal}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border-2 border-white/25 text-white font-[1000] text-xs uppercase tracking-wider rounded-2xl transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Book Free Demo</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              </div>

              {/* Right Column: 3 Contact Guarantee Badges */}
              <div className="lg:col-span-5 grid grid-cols-1 gap-3">
                {[
                  {
                    icon: "⚡",
                    title: "< 2 Hour Callback Guarantee",
                    subtitle: "Fast response parent desk policy",
                    accent: "border-[#29A3DD]/40 bg-[#29A3DD]/10 text-[#29A3DD]"
                  },
                  {
                    icon: "🧩",
                    title: "Free 1-on-1 Skill Assessment",
                    subtitle: "45-minute diagnostic evaluation",
                    accent: "border-[#FDB813]/40 bg-[#FDB813]/10 text-[#FDB813]"
                  },
                  {
                    icon: "🛡️",
                    title: "FIDE Standard Training",
                    subtitle: "Genuine advice with zero commitment",
                    accent: "border-emerald-400/40 bg-emerald-500/10 text-emerald-400"
                  }
                ].map((badge, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/15 hover:border-white/30 hover:bg-white/10 transition-all backdrop-blur-xs"
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 border ${badge.accent}`}>
                      {badge.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-[1000] text-xs uppercase tracking-tight">{badge.title}</h4>
                      <p className="text-sky-200 text-[11px] font-medium mt-0.5">{badge.subtitle}</p>
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
