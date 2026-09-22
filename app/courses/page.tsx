"use client";
import React, { useState } from "react";
import Link from "next/link";
import SubpageBanner from "@/components/ui/SubpageBanner";
import { CoursesSection } from "@/components/courses-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { DemoBookingCTA } from "@/components/demo-booking-cta";
import { useBookDemoModal } from "@/components/ui/BookDemoModal";
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Calendar,
  Clock,
  Award,
  Video,
  BookOpen,
  Trophy,
  Brain,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Compass,
  FileText,
  BarChart2,
  Users,
  Layers,
} from "lucide-react";

interface CourseDetailItem {
  id: string;
  no: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  themeColor: string;
  image: string;
  ratingRange: string;
  duration: string;
  sessions: string;
  weeklyClasses: string;
  practiceSession: string;
  certificate: string;
  mode: string;
  overview: string;
  whoFor: string;
  whatLearn: string[];
  outcomes: string[];
}

const courseDetails: CourseDetailItem[] = [
  {
    id: "beginner",
    no: "01",
    title: "Foundations & Piece Activation",
    subtitle: "Pawn to Knight Essentials",
    badge: "Level 1 • Beginner",
    badgeColor: "bg-[#29A3DD] text-white",
    themeColor: "#29A3DD",
    image: "/level-beginner-elephant.jpg",
    ratingRange: "Unrated → 800",
    duration: "3 Months",
    sessions: "24 Live Interactive Sessions",
    weeklyClasses: "2 Classes / Week (60–90 min)",
    practiceSession: "1 Guided Puzzle Arena / Week",
    certificate: "Official Level 1 Foundation Certificate",
    mode: "Live Online & Physical Batches",
    overview:
      "Designed specifically for absolute beginners and young minds starting their chess journey. Students learn full board geometry, proper movement and value of every piece, fundamental checkmate formulas, and basic opening principles in a fun, engaging, and structured environment.",
    whoFor:
      "Kids aged 5+ with zero chess background, casual players who want to eliminate illegal moves, and parents seeking to foster focus and analytical discipline in their children.",
    whatLearn: [
      "Board geometry: ranks, files, diagonals, and centre control",
      "Exact movement rules, special captures (En Passant, Castling)",
      "Essential checkmates (Queen + King, 2 Rooks, Back-Rank Mate)",
      "Basic tactics: single-move forks, skewers, and pins",
      "Golden opening principles: develop pieces, castle early, control centre",
      "Chess etiquette, sportsmanship, and algebraic move notation",
    ],
    outcomes: [
      "Play full, legal chess matches with 100% confidence",
      "Identify checkmate threats and defend against early beginner traps",
      "Develop patient thinking and calculate 1–2 moves in advance",
      "Solve Level 1 tactical puzzles on the student portal independently",
      "Read and record scoresheets for tournament play",
    ],
  },
  {
    id: "adv-beginner",
    no: "02",
    title: "Tactical Vision & Combinations",
    subtitle: "Bishop & Rook Attack Systems",
    badge: "Level 2 • Adv. Beginner",
    badgeColor: "bg-[#FDB813] text-slate-950",
    themeColor: "#FDB813",
    image: "/level-adv-beginner-elephant.jpg",
    ratingRange: "800 → 1200",
    duration: "4 Months",
    sessions: "32 Live Interactive Sessions",
    weeklyClasses: "2 Classes / Week (90 min)",
    practiceSession: "Weekly Academy Arena Tournament + Game Review",
    certificate: "Intermediate Proficiency Certificate",
    mode: "Live Online & Physical Batches",
    overview:
      "Takes students from basic rule knowledge into active tactical calculation. Focuses heavily on pattern recognition, eliminating blunder habits, discovering multi-move combinations, controlling open files with heavy pieces, and learning fundamental King and Pawn endgames.",
    whoFor:
      "Students who have completed Level 1 or casual players rated 800–1200 online looking to participate in their first school or district-level chess competitions.",
    whatLearn: [
      "Multi-move tactics: discovered attacks, double checks, deflections",
      "Exploiting pins and absolute skewers in the middle-game",
      "Open and semi-open file control using Rooks and batteries",
      "Knight outposts, square weaknesses, and piece coordination",
      "Fundamental King & Pawn endgames (opposition, square rule)",
      "Rapid & Blitz clock management and tournament hygiene",
    ],
    outcomes: [
      "Calculate 2–3 moves deep before touching a piece",
      "Eliminate simple one-move piece blunders in competitive games",
      "Formulate active middle-game attacking plans",
      "Convert winning King and Pawn endgames accurately",
      "Compete in district-level inter-school championships",
    ],
  },
  {
    id: "intermediate",
    no: "03",
    title: "Positional Mastery & Strategy",
    subtitle: "Strategic Planning & Active Endgames",
    badge: "Level 3 • Intermediate",
    badgeColor: "bg-[#29A3DD] text-white",
    themeColor: "#29A3DD",
    image: "/level-intermediate-elephant.jpg",
    ratingRange: "1200 → 1600",
    duration: "6 Months",
    sessions: "48 Live Intensive Sessions",
    weeklyClasses: "2 Classes / Week (90–120 min)",
    practiceSession: "2 Weekly Rated Arenas + Coach PGN Analysis",
    certificate: "Advanced Strategy Excellence Diploma",
    mode: "Live Online & Physical Batches",
    overview:
      "A competitive track designed for serious junior players aiming to achieve FIDE ratings. Covers structured opening repertoires, positional evaluation, long-term pawn structure advantages, prophylaxis, candidate move discipline, and complex rook endgames.",
    whoFor:
      "Players rated 1200–1600 FIDE/Online who are actively participating in state tournaments and want deep positional understanding beyond mere tactics.",
    whatLearn: [
      "Candidate move discipline: systematic calculation and tree analysis",
      "Prophylactic thinking: anticipating and neutralising opponent threats",
      "Pawn structure mastery: isolated, doubled, and passed pawns",
      "Opening repertoire construction for both White and Black",
      "Complex endgame theory: Rook + Pawn vs Rook (Lucena & Philidor)",
      "Post-game PGN engine analysis and personal blunder tracking",
    ],
    outcomes: [
      "Achieve an official FIDE rating (1400–1600+ range)",
      "Build and execute a structured, personal opening database",
      "Understand and apply positional sacrifices for long-term initiative",
      "Confidently navigate high-pressure tournament time controls",
      "Qualify for state and national age-category championships",
    ],
  },
  {
    id: "advanced-expert",
    no: "04",
    title: "Grandmaster Track & 1-on-1 Mentorship",
    subtitle: "Tournament Mastery & FIDE Norms",
    badge: "Level 4 • Elite / GM Track",
    badgeColor: "bg-gradient-to-r from-[#FDB813] to-amber-500 text-slate-950",
    themeColor: "#FDB813",
    image: "/level-grandmaster-elephant.jpg",
    ratingRange: "1600+ FIDE to Titled Player",
    duration: "Ongoing Flexible Term",
    sessions: "Personalized 1-on-1 Sessions",
    weeklyClasses: "Custom 1-on-1 Schedule with FIDE Certified Mentors",
    practiceSession: "Daily Curated Puzzles + Video Game Breakdowns",
    certificate: "FIDE Norm Preparation & Elite Endorsement",
    mode: "Personalized 1-on-1 Online & Offline",
    overview:
      "Our premier 1-on-1 mentorship program tailored directly around the student's competitive schedule, target FIDE rating, and individual playing style. Conducted directly by FIDE-certified coaches with customized opponent profiling and deep theoretical preparation.",
    whoFor:
      "FIDE rated players (1600+), junior state/national champions, and ambitious students aspiring to earn Candidate Master (CM), FIDE Master (FM), or International Master (IM) titles.",
    whatLearn: [
      "Deep, engine-assisted opening preparation against specific opponents",
      "Tournament psychology, mental endurance, and multi-day focus",
      "Positional exchange sacrifices and dynamic imbalances",
      "Advanced endgame mastery: Bishop pairs, opposite bishops, fortresses",
      "Clock management techniques and increment exploitation",
      "Personalized training diary with weekly coach video reviews",
    ],
    outcomes: [
      "Systematic FIDE rating progression toward national and international titles",
      "Complete, tournament-tested master-level opening repertoire",
      "Elite tactical intuition and grandmaster-level calculation speed",
      "Professional tournament selection, planning, and norm pursuit",
      "Direct 1-on-1 mentorship from FIDE Certified Trainers",
    ],
  },
];

