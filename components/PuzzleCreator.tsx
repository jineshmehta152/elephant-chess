"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { ArrowLeft, Trash2, Plus, ChevronRight, Star, Play } from "lucide-react";
import { BoardSetupPalette } from "./BoardSetupPalette";

type Tool = null | "TRASH" | "PLUS" | "MINUS" | "TARGET" | { type: string; color: string };
type PuzzleSubtype = "STANDARD" | "PLACEMENT" | "SEQUENCE" | "TARGETS";

interface SequenceStep {
  square: string;
  type: "plus" | "minus";
}

interface TargetStep {
  square: string;
  num: number;
}

interface PuzzleCreatorProps {
  folderId?: string;
  existingPuzzle?: any;
  onBack: () => void;
  batches: Array<{ id: string; name: string }>;
}

const cleanPgnText = (pgnText: string): string => {
  let result = "";
  let curlyDepth = 0;
  let parenDepth = 0;
  
  for (let i = 0; i < pgnText.length; i++) {
    const char = pgnText[i];
    if (char === '{') {
      curlyDepth++;
    } else if (char === '}') {
      if (curlyDepth > 0) curlyDepth--;
    } else if (char === '(') {
      parenDepth++;
    } else if (char === ')') {
      if (parenDepth > 0) parenDepth--;
    } else {
      if (curlyDepth === 0 && parenDepth === 0) {
        result += char;
      }
    }
  }
  return result;
};

const normalizeMovesText = (text: string): string => {
  if (!text) return "";
  
  const normalizeSingleMove = (move: string): string => {
    let m = move.trim();
    if (!m) return "";
    
    const firstChar = m.charAt(0).toLowerCase();
    const rest = m.slice(1);
    
    let isPiece = false;
    if (["k", "q", "r", "n"].includes(firstChar)) {
      isPiece = true;
    } else if (firstChar === "b") {
      const nextChar = rest.charAt(0).toLowerCase();
      if (nextChar !== "x" && !/[1-8]/.test(nextChar)) {
        isPiece = true;
      }
    }
    
    let normalized = m.replace(/([A-H])([1-8])/g, (match, p1, p2) => p1.toLowerCase() + p2);
    normalized = normalized.replace(/X/g, "x");
    
    if (isPiece) {
      normalized = normalized.charAt(0).toUpperCase() + normalized.slice(1);
    } else {
      normalized = normalized.toLowerCase();
    }
    
    return normalized;
  };

  const parts = text.split("|");
  return parts
    .map((part) => {
      const movesList = part
        .trim()
        .split(/\s+/)
        .map(normalizeSingleMove)
        .filter(Boolean);
      return movesList.join(" ");
    })
    .join(" | ");
};

