"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModernKnightLogo } from "@/components/logo";
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  ChevronUp,
  MessageCircle,
  Sparkles,
} from "lucide-react";

const Footer: React.FC = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/student")) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#111638] text-white pt-24 pb-8 overflow-hidden select-none">
      
      {/* ── 1. Scalloped Wave Top Divider ── */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none -translate-y-[98%] z-10">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-14 md:h-16 fill-[#111638]"
        >
          <path d="M0,60 C40,20 80,20 120,60 C160,20 200,20 240,60 C280,20 320,20 360,60 C400,20 440,20 480,60 C520,20 560,20 600,60 C640,20 680,20 720,60 C760,20 800,20 840,60 C880,20 920,20 960,60 C1000,20 1040,20 1080,60 C1120,20 1160,20 1200,60 C1240,20 1280,20 1320,60 C1360,20 1400,20 1440,60 L1440,60 L0,60 Z" />
        </svg>
      </div>

      {/* ── 2. Playful Cosmic & Chess Designer Doodles ── */}
      
      {/* Top Left: Saturn-like Ringed Planet & Sparkles */}
      <div className="absolute top-8 left-4 sm:left-10 pointer-events-none opacity-90 hidden sm:block">
        <svg width="76" height="58" viewBox="0 0 76 58" fill="none" className="animate-pulse">
          {/* Planet Body */}
          <circle cx="38" cy="29" r="17" fill="url(#planetGrad)" />
          {/* Planet Rings */}
          <ellipse
            cx="38"
            cy="29"
            rx="34"
            ry="10"
            stroke="#FDB813"
            strokeWidth="3.5"
            strokeLinecap="round"
            transform="rotate(-20 38 29)"
          />
          <ellipse
            cx="38"
            cy="29"
            rx="30"
            ry="8"
            stroke="#F59E0B"
            strokeWidth="1.2"
            opacity="0.6"
            strokeLinecap="round"
            transform="rotate(-20 38 29)"
          />
          {/* Star 1 */}
          <path d="M14 6L15.5 11L20.5 12.5L15.5 14L14 19L12.5 14L7.5 12.5L12.5 11L14 6Z" fill="#F8FAFC" />
          {/* Star 2 */}
          <circle cx="68" cy="12" r="2.5" fill="#29A3DD" />
          <defs>
            <linearGradient id="planetGrad" x1="20" y1="12" x2="56" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB923C" />
              <stop offset="0.5" stopColor="#EF4444" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Top Right: Rocket Blasting Off with Trajectory & Clouds */}
      <div className="absolute top-4 right-4 sm:right-12 pointer-events-none opacity-95">
        <svg width="140" height="120" viewBox="0 0 140 120" fill="none">
          {/* Dotted Flight Path */}
          <path
            d="M90 115 C80 90, 55 70, 88 40"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.35"
          />
          
          {/* Fluffy Cloud 1 */}
          <g opacity="0.9" transform="translate(85, 4)">
            <path
              d="M10 18 C7 18 5 15 6 12 C7 9 10 9 12 10 C14 6 20 6 22 9 C25 9 27 12 26 15 C28 17 26 20 23 20 C20 20 12 20 10 18 Z"
              fill="white"
            />
          </g>

          {/* Fluffy Cloud 2 */}
          <g opacity="0.65" transform="translate(15, 60)">
            <path
              d="M8 12 C5 12 4 10 5 8 C6 6 8 6 9 7 C11 4 15 4 17 6 C19 6 20 8 20 10 C21 12 20 14 18 14 L8 14 Z"
              fill="white"
            />
          </g>

          {/* Rocket Ship */}
          <g transform="translate(70, 20) rotate(35)">
            {/* Rocket Flame */}
            <path d="M12 36 Q15 50 15 54 Q15 50 18 36 Z" fill="#FDB813" />
            <path d="M13 36 Q15 46 15 48 Q15 46 17 36 Z" fill="#EF4444" />
            {/* Left Fin */}
            <path d="M4 28 L10 22 L10 33 Z" fill="#FDB813" />
            {/* Right Fin */}
            <path d="M26 28 L20 22 L20 33 Z" fill="#FDB813" />
            {/* Rocket Body */}
            <path
              d="M15 2 C8 10 7 24 9 34 L21 34 C23 24 22 10 15 2 Z"
              fill="white"
              stroke="#0A1128"
              strokeWidth="2"
            />
            {/* Rocket Red Nosecone */}
            <path d="M15 2 C11 7 10 12 10 15 L20 15 C20 12 19 7 15 2 Z" fill="#EF4444" />
            {/* Cockpit Porthole */}
            <circle cx="15" cy="22" r="4.2" fill="#29A3DD" stroke="#0A1128" strokeWidth="1.5" />
            <circle cx="14" cy="21" r="1.3" fill="white" />
          </g>
        </svg>
      </div>

      {/* Floating Doodle: Cute Chess Knight / King Crown (Top Center) */}
      <div className="absolute top-10 left-1/3 pointer-events-none opacity-75 hidden lg:block">
        <svg width="45" height="38" viewBox="0 0 45 38" fill="none">
          {/* Golden Crown */}
          <path
            d="M5 30 L8 12 L17 22 L22.5 8 L28 22 L37 12 L40 30 Z"
            fill="#FDB813"
            stroke="#B45309"
            strokeWidth="1.5"
          />
          <circle cx="8" cy="11" r="2.5" fill="#EF4444" />
          <circle cx="22.5" cy="7" r="2.5" fill="#29A3DD" />
          <circle cx="37" cy="11" r="2.5" fill="#10B981" />
          <rect x="5" y="30" width="35" height="4" rx="2" fill="#D97706" />
        </svg>
      </div>

      {/* Floating Doodle: Shooting Star / Meteor (Right Side) */}
      <div className="absolute top-36 right-1/4 pointer-events-none opacity-70 hidden md:block">
        <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
          <path d="M5 25 L45 5" stroke="url(#shootingGrad)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M45 5 L46.5 1.5 L50 3 L47.5 6 L49 9.5 L45.5 8 L43 11 L43 7 Z" fill="#FDB813" />
          <defs>
            <linearGradient id="shootingGrad" x1="5" y1="25" x2="45" y2="5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDB813" stopOpacity="0" />
              <stop offset="1" stopColor="#FDB813" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating Doodle: Crescent Moon & Star (Left-Center) */}
      <div className="absolute top-36 left-1/4 pointer-events-none opacity-60 hidden lg:block">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path
            d="M26 18 C26 24.6 20.6 30 14 30 C11.5 30 9.2 29.2 7.3 27.9 C15 26.5 21 19.5 21 11 C21 7.2 19.5 3.8 17 1.2 C22.2 3.1 26 8.1 26 14 Z"
            fill="#FDB813"
          />
          <circle cx="30" cy="8" r="1.5" fill="white" />
        </svg>
      </div>

      {/* Floating Doodle: Cute Chess Pawn Doodle (Middle-Left) */}
      <div className="absolute bottom-28 left-8 pointer-events-none opacity-75 hidden xl:block">
        <svg width="32" height="42" viewBox="0 0 32 42" fill="none">
          {/* Pawn Head */}
          <circle cx="16" cy="9" r="6" fill="#29A3DD" stroke="#0A1128" strokeWidth="1.5" />
          <circle cx="14" cy="7.5" r="1.5" fill="white" />
          {/* Collar */}
          <path d="M10 18 Q16 16 22 18 L21 21 Q16 19 11 21 Z" fill="#29A3DD" />
          {/* Body */}
          <path d="M12 21 C12 28 8 32 7 35 L25 35 C24 32 20 28 20 21 Z" fill="#29A3DD" stroke="#0A1128" strokeWidth="1.5" />
          {/* Base */}
          <rect x="5" y="35" width="22" height="4" rx="2" fill="#0284C7" stroke="#0A1128" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Floating Doodle: UFO / Flying Saucer (Far Right) */}
      <div className="absolute bottom-32 right-8 pointer-events-none opacity-70 hidden xl:block">
        <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
          {/* Light Beam */}
          <path d="M18 20 L8 38 L42 38 L32 20 Z" fill="#29A3DD" opacity="0.15" />
          {/* Cockpit Dome */}
          <path d="M19 14 C19 9 31 9 31 14 Z" fill="#67E8F9" stroke="#0A1128" strokeWidth="1.2" />
          {/* Saucer Body */}
          <ellipse cx="25" cy="16" rx="18" ry="5" fill="#8B5CF6" stroke="#0A1128" strokeWidth="1.5" />
          {/* Saucer Lights */}
          <circle cx="14" cy="16" r="1.5" fill="#FDB813" />
          <circle cx="20" cy="17" r="1.5" fill="#FDB813" />
          <circle cx="26" cy="17" r="1.5" fill="#FDB813" />
          <circle cx="32" cy="17" r="1.5" fill="#FDB813" />
          <circle cx="36" cy="16" r="1.5" fill="#FDB813" />
        </svg>
      </div>

      {/* Bottom Left: Pink Squiggle Ribbon Doodle */}
      <div className="absolute bottom-6 left-4 sm:left-10 pointer-events-none opacity-85 hidden md:block">
        <svg width="68" height="46" viewBox="0 0 68 46" fill="none">
          <path
            d="M6 30 C18 5, 28 42, 40 18 C48 0, 58 35, 64 20"
            stroke="#EC4899"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ── Enhanced Alligator / Stegosaurus Mascot (Bottom Center) ── */}
      <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 pointer-events-none z-20">
        <svg width="96" height="56" viewBox="0 0 96 56" fill="none" className="hover:scale-105 transition-transform duration-300">
          
          {/* Back Spikes / Scutes (Triangle Plates) */}
          <path d="M22 22 L27 10 L32 20 Z" fill="#16A34A" stroke="#14532D" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M33 18 L39 6 L45 17 Z" fill="#22C55E" stroke="#14532D" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M46 16 L53 4 L60 16 Z" fill="#16A34A" stroke="#14532D" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M61 18 L67 8 L72 20 Z" fill="#22C55E" stroke="#14532D" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M72 22 L77 14 L81 24 Z" fill="#16A34A" stroke="#14532D" strokeWidth="1.5" strokeLinejoin="round" />
          
          {/* Tail Spikes */}
          <path d="M12 28 L15 20 L19 27 Z" fill="#22C55E" stroke="#14532D" strokeWidth="1.2" />

          {/* Alligator / Dinosaur Main Body */}
          <path
            d="M8 36 C5 32 8 26 16 24 C26 21 60 20 72 24 C82 24 90 26 92 32 C94 36 90 40 84 40 C76 40 73 48 70 50 C68 52 62 52 62 46 C60 46 50 46 48 46 C46 52 40 52 40 46 C32 46 24 46 22 46 C20 52 14 52 14 46 C10 44 8 40 8 36 Z"
            fill="#22C55E"
            stroke="#14532D"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Light Green / Yellow Underbelly */}
          <path
            d="M24 42 C36 40 58 40 68 42 C66 45 64 47 62 46 C58 46 50 46 48 46 C46 47 42 47 40 46 C34 46 26 46 22 46 C23 44 23 43 24 42 Z"
            fill="#86EFAC"
          />

          {/* Cute Nostril */}
          <circle cx="89" cy="31" r="1.2" fill="#14532D" />

          {/* Big Cartoon Eye */}
          <circle cx="83" cy="28" r="4.5" fill="white" stroke="#14532D" strokeWidth="1.2" />
          <circle cx="84.5" cy="28" r="2.4" fill="#0A1128" />
          <circle cx="85.5" cy="27" r="0.8" fill="white" />

          {/* Cute Big Smile */}
          <path
            d="M81 35 Q86 38 90 34"
            stroke="#14532D"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Rosy Cheek */}
          <circle cx="79" cy="33" r="2.5" fill="#F472B6" opacity="0.6" />

          {/* Body Spots / Scales */}
          <circle cx="34" cy="28" r="2.2" fill="#15803D" opacity="0.75" />
          <circle cx="45" cy="26" r="2.8" fill="#15803D" opacity="0.75" />
          <circle cx="56" cy="28" r="2.2" fill="#15803D" opacity="0.75" />
          <circle cx="40" cy="34" r="1.8" fill="#15803D" opacity="0.75" />
          <circle cx="51" cy="34" r="1.8" fill="#15803D" opacity="0.75" />
          <circle cx="24" cy="32" r="1.5" fill="#15803D" opacity="0.75" />
        </svg>
      </div>

      {/* ── 3. Main Footer Content Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16">
          
          {/* ── Column 1: Logo & Direct Contacts (col-span-4) ── */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block group">
              <ModernKnightLogo size="md" variant="light" className="group-hover:opacity-90 transition-opacity" />
            </Link>

            <p className="text-[11px] font-[1000] uppercase tracking-[0.25em] text-[#FDB813]">
              Learn to be limitless
            </p>

            <div className="space-y-3 pt-1 text-xs font-semibold text-slate-200">
              {/* Phone */}
              <a
                href="tel:+919887821721"
                className="flex items-center gap-3 group hover:text-[#29A3DD] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:bg-[#29A3DD] group-hover:text-slate-950 transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm tracking-wide">+91 98878 21721</span>
              </a>

              {/* Email */}
              <a
                href="mailto:elephantchessacademy@gmail.com"
                className="flex items-center gap-3 group hover:text-[#29A3DD] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:bg-[#29A3DD] group-hover:text-slate-950 transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-medium text-xs truncate">elephantchessacademy@gmail.com</span>
              </a>
            </div>
          </div>

          {/* ── Column 2: Useful Links (col-span-3) ── */}
          <div className="lg:col-span-3 space-y-3.5">
            <div>
              <h3 className="text-base font-[1000] text-white tracking-tight">
                Useful Links
              </h3>
              <div className="w-9 h-[3px] bg-[#29A3DD] mt-1.5 rounded-full" />
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-slate-300">
              <li>
                <Link href="/" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Curriculum
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Game & Arenas
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Blogs & Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Column 3: Our Company (col-span-3) ── */}
          <div className="lg:col-span-3 space-y-3.5">
            <div>
              <h3 className="text-base font-[1000] text-white tracking-tight">
                Our Company
              </h3>
              <div className="w-9 h-[3px] bg-[#6366F1] mt-1.5 rounded-full" />
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-slate-300">
              <li>
                <Link href="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Achievements
                </Link>
              </li>
              <li>
                <Link href="/coaches" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Coaches & Faculty
                </Link>
              </li>
              <li>
                <Link href="/bookdemo" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  Book Free Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Column 4: Get In Touch (col-span-2) ── */}
          <div className="lg:col-span-2 space-y-3.5">
            <div>
              <h3 className="text-base font-[1000] text-white tracking-tight">
                Get In Touch
              </h3>
              <div className="w-9 h-[3px] bg-[#FDB813] mt-1.5 rounded-full" />
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1877F2] border border-white/15 flex items-center justify-center text-white transition-all hover:scale-110"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] border border-white/15 flex items-center justify-center text-white transition-all hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/919887821721"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] border border-white/15 flex items-center justify-center text-white transition-all hover:scale-110"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF0000] border border-white/15 flex items-center justify-center text-white transition-all hover:scale-110"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-[11px] font-medium text-slate-300 leading-snug">
              <p className="text-slate-400">📍 Physical Center:</p>
              <p className="font-semibold text-white">Danavai Peta, Rajamahendravaram, AP 533103</p>
            </div>
          </div>

        </div>

        {/* ── 4. Designer Bottom Bar ── */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left: Green "Chat with us" WhatsApp Pill */}
          <a
            href="https://wa.me/919887821721?text=Hi%20Elephant%20Chess%20Academy,%20I%20would%20like%20to%20know%20more%20about%20your%20chess%20courses."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-[1000] text-xs uppercase tracking-wider rounded-full shadow-[0_4px_15px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.5)] transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat with us</span>
          </a>

          {/* Center: Copyright Statement */}
          <div className="text-center text-slate-400 text-xs font-medium">
            <p>© 2010 - 2026 Elephant Chess. All rights reserved.</p>
          </div>

          {/* Right: Circle Scroll-to-Top Button */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] text-white flex items-center justify-center shadow-lg shadow-indigo-900/40 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <ChevronUp className="w-5 h-5 stroke-[3]" />
          </button>

        </div>

      </div>

    </footer>
  );
};

export default Footer;