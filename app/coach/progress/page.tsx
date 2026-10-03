"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  TrendingUp, 
  Users, 
  Puzzle as PuzzleIcon, 
  Trophy, 
  Clock, 
  Sparkles, 
  RotateCcw,
  Target,
  BarChart3
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  age: number;
  email?: string;
  batch: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  rating: number;
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

interface PuzzleFolder {
  id: string;
  name: string;
  order: number;
  puzzles?: { id: string; title: string; level: string }[];
  _count?: { puzzles: number };
}

export default function CoachStudentProgressPage() {
  const [coach, setCoach] = useState<any>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [folders, setFolders] = useState<PuzzleFolder[]>([]);
  const [allPuzzles, setAllPuzzles] = useState<any[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [loading, setLoading] = useState(true);

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
        const [stuRes, foldRes, puzRes] = await Promise.all([
          fetch(`/api/students?coachId=${activeCoach.id}`),
          fetch("/api/puzzles/folders"),
          fetch("/api/puzzles"),
        ]);

        let stuList: Student[] = [];
        if (stuRes.ok) {
          stuList = await stuRes.json();
          setStudents(stuList);
          if (stuList.length > 0) {
            if (typeof window !== "undefined") {
              const params = new URLSearchParams(window.location.search);
              const requestedId = params.get("studentId");
              const found = stuList.find((s) => s.id === requestedId);
              setSelectedStudentId(found ? found.id : stuList[0].id);
            } else {
              setSelectedStudentId(stuList[0].id);
            }
          }
        }

        if (foldRes.ok) setFolders(await foldRes.json());
        if (puzRes.ok) setAllPuzzles(await puzRes.json());
      }
    } catch (err) {
      console.error("Error loading coach progress analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  const selectedStudent = useMemo(() => {
    return students.find((s) => s.id === selectedStudentId) || null;
  }, [students, selectedStudentId]);

  // Attempts Breakdown Analytics
  const attemptStats = useMemo(() => {
    if (!selectedStudent || !selectedStudent.puzzleAttempts) {
      return { attempt1: 0, attempt2: 0, attempt3: 0, attempt4Plus: 0, totalAttempts: 0, avgAttempts: "1.0" };
    }

    const attemptsList = selectedStudent.puzzleAttempts;
    let attempt1 = 0;
    let attempt2 = 0;
    let attempt3 = 0;
    let attempt4Plus = 0;
    let totalAttemptsCount = 0;

    attemptsList.forEach((att) => {
      totalAttemptsCount += att.attempts;
      if (att.attempts === 1) attempt1++;
      else if (att.attempts === 2) attempt2++;
      else if (att.attempts === 3) attempt3++;
      else attempt4Plus++;
    });

    const totalTracked = attemptsList.length;
    const avgAttempts = totalTracked > 0 ? (totalAttemptsCount / totalTracked).toFixed(1) : "1.0";

    return { attempt1, attempt2, attempt3, attempt4Plus, totalAttempts: totalTracked, avgAttempts };
  }, [selectedStudent]);

  // Course Completion Analytics
  const courseProgressList = useMemo(() => {
    if (!selectedStudent) return [];

    const solvedPuzzleIds = new Set(selectedStudent.solvedPuzzles?.map((sp) => sp.puzzleId) || []);

    return folders.map((folder) => {
      const folderPuzzles = allPuzzles.filter((p) => p.folderId === folder.id);
      const totalInFolder = folderPuzzles.length;
      const solvedInFolder = folderPuzzles.filter((p) => solvedPuzzleIds.has(p.id)).length;
      const percent = totalInFolder > 0 ? Math.round((solvedInFolder / totalInFolder) * 100) : 0;

      return {
        id: folder.id,
        name: folder.name,
        total: totalInFolder,
        solved: solvedInFolder,
        percent,
        isCompleted: totalInFolder > 0 && solvedInFolder >= totalInFolder,
      };
    });
  }, [selectedStudent, folders, allPuzzles]);

  const handleResetCourse = async (folderId: string) => {
    if (!selectedStudent) return;
    if (!confirm("Are you sure you want to reset this course for this student? All solved puzzles and attempts will be cleared.")) return;

    try {
      const res = await fetch("/api/students/reset-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: selectedStudent.id, folderId }),
      });
      if (res.ok) {
        alert("Course progress reset successfully!");
        loadData();
      } else {
        alert("Failed to reset course progress");
      }
    } catch (e) {
      alert("Error resetting progress");
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <TrendingUp className="w-6 h-6 text-[#29A3DD]" /> Student Progress & Gameplay Analytics
          </h1>
          <p className="text-xs text-slate-500">
            Monitor puzzle accuracy, attempt distribution, course milestones, and live student performance.
          </p>
        </div>

        {/* Student Dropdown Selector */}
        {students.length > 0 && (
          <div className="flex items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-2xl shadow-xs">
            <Users className="w-4 h-4 text-[#29A3DD] ml-2" />
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="bg-transparent text-slate-900 text-xs font-bold px-2 py-1 focus:outline-none cursor-pointer"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.batch || "General"})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs">Loading analytics data...</div>
      ) : !selectedStudent ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-3 shadow-xs">
          <Users className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No students currently assigned</h3>
          <p className="text-xs text-slate-500">
            Ask the academy administrator to assign students to Coach {coach?.name || ""}.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Student Profile & Key Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-2xl font-black text-white shadow-md">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-slate-900">{selectedStudent.name}</h2>
                    <span className="px-2.5 py-0.5 bg-sky-50 text-[#29A3DD] border border-sky-200 rounded-full text-[10px] font-black">
                      {selectedStudent.batch || "General"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {selectedStudent.email || "No email"} • {selectedStudent.age} yrs • Level: <strong className="text-emerald-700">{selectedStudent.level}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Academy Points</span>
                  <div className="text-xl font-black text-amber-600 flex items-center justify-center gap-1">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span>{selectedStudent.rating}</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Solved Puzzles</span>
                  <div className="text-xl font-black text-[#29A3DD]">
                    {selectedStudent.solvedPuzzles?.length || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tactical Accuracy & Attempt Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Attempt Distribution (1 Col) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#29A3DD]" /> Solving Precision
                  </h3>
                  <p className="text-xs text-slate-500">How many tries per puzzle</p>
                </div>
                <span className="px-2.5 py-1 bg-sky-50 text-[#29A3DD] border border-sky-200 rounded-lg text-xs font-bold">
                  Avg: {attemptStats.avgAttempts} tries
                </span>
              </div>

              <div className="space-y-3 text-xs">
                {/* 1st Try */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-emerald-700 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> 1st Attempt (4 pts)
                    </span>
                    <span className="text-slate-900">{attemptStats.attempt1} puzzles</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${attemptStats.totalAttempts > 0 ? (attemptStats.attempt1 / attemptStats.totalAttempts) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                {/* 2nd Try */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-[#29A3DD]">2nd Attempt (3 pts)</span>
                    <span className="text-slate-900">{attemptStats.attempt2} puzzles</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#29A3DD] rounded-full transition-all"
                      style={{ width: `${attemptStats.totalAttempts > 0 ? (attemptStats.attempt2 / attemptStats.totalAttempts) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                {/* 3rd Try */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-amber-700">3rd Attempt (2 pts)</span>
                    <span className="text-slate-900">{attemptStats.attempt3} puzzles</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full transition-all"
                      style={{ width: `${attemptStats.totalAttempts > 0 ? (attemptStats.attempt3 / attemptStats.totalAttempts) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                {/* 4+ Tries */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-rose-700">4+ Attempts (1 pt)</span>
                    <span className="text-slate-900">{attemptStats.attempt4Plus} puzzles</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-rose-500 rounded-full transition-all"
                      style={{ width: `${attemptStats.totalAttempts > 0 ? (attemptStats.attempt4Plus / attemptStats.totalAttempts) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Course Pathway & Completion Matrix (2 Cols) */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-emerald-600" /> Course Pathway & Completion
                  </h3>
                  <p className="text-xs text-slate-500">Progress across curriculum modules</p>
                </div>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {courseProgressList.map((course) => (
                  <div 
                    key={course.id}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between sm:justify-start gap-2">
                        <span className="font-bold text-slate-900 text-sm">{course.name}</span>
                        {course.isCompleted ? (
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-black">
                            ✓ Mastered
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-sky-50 text-[#29A3DD] border border-sky-200 rounded text-[10px] font-bold">
                            {course.percent}% Done
                          </span>
                        )}
                      </div>
                      
                      {/* Progress bar */}
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            course.isCompleted ? "bg-emerald-500" : "bg-[#29A3DD]"
                          }`}
                          style={{ width: `${course.percent}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {course.solved} of {course.total} puzzles solved
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleResetCourse(course.id)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                        title="Reset course attempts for this student"
                      >
                        <RotateCcw className="w-3 h-3" /> Reset
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Solved History Feed */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" /> Solved Puzzles History
            </h3>

            {selectedStudent.solvedPuzzles && selectedStudent.solvedPuzzles.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">Puzzle ID</th>
                      <th className="p-3">Date Solved</th>
                      <th className="p-3">Points Earned</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {selectedStudent.solvedPuzzles.map((sp, idx) => (
                      <tr key={sp.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono text-slate-400">{idx + 1}</td>
                        <td className="p-3 font-mono font-bold text-slate-900">#{sp.puzzleId.slice(-8)}</td>
                        <td className="p-3 text-slate-500">{new Date(sp.solvedAt).toLocaleString()}</td>
                        <td className="p-3">
                          <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg font-black">
                            +{sp.points} pts
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-400 text-xs">
                No puzzle history available yet for {selectedStudent.name}.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