export function PuzzleCreator({ folderId = "root", existingPuzzle, onBack, batches }: PuzzleCreatorProps) {
  const game = useRef(new Chess());
  const [description, setDescription] = useState("");
  const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [manualFen, setManualFen] = useState(fen);
  const [moves, setMoves] = useState<string[]>([]);
  const [movesInputText, setMovesInputText] = useState("");
  const [pendingPromotion, setPendingPromotion] = useState<{ src: string; tgt: string; color: "w" | "b" } | null>(null);
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState<"SETUP" | "RECORD">("SETUP");
  const [selectedTool, setSelectedTool] = useState<Tool>(null);
  const [stars, setStars] = useState<string[]>([]);
  const [initialStars, setInitialStars] = useState<string[]>([]);
  const [puzzleSubtype, setPuzzleSubtype] = useState<PuzzleSubtype>("STANDARD");
  const [sequence, setSequence] = useState<SequenceStep[]>([]);
  const [targets, setTargets] = useState<TargetStep[]>([]);
  const [capturedSetupFen, setCapturedSetupFen] = useState<string | null>(null);

  // Additional Fields matching standard Puzzle Schema
  const [level, setLevel] = useState<"BEGINNER" | "INTERMEDIATE" | "ADVANCED">("BEGINNER");
  const [assignedBatch, setAssignedBatch] = useState("All Batches");
  const [solutionHint, setSolutionHint] = useState("");

  // PGN Import State & Logic
  const [importPgnText, setImportPgnText] = useState("");

  const handleImportPgn = async () => {
    if (!importPgnText.trim()) {
      alert("Please enter some PGN notation first.");
      return;
    }
    try {
      // Split the PGN blocks by looking for [Event tags
      const pgnBlock = importPgnText.trim();
      const pgnGames = pgnBlock.split(/(?=\[Event\s+)/gi).filter(Boolean);
      
      if (pgnGames.length > 1) {
        if (!confirm(`Detected ${pgnGames.length} puzzles. Do you want to batch import all of them directly?`)) {
          return;
        }

        const puzzlesToSave = [];
        for (let i = 0; i < pgnGames.length; i++) {
          const gameText = pgnGames[i].trim();
          const tempGame = new Chess();

          // Parse FEN header manually
          const fenRegex = /\[FEN\s+"([^"]+)"\]/i;
          const fenMatch = gameText.match(fenRegex);
          const startingFen = fenMatch && fenMatch[1] 
            ? fenMatch[1] 
            : "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

          try {
            tempGame.load(startingFen);
          } catch (e) {
            console.warn(`Skip puzzle ${i+1}: Invalid FEN layout`);
            continue;
          }

          // Clean up variations, comments, headers, move numbers, and NAGs
          const movesText = cleanPgnText(gameText);

          const rawMoves = movesText
            .split(/\s+/)
            .filter((m) => m && !["1-0", "0-1", "1/2-1/2", "*"].includes(m));

          const loadedMoves: string[] = [];
          let isGameValid = true;
          for (const move of rawMoves) {
            try {
              const cleanMove = move.replace(/[!?]/g, "");
              const result = tempGame.move(cleanMove);
              if (result) {
                loadedMoves.push(result.san);
              } else {
                isGameValid = false;
                break;
              }
            } catch (err) {
              isGameValid = false;
              break;
            }
          }

          if (!isGameValid) {
            console.warn(`Skip puzzle ${i+1}: Invalid moves`);
            continue;
          }

          // Parse Title
          let gameTitle = `Tactical Puzzle #${i + 1}`;
          const eventRegex = /\[Event\s+"([^"]+)"\]/i;
          const eventMatch = gameText.match(eventRegex);
          if (eventMatch && eventMatch[1] && eventMatch[1] !== "?") {
            gameTitle = eventMatch[1];
          } else {
            const whiteRegex = /\[White\s+"([^"]+)"\]/i;
            const whiteMatch = gameText.match(whiteRegex);
            if (whiteMatch && whiteMatch[1] && whiteMatch[1] !== "?") {
              gameTitle = whiteMatch[1];
            }
          }

          puzzlesToSave.push({
            title: gameTitle,
            description: description || `Imported Tactical Puzzle (${level})`,
            level,
            assignedBatch,
            solutionHint,
            fen: startingFen,
            pgn: loadedMoves.join(" "),
            folderId: folderId && folderId !== "root" ? folderId : null,
            data: { subtype: puzzleSubtype }
          });
        }

        if (puzzlesToSave.length === 0) {
          alert("No valid puzzles could be parsed.");
          return;
        }

        // POST batch payload directly
        const res = await fetch("/api/puzzles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(puzzlesToSave),
        });

        if (res.ok) {
          alert(`Successfully batch imported ${puzzlesToSave.length} puzzles!`);
          onBack();
        } else {
          alert("Failed to batch import puzzles.");
        }
        return;
      }

      // Single/Multiple puzzle flow (separated by |)
      const singleGameText = pgnGames[0].trim();
      const pgnParts = singleGameText.split("|");
      const loadedPaths: string[][] = [];
      let startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

      // Try to find FEN in any of the parts
      for (const part of pgnParts) {
        const fenMatch = part.match(/\[FEN\s+"([^"]+)"\]/i);
        if (fenMatch && fenMatch[1]) {
          startingFen = fenMatch[1];
          break;
        }
      }

      for (let index = 0; index < pgnParts.length; index++) {
        const part = pgnParts[index].trim();
        const tempGame = new Chess();
        try {
          tempGame.load(startingFen);
        } catch (e) {
          alert(`Invalid FEN layout in solution #${index + 1}`);
          return;
        }

        const movesText = cleanPgnText(part);
        const rawMoves = movesText
          .split(/\s+/)
          .filter((m) => m && !["1-0", "0-1", "1/2-1/2", "*"].includes(m));

        const loadedMoves: string[] = [];
        for (const move of rawMoves) {
          try {
            const cleanMove = move.replace(/[!?]/g, "");
            const result = tempGame.move(cleanMove);
            if (result) {
              loadedMoves.push(result.san);
            } else {
              throw new Error(`Illegal move: ${move}`);
            }
          } catch (moveErr: any) {
            alert(`Move validation failed in solution #${index + 1} at "${move}": ${moveErr.message}`);
            return;
          }
        }
        if (loadedMoves.length > 0) {
          loadedPaths.push(loadedMoves);
        }
      }

      if (loadedPaths.length === 0) {
        alert("No valid moves could be parsed.");
        return;
      }

      const eventRegex = /\[Event\s+"([^"]+)"\]/i;
      const eventMatch = pgnParts[0].match(eventRegex);
      if (eventMatch && eventMatch[1] && eventMatch[1] !== "?") {
        setTitle(eventMatch[1]);
      } else {
        const whiteRegex = /\[White\s+"([^"]+)"\]/i;
        const whiteMatch = pgnParts[0].match(whiteRegex);
        if (whiteMatch && whiteMatch[1] && whiteMatch[1] !== "?") {
          setTitle(whiteMatch[1]);
        }
      }

      safeLoadFen(startingFen);
      setCapturedSetupFen(startingFen);
      if (loadedPaths.length > 1) {
        setMoves(loadedPaths.map(path => path.join(" ")));
      } else {
        setMoves(loadedPaths[0]);
      }
      setMode("RECORD");
    } catch (e: any) {
      alert("Error parsing PGN: " + e.message);
    }
  };

  const safeLoadFen = (newFen: string) => {
    try {
      game.current.load(newFen);
      setFen(newFen);
      setManualFen(newFen);
      return true;
    } catch (e) {
      console.error("Invalid FEN:", newFen, e);
      return false;
    }
  };

  const boardStyles = useMemo(() => {
    const s: any = {};
    stars.forEach((sq) => {
      s[sq] = {
        backgroundImage:
          'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZDcwMCIgc3Ryb2tlPSJnb2xkIiBzdHJva2Utd2lkdGg9IjIiPjxwb2x5Z29uIHBvaW50cz0iMTIgMiAxNS4wOSA4LjI2IDIyIDkuMjcgMTcgMTQuMTQgMTguMTggMjEuMDIgMTIgMTcgMTcgNS44MiAyMS4wMiA3IDE0LjE0IDIgOS4yNyA4LjkxIDguMjYgMTIgMiIvPjwvc3ZnPg==")',
        backgroundPosition: "center",
        backgroundSize: "50%",
        backgroundRepeat: "no-repeat",
      };
    });
    sequence.forEach((item) => {
      const icon =
        item.type === "plus"
          ? "PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgNVYxOU01IDEyaDE0IiBzdHJva2U9IiMyMmM1NWUiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+"
          : "PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNSAxMmgxNCIgc3Ryb2tlPSIjZWY0NDQ0IiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==";
      s[item.square] = {
        backgroundImage: `url("data:image/svg+xml;base64,${icon}")`,
        backgroundPosition: "center",
        backgroundSize: "45%",
        backgroundRepeat: "no-repeat",
        backgroundColor: moves.includes(item.square) ? "rgba(34, 197, 94, 0.25)" : "transparent",
      };
    });
    targets.forEach((item) => {
      const isReached = moves.includes(item.square);
      const color = isReached ? "#22c55e" : "#3b82f6";
      const svg = btoa(
        `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="38" fill="${color}" stroke="white" stroke-width="8"/><text x="50" y="68" font-family="Arial, sans-serif" font-size="52" fill="white" text-anchor="middle" font-weight="bold">${item.num}</text></svg>`
      );
      s[item.square] = {
        backgroundImage: `url("data:image/svg+xml;base64,${svg}")`,
        backgroundPosition: "center",
        backgroundSize: "75%",
        backgroundRepeat: "no-repeat",
      };
    });
    if (selectedSquare) {
      s[selectedSquare] = {
        ...s[selectedSquare],
        backgroundColor: "rgba(251, 191, 36, 0.5)",
      };
    }
    return s;
  }, [stars, sequence, targets, moves, selectedSquare]);

  useEffect(() => {
    if (existingPuzzle) {
      setTitle(existingPuzzle.title || "");
      setDescription(existingPuzzle.description || "");
      setLevel(existingPuzzle.level || "BEGINNER");
      setAssignedBatch(existingPuzzle.assignedBatch || "All Batches");
      setSolutionHint(existingPuzzle.solutionHint || "");
      
      let loadedFen = existingPuzzle.fen;
      let cleanMoves: string[] = [];

      if (existingPuzzle.pgn) {
        // Regex extraction fallback for FEN
        const fenMatch = existingPuzzle.pgn.match(/\[FEN\s+"([^"]+)"\]/i);
        if (fenMatch && fenMatch[1]) {
          loadedFen = fenMatch[1];
        }

        try {
          const tempGame = new Chess();
          tempGame.loadPgn(existingPuzzle.pgn);
          const fenHeader = tempGame.header().FEN;
          if (fenHeader && !loadedFen) {
            loadedFen = fenHeader;
          }
          cleanMoves = tempGame.history();
        } catch (e) {
          console.warn("loadPgn failed, using regex fallback:", e);
        }

        // Regex moves extraction fallback if history is empty
        if (cleanMoves.length === 0 && existingPuzzle.pgn !== "PLACEMENT_TASK") {
          const cleanText = existingPuzzle.pgn
            .replace(/\[[^\]]+\]/g, "")
            .replace(/\d+\.+\s*/g, "")
            .trim();
          cleanMoves = cleanText
            .split(/\s+/)
            .filter((m: string) => m && !["1-0", "0-1", "1/2-1/2", "*"].includes(m));
        }
      }

      if (!loadedFen) {
        loadedFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
      }

      safeLoadFen(loadedFen);
      const data =
        typeof existingPuzzle.data === "string"
          ? JSON.parse(existingPuzzle.data)
          : existingPuzzle.data || {};
      if (data?.subtype) setPuzzleSubtype(data.subtype);
      if (data?.stars) {
        setInitialStars(data.stars);
        setStars(data.stars);
      }
      if (data?.sequence) setSequence(data.sequence);
      if (data?.targets) setTargets(data.targets);
      
      if (cleanMoves.length > 0) {
        setMoves(cleanMoves);
      }
      if (existingPuzzle.pgn && existingPuzzle.pgn !== "PLACEMENT_TASK") {
        setMovesInputText(existingPuzzle.pgn);
      }

      setCapturedSetupFen(loadedFen);
      setMode("RECORD");
    }
  }, [existingPuzzle]);

  const updateBoard = () => {
    setFen(game.current.fen());
  };

  const toggleTurn = (color: "w" | "b") => {
    if (mode !== "SETUP") return;
    const parts = fen.split(" ");
    if (parts.length >= 2) {
      parts[1] = color;
      safeLoadFen(parts.join(" "));
    }
  };

  const toggleMode = () => {
    setSelectedSquare(null);
    if (mode === "SETUP") {
      setCapturedSetupFen(fen);
      setInitialStars([...stars]);
      setMoves([]);
      setMovesInputText("");
      setMode("RECORD");
      setSelectedTool(null);
    } else {
      if (capturedSetupFen) safeLoadFen(capturedSetupFen);
      setMode("SETUP");
    }
  };

  const onSquareClick = (square: string) => {
    const s = square.toLowerCase();
    if (mode === "SETUP" || (mode === "RECORD" && puzzleSubtype === "PLACEMENT")) {
      if (!selectedTool) return;
      setStars((prev) => prev.filter((item) => item !== s));
      setSequence((prev) => prev.filter((item) => item.square !== s));
      setTargets((prev) => prev.filter((item) => item.square !== s));
      if (selectedTool === "TRASH") {
        game.current.remove(s as any);
      } else if (selectedTool === "PLUS") {
        setSequence((prev) => [...prev, { square: s, type: "plus" }]);
      } else if (selectedTool === "MINUS") {
        setSequence((prev) => [...prev, { square: s, type: "minus" }]);
      } else if (selectedTool === "TARGET") {
        setTargets((prev) => [...prev, { square: s, num: prev.length + 1 }]);
      } else if (typeof selectedTool === "object" && selectedTool !== null) {
        game.current.put({ type: selectedTool.type as any, color: selectedTool.color as any }, s as any);
      }
      updateBoard();
      return;
    }
    if (mode === "RECORD" && puzzleSubtype === "SEQUENCE") {
      const marker = sequence.find((item) => item.square === s);
      if (marker) {
        setMoves((prev) => {
          const next = prev.includes(s) ? prev.filter((m) => m !== s) : [...prev, s];
          setMovesInputText(next.join(" "));
          return next;
        });
      }
      return;
    }

    if (selectedSquare) {
      const src = selectedSquare.toLowerCase();
      const tgt = s;

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
      const p = game.current.get(s as any);
      if (p && p.color === game.current.turn()) {
        setSelectedSquare(square);
      }
    }
  };

  const onPieceDrop = (source: string, target: string, piece: string): boolean => {
    const src = source.toLowerCase();
    const tgt = target.toLowerCase();
    if (mode === "RECORD" && puzzleSubtype === "SEQUENCE") return false;
    if (mode === "SETUP" || (mode === "RECORD" && puzzleSubtype === "PLACEMENT")) {
      const p = game.current.get(src as any);
      if (!p) return false;
      game.current.remove(src as any);
      game.current.put(p, tgt as any);
      updateBoard();
      return true;
    }
    if (mode === "RECORD" && puzzleSubtype === "TARGETS") {
      const nextTarget = targets[moves.length];
      if (nextTarget && tgt === nextTarget.square) {
        const p = game.current.get(src as any);
        if (p) {
          game.current.remove(src as any);
          game.current.put(p, tgt as any);
          setMoves((prev) => {
            const next = [...prev, tgt];
            setMovesInputText(next.join(" "));
            return next;
          });
          updateBoard();
          return true;
        }
      }
      return false;
    }
    if (mode === "RECORD" && stars.includes(tgt)) {
      setStars((prev) => prev.filter((s) => s !== tgt));
      const p = game.current.get(src as any);
      if (p) {
        game.current.remove(src as any);
        game.current.put(p, tgt as any);
        setMoves((prev) => {
          const next = [...prev, `${src}-${tgt}`];
          setMovesInputText(next.join(" "));
          return next;
        });
        updateBoard();
        return true;
      }
    }
    if (mode === "RECORD" && puzzleSubtype === "STANDARD") {
      try {
        const isPromotion = game.current.get(src as any)?.type === "p" && (tgt.endsWith("8") || tgt.endsWith("1"));
        let promotionPiece: string | undefined = undefined;
        if (isPromotion) {
          const cleanP = piece ? piece.toLowerCase() : "";
          if (cleanP.length === 2 && ["q", "r", "b", "n"].includes(cleanP[1])) {
            promotionPiece = cleanP[1];
          } else if (cleanP.length === 1 && ["q", "r", "b", "n"].includes(cleanP[0])) {
            promotionPiece = cleanP[0];
          }

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
            }
            return false;
          }
        }
        const move = game.current.move({ from: src, to: tgt, promotion: promotionPiece });
        if (move) {
          setMoves((prev) => {
            const next = [...prev, move.san];
            setMovesInputText(next.join(" "));
            return next;
          });
          updateBoard();
          return true;
        }
      } catch (e) {}
    }
    return false;
  };

  const getTurnFromFen = (fenString: string): "w" | "b" => {
    try {
      return (fenString.trim().split(/\s+/)[1] || "w") as "w" | "b";
    } catch {
      return "w";
    }
  };

  const savePuzzle = async () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }
    let payload: any = {
      title: title.trim(),
      description: description.trim(),
      level,
      assignedBatch,
      solutionHint,
      folderId: folderId && folderId !== "root" ? folderId : null,
    };
    if (puzzleSubtype === "PLACEMENT") {
      payload.fen = fen;
      payload.targetFen = capturedSetupFen;
      payload.pgn = "PLACEMENT_TASK";
      payload.data = { subtype: "PLACEMENT" };
    } else {
      payload.fen = capturedSetupFen || fen;
      payload.pgn = normalizeMovesText(movesInputText);
      payload.data = { stars: initialStars, sequence, targets, subtype: puzzleSubtype };
    }
    if (existingPuzzle) {
      payload.id = existingPuzzle.id;
      // Preserve folderId if editing an existing puzzle
      if (existingPuzzle.folderId) {
        payload.folderId = existingPuzzle.folderId;
      }
    }

    try {
      const res = await fetch("/api/puzzles", {
        method: existingPuzzle ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("Task Saved Successfully!");
        onBack();
      } else {
        alert("Failed to save task");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving task");
    }
  };

  const deletePuzzle = async () => {
    if (!existingPuzzle?.id) return;
    if (!confirm("Are you sure you want to permanently delete this puzzle?")) return;
    try {
      const res = await fetch(`/api/puzzles?id=${existingPuzzle.id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Puzzle deleted successfully!");
        onBack();
      } else {
        alert("Failed to delete puzzle");
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting puzzle");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-900 border border-slate-800 p-6 rounded-3xl h-full min-h-[600px]">
      <div className="lg:col-span-5 flex flex-col items-center">
        <div
          className={`relative w-full max-w-[450px] border-4 rounded-3xl shadow-2xl overflow-hidden transition-colors ${
            mode === "RECORD" ? "border-emerald-500/80" : "border-blue-500/80"
          }`}
        >
          <Chessboard
            position={fen}
            onPieceDrop={onPieceDrop}
            onSquareClick={onSquareClick}
            onSquareRightClick={(s) => {
              if (mode === "SETUP") {
                const sq = s.toLowerCase();
                setStars((prev) => (prev.includes(sq) ? prev.filter((x) => x !== sq) : [...prev, sq]));
              }
            }}
            customSquareStyles={boardStyles}
            customDarkSquareStyle={{ backgroundColor: "#769656" }}
            customLightSquareStyle={{ backgroundColor: "#eeeed2" }}
          />

          {/* Pawn Promotion Choice Modal Overlay */}
          {pendingPromotion && (
            <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-amber-500/50 shadow-2xl">
              <div className="text-center space-y-1 mb-5">
                <span className="text-xs font-black text-amber-400 uppercase tracking-widest block">
                  Pawn Promotion
                </span>
                <h4 className="text-base font-extrabold text-white">Select Promotion Piece</h4>
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
                    className="flex flex-col items-center justify-center p-3.5 bg-slate-900 hover:bg-slate-800 border-2 border-slate-750 hover:border-amber-400 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl group cursor-pointer"
                  >
                    <span className="text-4xl text-amber-400 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="text-xs font-black text-slate-100 mt-1">{item.label}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setPendingPromotion(null)}
                className="mt-5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
              >
                Cancel Move
              </button>
            </div>
          )}
        </div>
        <div className="mt-4 p-3 bg-slate-950 border border-slate-800 rounded-2xl text-[10px] font-mono w-full break-all text-slate-400 uppercase select-all">
          FEN: {fen}
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="text-slate-400 hover:text-white hover:bg-slate-800 p-2.5 rounded-full transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-xl font-extrabold text-white">{existingPuzzle ? "Edit Task" : "New Task"}</h2>
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                {mode === "SETUP" ? "Step 1: Setup Layout" : "Step 2: Define Solution"}
              </p>
            </div>
          </div>
          {mode === "SETUP" && (
            <select
              className="bg-slate-950 text-white border border-slate-800 rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-blue-500"
              value={puzzleSubtype}
              onChange={(e) => setPuzzleSubtype(e.target.value as PuzzleSubtype)}
            >
              <option value="STANDARD">Standard Tactics</option>
              <option value="PLACEMENT">Piece Placement</option>
              <option value="SEQUENCE">Sequence (Signs)</option>
              <option value="TARGETS">Target Squares</option>
            </select>
          )}
          {existingPuzzle && (
            <button
              onClick={deletePuzzle}
              className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-bold text-xs bg-rose-950/30 border border-rose-900/30 px-3 py-1.5 rounded-xl transition-all"
            >
              <Trash2 size={15} /> Delete Puzzle
            </button>
          )}
        </div>

        <div className="space-y-6">
          {(mode === "SETUP" || puzzleSubtype === "PLACEMENT") && (
            <BoardSetupPalette
              selectedTool={selectedTool}
              setSelectedTool={setSelectedTool}
              onClear={() => {
                game.current.clear();
                updateBoard();
              }}
              onReset={() => {
                game.current.reset();
                updateBoard();
              }}
              onClearArrows={() => {}}
              showSpecialTools={puzzleSubtype === "SEQUENCE" || puzzleSubtype === "TARGETS"}
            />
          )}

          {mode === "SETUP" ? (
            <div className="space-y-6">
              {/* PGN Import Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Import PGN Notation</span>
                <textarea
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono outline-none focus:border-blue-500"
                  rows={3}
                  placeholder="Paste your PGN moves here (e.g. 1. e4 e5 2. Nf3 Nc6...)"
                  value={importPgnText}
                  onChange={(e) => setImportPgnText(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleImportPgn}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  Load & Parse PGN
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Side to Move</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleTurn("w")}
                      className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all ${
                        getTurnFromFen(fen) === "w"
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-slate-900 text-slate-400 border border-slate-800"
                      }`}
                    >
                      White
                    </button>
                    <button
                      onClick={() => toggleTurn("b")}
                      className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all ${
                        getTurnFromFen(fen) === "b"
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-slate-900 text-slate-400 border border-slate-800"
                      }`}
                    >
                      Black
                    </button>
                  </div>
                </div>
                <div className="bg-blue-950/20 p-3.5 rounded-xl border border-blue-900/30 text-[10px] text-blue-300 flex items-center gap-3">
                  <Star size={16} className="shrink-0 text-blue-400" />
                  <span>
                    <b>Right-click</b> squares for Stars. Use <b>Target Tool</b> for numbered targets.
                  </span>
                </div>
              </div>
              <button
                onClick={toggleMode}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-xl hover:brightness-110 transition-all"
              >
                Next: {puzzleSubtype === "PLACEMENT" ? "Define Starting Position" : "Record Solution"}{" "}
                <ChevronRight size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-right-2 duration-300">
              <div className="bg-emerald-950/20 p-5 rounded-2xl border border-emerald-900/30">
                <h3 className="font-extrabold text-sm text-emerald-400 flex items-center gap-2 mb-2">
                  <Play size={18} className="text-emerald-400" />{" "}
                  {puzzleSubtype === "PLACEMENT" ? "Student Starting Position" : "Solution Recording"}
                </h3>
                <p className="text-[11px] text-slate-400 italic">
                  {puzzleSubtype === "PLACEMENT"
                    ? "Edit this board to show the starting position the student will see."
                    : puzzleSubtype === "TARGETS"
                    ? `Place pieces on targets in order. Remaining: ${targets.length - moves.length}`
                    : "Make the moves on the chessboard in the correct order to record them."}
                </p>
                {puzzleSubtype !== "PLACEMENT" && (
                  <div className="space-y-2 mt-4">
                    <label className="block text-xs font-bold text-slate-400">
                      Solution Moves (space-separated, use "|" for alternative paths)
                    </label>
                    <textarea
                      value={movesInputText}
                      onChange={(e) => setMovesInputText(e.target.value)}
                      onBlur={() => {
                        const val = normalizeMovesText(movesInputText);
                        setMovesInputText(val);
                        if (!val.trim()) {
                          setMoves([]);
                        } else if (val.includes("|")) {
                          setMoves(val.split("|").map(p => p.trim()));
                        } else {
                          setMoves(val.split(/\s+/).filter(Boolean));
                        }
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-emerald-400 outline-none focus:border-emerald-500/50 uppercase tracking-wider"
                      rows={3}
                      placeholder="e.g. Nf7+ Kg8 Nh6+ Kh8 | Nf7+ Kg8 Qxe5"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-4 pt-4 border-t border-slate-800 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Puzzle Title *</label>
                  <input
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-bold outline-none focus:border-blue-500"
                    placeholder="Puzzle Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Tactical Instructions / Description</label>
                  <textarea
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 outline-none focus:border-blue-500 text-white"
                    rows={3}
                    placeholder="Tactical instructions or description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>



                <div>
                  <label className="text-slate-400 block mb-1">Solution Hint (Optional)</label>
                  <input
                    type="text"
                    placeholder="Look for tactical deflection on f7..."
                    value={solutionHint}
                    onChange={(e) => setSolutionHint(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={toggleMode}
                    className="px-6 py-3 rounded-xl font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={savePuzzle}
                    disabled={!title.trim()}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-extrabold shadow-lg hover:brightness-110 transition-all disabled:opacity-50"
                  >
                    Save Final Task
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
