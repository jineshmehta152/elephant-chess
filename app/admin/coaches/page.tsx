"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Trash2, Pencil, GraduationCap, Users, Puzzle as PuzzleIcon, CheckCircle2, XCircle } from "lucide-react";

interface Coach {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  title?: string;
  bio?: string;
  status: string;
  createdAt: string;
  _count?: {
    students: number;
    puzzles: number;
  };
}

export default function AdminCoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [showAddCoach, setShowAddCoach] = useState(false);
  const [newCoach, setNewCoach] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    title: "Senior Chess Coach",
    bio: "",
    status: "Active",
  });

  const [editingCoach, setEditingCoach] = useState<Coach | null>(null);

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/coaches");
      if (res.ok) {
        setCoaches(await res.json());
      }
    } catch (e) {
      console.error("Error fetching coaches:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/coaches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCoach),
      });
      if (res.ok) {
        const created = await res.json();
        setCoaches([created, ...coaches]);
        setShowAddCoach(false);
        setNewCoach({
          name: "",
          email: "",
          password: "",
          phone: "",
          title: "Senior Chess Coach",
          bio: "",
          status: "Active",
        });
      } else {
        const err = await res.json();
        alert(err.error || "Failed to add coach");
      }
    } catch (e) {
      alert("Error adding coach");
    }
  };

  const handleUpdateCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCoach) return;
    try {
      const res = await fetch("/api/coaches", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCoach),
      });
      if (res.ok) {
        const updated = await res.json();
        setCoaches((prev) =>
          prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c))
        );
        setEditingCoach(null);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to update coach");
      }
    } catch (e) {
      alert("Error updating coach");
    }
  };

  const handleDeleteCoach = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete Coach "${name}"? Assigned students will be unassigned.`)) return;
    try {
      const res = await fetch(`/api/coaches?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCoaches((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert("Failed to delete coach");
      }
    } catch (e) {
      alert("Error deleting coach");
    }
  };

  const filteredCoaches = coaches.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            🎓 Coaches & Faculty Management
          </h2>
          <p className="text-xs text-slate-500">
            Create coach credentials, designate titles, and manage assigned student rosters.
          </p>
        </div>
        <button
          onClick={() => setShowAddCoach(true)}
          className="px-5 py-2.5 bg-[#29A3DD] hover:bg-[#1f87b8] text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Coach
        </button>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search coaches by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Coaches Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-black uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Coach Profile</th>
                <th className="p-4">Login Email & Password</th>
                <th className="p-4">Designation / Title</th>
                <th className="p-4">Assigned Students</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-400">
                    Loading coaches directory...
                  </td>
                </tr>
              ) : filteredCoaches.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-400">
                    No coaches registered yet. Click "Add New Coach" above.
                  </td>
                </tr>
              ) : (
                filteredCoaches.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#29A3DD] font-black text-xs flex items-center justify-center border border-sky-200">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-black text-slate-900">{c.name}</div>
                          <div className="text-[10px] text-slate-500 font-semibold">{c.phone || "No phone"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-mono text-slate-800">{c.email}</div>
                      {c.password && (
                        <div className="text-[10px] text-blue-600 font-mono font-bold">Pass: {c.password}</div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-sky-50 text-[#29A3DD] rounded-lg border border-sky-200 font-bold text-[11px]">
                        {c.title || "Chess Coach"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg border border-slate-200 font-black text-[11px] inline-flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-500" />
                        {c._count?.students || 0} students
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">{c.phone || "-"}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md border ${
                        c.status === "Active"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setEditingCoach(c)}
                          className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-200 inline-flex items-center gap-1 text-xs font-bold cursor-pointer"
                          title="Edit Coach"
                        >
                          <Pencil className="w-3.5 h-3.5 text-blue-600" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteCoach(c.id, c.name)}
                          className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-200 inline-flex items-center gap-1 text-xs font-bold cursor-pointer"
                          title="Delete Coach"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: ADD COACH */}
      {showAddCoach && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-4 relative shadow-2xl">
            <button
              onClick={() => setShowAddCoach(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#29A3DD]" /> Add New Coach
            </h3>
            <form onSubmit={handleAddCoach} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Coach Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coach Ramesh Joshi"
                  value={newCoach.name}
                  onChange={(e) => setNewCoach({ ...newCoach, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Login Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="coach@elephantchess.com"
                    value={newCoach.email}
                    onChange={(e) => setNewCoach({ ...newCoach, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Login Password *</label>
                  <input
                    type="text"
                    required
                    placeholder="Set password..."
                    value={newCoach.password}
                    onChange={(e) => setNewCoach({ ...newCoach, password: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Designation / Title</label>
                  <input
                    type="text"
                    placeholder="e.g. FIDE Master / Head Coach"
                    value={newCoach.title}
                    onChange={(e) => setNewCoach({ ...newCoach, title: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={newCoach.phone}
                    onChange={(e) => setNewCoach({ ...newCoach, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-700 font-bold block mb-1">Bio / Profile Notes</label>
                <textarea
                  rows={2}
                  placeholder="Specializations, tournament coaching history, etc."
                  value={newCoach.bio}
                  onChange={(e) => setNewCoach({ ...newCoach, bio: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#29A3DD] hover:bg-[#1f87b8] text-white font-extrabold rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Register Coach
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT COACH */}
      {editingCoach && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-4 relative shadow-2xl">
            <button
              onClick={() => setEditingCoach(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Pencil className="w-5 h-5 text-blue-600" /> Edit Coach Profile
            </h3>
            <form onSubmit={handleUpdateCoach} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Coach Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingCoach.name}
                  onChange={(e) => setEditingCoach({ ...editingCoach, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Login Email *</label>
                  <input
                    type="email"
                    required
                    value={editingCoach.email}
                    onChange={(e) => setEditingCoach({ ...editingCoach, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Password</label>
                  <input
                    type="text"
                    placeholder="Keep current password..."
                    value={editingCoach.password || ""}
                    onChange={(e) => setEditingCoach({ ...editingCoach, password: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Designation / Title</label>
                  <input
                    type="text"
                    value={editingCoach.title || ""}
                    onChange={(e) => setEditingCoach({ ...editingCoach, title: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Status</label>
                  <select
                    value={editingCoach.status || "Active"}
                    onChange={(e) => setEditingCoach({ ...editingCoach, status: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-slate-700 font-bold block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editingCoach.phone || ""}
                  onChange={(e) => setEditingCoach({ ...editingCoach, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