export default function CoursesPage() {
  const [openCourseId, setOpenCourseId] = useState<string | null>("beginner");
  const { openModal } = useBookDemoModal();

  const toggleCourse = (id: string) => {
    setOpenCourseId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      {/* ── Subpage Banner ── */}
      <SubpageBanner
        title="Featured"
        highlight="Programs."
        subtitle="Structured FIDE-aligned learning paths from beginner to master level."
        breadcrumbLabel="Courses"
        bgImage="/beginer.webp"
        widgetLeft1Icon="BookOpen"
        widgetLeft1Label="Curriculum"
        widgetLeft1Value="4 Progressive Tiers"
        widgetLeft2Icon="Award"
        widgetLeft2Label="Coaching"
        widgetLeft2Value="FIDE Instructors"
        widgetRightIcon="Globe"
        widgetRightLabel="Ecosystem"
        widgetRightValue="24/7 Practice Portal"
      />

      {/* ── Homepage Interactive Course Explorer (Growing Mascot Selector) ── */}
      <CoursesSection />

      {/* ── In-Depth Course Details & Syllabus Accordion ── */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        {/* Subtle Ambient Background */}
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#29A3DD]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#FDB813]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border-2 border-black text-[#29A3DD] font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMPREHENSIVE SYLLABUS & SCHEDULE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] text-slate-950 uppercase tracking-tight leading-tight">
              IN-DEPTH COURSE{" "}
              <span className="bg-gradient-to-r from-[#29A3DD] via-sky-500 to-[#FDB813] bg-clip-text text-transparent">
                DETAILS.
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base font-semibold max-w-2xl mx-auto">
              Explore complete curricula, weekly schedule logistics, cognitive objectives, and tangible graduation milestones for every tier.
            </p>
          </div>

          {/* Course Details Cards */}
          <div className="space-y-8">
            {courseDetails.map((course) => {
              const isOpen = openCourseId === course.id;

              return (
                <div
                  key={course.id}
                  className="rounded-[2rem] border-[3px] border-black bg-white overflow-hidden shadow-[6px_6px_0px_0px_rgba(10,17,40,1)] transition-all duration-300"
                >
                  {/* Card Header (Clickable Accordion Bar) */}
                  <div
                    onClick={() => toggleCourse(course.id)}
                    className="p-6 sm:p-8 cursor-pointer hover:bg-slate-50/80 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6 select-none"
                  >
                    {/* Left: Thumbnail & Core Info */}
                    <div className="flex items-start sm:items-center gap-5 sm:gap-6">
                      {/* Level Elephant Thumbnail */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-black overflow-hidden shrink-0 bg-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Title & Badges */}
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-0.5 rounded-full border border-black text-[10px] font-[1000] uppercase tracking-wider bg-black text-white">
                            PROGRAM {course.no}
                          </span>
                          <span
                            className={`px-3 py-0.5 rounded-full border border-black text-[10px] font-[1000] uppercase tracking-wider ${course.badgeColor}`}
                          >
                            {course.badge}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                            {course.ratingRange}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl md:text-3xl font-[1000] text-slate-950 uppercase tracking-tight leading-snug">
                          {course.title}
                        </h3>

                        <p className="text-xs sm:text-sm font-bold text-slate-500 italic">
                          {course.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Right: Quick Specs & Expand Toggle */}
                    <div className="flex items-center justify-between lg:justify-end gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-200">
                      {/* Mini pill badges for desktop */}
                      <div className="hidden sm:flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-xs font-black text-slate-800 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#29A3DD]" />
                          {course.duration}
                        </span>
                        <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-xs font-black text-slate-800 flex items-center gap-1.5">
                          <Video className="w-3.5 h-3.5 text-[#FDB813]" />
                          {course.sessions.split(" ")[0]} Sessions
                        </span>
                      </div>

                      {/* Accordion Toggle Button */}
                      <button
                        type="button"
                        className={`py-2.5 px-5 rounded-xl border-2 border-black font-[1000] text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                          isOpen
                            ? "bg-slate-950 text-white shadow-[2px_2px_0px_0px_rgba(253,184,19,1)]"
                            : "bg-[#FDB813] text-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5"
                        }`}
                      >
                        <span>{isOpen ? "Close Syllabus" : "View Curriculum"}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 stroke-[3]" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Accordion Panel */}
                  {isOpen && (
                    <div className="border-t-[3px] border-black bg-slate-50/60 p-6 sm:p-8 md:p-10">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                        
                        {/* COLUMN 1: Overview, Target Audience & Schedule Box (5 Cols) */}
                        <div className="lg:col-span-5 space-y-6">
                          
                          {/* Program Overview */}
                          <div className="space-y-2">
                            <span className="text-[11px] font-[1000] uppercase tracking-widest text-[#29A3DD] block">
                              Program Overview
                            </span>
                            <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
                              {course.overview}
                            </p>
                          </div>

                          {/* Who It's For */}
                          <div className="space-y-2">
                            <span className="text-[11px] font-[1000] uppercase tracking-widest text-amber-600 block">
                              Ideal Student Profile
                            </span>
                            <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
                              {course.whoFor}
                            </p>
                          </div>

                          {/* Logistics Summary Box */}
                          <div className="rounded-2xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
                            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                              <Clock className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                              <span className="text-xs font-[1000] uppercase text-slate-950 tracking-wider">
                                Schedule & Logistics
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div>
                                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                                  Duration
                                </span>
                                <span className="font-black text-slate-900">{course.duration}</span>
                              </div>
                              <div>
                                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                                  Total Classes
                                </span>
                                <span className="font-black text-slate-900">{course.sessions}</span>
                              </div>
                              <div>
                                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                                  Weekly Cadence
                                </span>
                                <span className="font-black text-slate-900">{course.weeklyClasses}</span>
                              </div>
                              <div>
                                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                                  Delivery Mode
                                </span>
                                <span className="font-black text-slate-900">{course.mode}</span>
                              </div>
                              <div className="sm:col-span-2">
                                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                                  Certification
                                </span>
                                <span className="font-black text-slate-900 flex items-center gap-1.5 mt-0.5">
                                  <Award className="w-3.5 h-3.5 text-[#FDB813] shrink-0" />
                                  {course.certificate}
                                </span>
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* COLUMN 2: What You'll Learn Syllabus (4 Cols) */}
                        <div className="lg:col-span-4 space-y-4">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-[#29A3DD] stroke-[2.5]" />
                            <span className="text-xs font-[1000] uppercase tracking-wider text-slate-950">
                              Core Curriculum Modules
                            </span>
                          </div>

                          <div className="space-y-2.5">
                            {course.whatLearn.map((item, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-xl border border-slate-200 bg-white shadow-xs flex items-start gap-3"
                              >
                                <span className="w-5 h-5 rounded-lg bg-[#29A3DD]/15 text-[#29A3DD] font-[1000] text-[11px] flex items-center justify-center shrink-0 border border-[#29A3DD]/30">
                                  {idx + 1}
                                </span>
                                <span className="text-xs font-bold text-slate-800 leading-snug">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* COLUMN 3: Outcomes & Action Buttons (3 Cols) */}
                        <div className="lg:col-span-3 flex flex-col justify-between space-y-6">
                          
                          {/* Measurable Outcomes */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Trophy className="w-4 h-4 text-[#FDB813] stroke-[2.5]" />
                              <span className="text-xs font-[1000] uppercase tracking-wider text-slate-950">
                                Graduation Milestones
                              </span>
                            </div>

                            <ul className="space-y-2">
                              {course.outcomes.map((outcome, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs font-bold text-slate-700 leading-snug">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[2.5]" />
                                  <span>{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Booking Action Box */}
                          <div className="rounded-2xl border-2 border-black bg-gradient-to-br from-[#0A1128] to-[#10224d] text-white p-5 shadow-[4px_4px_0px_0px_rgba(253,184,19,1)] space-y-3.5">
                            <div>
                              <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[#FDB813] font-black text-[9px] uppercase tracking-wider">
                                FREE 45-MIN EVALUATION
                              </span>
                              <h4 className="text-base font-[1000] text-white uppercase tracking-tight mt-1.5">
                                Try This Course Free
                              </h4>
                              <p className="text-sky-100 text-[11px] font-medium leading-relaxed mt-1">
                                Coach Anshul will assess your current level and confirm your batch fit.
                              </p>
                            </div>

                            <div className="space-y-2 pt-1">
                              <button
                                onClick={openModal}
                                className="w-full py-3 px-4 bg-[#FDB813] hover:bg-amber-400 text-slate-950 font-[1000] text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all cursor-pointer"
                              >
                                <span>Book Free Demo</span>
                                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                              </button>

                              <a
                                href={`https://wa.me/919887821721?text=Hi%20Elephant%20Chess%20Academy,%20I%20am%20interested%20in%20the%20${encodeURIComponent(
                                  course.title
                                )}%20program.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-[1000] text-[11px] uppercase tracking-wider rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-1.5 hover:-translate-y-0.5 transition-all"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>Enquire on WhatsApp</span>
                              </a>
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── What You'll Receive (Student Ecosystem) ── */}
      <section className="py-20 md:py-28 bg-[#F8FAFC] border-y-[3px] border-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border-2 border-black text-amber-700 font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span>🎁</span>
              <span>COMPLETE 360° LEARNING ECOSYSTEM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] text-slate-950 uppercase tracking-tight leading-tight">
              WHAT YOU'LL{" "}
              <span className="bg-gradient-to-r from-[#29A3DD] to-[#FDB813] bg-clip-text text-transparent">
                RECEIVE.
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base font-semibold max-w-2xl mx-auto">
              Every enrolled student at Elephant Chess Academy gets full access to our proprietary study materials, live arenas, and dedicated coaching support.
            </p>
          </div>

          {/* 8 Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Structured FIDE Syllabus",
                desc: "Progressive, level-mapped curriculum designed to turn beginners into tournament players systematically.",
                badge: "Curriculum",
                accent: "bg-sky-100 text-[#29A3DD]",
              },
              {
                icon: FileText,
                title: "Annotated Study PDFs & PGNs",
                desc: "Curated downloadable lesson summaries, master game databases, and tactical flashcards for home review.",
                badge: "Resources",
                accent: "bg-amber-100 text-amber-700",
              },
              {
                icon: Video,
                title: "HD Class Recordings",
                desc: "Never miss a concept. Re-watch recorded sessions anytime to review intricate opening lines and tactics.",
                badge: "24/7 Access",
                accent: "bg-emerald-100 text-emerald-700",
              },
              {
                icon: Trophy,
                title: "Tournament Guidance",
                desc: "Coach-assisted tournament selection, opening preparation against opponents, and post-round PGN breakdown.",
                badge: "Competition",
                accent: "bg-purple-100 text-purple-700",
              },
              {
                icon: BarChart2,
                title: "Monthly Progress Reports",
                desc: "Detailed written analytics tracking calculation speed, tactical accuracy, rating jumps, and next goals.",
                badge: "Analytics",
                accent: "bg-rose-100 text-rose-700",
              },
              {
                icon: MessageCircle,
                title: "24-Hour Coach Doubt Desk",
                desc: "Dedicated WhatsApp channel where students can submit puzzle questions and receive prompt coach feedback.",
                badge: "Mentorship",
                accent: "bg-cyan-100 text-cyan-700",
              },
              {
                icon: Brain,
                title: "Weekly Puzzle Worksheets",
                desc: "Themed tactical exercises and endgame drills assigned weekly to build persistent problem-solving habits.",
                badge: "Practice",
                accent: "bg-yellow-100 text-yellow-800",
              },
              {
                icon: Compass,
                title: "24/7 Student Portal & Arenas",
                desc: "Live internal rated club tournaments, puzzle rushes, and automated match analysis on our academy arena.",
                badge: "Platform",
                accent: "bg-indigo-100 text-indigo-700",
              },
            ].map((item, i) => {
              const IconComp = item.icon;
              return (
                <div
                  key={i}
                  className="rounded-3xl border-[3px] border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl border-2 border-black ${item.accent} flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                        <IconComp className="w-6 h-6 stroke-[2.5]" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full border border-black text-[9px] font-[1000] uppercase tracking-wider bg-slate-100 text-slate-800">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-[1000] text-slate-950 uppercase tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Included in all tiers</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── Student Progression Pathway (The 4-Stage Journey) ── */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border-2 border-black text-[#29A3DD] font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span>🚀</span>
              <span>GROWTH ROADMAP</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] text-slate-950 uppercase tracking-tight leading-tight">
              STUDENT LEARNING{" "}
              <span className="bg-gradient-to-r from-[#29A3DD] to-[#FDB813] bg-clip-text text-transparent">
                PATHWAY.
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base font-semibold max-w-2xl mx-auto">
              From moving your very first pawn to conquering national rated podiums — here is how your child evolves.
            </p>
          </div>

          {/* 4-Step Road Map */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              {
                step: "STAGE 01",
                title: "Pawn Starter",
                rating: "Unrated → 800",
                image: "/level-beginner-elephant.jpg",
                theme: "bg-[#29A3DD] text-white",
                badgeBg: "bg-sky-100 text-sky-800",
                skills: [
                  "Board vision & legal moves",
                  "Back-rank checkmates",
                  "Single-move forks & pins",
                  "Center dominance",
                ],
              },
              {
                step: "STAGE 02",
                title: "Tactical Knight",
                rating: "800 → 1200",
                image: "/level-adv-beginner-elephant.jpg",
                theme: "bg-[#FDB813] text-slate-950",
                badgeBg: "bg-amber-100 text-amber-900",
                skills: [
                  "2-3 move calculation",
                  "Double attacks & skewers",
                  "King & Pawn endgames",
                  "Weekly arena play",
                ],
              },
              {
                step: "STAGE 03",
                title: "Master Strategist",
                rating: "1200 → 1600",
                image: "/level-intermediate-elephant.jpg",
                theme: "bg-[#29A3DD] text-white",
                badgeBg: "bg-sky-100 text-sky-800",
                skills: [
                  "Prophylaxis & planning",
                  "Opening repertoire",
                  "Complex Rook endgames",
                  "State tournaments",
                ],
              },
              {
                step: "STAGE 04",
                title: "Crowned Master",
                rating: "1600+ FIDE",
                image: "/level-grandmaster-elephant.jpg",
                theme: "bg-gradient-to-r from-[#FDB813] to-amber-500 text-slate-950",
                badgeBg: "bg-amber-100 text-amber-900",
                skills: [
                  "1-on-1 GM mentorship",
                  "Opponent prep databases",
                  "FIDE Norm preparation",
                  "National podiums",
                ],
              },
            ].map((stage, i) => (
              <div
                key={i}
                className="rounded-[2rem] border-[3px] border-black bg-white overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between hover:-translate-y-1 transition-all"
              >
                <div>
                  {/* Top Image + Stage Badge */}
                  <div className="relative aspect-[4/3] bg-slate-900 border-b-[3px] border-black overflow-hidden group">
                    <img
                      src={stage.image}
                      alt={stage.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black text-white font-[1000] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                      {stage.step}
                    </div>
                  </div>

                  {/* Stage Details */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-[1000] text-slate-950 uppercase tracking-tight">
                        {stage.title}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-black/20 ${stage.badgeBg}`}>
                        {stage.rating}
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {stage.skills.map((skill, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={openModal}
                    className="w-full py-2.5 rounded-xl border-2 border-black font-[1000] text-[11px] uppercase tracking-wider bg-slate-100 hover:bg-[#FDB813] text-slate-900 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Assess for Level {i + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Verified Student Reviews ── */}
      <TestimonialsSection />

      {/* ── Compact Bottom Trial CTA ── */}
      <DemoBookingCTA />
    </div>
  );
}

