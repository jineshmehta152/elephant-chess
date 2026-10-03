"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Users, 
  Search, 
  TrendingUp, 
  Puzzle as PuzzleIcon, 
  Eye, 
  X, 
  ChevronRight, 
  Trophy, 
  RotateCcw, 
  CheckCircle2 
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  age: number;
  email?: string;
  phone?: string;
  batch: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  rating: number;
  status: string;
  allowAllCourses?: boolean;
  solvedPuzzles?: { id: string; points: number; puzzleId: string; solvedAt: string }[];
  puzzleAttempts?: { id: string; puzzleId: string; attempts: number }[];
  attendances?: { id: string; date: string; status: string }[];
  customCourses?: {
    id: string;
    studentId: string;
    folderId: string;
    order: number;
    folder: {
      id: string;
      name: string;
    };
  }[];
}

export default function CoachStudentsPage() {
  const [coach, setCoach] = useState<any>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [folders, setFolders] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("ALL");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
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
        const [stuRes, foldRes] = await Promise.all([
          fetch(`/api/students?coachId=${activeCoach.id}`),
          fetch("/api/puzzles/folders"),
        ]);

        if (stuRes.ok) setStudents(await stuRes.json());
        if (foldRes.ok) setFolders(await foldRes.json());
      }
    } catch (err) {
      console.error("Error loading coach students:", err);
    } finally {
      setLoading(false);
    }
  };

  const batches = useMemo(() => {
    const set = new Set(students.map((s) => s.batch || "General"));
    return ["ALL", ...Array.from(set)];
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchBatch = selectedBatch === "ALL" || (s.batch || "General") === selectedBatch;
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.email && s.email.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchBatch && matchSearch;
    });
  }, [students, selectedBatch, searchQuery]);

  const handleResetCourse = async (studentId: string, folderId: string) => {
    if (!confirm("Are you sure you want to reset this course for this student? All solved puzzles and attempts in this course will be reset.")) return;

    try {
      const res = await fetch("/api/students/reset-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, folderId }),
      });
      if (res.ok) {
        alert("Course progress reset successfully!");
        loadData();
        setSelectedStudent(null);
      } else {
        alert("Failed to reset course progress");
      }
    } catch (e) {
      alert("Error resetting course");
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Users className="w-6 h-6 text-[#29A3DD]" /> My Assigned Students
          </h1>
          <p className="text-xs text-slate-500">
            Dedicated roster of students assigned to Coach {coach?.name || ""}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#29A3DD] shadow-xs">
            {students.length} Total Assigned
          </span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by student name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#29A3DD] focus:bg-white transition-colors"
          />
        </div>

        {/* Batch Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
          {batches.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBatch(b)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedBatch === b
                  ? "bg-[#29A3DD] text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {b === "ALL" ? "All Batches" : b}
            </button>
          ))}
        </div>
      </div>

      {/* Main Students Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Student Name</th>
                <th className="p-4">Batch / League</th>
                <th className="p-4">Tactical Points</th>
                <th className="p-4">Puzzles Solved</th>
                <th className="p-4">Attendance Rate</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Loading assigned students...
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No students match your criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => {
                  const totalAtt = s.attendances?.length || 0;
                  const presentAtt = s.attendances?.filter((a) => a.status === "PRESENT").length || 0;
                  const attRate = totalAtt > 0 ? Math.round((presentAtt / totalAtt) * 100) : 100;
                  const solvedCount = s.solvedPuzzles?.length || 0;

                  return (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 text-sm">{s.name}</div>
                        <div className="text-[11px] text-slate-500">{s.email || `${s.age} yrs old`}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200">
                          {s.batch || "General"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="font-black text-amber-600 flex items-center gap-1">
                          <Trophy className="w-3.5 h-3.5 text-amber-500" />
                          <span>{s.rating}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 bg-sky-50 text-[#29A3DD] rounded-lg border border-sky-200 font-bold">
                          {solvedCount} solved
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-lg border font-bold ${
                          attRate >= 80 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                          {attRate}%
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedStudent(s)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold transition-all border border-slate-200 flex items-center gap-1.5 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#29A3DD]" /> Details
                          </button>

                          <Link
                            href={`/coach/progress?studentId=${s.id}`}
                            className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-[#29A3DD] rounded-xl font-bold transition-all border border-sky-200 flex items-center gap-1.5"
                          >
                            <TrendingUp className="w-3.5 h-3.5" /> Progress
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* STUDENT DETAILS MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative text-slate-900">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Profile Header */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-2xl font-black text-white shadow-md">
                {selectedStudent.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">{selectedStudent.name}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <span>{selectedStudent.email || "No email"}</span>
                  <span>•</span>
                  <span>{selectedStudent.age} years old</span>
                </div>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Points / Rating</span>
                <div className="text-xl font-black text-amber-600 mt-0.5">{selectedStudent.rating}</div>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Puzzles Solved</span>
                <div className="text-xl font-black text-[#29A3DD] mt-0.5">{selectedStudent.solvedPuzzles?.length || 0}</div>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Skill Level</span>
                <div className="text-xs font-black text-emerald-700 mt-1">{selectedStudent.level}</div>
              </div>
            </div>

            {/* Recent Solved Puzzles List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <PuzzleIcon className="w-4 h-4 text-[#29A3DD]" /> Recent Solved Puzzles
              </h4>
              {selectedStudent.solvedPuzzles && selectedStudent.solvedPuzzles.length > 0 ? (
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {selectedStudent.solvedPuzzles.slice(0, 8).map((sp) => (
                    <div key={sp.id} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-bold text-slate-900">Puzzle #{sp.puzzleId.slice(-6)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-500">
                          {new Date(sp.solvedAt).toLocaleDateString()}
                        </span>
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded font-black text-[10px]">
                          +{sp.points} pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-400">
                  No puzzles solved yet.
                </div>
              )}
            </div>

            {/* Course Reset Tool for Coach */}
            <div className="space-y-3 border-t border-slate-200 pt-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-rose-600" /> Reset Student Course Progress
              </h4>
              <p className="text-[11px] text-slate-500">
                If the student needs to re-attempt a tactical folder, select the course below to clear their attempts.
              </p>
              <div className="flex gap-2">
                <select
                  id="coach-reset-course-select"
                  className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-[#29A3DD]"
                >
                  <option value="">-- Select Course / Folder --</option>
                  {folders.map((f) => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    const select = document.getElementById("coach-reset-course-select") as HTMLSelectElement;
                    if (select && select.value) {
                      handleResetCourse(selectedStudent.id, select.value);
                    } else {
                      alert("Please select a course to reset.");
                    }
                  }}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Reset Course
                </button>
              </div>
            </div>

            {/* Link to Full Progress */}
            <div className="pt-2">
              <Link
                href={`/coach/progress?studentId=${selectedStudent.id}`}
                className="w-full py-3 bg-[#29A3DD] hover:bg-[#1f87b8] text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <span>View Complete Progress Analytics</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
