"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  CalendarCheck, 
  Puzzle as PuzzleIcon, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap,
  Trophy,
  Activity,
  Plus
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  age: number;
  email?: string;
  batch: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  rating: number;
  solvedPuzzles?: { id: string; points: number; solvedAt: string }[];
  puzzleAttempts?: { id: string; puzzleId: string; attempts: number }[];
  attendances?: { id: string; date: string; status: string }[];
}

export default function CoachDashboardPage() {
  const [coach, setCoach] = useState<any>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [puzzles, setPuzzles] = useState<any[]>([]);
  const [todayAttendance, setTodayAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCoachData();
  }, []);

  const loadCoachData = async () => {
    setLoading(true);
    try {
      let activeCoach = null;
      const stored = localStorage.getItem("currentCoach");
      if (stored) {
        try {
          activeCoach = JSON.parse(stored);
        } catch (e) {}
      }

      if (!activeCoach) {
        const coachRes = await fetch("/api/coaches");
        if (coachRes.ok) {
          const list = await coachRes.json();
          if (list.length > 0) {
            activeCoach = list[0];
            localStorage.setItem("currentCoach", JSON.stringify(activeCoach));
          }
        }
      }

      setCoach(activeCoach);

      if (activeCoach) {
        const todayStr = new Date().toISOString().split("T")[0];
        const [stuRes, puzRes, attRes] = await Promise.all([
          fetch(`/api/students?coachId=${activeCoach.id}`),
          fetch(`/api/puzzles`),
          fetch(`/api/attendance?coachId=${activeCoach.id}&date=${todayStr}`),
        ]);

        if (stuRes.ok) setStudents(await stuRes.json());
        if (puzRes.ok) setPuzzles(await puzRes.json());
        if (attRes.ok) setTodayAttendance(await attRes.json());
      }
    } catch (err) {
      console.error("Error loading coach dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate Metrics
  const totalStudents = students.length;
  const avgRating = totalStudents > 0 
    ? Math.round(students.reduce((acc, s) => acc + (s.rating || 0), 0) / totalStudents)
    : 0;

  const totalPuzzlesSolved = students.reduce((acc, s) => acc + (s.solvedPuzzles?.length || 0), 0);

  const presentCount = todayAttendance.filter((a) => a.status === "PRESENT").length;
  const attendanceRate = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

  return (
    <div className="space-y-6 sm:space-y-8 font-sans">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 rounded-3xl p-6 sm:p-8 shadow-md text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black text-white">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>COACH CONTROL HUB</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome Back, {coach?.name || "Master Coach"}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 max-w-xl">
              Track your assigned students' tactical chess progress, mark daily attendance, and assign curated puzzles to sharpen their skills.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/coach/attendance"
              className="px-4 py-2.5 bg-white text-slate-900 hover:bg-slate-50 text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-emerald-600" /> Mark Attendance
            </Link>
            <Link
              href="/coach/puzzles"
              className="px-4 py-2.5 bg-slate-950 hover:bg-slate-900 text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#29A3DD]" /> Add Puzzle
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Assigned Students */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs group hover:border-[#29A3DD] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Students</span>
            <div className="p-2.5 bg-sky-50 rounded-xl text-[#29A3DD] border border-sky-100">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-slate-900">{totalStudents}</div>
            <p className="text-[11px] text-[#29A3DD] font-semibold mt-1">Under your mentorship</p>
          </div>
        </div>

        {/* Today's Attendance Rate */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs group hover:border-emerald-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Attendance</span>
            <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-emerald-600">{presentCount} / {totalStudents}</div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">{attendanceRate}% present today</p>
          </div>
        </div>

        {/* Puzzles Solved */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs group hover:border-amber-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Puzzles Solved</span>
            <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600 border border-amber-100">
              <PuzzleIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-amber-600">{totalPuzzlesSolved}</div>
            <p className="text-[11px] text-amber-600 font-semibold mt-1">Total tactical milestones</p>
          </div>
        </div>

        {/* Average Student Rating */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs group hover:border-purple-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Student Points</span>
            <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600 border border-purple-100">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-purple-600">{avgRating}</div>
            <p className="text-[11px] text-purple-600 font-semibold mt-1">Squad performance score</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Assigned Students Table Preview & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assigned Students Summary (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#29A3DD]" /> My Assigned Students
              </h2>
              <p className="text-xs text-slate-500">Exclusive view of students under your mentorship</p>
            </div>
            <Link
              href="/coach/students"
              className="text-xs font-bold text-[#29A3DD] hover:underline flex items-center gap-1 transition-colors"
            >
              View All ({totalStudents}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-400 text-xs">Loading students...</div>
          ) : students.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <GraduationCap className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-800">No students assigned to your profile yet.</p>
              <p className="text-xs text-slate-500">The academy admin can assign students to you via the Admin Hub.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3">Student</th>
                    <th className="p-3">Batch / League</th>
                    <th className="p-3">Skill Level</th>
                    <th className="p-3">Points</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {students.slice(0, 5).map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{s.name}</div>
                        <div className="text-[11px] text-slate-500">{s.email || `${s.age} yrs`}</div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-semibold border border-slate-200">
                          {s.batch || "General"}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                          s.level === "BEGINNER"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : s.level === "INTERMEDIATE"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-purple-50 text-purple-700 border border-purple-200"
                        }`}>
                          {s.level}
                        </span>
                      </td>
                      <td className="p-3 font-black text-amber-600">{s.rating} pts</td>
                      <td className="p-3 text-right">
                        <Link
                          href={`/coach/progress?studentId=${s.id}`}
                          className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-[#29A3DD] border border-sky-200 rounded-lg font-bold text-[11px] transition-all inline-flex items-center gap-1"
                        >
                          Progress <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Tools & Coach Shortcuts (1 Col) */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" /> Fast Actions
            </h3>

            <div className="space-y-2.5 text-xs">
              <Link
                href="/coach/attendance"
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-sky-50/50 border border-slate-200 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-[#29A3DD] transition-colors">Daily Attendance</div>
                    <div className="text-[10px] text-slate-500">1-Click mark for assigned students</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/coach/puzzles"
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-sky-50/50 border border-slate-200 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sky-50 rounded-xl text-[#29A3DD] border border-sky-100">
                    <PuzzleIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-[#29A3DD] transition-colors">Tactical Puzzle Studio</div>
                    <div className="text-[10px] text-slate-500">Create PGN puzzles for training</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/coach/progress"
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-sky-50/50 border border-slate-200 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-xl text-purple-600 border border-purple-100">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Game & Attempt Logs</div>
                    <div className="text-[10px] text-slate-500">Deep-dive into playing metrics</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
