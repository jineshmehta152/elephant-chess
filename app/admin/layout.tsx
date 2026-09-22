"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModernKnightLogo } from "@/components/logo";
import { 
  Users, 
  Puzzle as PuzzleIcon, 
  Trophy, 
  Image as ImageIcon, 
  CalendarCheck, 
  Sparkles,
  LayoutDashboard,
  Layers,
  BookOpen,
  UserCheck
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "📊 Overview", icon: LayoutDashboard },
    { href: "/admin/leads", label: "🎯 Leads & CRM", icon: UserCheck },
    { href: "/admin/students", label: "👥 Students", icon: Users },
    { href: "/admin/puzzles", label: "🧩 Puzzles (PGN)", icon: PuzzleIcon },
    { href: "/admin/attendance", label: "📅 Attendance", icon: CalendarCheck },
    { href: "/admin/achievements", label: "🏆 Achievements", icon: Trophy },
    { href: "/admin/gallery", label: "🖼️ Gallery", icon: ImageIcon },
    { href: "/admin/blogs", label: "📝 Blogs", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3 shadow-xs sticky top-0 z-40">
        <div className="flex items-center gap-2 sm:gap-4">
          <ModernKnightLogo size="sm" variant="dark" />
          <span className="px-2.5 sm:px-3 py-1 bg-sky-50 text-[#29A3DD] font-extrabold text-[11px] sm:text-xs rounded-lg border border-sky-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FDB813]" /> Admin Control Hub
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/student"
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-xl border border-slate-200 transition-colors text-slate-700"
          >
            Student Portal
          </Link>
          <Link
            href="/"
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-950 hover:bg-[#29A3DD] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            Website Home
          </Link>
        </div>
      </header>

      {/* Admin Navigation Tabs */}
      <div className="bg-white/95 border-b border-slate-200 px-4 sm:px-6 backdrop-blur-md sticky top-[57px] sm:top-[69px] z-30 shadow-xs overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold min-w-max">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-3 sm:py-3.5 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? "border-[#29A3DD] text-[#29A3DD] font-black"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        {children}
      </main>
    </div>
  );
}
