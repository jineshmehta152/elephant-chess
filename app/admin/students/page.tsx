"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Trash2, Pencil } from "lucide-react";

interface Student {
  id: string;
  name: string;
  age: number;
  email?: string;
  password?: string;
  phone?: string;
  batch: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  rating: number;
  status: string;
  allowAllCourses?: boolean;
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

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [batches, setBatches] = useState<{ id: string; name: string }[]>([]);
  const [folders, setFolders] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [studentSearch, setStudentSearch] = useState("");

  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "10",
    email: "",
    password: "",
    phone: "",
    batch: "Auto",
    level: "BEGINNER" as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
    rating: "1200",
    allowAllCourses: false,
  });

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const [resS, resB, resF] = await Promise.all([
        fetch("/api/students"),
        fetch("/api/batches"),
        fetch("/api/puzzles/folders"),
      ]);
      if (resS.ok) setStudents(await resS.json());
      if (resB.ok) setBatches(await resB.json());
      if (resF.ok) setFolders(await resF.json());
    } catch (e) {
      console.error("Error fetching students:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });
      if (res.ok) {
        const created = await res.json();
        setStudents([created, ...students]);
        setShowAddStudent(false);
        setNewStudent({
          name: "",
          age: "10",
          email: "",
          password: "",
          phone: "",
          batch: "Auto",
          level: "BEGINNER",
          rating: "1200",
          allowAllCourses: false,
        });
      }
    } catch (e) {
      alert("Failed to add student");
    }
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    try {
      const res = await fetch("/api/students", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingStudent),
      });
      if (res.ok) {
        const updated = await res.json();
        setStudents((prev) =>
          prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s))
        );
        setEditingStudent(null);
      } else {
        alert("Failed to update student");
      }
    } catch (e) {
      alert("Error updating student");
    }
  };

  const handleDeleteStudent = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete student "${name}"?`)) return;
    try {
      const res = await fetch(`/api/students?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setStudents((prev) => prev.filter((s) => s.id !== id));
      } else {
        alert("Failed to delete student");
      }
    } catch (e) {
      alert("Error deleting student");
    }
  };

  const filteredStudents = students.filter(
    (s) => s.name.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Student Directory & Registration</h2>
          <p className="text-xs text-slate-500">View, edit login credentials, or manage enrolled academy students.</p>
        </div>
        <button
          onClick={() => setShowAddStudent(true)}
          className="px-5 py-2.5 bg-[#29A3DD] hover:bg-[#1f87b8] text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Student
        </button>
      </div>

      <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search students by name..."
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-black uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Login Email & Password</th>
                <th className="p-4">Age</th>
                <th className="p-4">Points</th>
                <th className="p-4">Bypass Locks</th>
                <th className="p-4">Phone</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-400">
                    Loading student directory...
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-400">
                    No students registered yet.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-black text-slate-900">{s.name}</div>
                      <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                        {s.batch && ["Bronze League", "Silver League", "Gold League", "Platinum League", "Diamond League", "Titan League", "Ace League", "Master League"].includes(s.batch)
                          ? `⭐ ${s.batch}`
                          : `⚙️ Auto League`}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-mono text-slate-800">{s.email || "-"}</div>
                      {s.password && (
                        <div className="text-[10px] text-blue-600 font-mono font-bold">Pass: {s.password}</div>
                      )}
                    </td>
                    <td className="p-4 font-semibold">{s.age} yrs</td>
                    <td className="p-4 font-black text-amber-600">{s.rating}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md border ${
                        s.allowAllCourses
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}>
                        {s.allowAllCourses ? "Bypassed" : "Locked"}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{s.phone || "-"}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setEditingStudent(s)}
                          className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-200 inline-flex items-center gap-1 text-xs font-bold cursor-pointer"
                          title="Edit Student"
                        >
                          <Pencil className="w-3.5 h-3.5 text-blue-600" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteStudent(s.id, s.name)}
                          className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-200 inline-flex items-center gap-1 text-xs font-bold cursor-pointer"
                          title="Delete Student"
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

      {/* MODAL: ADD STUDENT */}
      {showAddStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-4 relative shadow-2xl">
            <button onClick={() => setShowAddStudent(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 cursor-pointer">✕</button>
            <h3 className="text-lg font-black text-slate-900">Add New Student</h3>
            <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Login Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="student@gmail.com"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Login Password *</label>
                  <input
                    type="text"
                    required
                    placeholder="Set password..."
                    value={newStudent.password}
                    onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Age</label>
                  <input
                    type="number"
                    value={newStudent.age}
                    onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Starting Points</label>
                  <input
                    type="number"
                    value={newStudent.rating}
                    onChange={(e) => setNewStudent({ ...newStudent, rating: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="add-student-bypass"
                  checked={newStudent.allowAllCourses}
                  onChange={(e) => setNewStudent({ ...newStudent, allowAllCourses: e.target.checked })}
                  className="rounded bg-slate-50 border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <label htmlFor="add-student-bypass" className="text-slate-700 font-semibold block cursor-pointer">
                  Allow Access to All Courses (Bypass Locks)
                </label>
              </div>
              <div>
                <label className="text-slate-700 font-bold block mb-1">League (Manual Override)</label>
                <select
                  value={newStudent.batch}
                  onChange={(e) => setNewStudent({ ...newStudent, batch: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                >
                  <option value="Auto">Auto (Based on completed courses)</option>
                  <option value="Bronze League">🥉 Bronze League</option>
                  <option value="Silver League">🥈 Silver League</option>
                  <option value="Gold League">🥇 Gold League</option>
                  <option value="Platinum League">💎 Platinum League</option>
                  <option value="Diamond League">👑 Diamond League</option>
                  <option value="Titan League">🔥 Titan League</option>
                  <option value="Ace League">⚡ Ace League</option>
                  <option value="Master League">🏆 Master League</option>
                </select>
              </div>
              <div>
                <label className="text-slate-700 font-bold block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-[#E11D48] hover:bg-[#c9183e] text-white font-extrabold rounded-xl shadow-md transition-colors cursor-pointer">
                Register Student
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT STUDENT */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full relative shadow-2xl flex flex-col max-h-[90vh]">
            <button onClick={() => setEditingStudent(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 z-10 text-sm font-bold bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">✕</button>
            <h3 className="text-lg font-black text-slate-900 mb-4">Edit Student Profile</h3>
            <form onSubmit={handleUpdateStudent} className="space-y-4 text-xs overflow-y-auto pr-2 custom-scrollbar flex-1">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Login Email Address *</label>
                  <input
                    type="email"
                    required
                    value={editingStudent.email || ""}
                    onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Login Password (Leave empty to keep current)</label>
                  <input
                    type="text"
                    placeholder="Keep current password..."
                    value={editingStudent.password || ""}
                    onChange={(e) => setEditingStudent({ ...editingStudent, password: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Age</label>
                  <input
                    type="number"
                    value={editingStudent.age}
                    onChange={(e) => setEditingStudent({ ...editingStudent, age: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Points</label>
                  <input
                    type="number"
                    value={editingStudent.rating}
                    onChange={(e) => setEditingStudent({ ...editingStudent, rating: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="edit-student-bypass"
                  checked={editingStudent.allowAllCourses || false}
                  onChange={(e) => setEditingStudent({ ...editingStudent, allowAllCourses: e.target.checked })}
                  className="rounded bg-slate-50 border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <label htmlFor="edit-student-bypass" className="text-slate-700 font-semibold block cursor-pointer">
                  Allow Access to All Courses (Bypass Locks)
                </label>
              </div>
              <div>
                <label className="text-slate-700 font-bold block mb-1">League (Manual Override)</label>
                <select
                  value={editingStudent.batch || "Auto"}
                  onChange={(e) => setEditingStudent({ ...editingStudent, batch: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                >
                  <option value="Auto">Auto (Based on completed courses)</option>
                  <option value="Bronze League">🥉 Bronze League</option>
                  <option value="Silver League">🥈 Silver League</option>
                  <option value="Gold League">🥇 Gold League</option>
                  <option value="Platinum League">💎 Platinum League</option>
                  <option value="Diamond League">👑 Diamond League</option>
                  <option value="Titan League">🔥 Titan League</option>
                  <option value="Ace League">⚡ Ace League</option>
                  <option value="Master League">🏆 Master League</option>
                </select>
              </div>
              <div>
                <label className="text-slate-700 font-bold block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editingStudent.phone || ""}
                  onChange={(e) => setEditingStudent({ ...editingStudent, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>
              <div className="border-t border-slate-200 pt-4 mt-4 space-y-3">
                <h4 className="text-sm font-black text-slate-900">Custom Course Path & Ordering</h4>
                <p className="text-[10px] text-slate-500">Add courses in the order you want this student to complete them. If left empty, they will see all default academy courses.</p>
                
                {/* Custom Courses List */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {(editingStudent.customCourses || []).map((cc, idx) => (
                    <div key={cc.folderId || idx} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-200 text-[11px]">
                      <span className="text-slate-900 truncate font-bold flex-1">
                        {idx + 1}. {cc.folder?.name || folders.find(f => f.id === cc.folderId)?.name || "Unknown Course"}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => {
                            const list = [...(editingStudent.customCourses || [])];
                            const temp = list[idx];
                            list[idx] = list[idx - 1];
                            list[idx - 1] = temp;
                            const updated = list.map((item, i) => ({ ...item, order: i }));
                            setEditingStudent({ ...editingStudent, customCourses: updated });
                          }}
                          className="px-1.5 py-0.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="Move Up"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          disabled={idx === (editingStudent.customCourses || []).length - 1}
                          onClick={() => {
                            const list = [...(editingStudent.customCourses || [])];
                            const temp = list[idx];
                            list[idx] = list[idx + 1];
                            list[idx + 1] = temp;
                            const updated = list.map((item, i) => ({ ...item, order: i }));
                            setEditingStudent({ ...editingStudent, customCourses: updated });
                          }}
                          className="px-1.5 py-0.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="Move Down"
                        >
                          ▼
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const list = (editingStudent.customCourses || []).filter((_, i) => i !== idx);
                            const updated = list.map((item, i) => ({ ...item, order: i }));
                            setEditingStudent({ ...editingStudent, customCourses: updated });
                          }}
                          className="px-1.5 py-0.5 bg-rose-50 text-rose-600 border border-rose-200 rounded hover:bg-rose-100 cursor-pointer"
                          title="Remove Course"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add new Course Dropdown */}
                <div className="flex gap-2">
                  <select
                    id="add-custom-course-select"
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none text-[11px]"
                  >
                    <option value="">-- Add Course to Path --</option>
                    {folders
                      .filter(f => !(editingStudent.customCourses || []).some(cc => cc.folderId === f.id))
                      .map((f) => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      const select = document.getElementById("add-custom-course-select") as HTMLSelectElement;
                      const folderId = select?.value;
                      if (!folderId) return;
                      const folderObj = folders.find(f => f.id === folderId);
                      const currentList = editingStudent.customCourses || [];
                      const newItem = {
                        id: "",
                        studentId: editingStudent.id,
                        folderId,
                        order: currentList.length,
                        folder: {
                          id: folderId,
                          name: folderObj?.name || ""
                        }
                      };
                      setEditingStudent({
                        ...editingStudent,
                        customCourses: [...currentList, newItem]
                      });
                      select.value = "";
                    }}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors text-[11px] cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              <button type="submit" className="w-full py-3 bg-[#29A3DD] hover:bg-[#1f87b8] text-white font-black rounded-xl shadow-md transition-colors cursor-pointer">
                Save Changes
              </button>

              <div className="border-t border-slate-200 pt-4 mt-4 space-y-3">
                <h4 className="text-sm font-black text-slate-900">Reset Course Progress</h4>
                <p className="text-[10px] text-slate-500">If a student gets stuck or it is impossible to reach 70% points, you can reset their progress for a specific course.</p>
                <div className="flex gap-2">
                  <select
                    id="reset-course-select"
                    className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none text-[11px]"
                  >
                    <option value="">-- Select Course --</option>
                    {folders.map((f) => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={async () => {
                      const select = document.getElementById("reset-course-select") as HTMLSelectElement;
                      const folderId = select?.value;
                      if (!folderId) {
                        alert("Please select a course to reset");
                        return;
                      }
                      if (!confirm("Are you sure you want to reset progress for this course? This will clear all solutions and attempts in this course for this student.")) {
                        return;
                      }
                      try {
                        const res = await fetch("/api/students/reset-course", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ studentId: editingStudent.id, folderId }),
                        });
                        if (res.ok) {
                          alert("Course progress reset successfully!");
                          setEditingStudent(null);
                          fetchStudents();
                        } else {
                          alert("Failed to reset course progress");
                        }
                      } catch (err) {
                        console.error(err);
                        alert("Error resetting progress");
                      }
                    }}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-colors text-[11px] cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
