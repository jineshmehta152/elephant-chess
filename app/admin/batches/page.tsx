"use client";

import React, { useState, useEffect } from "react";
import { Plus, Users, Clock, Calendar, Trash2, Layers } from "lucide-react";

interface Batch {
  id: string;
  name: string;
  timing?: string;
  days?: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
}

interface Student {
  id: string;
  batch: string;
}

export default function AdminBatchesPage() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const [showAddBatch, setShowAddBatch] = useState(false);
  const [newBatch, setNewBatch] = useState({
    name: "",
    timing: "",
    days: "",
    level: "BEGINNER" as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
  });

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const [resB, resS] = await Promise.all([
        fetch("/api/batches"),
        fetch("/api/students"),
      ]);

      if (resB.ok) setBatches(await resB.json());
      if (resS.ok) setStudents(await resS.json());
    } catch (e) {
      console.error("Error fetching batches:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBatch),
      });
      if (res.ok) {
        const created = await res.json();
        setBatches([created, ...batches]);
        setShowAddBatch(false);
        setNewBatch({
          name: "",
          timing: "",
          days: "",
          level: "BEGINNER",
        });
      }
    } catch (e) {
      alert("Failed to create batch");
    }
  };

  const handleDeleteBatch = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete batch "${name}"?`)) return;
    try {
      const res = await fetch(`/api/batches?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBatches((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert("Failed to delete batch");
      }
    } catch (e) {
      alert("Error deleting batch");
    }
  };

  // Count enrolled students per batch
  const getStudentCount = (batchName: string) => {
    return students.filter((s) => (s.batch || "").toLowerCase() === batchName.toLowerCase()).length;
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#29A3DD]" /> Batch Management
          </h2>
          <p className="text-xs text-slate-500">Create, schedule, and organize academy training batches.</p>
        </div>
        <button
          onClick={() => setShowAddBatch(true)}
          className="px-5 py-2.5 bg-[#29A3DD] hover:bg-[#1f87b8] text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create New Batch
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 shadow-xs">
            Loading academy batches...
          </div>
        ) : batches.length === 0 ? (
          <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 shadow-xs">
            No batches created yet. Click "Create New Batch" to add one.
          </div>
        ) : (
          batches.map((b) => {
            const count = getStudentCount(b.name);
            return (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4 relative flex flex-col justify-between hover:border-[#29A3DD] hover:shadow-md transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                        b.level === "BEGINNER"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : b.level === "INTERMEDIATE"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-purple-50 text-purple-700 border border-purple-200"
                      }`}
                    >
                      {b.level}
                    </span>

                    <button
                      onClick={() => handleDeleteBatch(b.id, b.name)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                      title="Delete Batch"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-black text-slate-900 text-lg leading-snug">{b.name}</h3>

                  <div className="mt-4 space-y-2 text-xs text-slate-600">
                    {b.timing && (
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock className="w-4 h-4 text-[#29A3DD]" />
                        <span className="font-medium text-slate-700">{b.timing}</span>
                      </div>
                    )}
                    {b.days && (
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar className="w-4 h-4 text-amber-600" />
                        <span className="font-medium text-slate-700">{b.days}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-slate-500">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-slate-900">{count} Enrolled Students</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL: CREATE BATCH */}
      {showAddBatch && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-4 relative shadow-2xl">
            <button
              onClick={() => setShowAddBatch(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-lg font-black text-slate-900">Create New Batch</h3>
            <form onSubmit={handleCreateBatch} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Batch Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Masterclass Morning Alpha"
                  value={newBatch.name}
                  onChange={(e) => setNewBatch({ ...newBatch, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Schedule Days</label>
                <input
                  type="text"
                  placeholder="e.g. Mon, Wed, Fri or Weekends"
                  value={newBatch.days}
                  onChange={(e) => setNewBatch({ ...newBatch, days: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Timing Slot</label>
                <input
                  type="text"
                  placeholder="e.g. 05:00 PM - 06:30 PM"
                  value={newBatch.timing}
                  onChange={(e) => setNewBatch({ ...newBatch, timing: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Target Skill Tier</label>
                <select
                  value={newBatch.level}
                  onChange={(e: any) => setNewBatch({ ...newBatch, level: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                >
                  <option value="BEGINNER">BEGINNER</option>
                  <option value="INTERMEDIATE">INTERMEDIATE</option>
                  <option value="ADVANCED">ADVANCED</option>
                </select>
              </div>

              <button type="submit" className="w-full py-3 bg-[#E11D48] hover:bg-[#c9183e] text-white font-extrabold rounded-xl shadow-md transition-colors cursor-pointer">
                Create Batch
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
