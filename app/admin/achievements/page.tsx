"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { CloudinaryUpload } from "@/components/CloudinaryUpload";

interface Achievement {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  year: string;
  studentName?: string;
}

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);

  const [showAddAchievement, setShowAddAchievement] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    category: "Tournament Winner",
    description: "",
    imageUrl: "",
    year: new Date().getFullYear().toString(),
    studentName: "",
  });

  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/achievements");
      if (res.ok) setAchievements(await res.json());
    } catch (e) {
      console.error("Error fetching achievements:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAchievement.imageUrl) return alert("Please upload an achievement image first");
    try {
      const res = await fetch("/api/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAchievement),
      });
      if (res.ok) {
        const created = await res.json();
        setAchievements([created, ...achievements]);
        setShowAddAchievement(false);
        setNewAchievement({
          title: "",
          category: "Tournament Winner",
          description: "",
          imageUrl: "",
          year: new Date().getFullYear().toString(),
          studentName: "",
        });
      }
    } catch (e) {
      alert("Failed to save achievement");
    }
  };
  const handleEditAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAchievement) return;
    if (!editingAchievement.imageUrl) return alert("Please upload an achievement image first");
    try {
      const res = await fetch("/api/achievements", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingAchievement),
      });
      if (res.ok) {
        const updated = await res.json();
        setAchievements(achievements.map((ach) => (ach.id === updated.id ? updated : ach)));
        setEditingAchievement(null);
      }
    } catch (e) {
      alert("Failed to save achievement changes");
    }
  };

  const handleDeleteAchievement = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this achievement?")) return;
    try {
      const res = await fetch(`/api/achievements?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAchievements(achievements.filter((ach) => ach.id !== id));
      } else {
        alert("Failed to delete achievement");
      }
    } catch (e) {
      alert("Error deleting achievement");
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Achievements & Hall of Fame</h2>
          <p className="text-xs text-slate-500">Highlight student tournament victories, trophies, and academy milestones.</p>
        </div>
        <button
          onClick={() => setShowAddAchievement(true)}
          className="px-5 py-2.5 bg-[#29A3DD] hover:bg-[#1f87b8] text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Achievement
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 shadow-xs">
            Loading achievements...
          </div>
        ) : achievements.length === 0 ? (
          <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 shadow-xs">
            No achievements added yet.
          </div>
        ) : (
          achievements.map((ach) => (
            <div key={ach.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 space-y-3 shadow-xs hover:border-[#29A3DD] hover:shadow-md transition-all">
              {ach.imageUrl && (
                <div className="relative h-48 bg-slate-100">
                  <img src={ach.imageUrl} alt={ach.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-md shadow-sm">
                    {ach.year}
                  </span>
                </div>
              )}
              <div className="p-4 space-y-2">
                <span className="text-[10px] text-blue-600 font-black uppercase tracking-wider">{ach.category}</span>
                <h3 className="font-black text-slate-900 text-base">{ach.title}</h3>
                {ach.studentName && (
                  <p className="text-xs text-amber-700 font-bold">👤 Winner: {ach.studentName}</p>
                )}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{ach.description}</p>
                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setEditingAchievement(ach)}
                    className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all text-xs cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAchievement(ach.id)}
                    className="flex-1 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl font-bold transition-all text-xs cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL: ADD ACHIEVEMENT */}
      {showAddAchievement && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-4 relative shadow-2xl">
            <button onClick={() => setShowAddAchievement(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 cursor-pointer">✕</button>
            <h3 className="text-lg font-black text-slate-900">Add Hall of Fame Achievement</h3>
            <form onSubmit={handleAddAchievement} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Achievement Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. State Junior Champion 2026"
                  value={newAchievement.title}
                  onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Category</label>
                  <input
                    type="text"
                    value={newAchievement.category}
                    onChange={(e) => setNewAchievement({ ...newAchievement, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Year</label>
                  <input
                    type="text"
                    value={newAchievement.year}
                    onChange={(e) => setNewAchievement({ ...newAchievement, year: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-700 font-bold block mb-1">Student Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Ananya Rao"
                  value={newAchievement.studentName}
                  onChange={(e) => setNewAchievement({ ...newAchievement, studentName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>
              <div>
                <label className="text-slate-700 font-bold block mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Details about tournament victory..."
                  value={newAchievement.description}
                  onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>
              <div>
                <label className="text-slate-700 font-bold block mb-1">Achievement Image *</label>
                <CloudinaryUpload
                  value={newAchievement.imageUrl}
                  onChange={(url: string) => setNewAchievement({ ...newAchievement, imageUrl: url })}
                  onRemove={() => setNewAchievement({ ...newAchievement, imageUrl: "" })}
                />
                {newAchievement.imageUrl && (
                  <p className="text-[11px] text-emerald-600 font-bold mt-1">✓ Image uploaded successfully</p>
                )}
              </div>
              <button type="submit" className="w-full py-3 bg-[#E11D48] hover:bg-[#c9183e] text-white font-extrabold rounded-xl shadow-md transition-colors cursor-pointer">
                Save Achievement
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT ACHIEVEMENT */}
      {editingAchievement && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-4 relative shadow-2xl">
            <button onClick={() => setEditingAchievement(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 cursor-pointer">✕</button>
            <h3 className="text-lg font-black text-slate-900">Edit Hall of Fame Achievement</h3>
            <form onSubmit={handleEditAchievement} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Achievement Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. State Junior Champion 2026"
                  value={editingAchievement.title}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Category</label>
                  <input
                    type="text"
                    value={editingAchievement.category}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Year</label>
                  <input
                    type="text"
                    value={editingAchievement.year}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, year: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-700 font-bold block mb-1">Student Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Ananya Rao"
                  value={editingAchievement.studentName || ""}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, studentName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>
              <div>
                <label className="text-slate-700 font-bold block mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Details about tournament victory..."
                  value={editingAchievement.description}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>
              <div>
                <label className="text-slate-700 font-bold block mb-1">Achievement Image *</label>
                <CloudinaryUpload
                  value={editingAchievement.imageUrl}
                  onChange={(url: string) => setEditingAchievement({ ...editingAchievement, imageUrl: url })}
                  onRemove={() => setEditingAchievement({ ...editingAchievement, imageUrl: "" })}
                />
                {editingAchievement.imageUrl && (
                  <p className="text-[11px] text-emerald-600 font-bold mt-1">✓ Image uploaded successfully</p>
                )}
              </div>
              <button type="submit" className="w-full py-3 bg-[#29A3DD] hover:bg-[#1f87b8] text-white font-black rounded-xl shadow-md transition-colors cursor-pointer">
                Update Achievement
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
