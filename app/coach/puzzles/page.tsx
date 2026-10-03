"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Puzzle as PuzzleIcon,
  Trash2,
  Layers,
  Edit3,
  Folder as FolderIcon,
  FolderPlus,
} from "lucide-react";
import { PuzzleCreator } from "@/components/PuzzleCreator";

interface Puzzle {
  id: string;
  title: string;
  pgn: string;
  fen?: string;
  targetFen?: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  assignedBatch: string;
  solutionHint?: string;
  description?: string;
  data?: any;
  folderId?: string;
  coachId?: string;
  coach?: { id: string; name: string };
}

interface Batch {
  id: string;
  name: string;
}

interface PuzzleFolder {
  id: string;
  name: string;
  order: number;
  _count?: {
    puzzles: number;
  };
}

export default function CoachPuzzlesPage() {
  const [folders, setFolders] = useState<PuzzleFolder[]>([]);
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(false);

  // Folder navigation state
  const [selectedFolder, setSelectedFolder] = useState<PuzzleFolder | null>(null);

  // Folder creation state
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  // Filters
  const [puzzleFilter, setPuzzleFilter] = useState<"ALL" | "BEGINNER" | "INTERMEDIATE" | "ADVANCED">("ALL");
  const [batchFilter, setBatchFilter] = useState<string>("ALL");

  // Puzzle Creator State
  const [creatorMode, setCreatorMode] = useState<"NONE" | "CREATE" | "EDIT">("NONE");
  const [editingPuzzle, setEditingPuzzle] = useState<Puzzle | null>(null);

  useEffect(() => {
    fetchFolders();
    fetchBatches();
  }, []);

  useEffect(() => {
    if (selectedFolder) {
      fetchPuzzlesForFolder(selectedFolder.id);
    } else {
      setPuzzles([]);
    }
  }, [selectedFolder]);

  const fetchFolders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/puzzles/folders");
      if (res.ok) setFolders(await res.json());
    } catch (e) {
      console.error("Error fetching folders:", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchBatches = async () => {
    try {
      const res = await fetch("/api/batches");
      if (res.ok) setBatches(await res.json());
    } catch (e) {
      console.error("Error fetching batches:", e);
    }
  };

  const fetchPuzzlesForFolder = async (folderId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/puzzles?folderId=${folderId}`);
      if (res.ok) setPuzzles(await res.json());
    } catch (e) {
      console.error("Error fetching folder puzzles:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    try {
      const res = await fetch("/api/puzzles/folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newFolderName.trim() }),
      });
      if (res.ok) {
        setNewFolderName("");
        setShowCreateFolder(false);
        fetchFolders();
      } else {
        alert("Failed to create folder");
      }
    } catch (e) {
      alert("Error creating folder");
    }
  };

  const handleDeletePuzzle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this puzzle?")) return;

    try {
      const res = await fetch(`/api/puzzles?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setPuzzles(puzzles.filter((p) => p.id !== id));
        fetchFolders();
      } else {
        alert("Failed to delete puzzle");
      }
    } catch (e) {
      alert("Error deleting puzzle");
    }
  };

  const filteredPuzzles = useMemo(() => {
    return puzzles.filter((p) => {
      const matchLevel = puzzleFilter === "ALL" || p.level === puzzleFilter;
      const matchBatch = batchFilter === "ALL" || p.assignedBatch === batchFilter;
      return matchLevel && matchBatch;
    });
  }, [puzzles, puzzleFilter, batchFilter]);

  if (creatorMode !== "NONE") {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl">
        <PuzzleCreator
          folderId={selectedFolder?.id || "root"}
          existingPuzzle={creatorMode === "EDIT" ? editingPuzzle : null}
          onBack={() => {
            setCreatorMode("NONE");
            setEditingPuzzle(null);
            if (selectedFolder) fetchPuzzlesForFolder(selectedFolder.id);
            fetchFolders();
          }}
          batches={batches}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <PuzzleIcon className="w-6 h-6 text-[#29A3DD]" /> Tactical Puzzles Studio
          </h1>
          <p className="text-xs text-slate-500">
            Create interactive chess exercises, PGN sequences, and curriculum folders for students.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedFolder && (
            <button
              onClick={() => {
                setEditingPuzzle(null);
                setCreatorMode("CREATE");
              }}
              className="px-4 py-2.5 bg-[#29A3DD] hover:bg-[#1f87b8] text-white font-black text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Puzzle to "{selectedFolder.name}"
            </button>
          )}

          <button
            onClick={() => setShowCreateFolder(true)}
            className="px-4 py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
          >
            <FolderPlus className="w-4 h-4 text-[#29A3DD]" /> New Folder
          </button>
        </div>
      </div>

      {/* CREATE FOLDER MODAL */}
      {showCreateFolder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative text-slate-900">
            <button
              onClick={() => setShowCreateFolder(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <FolderPlus className="w-5 h-5 text-[#29A3DD]" /> Create Course Folder
            </h3>
            <form onSubmit={handleCreateFolder} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Course Folder Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Level 1: Fork & Pin Tactics"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#29A3DD] hover:bg-[#1f87b8] text-white font-black rounded-xl shadow-md transition cursor-pointer"
              >
                Create Folder
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FOLDERS GRID */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-[#29A3DD]" /> Training Folders ({folders.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {folders.map((folder) => {
            const isSelected = selectedFolder?.id === folder.id;
            const count = folder._count?.puzzles || 0;

            return (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(isSelected ? null : folder)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                  isSelected
                    ? "bg-sky-50 border-[#29A3DD] shadow-md ring-2 ring-[#29A3DD]/20"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${isSelected ? "bg-[#29A3DD] text-white" : "bg-slate-100 text-slate-500 group-hover:text-slate-900"}`}>
                    <FolderIcon className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 bg-slate-100 text-[#29A3DD] border border-slate-200 rounded-md text-[11px] font-bold">
                    {count} {count === 1 ? "puzzle" : "puzzles"}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="font-bold text-slate-900 text-sm line-clamp-1">{folder.name}</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {isSelected ? "Currently active" : "Click to view puzzles"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* PUZZLE LIST FOR SELECTED FOLDER */}
      {selectedFolder ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#29A3DD] font-bold mb-1">
                <FolderIcon className="w-3.5 h-3.5" />
                <span>ACTIVE FOLDER</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">{selectedFolder.name}</h3>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2">
              <select
                value={puzzleFilter}
                onChange={(e) => setPuzzleFilter(e.target.value as any)}
                className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#29A3DD]"
              >
                <option value="ALL">All Levels</option>
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>

              <button
                onClick={() => {
                  setEditingPuzzle(null);
                  setCreatorMode("CREATE");
                }}
                className="px-3.5 py-2 bg-[#29A3DD] hover:bg-[#1f87b8] text-white font-black text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Puzzle
              </button>
            </div>
          </div>

          {/* Puzzles Table */}
          {loading ? (
            <div className="p-8 text-center text-slate-400 text-xs">Loading puzzles...</div>
          ) : filteredPuzzles.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <PuzzleIcon className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No puzzles found in this folder.</p>
              <p className="text-xs text-slate-500">Click "Add Puzzle" above to design tactical exercises.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Puzzle Title</th>
                    <th className="p-3">Skill Level</th>
                    <th className="p-3">Assigned Batch</th>
                    <th className="p-3">Created By</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredPuzzles.map((p, idx) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono text-slate-400">{idx + 1}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{p.title}</div>
                        {p.solutionHint && (
                          <div className="text-[10px] text-amber-700 truncate max-w-xs">
                            💡 Hint: {p.solutionHint}
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                          p.level === "BEGINNER"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : p.level === "INTERMEDIATE"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-purple-50 text-purple-700 border border-purple-200"
                        }`}>
                          {p.level}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] border border-slate-200">
                          {p.assignedBatch}
                        </span>
                      </td>
                      <td className="p-3 text-[11px] text-slate-500">
                        {p.coach?.name ? `Coach ${p.coach.name}` : "Academy"}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setEditingPuzzle(p);
                              setCreatorMode("EDIT");
                            }}
                            className="p-1.5 text-slate-500 hover:text-[#29A3DD] hover:bg-sky-50 rounded-lg transition cursor-pointer"
                            title="Edit Puzzle"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeletePuzzle(p.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Delete Puzzle"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-3 shadow-xs">
          <Layers className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Select a course folder above</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Choose any folder to view its interactive puzzles, add new tactical positions, or import PGNs.
          </p>
        </div>
      )}
    </div>
  );
}
