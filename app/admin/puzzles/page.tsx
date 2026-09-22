"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Puzzle as PuzzleIcon,
  Trash2,
  Layers,
  Filter,
  Edit3,
  Folder as FolderIcon,
  FolderPlus,
  ArrowLeft,
  ArrowRight,
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

export default function AdminPuzzlesPage() {
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
  const [puzzleFilter, setPuzzleFilter] = useState<"ALL" | "BEGINNER" | "INTERMEDIATE" | "ADVANCED" >("ALL");
  const [batchFilter, setBatchFilter] = useState<string>("ALL");

  // Puzzle Creator State
  const [creatorMode, setCreatorMode] = useState<"NONE" | "CREATE" | "EDIT">("NONE");
  const [editingPuzzle, setEditingPuzzle] = useState<Puzzle | null>(null);

  // Folder editing state
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editFolderName, setEditFolderName] = useState("");
  const [editFolderOrder, setEditFolderOrder] = useState<number>(0);

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

  const handleUpdateFolder = async (e: React.FormEvent, folderId: string) => {
    e.preventDefault();
    if (!editFolderName.trim()) return;

    try {
      const res = await fetch("/api/puzzles/folders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: folderId,
          name: editFolderName.trim(),
          order: editFolderOrder,
        }),
      });
      if (res.ok) {
        setEditingFolderId(null);
        fetchFolders();
      } else {
        alert("Failed to update folder");
      }
    } catch (e) {
      alert("Error updating folder");
    }
  };

  const handleDeleteFolder = async (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent entering the folder
    if (!confirm(`Are you sure you want to delete folder "${name}"? This will delete all puzzles inside it.`)) return;

    try {
      const res = await fetch(`/api/puzzles/folders?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchFolders();
      } else {
        alert("Failed to delete folder");
      }
    } catch (e) {
      alert("Error deleting folder");
    }
  };

  const handleDeletePuzzle = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete puzzle "${title}"?`)) return;
    try {
      const res = await fetch(`/api/puzzles?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (selectedFolder) fetchPuzzlesForFolder(selectedFolder.id);
        fetchFolders(); // Refresh counts
      } else {
        alert("Failed to delete puzzle");
      }
    } catch (e) {
      alert("Error deleting puzzle");
    }
  };

  const filteredPuzzles = puzzles;

  if (creatorMode !== "NONE") {
    return (
      <div className="space-y-6 font-sans">
        <PuzzleCreator
          folderId={selectedFolder?.id}
          existingPuzzle={editingPuzzle}
          batches={batches}
          onBack={() => {
            setCreatorMode("NONE");
            setEditingPuzzle(null);
            if (selectedFolder) {
              fetchPuzzlesForFolder(selectedFolder.id);
            }
            fetchFolders();
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Top Navigation / Breadcrumbs Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <PuzzleIcon className="w-6 h-6 text-[#E11D48]" /> Tactical Puzzle Folders
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 font-semibold">
            <button
              onClick={() => setSelectedFolder(null)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              📁 Library
            </button>
            {selectedFolder && (
              <>
                <span className="text-slate-300">/</span>
                <span className="text-[#29A3DD] font-bold">📂 {selectedFolder.name}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {selectedFolder ? (
            <>
              <button
                onClick={() => setSelectedFolder(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 flex items-center gap-2 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Library
              </button>
              <button
                onClick={() => {
                  setEditingPuzzle(null);
                  setCreatorMode("CREATE");
                }}
                className="px-5 py-2.5 bg-[#29A3DD] hover:bg-[#1f87b8] text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Create PGN Puzzle
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowCreateFolder(!showCreateFolder)}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <FolderPlus className="w-4 h-4" /> Create Folder
            </button>
          )}
        </div>
      </div>

      {/* 1. VIEW ROOT FOLDERS GRID */}
      {!selectedFolder && (
        <div className="space-y-6">
          {showCreateFolder && (
            <form
              onSubmit={handleCreateFolder}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter new folder name (e.g. Checkmate Patterns, Endgame Tactics)..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-bold outline-none focus:border-[#29A3DD] focus:bg-white"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Save Folder
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateFolder(false);
                  setNewFolderName("");
                }}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </form>
          )}

          {loading ? (
            <div className="text-center p-12 bg-white rounded-2xl border border-slate-200 text-slate-400 shadow-xs">
              Loading libraries...
            </div>
          ) : folders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4 shadow-xs">
              <FolderIcon className="w-16 h-16 text-slate-300 mx-auto" />
              <div className="space-y-1">
                <h3 className="font-black text-slate-900 text-base">Your Chess Library is Empty</h3>
                <p className="text-xs text-slate-500">Create your first folder to organize tactical checkmate or endgames puzzles!</p>
              </div>
              <button
                onClick={() => setShowCreateFolder(true)}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Create First Folder
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {folders.map((folder) => {
                const isEditing = editingFolderId === folder.id;

                if (isEditing) {
                  return (
                    <form
                      key={folder.id}
                      onSubmit={(e) => handleUpdateFolder(e, folder.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white p-6 rounded-2xl border border-[#29A3DD] space-y-4 shadow-md"
                    >
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Folder Name</label>
                        <input
                          type="text"
                          value={editFolderName}
                          onChange={(e) => setEditFolderName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-bold outline-none focus:border-[#29A3DD] focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Order (Sequence Number)</label>
                        <input
                          type="number"
                          value={editFolderOrder}
                          onChange={(e) => setEditFolderOrder(parseInt(e.target.value, 10) || 0)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-bold outline-none focus:border-[#29A3DD] focus:bg-white"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          type="submit"
                          className="flex-1 py-2 bg-[#29A3DD] hover:bg-[#1f87b8] text-white font-black text-[11px] rounded-lg transition-colors cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingFolderId(null)}
                          className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-lg transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  );
                }

                return (
                  <div
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder)}
                    className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#29A3DD] hover:shadow-md cursor-pointer transition-all flex items-center justify-between gap-4 group shadow-xs"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-200 group-hover:scale-105 transition-transform">
                        <FolderIcon className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-sm tracking-wide">{folder.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-emerald-800 font-extrabold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                            {folder._count?.puzzles || 0} Puzzles
                          </span>
                          <span className="text-[10px] text-amber-800 font-extrabold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                            Order: {folder.order}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingFolderId(folder.id);
                          setEditFolderName(folder.name);
                          setEditFolderOrder(folder.order || 0);
                        }}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                        title="Edit Folder"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteFolder(folder.id, folder.name, e)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                        title="Delete Folder"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#29A3DD] transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. VIEW PUZZLES LIST INSIDE FOLDER */}
      {selectedFolder && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Grid of Puzzles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 shadow-xs">
                Loading PGN puzzles...
              </div>
            ) : filteredPuzzles.length === 0 ? (
              <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 shadow-xs">
                No puzzles in this folder yet. Click "Create PGN Puzzle" to add one!
              </div>
            ) : (
              filteredPuzzles.map((p, idx) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4 relative flex flex-col justify-between hover:border-[#29A3DD] hover:shadow-md transition-all shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-extrabold uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Puzzle #{idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingPuzzle(p);
                            setCreatorMode("EDIT");
                          }}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                          title="Edit Puzzle"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePuzzle(p.id, p.title)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                          title="Delete Puzzle"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-black text-slate-900 text-base leading-snug">{p.title}</h3>

                    {p.solutionHint && (
                      <p className="mt-3 text-xs text-amber-700 font-medium">
                        💡 Hint: {p.solutionHint}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
