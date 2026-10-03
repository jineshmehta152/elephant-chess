"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ModernKnightLogo } from "@/components/logo";
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  Puzzle as PuzzleIcon, 
  TrendingUp, 
  Sparkles, 
  LogOut, 
  GraduationCap
} from "lucide-react";

export default function CoachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentCoach, setCurrentCoach] = useState<any>(null);

  useEffect(() => {
    const storedCoach = localStorage.getItem("currentCoach");
    if (storedCoach) {
      try {
        const parsed = JSON.parse(storedCoach);
        setCurrentCoach(parsed);
      } catch (e) {
        console.error("Failed to parse stored coach:", e);
      }
    } else {
      // Auto-load default coach for testing if none is set
      fetch("/api/coaches")
        .then((res) => res.json())
        .then((coaches) => {
          if (Array.isArray(coaches) && coaches.length > 0) {
            setCurrentCoach(coaches[0]);
            localStorage.setItem("currentCoach", JSON.stringify(coaches[0]));
          }
        })
        .catch((err) => console.error("Error fetching default coach:", err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentCoach");
    router.push("/login?role=coach");
  };

  const navItems = [
    { href: "/coach", label: "📊 Overview", icon: LayoutDashboard },
    { href: "/coach/students", label: "👥 My Students", icon: Users },
    { href: "/coach/attendance", label: "📅 Mark Attendance", icon: CalendarCheck },
    { href: "/coach/puzzles", label: "🧩 Add Puzzles", icon: PuzzleIcon },
    { href: "/coach/progress", label: "📈 Student Progress", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased">
      {/* Top Coach Header */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 sm:py-3.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-3 sm:gap-4">
          <ModernKnightLogo size="sm" variant="dark" />
          <div className="h-6 w-px bg-slate-200 hidden sm:block" />
          <span className="px-3 py-1 bg-sky-50 text-[#29A3DD] border border-sky-200 font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-xs">
            <GraduationCap className="w-4 h-4 text-[#29A3DD]" /> Coach Portal
          </span>
        </div>

        {/* Coach Profile & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentCoach && (
            <div className="hidden md:flex items-center gap-2.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <div className="w-7 h-7 rounded-lg bg-sky-100 text-[#29A3DD] flex items-center justify-center font-black text-xs border border-sky-200">
                {currentCoach.name ? currentCoach.name.charAt(0) : "C"}
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-slate-900 leading-none">{currentCoach.name}</div>
                <div className="text-[10px] text-slate-500 font-semibold mt-0.5">{currentCoach.title || "Chess Coach"}</div>
              </div>
            </div>
          )}

          <Link
            href="/student"
            className="px-3 sm:px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-xl border border-slate-200 transition-colors text-slate-700"
          >
            Student Arena
          </Link>

          <Link
            href="/"
            className="px-3 sm:px-4 py-1.5 bg-slate-950 hover:bg-[#29A3DD] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            Home
          </Link>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
            title="Log out of Coach Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Navigation Subbar */}
      <div className="bg-white/95 border-b border-slate-200 px-4 sm:px-6 backdrop-blur-md sticky top-[53px] sm:top-[57px] z-30 shadow-xs overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-bold min-w-max">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-3 px-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap rounded-t-lg ${
                  isActive
                    ? "border-[#29A3DD] text-[#29A3DD] bg-sky-50/60 font-black"
                    : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Coach Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 sm:py-8 space-y-6">
        {children}
      </main>
    </div>
  );
}
