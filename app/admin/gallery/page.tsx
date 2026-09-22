"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { CloudinaryUpload } from "@/components/CloudinaryUpload";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
}

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [showAddGallery, setShowAddGallery] = useState(false);
  const [newGallery, setNewGallery] = useState({
    title: "",
    category: "Events",
    imageUrl: "",
    description: "",
  });

  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) setGallery(await res.json());
    } catch (e) {
      console.error("Error fetching gallery:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGallery.imageUrl) return alert("Please upload a gallery image first");
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGallery),
      });
      if (res.ok) {
        const created = await res.json();
        setGallery([created, ...gallery]);
        setShowAddGallery(false);
        setNewGallery({
          title: "",
          category: "Events",
          imageUrl: "",
          description: "",
        });
      }
    } catch (e) {
      alert("Failed to save gallery image");
    }
  };
  const handleEditGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery) return;
    if (!editingGallery.imageUrl) return alert("Please upload a gallery image first");
    try {
      const res = await fetch("/api/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingGallery),
      });
      if (res.ok) {
        const updated = await res.json();
        setGallery(gallery.map((g) => (g.id === updated.id ? updated : g)));
        setEditingGallery(null);
      }
    } catch (e) {
      alert("Failed to save gallery changes");
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this gallery item?")) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setGallery(gallery.filter((g) => g.id !== id));
      } else {
        alert("Failed to delete gallery item");
      }
    } catch (e) {
      alert("Error deleting gallery item");
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Academy Photo Gallery</h2>
          <p className="text-xs text-slate-500">Upload photos of training sessions, tournament events, and masterclasses.</p>
        </div>
        <button
          onClick={() => setShowAddGallery(true)}
          className="px-5 py-2.5 bg-[#29A3DD] hover:bg-[#1f87b8] text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Photo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 shadow-xs">
            Loading gallery images...
          </div>
        ) : gallery.length === 0 ? (
          <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 shadow-xs">
            No gallery images uploaded yet.
          </div>
        ) : (
          gallery.map((g) => (
            <div key={g.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 space-y-2 shadow-xs hover:border-[#29A3DD] hover:shadow-md transition-all">
              <div className="relative h-48 bg-slate-100">
                <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3.5 space-y-2">
                <span className="text-[10px] text-amber-600 font-extrabold uppercase tracking-wider">{g.category}</span>
                <h4 className="font-black text-slate-900 text-sm truncate">{g.title}</h4>
                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setEditingGallery(g)}
                    className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all text-xs cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteGallery(g.id)}
                    className="flex-1 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl font-bold transition-all text-xs cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL: ADD GALLERY */}
      {showAddGallery && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-4 relative shadow-2xl">
            <button onClick={() => setShowAddGallery(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 cursor-pointer">✕</button>
            <h3 className="text-lg font-black text-slate-900">Upload Gallery Photo</h3>
            <form onSubmit={handleAddGallery} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Rapid Chess Championship"
                  value={newGallery.title}
                  onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>
              <div>
                <label className="text-slate-700 font-bold block mb-1">Category</label>
                <select
                  value={newGallery.category}
                  onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                >
                  <option value="Events">Events</option>
                  <option value="Training">Training</option>
                  <option value="Tournaments">Tournaments</option>
                  <option value="Facility">Facility</option>
                </select>
              </div>
              <div>
                <label className="text-slate-700 font-bold block mb-1">Description (Optional)</label>
                <input
                  type="text"
                  placeholder="Short caption..."
                  value={newGallery.description}
                  onChange={(e) => setNewGallery({ ...newGallery, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>
              <div>
                <label className="text-slate-700 font-bold block mb-1">Upload Photo *</label>
                <CloudinaryUpload
                  value={newGallery.imageUrl}
                  onChange={(url: string) => setNewGallery({ ...newGallery, imageUrl: url })}
                  onRemove={() => setNewGallery({ ...newGallery, imageUrl: "" })}
                />
                {newGallery.imageUrl && (
                  <p className="text-[11px] text-emerald-600 font-bold mt-1">✓ Photo uploaded successfully</p>
                )}
              </div>
              <button type="submit" className="w-full py-3 bg-[#E11D48] hover:bg-[#c9183e] text-white font-extrabold rounded-xl shadow-md transition-colors cursor-pointer">
                Save to Gallery
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT GALLERY */}
      {editingGallery && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-4 relative shadow-2xl">
            <button onClick={() => setEditingGallery(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 cursor-pointer">✕</button>
            <h3 className="text-lg font-black text-slate-900">Edit Gallery Photo</h3>
            <form onSubmit={handleEditGallery} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Rapid Chess Championship"
                  value={editingGallery.title}
                  onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>
              <div>
                <label className="text-slate-700 font-bold block mb-1">Category</label>
                <select
                  value={editingGallery.category}
                  onChange={(e) => setEditingGallery({ ...editingGallery, category: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                >
                  <option value="Events">Events</option>
                  <option value="Training">Training</option>
                  <option value="Tournaments">Tournaments</option>
                  <option value="Facility">Facility</option>
                </select>
              </div>
              <div>
                <label className="text-slate-700 font-bold block mb-1">Description (Optional)</label>
                <input
                  type="text"
                  placeholder="Short caption..."
                  value={editingGallery.description || ""}
                  onChange={(e) => setEditingGallery({ ...editingGallery, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#29A3DD] focus:bg-white"
                />
              </div>
              <div>
                <label className="text-slate-700 font-bold block mb-1">Upload Photo *</label>
                <CloudinaryUpload
                  value={editingGallery.imageUrl}
                  onChange={(url: string) => setEditingGallery({ ...editingGallery, imageUrl: url })}
                  onRemove={() => setEditingGallery({ ...editingGallery, imageUrl: "" })}
                />
                {editingGallery.imageUrl && (
                  <p className="text-[11px] text-emerald-600 font-bold mt-1">✓ Photo uploaded successfully</p>
                )}
              </div>
              <button type="submit" className="w-full py-3 bg-[#29A3DD] hover:bg-[#1f87b8] text-white font-black rounded-xl shadow-md transition-colors cursor-pointer">
                Update Gallery Item
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
