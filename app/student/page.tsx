"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { ModernKnightLogo } from "@/components/logo";
import { ChessPieceSvg } from "@/components/ChessPieceSvg";
import {
  Layers,
  Puzzle as PuzzleIcon,
  RotateCcw,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Palette,
  Info,
  Folder as FolderIcon,
  Lock,
} from "lucide-react";

type BoardTheme = "emerald" | "wood" | "midnight";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function StudentPortalPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "arena" | "leaderboard">("dashboard");
  const [boardTheme, setBoardTheme] = useState<BoardTheme>("emerald");

  // Dynamic Student Profile Data from LocalStorage / Session
  const [studentProfile, setStudentProfile] = useState({
    id: "demo_student_id",
    name: "Aarav Sharma",
    fideRating: 0,
    academyXp: 3420,
    dailyStreak: 14,
    badge: "Master Tactician 🏆",
    batch: "Beginner Morning",
    allowAllCourses: false,
    customCourses: [] as { folderId: string; order: number }[],
  });

  const [dbPuzzles, setDbPuzzles] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<any | null>(null);
  const [solvedPuzzleIds, setSolvedPuzzleIds] = useState<string[]>([]);
  const [leaderboardEntries, setLeaderboardEntries] = useState<any[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [leaderboardTimeframe, setLeaderboardTimeframe] = useState<"all" | "month" | "week">("all");
  const [selectedLeaderboardMonth, setSelectedLeaderboardMonth] = useState<number>(new Date().getMonth());
  const [selectedLeaderboardYear, setSelectedLeaderboardYear] = useState<number>(new Date().getFullYear());
  const [attendanceLogs, setAttendanceLogs] = useState<any[]>([]);
  const [attempts, setAttempts] = useState(1);
  const [puzzleAttempts, setPuzzleAttempts] = useState<Record<string, number>>({});
  const [pendingPromotion, setPendingPromotion] = useState<{ src: string; tgt: string; color: "w" | "b" } | null>(null);
  const puzzleAttemptsRef = useRef<Record<string, number>>({});
  useEffect(() => {
    puzzleAttemptsRef.current = puzzleAttempts;
  }, [puzzleAttempts]);

  const updateAttempts = (puzzleId: string, newAttempts: number) => {
    setAttempts(newAttempts);
    setPuzzleAttempts((prev) => ({ ...prev, [puzzleId]: newAttempts }));

    if (studentProfile.id && studentProfile.id !== "demo_student_id") {
      fetch("/api/students/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: studentProfile.id,
          puzzleId,
          attempts: newAttempts,
        }),
      }).catch((err) => console.error("Error saving attempts to DB:", err));
    }
  };

  const getPointsForAttempts = (att: number) => {
    if (att === 1) return 4;
    if (att === 2) return 3;
    if (att === 3) return 2;
    if (att === 4) return 1;
    return 0;
  };

  const fetchSolvedPuzzles = (studentId: string) => {
    fetch(`/api/students/solve?studentId=${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSolvedPuzzleIds(data);
        }
      })
      .catch((err) => console.error("Error fetching solved puzzle IDs:", err));
  };

  const fetchPuzzleAttempts = (studentId: string) => {
    fetch(`/api/students/attempts?studentId=${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === "object") {
          setPuzzleAttempts(data);
        }
      })
      .catch((err) => console.error("Error fetching puzzle attempts:", err));
  };

  const fetchLeaderboard = () => {
    setLeaderboardLoading(true);
    fetch("/api/students?leaderboard=true")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLeaderboardEntries(data);
        }
      })
      .catch((err) => console.error("Error fetching leaderboard:", err))
      .finally(() => setLeaderboardLoading(false));
  };

  // Fetch leaderboard when leaderboard tab is active
  useEffect(() => {
    if (activeTab === "leaderboard") {
      fetchLeaderboard();
    }
  }, [activeTab]);

  useEffect(() => {
    // Load student profile from localStorage if present
    const stored = localStorage.getItem("currentStudent");
    if (!stored) {
      window.location.href = "/login?role=student";
      return;
    }

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setStudentProfile((prev) => ({
          ...prev,
          id: parsed.id || prev.id,
          name: parsed.name || prev.name,
          fideRating: parsed.rating || prev.fideRating,
          batch: parsed.batch || prev.batch,
          allowAllCourses: parsed.allowAllCourses !== undefined ? parsed.allowAllCourses : prev.allowAllCourses,
        }));
        if (parsed.id) {
          fetchSolvedPuzzles(parsed.id);
          fetchPuzzleAttempts(parsed.id);
          // Fetch student details containing their attendance records
          fetch(`/api/students?id=${parsed.id}`)
            .then((res) => res.json())
            .then((studentData) => {
              if (studentData) {
                if (Array.isArray(studentData.attendances)) {
                  setAttendanceLogs(studentData.attendances);
                }
                setStudentProfile((prev) => ({
                  ...prev,
                  fideRating: studentData.rating !== undefined ? studentData.rating : prev.fideRating,
                  allowAllCourses: studentData.allowAllCourses !== undefined ? studentData.allowAllCourses : prev.allowAllCourses,
                  customCourses: studentData.customCourses || [],
                }));
              }
            })
            .catch((err) => console.error("Error fetching student details:", err));
        }
      } catch (e) {
        console.error("Error parsing current student:", e);
      }
    }

    // Load Puzzles and Folders
    Promise.all([
      fetch("/api/puzzles").then((res) => res.json()),
      fetch("/api/puzzles/folders").then((res) => res.json()),
    ])
      .then(([puzzlesData, foldersData]) => {
        if (Array.isArray(puzzlesData)) setDbPuzzles(puzzlesData);
        if (Array.isArray(foldersData)) setFolders(foldersData);
      })
      .catch((err) => console.error("Error loading puzzles & folders:", err));
  }, []);

  // Default demonstration puzzles
  const defaultPuzzles = [
    {
      id: "demo1",
      title: "Smothered Mate Sequence",
      level: "Intermediate",
      prompt: "White to move! Move Knight on f7 to deliver checkmate!",
      hint: "Move the White Knight to f7 (square marked in gold) to double check the Black King!",
      solutionDesc: "1. Nf7+ Kg8 2. Nh6+ Kh8 3. Qg8+ Rxg8 4. Nf7#",
      assignedBatch: "All Batches",
      fen: "6rk/5Npp/8/8/8/4Q3/5N2/4K3 w - - 0 1",
      pgn: "Nf7+",
    },
    {
      id: "demo2",
      title: "Back Rank Skewer Trap",
      level: "Beginner",
      prompt: "White to move and deliver back-rank mate!",
      hint: "Check the open d-file with your White Rook!",
      solutionDesc: "1. Rd8#",
      assignedBatch: "All Batches",
      fen: "3r2k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",
      pgn: "Rd8#",
    },
    {
      id: "demo3",
      title: "Queen Deflection Sacrifice",
      level: "Advanced",
      prompt: "White to move and checkmate!",
      hint: "Sacrifice the White Queen on h8 to draw the Black King out!",
      solutionDesc: "1. Qh8+ Deflection",
      assignedBatch: "All Batches",
      fen: "r1bq1r1k/pppp1p1p/2n2p2/4p3/2B1P3/3P1N2/PPP2PPP/R2QK2R w KQ - 0 1",
      pgn: "Qh8+",
    },
  ];

  // All folders for student dashboard with lock status
  const allMappedFolders = useMemo(() => {
    // Determine if student has custom courses assigned
    const hasCustomCourses = studentProfile.customCourses && studentProfile.customCourses.length > 0;

    // 1. First map and extract puzzles
    let mapped = folders
      .map((f) => {
        const folderPuzzles = dbPuzzles.filter((p) => p.folderId === f.id);

        return {
          ...f,
          puzzlesCount: folderPuzzles.length,
          puzzles: folderPuzzles,
        };
      })
      .filter((f) => f.puzzlesCount > 0);

    if (hasCustomCourses) {
      // Keep only folders specified in customCourses and sort by the customCourses order
      mapped = mapped
        .filter((f) => studentProfile.customCourses.some((cc) => cc.folderId === f.id))
        .sort((a, b) => {
          const orderA = studentProfile.customCourses.find((cc) => cc.folderId === a.id)?.order ?? 999;
          const orderB = studentProfile.customCourses.find((cc) => cc.folderId === b.id)?.order ?? 999;
          return orderA - orderB;
        });
    } else {
      // Default ordering
      mapped = mapped.sort((a, b) => (a.order || 0) - (b.order || 0));
    }

    // 2. Determine which folders are unlocked based on previous completion (>= 70% of total points AND 100% puzzles solved)
    let prevUnlocked = true;
    return mapped.map((folder, index) => {
      if (index === 0 || studentProfile.allowAllCourses) {
        prevUnlocked = true;
        return { ...folder, isUnlocked: true };
      }

      const prevFolder = mapped[index - 1];
      const totalPuzzles = prevFolder.puzzles.length;
      if (totalPuzzles === 0) {
        return { ...folder, isUnlocked: prevUnlocked };
      }

      const maxPoints = totalPuzzles * 4;
      const prevSolvedPuzzles = prevFolder.puzzles.filter((p: any) => solvedPuzzleIds.includes(p.id));
      const prevSolvedCount = prevSolvedPuzzles.length;

      const earnedPoints = prevSolvedPuzzles
        .reduce((sum: number, p: any) => {
          const att = puzzleAttempts[p.id] || 1;
          return sum + getPointsForAttempts(att);
        }, 0);

      const score = maxPoints > 0 ? (earnedPoints / maxPoints) * 100 : 100;
      const scorePercent = Math.round(score);
      const solvedPercent = totalPuzzles > 0 ? Math.round((prevSolvedCount / totalPuzzles) * 100) : 100;
      const allSolved = prevSolvedCount >= totalPuzzles || solvedPercent >= 100;
      const isUnlocked = prevUnlocked && (scorePercent >= 70 || score >= 70) && allSolved;

      prevUnlocked = isUnlocked;

      return { ...folder, isUnlocked, earnedPoints, maxPoints };
    });
  }, [folders, dbPuzzles, studentProfile.batch, studentProfile.allowAllCourses, studentProfile.customCourses, solvedPuzzleIds, puzzleAttempts]);

  const getStudentLeague = (studentSolvedPuzzles: any[], customLeagueName?: string) => {
    const leagues = [
      { name: "Bronze League", icon: "🥉", image: "/bronze.png" },
      { name: "Silver League", icon: "🥈", image: "/silver.png" },
      { name: "Gold League", icon: "🥇", image: "/gold.png" },
      { name: "Platinum League", icon: "💎", image: "/platinum.png" },
      { name: "Diamond League", icon: "👑", image: "/diamond.png" },
      { name: "Titan League", icon: "🔥", image: "/titan.png" },
      { name: "Ace League", icon: "⚡", image: "/ace.png" },
      { name: "Master League", icon: "🏆", image: "/master.png" },
    ];

    if (customLeagueName) {
      const found = leagues.find((l) => l.name.toLowerCase() === customLeagueName.toLowerCase());
      if (found) return found;
    }

    const solvedList = studentSolvedPuzzles || [];
    let completedCount = 0;
    folders.forEach((folder) => {
      const folderPuzzles = dbPuzzles.filter((p) => p.folderId === folder.id);
      const totalPuzzles = folderPuzzles.length;
      if (totalPuzzles > 0) {
        const maxPoints = totalPuzzles * 4;
        const solvedCount = folderPuzzles.filter((p: any) => solvedList.some((sp: any) => sp.puzzleId === p.id)).length;
        const earnedPoints = folderPuzzles
          .filter((p: any) => solvedList.some((sp: any) => sp.puzzleId === p.id))
          .reduce((sum: number, p: any) => {
            const solvedRec = solvedList.find((sp: any) => sp.puzzleId === p.id);
            return sum + (solvedRec ? Math.min(solvedRec.points || 0, 4) : 0);
          }, 0);
        if (maxPoints > 0 && (earnedPoints / maxPoints) >= 0.70 && solvedCount === totalPuzzles) {
          completedCount++;
        }
      }
    });

    const index = Math.min(completedCount, leagues.length - 1);
    return leagues[index];
  };

  // Compute student league based on completed courses
  const studentLeague = useMemo(() => {
    const leagues = [
      { name: "Bronze League", icon: "🥉", image: "/bronze.png" },
      { name: "Silver League", icon: "🥈", image: "/silver.png" },
      { name: "Gold League", icon: "🥇", image: "/gold.png" },
      { name: "Platinum League", icon: "💎", image: "/platinum.png" },
      { name: "Diamond League", icon: "👑", image: "/diamond.png" },
      { name: "Titan League", icon: "🔥", image: "/titan.png" },
      { name: "Ace League", icon: "⚡", image: "/ace.png" },
      { name: "Master League", icon: "🏆", image: "/master.png" },
    ];

    if (studentProfile.batch) {
      const found = leagues.find((l) => l.name.toLowerCase() === studentProfile.batch.toLowerCase());
      if (found) return found;
    }

    let completedCount = 0;
    allMappedFolders.forEach((folder) => {
      const totalPuzzles = folder.puzzles.length;
      if (totalPuzzles > 0) {
        const maxPoints = totalPuzzles * 4;
        const solvedCount = folder.puzzles.filter((p: any) => solvedPuzzleIds.includes(p.id)).length;
        const earnedPoints = folder.puzzles
          .filter((p: any) => solvedPuzzleIds.includes(p.id))
          .reduce((sum: number, p: any) => {
            const att = puzzleAttempts[p.id] || 1;
            return sum + getPointsForAttempts(att);
          }, 0);
        const score = maxPoints > 0 ? (earnedPoints / maxPoints) * 100 : 100;
        const scorePercent = Math.round(score);
        const solvedPercent = totalPuzzles > 0 ? Math.round((solvedCount / totalPuzzles) * 100) : 100;
        if (maxPoints > 0 && (scorePercent >= 70 || score >= 70) && (solvedCount >= totalPuzzles || solvedPercent >= 100)) {
          completedCount++;
        }
      }
    });

    const index = Math.min(completedCount, leagues.length - 1);
    return leagues[index];
  }, [allMappedFolders, solvedPuzzleIds, puzzleAttempts, studentProfile.batch]);

  // accessibleFolders is just the unlocked folders
  const accessibleFolders = useMemo(() => {
    return allMappedFolders.filter((f) => f.isUnlocked);
  }, [allMappedFolders]);

  // Batch-based Puzzle Filtering (scoped to active folder if selected, or defaulting to first folder)
  const accessiblePuzzles = useMemo(() => {
    let list = dbPuzzles;
    const activeFolder = selectedFolder || accessibleFolders[0];
    if (activeFolder) {
      list = dbPuzzles.filter((p) => p.folderId === activeFolder.id);
    } else {
      // If no folders exist, show all puzzles
      list = dbPuzzles;
    }

    if (list.length === 0) return defaultPuzzles;
    return list;
  }, [dbPuzzles, selectedFolder, accessibleFolders]);

  // Interactive Puzzle Arena State
  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState(0);
  const [moveFeedback, setMoveFeedback] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [playedMoves, setPlayedMoves] = useState<string[]>([]);
  const [solutionMoves, setSolutionMoves] = useState<string[]>([]);

  const filteredLeaderboardEntries = useMemo(() => {
    const now = new Date();
    const getStartOfWeek = (d: Date) => {
      const date = new Date(d);
      const day = date.getDay();
      const diff = date.getDate() - day; // adjust when day is Sunday
      const sunday = new Date(date.setDate(diff));
      sunday.setHours(0, 0, 0, 0);
      return sunday;
    };
    const startOfWeek = getStartOfWeek(now);

    const mapped = leaderboardEntries.map((student) => {
      const solvedList = student.solvedPuzzles || [];
      const filteredSolved = solvedList.filter((sp: any) => {
        if (!sp.solvedAt) return leaderboardTimeframe === "all";

        const date = new Date(sp.solvedAt);
        if (leaderboardTimeframe === "month") {
          return date.getMonth() === selectedLeaderboardMonth && date.getFullYear() === selectedLeaderboardYear;
        } else if (leaderboardTimeframe === "week") {
          return date >= startOfWeek;
        }
        return true;
      });

      const rating = filteredSolved.reduce((sum: number, sp: any) => sum + Math.min(sp.points || 0, 4), 0);
      
      return {
        ...student,
        solvedCount: filteredSolved.length,
        rating,
      };
    });

    return mapped.sort((a, b) => b.rating - a.rating);
  }, [leaderboardEntries, leaderboardTimeframe, selectedLeaderboardMonth, selectedLeaderboardYear]);



  const lastFolderIdRef = useRef<string | null>(null);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to find the next unsolved puzzle index in the current folder
  const findNextUnsolvedIndex = (currIdx: number, puzzles: any[], solvedIds: string[]) => {
    for (let i = currIdx + 1; i < puzzles.length; i++) {
      if (!solvedIds.includes(puzzles[i].id)) {
        return i;
      }
    }
    for (let i = 0; i < currIdx; i++) {
      if (!solvedIds.includes(puzzles[i].id)) {
        return i;
      }
    }
    return -1;
  };

  // Automatically place the user at the first unsolved puzzle when the folder changes
  useEffect(() => {
    const activeFolder = selectedFolder || accessibleFolders[0];
    const activeFolderId = activeFolder?.id || null;
    if (activeFolderId !== lastFolderIdRef.current) {
      lastFolderIdRef.current = activeFolderId;
      if (accessiblePuzzles.length > 0) {
        const firstUnsolvedIdx = accessiblePuzzles.findIndex((p) => !solvedPuzzleIds.includes(p.id));
        if (firstUnsolvedIdx !== -1) {
          setCurrentPuzzleIdx(firstUnsolvedIdx);
        } else {
          setCurrentPuzzleIdx(0);
        }
      }
    }
  }, [selectedFolder, accessibleFolders, accessiblePuzzles, solvedPuzzleIds]);

  // Clean up redirect timeout on puzzle change or unmount
  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, [currentPuzzleIdx]);

  // Trigger 3-second auto-redirect to next unsolved puzzle when one is solved
  const triggerAutoRedirect = (solvedId: string) => {
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
    }
    redirectTimeoutRef.current = setTimeout(() => {
      const updatedSolvedIds = solvedPuzzleIds.includes(solvedId)
        ? solvedPuzzleIds
        : [...solvedPuzzleIds, solvedId];
      const nextUnsolved = findNextUnsolvedIndex(currentPuzzleIdx, accessiblePuzzles, updatedSolvedIds);
      if (nextUnsolved !== -1) {
        setCurrentPuzzleIdx(nextUnsolved);
      }
    }, 3000);
  };

  const currentPuzzle = accessiblePuzzles[currentPuzzleIdx] || accessiblePuzzles[0] || defaultPuzzles[0];

  const alternativePaths = useMemo(() => {
    if (!currentPuzzle || !currentPuzzle.pgn) return [];
    
    let startingFen = currentPuzzle.fen;
    if (currentPuzzle.pgn) {
      const fenMatch = currentPuzzle.pgn.match(/\[FEN\s+"([^"]+)"\]/i);
      if (fenMatch && fenMatch[1]) {
        startingFen = fenMatch[1];
      }
    }
    if (!startingFen) {
      startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    }

    const parsePgnToMoves = (pgnText: string, startFen: string): string[] => {
      const tempGame = new Chess();
      try {
        tempGame.load(startFen);
      } catch {
        return [];
      }
      
      const cleanText = pgnText
        .replace(/\[[^\]]+\]/g, "")
        .replace(/\d+\.+\s*/g, "")
        .trim();
      const rawMoves = cleanText
        .split(/\s+/)
        .filter((m: string) => m && !["1-0", "0-1", "1/2-1/2", "*"].includes(m))
        .map(m => {
          let moveStr = m.trim();
          if (!moveStr) return "";
          
          const firstChar = moveStr.charAt(0).toLowerCase();
          const rest = moveStr.slice(1);
          let isPiece = ["k", "q", "r", "n"].includes(firstChar);
          if (firstChar === "b") {
            const nextChar = rest.charAt(0).toLowerCase();
            if (nextChar !== "x" && !/[1-8]/.test(nextChar)) {
              isPiece = true;
            }
          }
          
          let normalized = moveStr.replace(/([A-H])([1-8])/g, (match, p1, p2) => p1.toLowerCase() + p2);
          normalized = normalized.replace(/X/g, "x");
          
          if (isPiece) {
            normalized = normalized.charAt(0).toUpperCase() + normalized.slice(1);
          } else {
            normalized = normalized.toLowerCase();
          }
          return normalized;
        })
        .filter(Boolean);
      
      const movesList: string[] = [];
      for (const move of rawMoves) {
        try {
          const result = tempGame.move(move.replace(/[!?]/g, ""));
          if (result) {
            movesList.push(result.san);
          } else {
            break;
          }
        } catch {
          break;
        }
      }
      return movesList;
    };

    const pgnParts = currentPuzzle.pgn.split("|");
    return pgnParts
      .map((part: string) => parsePgnToMoves(part, startingFen))
      .filter((p: string[]) => p.length > 0);
  }, [currentPuzzle]);

  const startingFen = useMemo(() => {
    let f = currentPuzzle?.fen;
    if (currentPuzzle?.pgn) {
      const fenMatch = currentPuzzle.pgn.match(/\[FEN\s+"([^"]+)"\]/i);
      if (fenMatch && fenMatch[1]) {
        f = fenMatch[1];
      }
    }
    return f || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  }, [currentPuzzle]);

  const puzzleTurn = useMemo(() => {
    const parts = startingFen.trim().split(/\s+/);
    return parts[1] === "b" ? "black" : "white";
  }, [startingFen]);

  const game = useRef(new Chess());
  const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  // Reinitialize board whenever the current puzzle changes
  useEffect(() => {
    setSelectedSquare(null);
    try {
      let startingFen = currentPuzzle.fen;
      let cleanMoves: string[] = [];

      if (currentPuzzle.pgn) {
        const firstPgnPart = currentPuzzle.pgn.split("|")[0].trim();
        // Regex extraction fallback for FEN (extremely robust and ignores layout/syntax bugs in PGN)
        const fenMatch = firstPgnPart.match(/\[FEN\s+"([^"]+)"\]/i);
        if (fenMatch && fenMatch[1]) {
          startingFen = fenMatch[1];
        }

        try {
          const tempGame = new Chess();
          tempGame.loadPgn(firstPgnPart);
          const fenHeader = tempGame.header().FEN;
          if (fenHeader && !startingFen) {
            startingFen = fenHeader;
          }
          cleanMoves = tempGame.history();
        } catch (e) {
          console.warn("loadPgn failed, using regex fallback:", e);
        }

        // Regex moves extraction if loadPgn history is empty
        if (cleanMoves.length === 0 && currentPuzzle.pgn !== "PLACEMENT_TASK") {
          const cleanText = firstPgnPart
            .replace(/\[[^\]]+\]/g, "")
            .replace(/\d+\.+\s*/g, "")
            .trim();
          cleanMoves = cleanText
            .split(/\s+/)
            .filter((m: string) => m && !["1-0", "0-1", "1/2-1/2", "*"].includes(m));
        }
      }

      if (!startingFen) {
        startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
      }

      game.current.load(startingFen);
      setFen(startingFen);
      setSolutionMoves(cleanMoves);
      setMoveFeedback(null);
      setShowHint(false);
      setPlayedMoves([]);
      const savedAttempts = currentPuzzle?.id ? (puzzleAttemptsRef.current[currentPuzzle.id] || 1) : 1;
      setAttempts(savedAttempts);
    } catch (e) {
      console.error("Error loading puzzle FEN:", e);
    }
  }, [currentPuzzleIdx, currentPuzzle]);

  const recordSolve = async (puzzleId: string, earnedPoints: number = 4) => {
    if (!studentProfile.id || !puzzleId) return;

    // Handle mock/demo student session updates entirely in local state (no DB write)
    if (studentProfile.id === "demo_student_id" || puzzleId.startsWith("demo")) {
      if (!solvedPuzzleIds.includes(puzzleId)) {
        setSolvedPuzzleIds((prev) => [...prev, puzzleId]);
        setStudentProfile((prev) => ({
          ...prev,
          fideRating: prev.fideRating + earnedPoints,
        }));
      }
      return;
    }

    try {
      const res = await fetch("/api/students/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: studentProfile.id,
          puzzleId: puzzleId,
          points: earnedPoints,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          if (!data.alreadySolved) {
            setStudentProfile((prev) => ({
              ...prev,
              fideRating: data.newRating,
            }));
            setSolvedPuzzleIds((prev) => [...prev, puzzleId]);
            fetchLeaderboard();
          }
        }
      }
    } catch (e) {
      console.error("Error recording puzzle solve:", e);
    }
  };

  const onPieceDrop = (source: string, target: string, piece: string): boolean => {
    const src = source.toLowerCase();
    const tgt = target.toLowerCase();

    const solutionMovesStr = currentPuzzle.pgn || "";
    if (solutionMovesStr === "PLACEMENT_TASK") {
      try {
        const p = game.current.get(src as any);
        if (p) {
          game.current.remove(src as any);
          game.current.put(p, tgt as any);
          setFen(game.current.fen());
          // Record placement task solves too!
          recordSolve(currentPuzzle.id, 4);
          triggerAutoRedirect(currentPuzzle.id);
          return true;
        }
      } catch (e) {}
      return false;
    }

    // Helper to compare moves
    const isSanMatch = (san1: string, san2: string) => {
      const clean = (s: string) => s.replace(/[+#x=!?]/g, "").toLowerCase();
      return clean(san1) === clean(san2);
    };

    const isPathMatching = (path: string[], sequence: string[]) => {
      if (sequence.length > path.length) return false;
      for (let i = 0; i < sequence.length; i++) {
        if (!isSanMatch(path[i], sequence[i])) return false;
      }
      return true;
    };

    // If there are no alternative paths, fall back to solutionMoves
    const activePaths = alternativePaths.length > 0 ? alternativePaths : [solutionMoves];

    // Check if puzzle was already solved
    const hasFinishedAnyPath = activePaths.some((path: string[]) => playedMoves.length >= path.length);
    if (hasFinishedAnyPath) {
      setMoveFeedback("🎉 Puzzle already solved!");
      return false;
    }

    try {
      // Check if it's a pawn promotion
      const isPromotion = game.current.get(src as any)?.type === "p" && (tgt.endsWith("8") || tgt.endsWith("1"));
      let promotionPiece: string | undefined = undefined;
      if (isPromotion) {
        const cleanP = piece ? piece.toLowerCase() : "";
        if (cleanP.length === 2 && ["q", "r", "b", "n"].includes(cleanP[1])) {
          promotionPiece = cleanP[1];
        } else if (cleanP.length === 1 && ["q", "r", "b", "n"].includes(cleanP[0])) {
          promotionPiece = cleanP[0];
        }

        // If no explicit promotion piece choice was passed, prompt user via modal
        if (!promotionPiece) {
          const tempChessTest = new Chess(game.current.fen());
          const testMove = tempChessTest.move({ from: src, to: tgt, promotion: "q" });
          if (testMove) {
            const movingPiece = game.current.get(src as any);
            setPendingPromotion({
              src,
              tgt,
              color: movingPiece?.color || "w",
            });
          } else {
            setMoveFeedback("⚠️ Invalid move. That is not a legal chess move.");
          }
          return false;
        }
      }

      // Test the move on a temp state
      const tempChess = new Chess(game.current.fen());
      const move = tempChess.move({ from: src, to: tgt, promotion: promotionPiece });

      if (!move) {
        setMoveFeedback("⚠️ Invalid move. That is not a legal chess move.");
        return false;
      }

      // Check if the moves played so far + this move matches any active path
      const candidateSequence = [...playedMoves, move.san];
      const matchingPaths = activePaths.filter((path: string[]) => isPathMatching(path, candidateSequence));

      if (matchingPaths.length > 0) {
        // Move is correct!
        game.current.move({ from: src, to: tgt, promotion: promotionPiece });
        setFen(game.current.fen());

        const newPlayedMoves = candidateSequence;
        setPlayedMoves(newPlayedMoves);

        const isSolved = game.current.isGameOver() || matchingPaths.some((path: string[]) => newPlayedMoves.length === path.length);

        if (isSolved) {
          const pts = getPointsForAttempts(attempts);
          let feedback = `🎉 EXCELLENT MOVE! Puzzle Solution Verified! (+${pts} points)`;
          if (game.current.isCheckmate()) {
            feedback = `🎉 EXCELLENT MOVE! Checkmate Solution Verified! (+${pts} points)`;
          } else if (game.current.isStalemate()) {
            feedback = `🎉 EXCELLENT MOVE! Stalemate Solution Verified! (+${pts} points)`;
          } else if (game.current.isDraw()) {
            feedback = `🎉 EXCELLENT MOVE! Draw Position Verified! (+${pts} points)`;
          }
          setMoveFeedback(feedback);
          recordSolve(currentPuzzle.id, pts);
          triggerAutoRedirect(currentPuzzle.id);
        } else {
          setMoveFeedback("🎉 Correct move! Keep going.");

          // Auto-play opponent response if solution continues
          // Get next move from the first matching path
          const opponentMoveSan = matchingPaths[0][newPlayedMoves.length];
          if (opponentMoveSan) {
            setTimeout(() => {
              try {
                const opponentMove = game.current.move(opponentMoveSan);
                if (opponentMove) {
                  setFen(game.current.fen());
                  const newPlayedMovesOpp = [...newPlayedMoves, opponentMove.san];
                  setPlayedMoves(newPlayedMovesOpp);

                  const nextMatching = matchingPaths.filter((path: string[]) => isPathMatching(path, newPlayedMovesOpp));
                  const isSolvedAfterOpponent = game.current.isGameOver() || nextMatching.some((path: string[]) => newPlayedMovesOpp.length === path.length);

                  if (isSolvedAfterOpponent) {
                    const pts = getPointsForAttempts(attempts);
                    let feedback = `🎉 EXCELLENT MOVE! Puzzle Solution Verified! (+${pts} points)`;
                    if (game.current.isCheckmate()) {
                      feedback = `🎉 EXCELLENT MOVE! Checkmate Solution Verified! (+${pts} points)`;
                    } else if (game.current.isStalemate()) {
                      feedback = `🎉 EXCELLENT MOVE! Stalemate Solution Verified! (+${pts} points)`;
                    } else if (game.current.isDraw()) {
                      feedback = `🎉 EXCELLENT MOVE! Draw Position Verified! (+${pts} points)`;
                    }
                    setMoveFeedback(feedback);
                    recordSolve(currentPuzzle.id, pts);
                    triggerAutoRedirect(currentPuzzle.id);
                  }
                }
              } catch (err) {
                console.error("Opponent play error:", err);
              }
            }, 600);
          }
        }
        return true;
      } else {
        const nextAttempts = attempts + 1;
        updateAttempts(currentPuzzle.id, nextAttempts);
        const nextPts = getPointsForAttempts(nextAttempts);
        setMoveFeedback(`❌ Incorrect move. Try another continuation! (Attempt #${nextAttempts}, next worth ${nextPts} pts)`);
        return false;
      }
    } catch (e) {
      // If chess.js throws an error, it is an illegal move, so do NOT increment attempts
      setMoveFeedback("⚠️ Invalid move. That is not a legal chess move.");
      return false;
    }
  };

  const handleSquareClick = (square: string) => {
    const squareLower = square.toLowerCase();
    
    if (selectedSquare) {
      const src = selectedSquare.toLowerCase();
      const tgt = squareLower;
      
      if (src === tgt) {
        setSelectedSquare(null);
        return;
      }
      
      const targetPiece = game.current.get(tgt as any);
      if (targetPiece && targetPiece.color === game.current.turn()) {
        setSelectedSquare(square);
        return;
      }
      
      const p = game.current.get(src as any);
      const pieceStr = p ? `${p.color}${p.type.toUpperCase()}` : "";
      
      onPieceDrop(selectedSquare, square, pieceStr);
      setSelectedSquare(null);
    } else {
      const p = game.current.get(squareLower as any);
      if (p && p.color === game.current.turn()) {
        setSelectedSquare(square);
      }
    }
  };

  const onPromotionPieceSelect = (piece?: string, promoteFromSquare?: string, promoteToSquare?: string): boolean => {
    if (!piece) return false;
    const src = promoteFromSquare || selectedSquare || "";
    const tgt = promoteToSquare || "";
    if (!src || !tgt) return false;

    const success = onPieceDrop(src, tgt, piece);
    if (success) {
      setSelectedSquare(null);
    }
    return success;
  };

  const resetBoard = () => {
    setSelectedSquare(null);
    setPendingPromotion(null);
    try {
      let startingFen = currentPuzzle.fen;
      if (currentPuzzle.pgn) {
        const fenMatch = currentPuzzle.pgn.match(/\[FEN\s+"([^"]+)"\]/i);
        if (fenMatch && fenMatch[1]) {
          startingFen = fenMatch[1];
        }
      }
      if (!startingFen) {
        startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
      }
      game.current.load(startingFen);
      setFen(startingFen);
      setMoveFeedback(null);
      setShowHint(false);
      setPlayedMoves([]);
    } catch (e) {
      console.error("Error resetting FEN:", e);
    }
  };

  const getCustomBoardColors = () => {
    switch (boardTheme) {
      case "wood":
        return { dark: "#b58863", light: "#f0d9b5" };
      case "midnight":
        return { dark: "#8ca2ad", light: "#dee3e6" };
      case "emerald":
      default:
        return { dark: "#769656", light: "#eeeed2" };
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      {/* Top Student Header */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-2 sm:gap-4">
          <ModernKnightLogo size="sm" variant="dark" />
          <span className="px-2.5 sm:px-3 py-1 bg-pink-50 text-pink-700 font-extrabold text-[11px] sm:text-xs rounded-lg border border-pink-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> <span className="hidden xs:inline">Student</span> Tactical Portal
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-bold bg-slate-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-slate-200">
            <span className="text-[#E11D48] flex items-center gap-1 font-black">🏆 {studentProfile.fideRating} <span className="hidden sm:inline">Points</span></span>
            <span className="text-slate-300">|</span>
            <span className="text-amber-700 flex items-center gap-1.5 font-bold">
              {studentLeague.image ? (
                <img src={studentLeague.image} className="w-4 h-4 sm:w-5 sm:h-5 object-contain" alt={studentLeague.name} />
              ) : (
                <span>{studentLeague.icon}</span>
              )}
              <span className="hidden sm:inline">{studentLeague.name}</span>
            </span>
          </div>

          <Link
            href="/"
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-xl border border-slate-200 text-slate-700 transition-colors"
          >
            Home
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("currentStudent");
              window.location.href = "/login?role=student";
            }}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-rose-50 hover:bg-rose-100 text-xs font-bold rounded-xl border border-rose-200 text-rose-700 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Student Nav Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold min-w-max">
          {[
            { id: "dashboard", label: "👤 Student Dashboard" },
            { id: "arena", label: "⚔️ Grandmaster Puzzle Arena" },
            { id: "leaderboard", label: "🏆 Academy Leaderboard" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 sm:py-4 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-[#29A3DD] text-[#29A3DD] font-black"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* 1. DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Student Welcome Banner */}
            <div className="bg-gradient-to-r from-[#0B4398] via-[#29A3DD] to-[#E11D48] rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 border border-white/30">
                  {studentLeague.image ? (
                    <img src={studentLeague.image} className="w-4 h-4 object-contain" alt={studentLeague.name} />
                  ) : (
                    <span>{studentLeague.icon}</span>
                  )}
                  {studentLeague.name} Rank
                </span>
                <h1 className="text-3xl font-black">Welcome Back, {studentProfile.name}! 👋</h1>
                <p className="text-sm text-blue-50 max-w-md font-medium">
                  Earn 70% or more of the total points in each course to advance to the next league!
                </p>
              </div>

              <button
                onClick={() => setActiveTab("arena")}
                className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black shadow-xl hover:bg-slate-50 transition-all hover:scale-105 cursor-pointer"
              >
                ⚔️ Open Puzzle Arena ({accessiblePuzzles.length} Puzzles)
              </button>
            </div>

            {/* 1A. IF NO FOLDER SELECTED: SHOW FOLDERS LIST */}
            {!selectedFolder ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <FolderIcon className="w-5 h-5 text-amber-500" /> Puzzles Library Courses
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">Select a course to begin solving</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allMappedFolders.map((f) => {
                    const isUnlocked = f.isUnlocked;

                    const folderPuzzles = f.puzzles || [];
                    const folderTotalPuzzles = folderPuzzles.length;
                    const folderMaxPoints = folderTotalPuzzles * 4;
                    const folderSolvedCount = folderPuzzles.filter((p: any) => solvedPuzzleIds.includes(p.id)).length;
                    const folderEarnedPoints = folderPuzzles
                      .filter((p: any) => solvedPuzzleIds.includes(p.id))
                      .reduce((sum: number, p: any) => {
                        const att = puzzleAttempts[p.id] || 1;
                        return sum + getPointsForAttempts(att);
                      }, 0);
                    const scorePercent = folderMaxPoints > 0 ? Math.round((folderEarnedPoints / folderMaxPoints) * 100) : 0;
                    const solvedPercent = folderTotalPuzzles > 0 ? Math.round((folderSolvedCount / folderTotalPuzzles) * 100) : 0;

                    return (
                      <div
                        key={f.id}
                        onClick={() => {
                          if (isUnlocked) {
                            setSelectedFolder(f);
                          }
                        }}
                        className={`p-6 rounded-2xl border transition-all flex items-center justify-between gap-4 group shadow-xs ${
                          isUnlocked
                            ? "bg-white border-slate-200 hover:border-[#29A3DD] hover:shadow-md cursor-pointer"
                            : "bg-slate-100/60 border-slate-200 opacity-60 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border group-hover:scale-105 transition-transform ${
                            isUnlocked
                              ? "bg-amber-50 border-amber-200"
                              : "bg-slate-200/50 border-slate-200"
                          }`}>
                            {isUnlocked ? (
                              <FolderIcon className="w-6 h-6 text-amber-600" />
                            ) : (
                              <Lock className="w-6 h-6 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <h4 className={`font-black text-sm tracking-wide ${isUnlocked ? "text-slate-900" : "text-slate-400"}`}>
                              {f.name}
                            </h4>
                            <div className="flex flex-wrap items-center gap-2 mt-1.5">
                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border inline-block ${
                                isUnlocked
                                  ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                                  : "text-slate-500 bg-slate-100 border-slate-200"
                              }`}>
                                {f.puzzlesCount} Puzzles
                              </span>
                              {isUnlocked && (
                                <>
                                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md border text-blue-700 bg-blue-50 border-blue-200">
                                    Score: {scorePercent}%
                                  </span>
                                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                                    solvedPercent === 100
                                      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                                      : "text-amber-700 bg-amber-50 border-amber-200"
                                  }`}>
                                    Solved: {solvedPercent}%
                                  </span>
                                </>
                              )}
                              {!isUnlocked && (
                                <span className="text-[10px] text-rose-600 font-extrabold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                                  Locked 🔒 (Need 70% points & 100% solved in previous)
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        {isUnlocked ? (
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#29A3DD] transition-colors" />
                        ) : (
                          <Lock className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* 1B. IF FOLDER SELECTED: SHOW PUZZLES WITHIN FOLDER */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <button
                      onClick={() => setSelectedFolder(null)}
                      className="text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Library
                    </button>
                    <span className="text-slate-300">/</span>
                    <span className="text-blue-600 font-bold">📂 {selectedFolder.name}</span>
                  </div>
                  <button
                    onClick={() => setSelectedFolder(null)}
                    className="text-xs text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Back to Library Folders
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {accessiblePuzzles.map((p, idx) => (
                    <div
                      key={p.id || idx}
                      className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 hover:border-[#29A3DD] hover:shadow-md transition-all shadow-xs"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-black text-slate-900 text-base flex-1">{p.title}</h4>
                        {solvedPuzzleIds.includes(p.id) && (
                          <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                            Solved ✓
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setCurrentPuzzleIdx(idx);
                          setActiveTab("arena");
                        }}
                        className={`w-full py-2.5 font-bold text-xs rounded-xl border transition-colors cursor-pointer ${
                          solvedPuzzleIds.includes(p.id)
                            ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200"
                            : "bg-slate-900 hover:bg-slate-800 text-white border-slate-900"
                        }`}
                      >
                        {solvedPuzzleIds.includes(p.id) ? "Solved ✓ (Review)" : `Solve Puzzle #${idx + 1}`}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Student Attendance Section */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                📅 Academy Attendance History
              </h3>
              {attendanceLogs.length === 0 ? (
                <p className="text-xs text-slate-500">No attendance logs recorded yet.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {attendanceLogs.map((log) => {
                    const dateFormatted = new Date(log.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                    const isPresent = log.status === "PRESENT";
                    const isAbsent = log.status === "ABSENT";
                    return (
                      <div
                        key={log.id}
                        className={`p-3.5 rounded-2xl border text-center space-y-1.5 ${
                          isPresent
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                            : isAbsent
                            ? "bg-rose-50 border-rose-200 text-rose-800"
                            : "bg-slate-50 border-slate-200 text-slate-600"
                        }`}
                      >
                        <span className="text-[10px] uppercase font-black block tracking-wider">
                          {log.status}
                        </span>
                        <span className="text-xs font-bold text-slate-900 block">{dateFormatted}</span>
                        {log.notes && (
                          <span className="text-[9px] text-slate-500 block italic truncate" title={log.notes}>
                            "{log.notes}"
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. GRANDMASTER PUZZLE ARENA TAB */}
        {activeTab === "arena" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Digital Grandmaster Chessboard */}
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 space-y-5 shadow-xs">
              {/* Piece Color Legend Bar (Clear Distinction) */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-white border border-slate-400 shadow-xs inline-block" />
                    <span className="font-extrabold text-slate-900">White Pieces (YOUR SIDE)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-slate-900 border border-slate-700 shadow-xs inline-block" />
                    <span className="font-bold text-slate-600">Black Pieces (Opponent)</span>
                  </div>
                </div>

                {/* Theme Selector Dropdown */}
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl border border-slate-200">
                  <Palette className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[11px] text-slate-500 font-bold">Theme:</span>
                  <select
                    value={boardTheme}
                    onChange={(e: any) => setBoardTheme(e.target.value)}
                    className="bg-transparent text-slate-800 font-bold focus:outline-none cursor-pointer text-xs"
                  >
                    <option value="emerald">Emerald Tournament</option>
                    <option value="wood">Classic Wood</option>
                    <option value="midnight">Midnight Slate</option>
                  </select>
                </div>
              </div>

              {/* Objective Banner */}
              <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-4 rounded-2xl border border-blue-500/20 text-white flex items-center justify-between gap-4 shadow-sm">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] uppercase tracking-wider rounded border border-emerald-500/40">
                      YOUR TURN • {puzzleTurn === "black" ? "Black" : "White"} to Move
                    </span>
                    <span className="text-xs text-blue-200 font-mono">Puzzle #{currentPuzzleIdx + 1}</span>
                  </div>
                  <h2 className="text-xl font-black text-white">{currentPuzzle.title}</h2>
                  <p className="text-xs text-blue-100 mt-1 font-medium">
                    👉 Drag and drop your pieces to solve this tactical puzzle.
                  </p>
                </div>
              </div>

              {/* 8x8 Board Container using react-chessboard */}
              <div className="relative max-w-lg mx-auto p-4 rounded-3xl bg-slate-50 border-4 border-slate-200 shadow-md">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-sm border border-slate-300">
                  <Chessboard
                    position={fen}
                    onPieceDrop={onPieceDrop}
                    onSquareClick={handleSquareClick}
                    onPromotionPieceSelect={onPromotionPieceSelect}
                    customSquareStyles={
                      selectedSquare
                        ? { [selectedSquare]: { backgroundColor: "rgba(251, 191, 36, 0.5)" } }
                        : {}
                    }
                    boardOrientation={puzzleTurn}
                    customDarkSquareStyle={{ backgroundColor: getCustomBoardColors().dark }}
                    customLightSquareStyle={{ backgroundColor: getCustomBoardColors().light }}
                  />

                  {/* Pawn Promotion Choice Modal Overlay */}
                  {pendingPromotion && (
                    <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-amber-500 shadow-2xl">
                      <div className="text-center space-y-1 mb-5">
                        <span className="text-xs font-black text-amber-600 uppercase tracking-widest block">
                          Pawn Promotion
                        </span>
                        <h4 className="text-base font-extrabold text-slate-900">Select Promotion Piece</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                        {[
                          { key: "q", label: "Queen", icon: pendingPromotion.color === "w" ? "♕" : "♛" },
                          { key: "r", label: "Rook", icon: pendingPromotion.color === "w" ? "♖" : "♜" },
                          { key: "b", label: "Bishop", icon: pendingPromotion.color === "w" ? "♗" : "♝" },
                          { key: "n", label: "Knight", icon: pendingPromotion.color === "w" ? "♘" : "♞" },
                        ].map((item) => (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => {
                              const src = pendingPromotion.src;
                              const tgt = pendingPromotion.tgt;
                              setPendingPromotion(null);
                              onPieceDrop(src, tgt, item.key);
                            }}
                            className="flex flex-col items-center justify-center p-3.5 bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-400 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-sm group cursor-pointer"
                          >
                            <span className="text-4xl text-slate-800 group-hover:scale-110 transition-transform">
                              {item.icon}
                            </span>
                            <span className="text-xs font-black text-slate-800 mt-1">{item.label}</span>
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setPendingPromotion(null)}
                        className="mt-5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                      >
                        Cancel Move
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Feedback Banner */}
              {moveFeedback && (
                <div
                  className={`p-4 rounded-2xl text-xs font-extrabold text-center flex items-center justify-center gap-2 ${
                    moveFeedback.includes("EXCELLENT")
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs"
                      : "bg-amber-50 text-amber-800 border border-amber-200"
                  }`}
                >
                  {moveFeedback.includes("EXCELLENT") ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  )}
                  <span>{moveFeedback}</span>
                </div>
              )}

              {/* Control Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-4 py-2.5 bg-amber-50 text-amber-800 font-bold text-xs rounded-xl border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  {showHint ? "Hide Hint" : "Get Hint"}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={resetBoard}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-1.5 border border-slate-200 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset Board
                  </button>
                  <button
                    onClick={() => {
                      const nextUnsolved = findNextUnsolvedIndex(currentPuzzleIdx, accessiblePuzzles, solvedPuzzleIds);
                      if (nextUnsolved !== -1) {
                        setCurrentPuzzleIdx(nextUnsolved);
                      } else {
                        setCurrentPuzzleIdx((prev) => (prev + 1) % accessiblePuzzles.length);
                      }
                    }}
                    className="px-5 py-2.5 bg-[#29A3DD] hover:bg-[#1f87b8] text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    Next Puzzle <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {showHint && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 font-medium leading-relaxed">
                  💡 <strong>Coach Hint:</strong>{" "}
                  {currentPuzzle.hint ||
                    currentPuzzle.solutionHint ||
                    "Look for deflection or checkmate moves!"}
                </div>
              )}
            </div>

            {/* Right Sidebar: Batch PGN Puzzle Selector & Moves Log */}
            <div className="lg:col-span-5 space-y-6">
              {/* Piece Color Legend Box */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3 shadow-xs text-xs">
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#29A3DD]" /> Piece Identification Guide
                </h3>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                      <ChessPieceSvg type="n" color="w" className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-900 block">White Side</span>
                      <span className="text-[10px] text-emerald-600 font-bold">YOUR PIECES</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-xs">
                      <ChessPieceSvg type="k" color="b" className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">Black Side</span>
                      <span className="text-[10px] text-slate-500 font-bold">OPPONENT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Played Moves History Log Box */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  📜 Played Moves History
                </h3>
                {playedMoves.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs text-slate-800">
                    {playedMoves.map((mv, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-50 rounded-xl border border-slate-200 font-bold">
                        {i + 1}. {mv}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">Make your first move to begin recording your solution.</p>
                )}
              </div>

              {/* Puzzle Selection Roster */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="font-extrabold text-slate-900 text-base">Puzzle Roster</h3>
                </div>

                <div className="flex flex-col gap-2 pb-3 border-b border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Select Library Folder</span>
                  <select
                    value={selectedFolder?.id || (accessibleFolders[0]?.id || "")}
                    onChange={(e) => {
                      const f = accessibleFolders.find(x => x.id === e.target.value);
                      if (f) {
                        setSelectedFolder(f);
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#29A3DD] cursor-pointer"
                  >
                    {accessibleFolders.map((f) => (
                      <option key={f.id} value={f.id}>
                        📂 {f.name} ({f.puzzlesCount} Puzzles)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                  {accessiblePuzzles.map((p, idx) => (
                    <button
                      key={p.id || idx}
                      onClick={() => setCurrentPuzzleIdx(idx)}
                      className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        currentPuzzleIdx === idx
                          ? "bg-blue-50 border-[#29A3DD] text-blue-900 font-bold shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-extrabold uppercase text-amber-600 block">
                          Puzzle #{idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-900 block truncate max-w-[180px]">
                          {p.title}
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-600 shrink-0">
                        {solvedPuzzleIds.includes(p.id) ? (
                          <span className="text-emerald-700 font-extrabold flex items-center gap-1">✓ Solved</span>
                        ) : currentPuzzleIdx === idx ? (
                          "Active ♟"
                        ) : (
                          "Solve ▶"
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. ACADEMY LEADERBOARD TAB */}
        {activeTab === "leaderboard" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-amber-500" /> Grandmaster Student Leaderboard
                </h2>
                <p className="text-xs text-slate-500">Rankings based on points earned from solving academy puzzles.</p>
              </div>

              {/* Timeframe Filter Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {leaderboardTimeframe === "month" && (
                  <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                    <select
                      value={selectedLeaderboardMonth}
                      onChange={(e) => setSelectedLeaderboardMonth(parseInt(e.target.value))}
                      className="bg-transparent text-slate-800 text-xs font-extrabold focus:outline-none cursor-pointer border-none px-2 py-1 rounded"
                    >
                      {MONTHS.map((m, idx) => (
                        <option key={idx} value={idx}>
                          {m}
                        </option>
                      ))}
                    </select>
                    
                    <select
                      value={selectedLeaderboardYear}
                      onChange={(e) => setSelectedLeaderboardYear(parseInt(e.target.value))}
                      className="bg-transparent text-slate-800 text-xs font-extrabold focus:outline-none cursor-pointer border-none px-2 py-1 rounded"
                    >
                      {[2025, 2026, 2027].map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                  {[
                    { id: "all", label: "All Time" },
                    { id: "month", label: "Month" },
                    { id: "week", label: "This Week" },
                  ].map((tf) => (
                    <button
                      key={tf.id}
                      onClick={() => setLeaderboardTimeframe(tf.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                        leaderboardTimeframe === tf.id
                          ? "bg-[#29A3DD] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {tf.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {leaderboardLoading ? (
              <div className="text-slate-500 text-center py-8">Loading leaderboard rankings...</div>
            ) : filteredLeaderboardEntries.length === 0 ? (
              <div className="text-slate-400 text-center py-8">No students found.</div>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[700px] text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase font-black tracking-wider">
                      <th className="py-3 px-4 w-[15%]">Rank</th>
                      <th className="py-3 px-4 w-[40%]">Student Name</th>
                      <th className="py-3 px-4 w-[20%]">League Rank</th>
                      <th className="py-3 px-4 w-[15%] text-right">Solved Puzzles</th>
                      <th className="py-3 px-4 w-[10%] text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeaderboardEntries.map((student, idx) => {
                      const isSelf = student.id === studentProfile.id;
                      const league = getStudentLeague(student.solvedPuzzles, student.batch);
                      return (
                        <tr
                          key={student.id}
                          className={`hover:bg-slate-50 transition-colors ${
                            isSelf ? "bg-blue-50/60 font-bold border-l-4 border-[#29A3DD]" : ""
                          }`}
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              {idx === 0 ? (
                                <span className="text-xl">🥇</span>
                              ) : idx === 1 ? (
                                <span className="text-xl">🥈</span>
                              ) : idx === 2 ? (
                                <span className="text-xl">🥉</span>
                              ) : (
                                <span className="w-5 text-center text-slate-500">{idx + 1}</span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4 font-black text-slate-900">
                            <div className="flex items-center gap-2">
                              <span>{student.name}</span>
                              {isSelf && (
                                <span className="px-2 py-0.5 bg-[#29A3DD] text-white text-[9px] font-black uppercase rounded">
                                  You
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="flex items-center gap-1.5 text-amber-700 font-bold">
                              {league.image ? (
                                <img src={league.image} className="w-5 h-5 object-contain" alt={league.name} />
                              ) : (
                                league.icon
                              )}
                              {league.name}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right text-emerald-700 font-black">
                            {student.solvedCount || 0}
                          </td>
                          <td className="py-4 px-4 text-right text-amber-700 font-black">
                            🏆 {student.rating}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
