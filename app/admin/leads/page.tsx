"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Pencil,
  Phone,
  MessageCircle,
  Mail,
  UserCheck,
  Calendar,
  Clock,
  Filter,
  RefreshCw,
  Sparkles,
  Award,
  ChevronRight,
  CheckCircle2,
  X,
  BookOpen,
  ArrowRight,
} from "lucide-react";

type LeadStatus = "NEW" | "CONTACTED" | "DEMO_SCHEDULED" | "CONVERTED" | "LOST";

interface Lead {
  id: string;
  name: string;
  age?: string;
  phone: string;
  email?: string;
  level?: string;
  mode?: string;
  status: LeadStatus;
  source?: string;
  notes?: string;
  demoDate?: string;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface Batch {
  id: string;
  name: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [modeFilter, setModeFilter] = useState<string>("ALL");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [convertingLead, setConvertingLead] = useState<Lead | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<string>("");

  // New Lead Form State
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    level: "Beginner",
    mode: "Online",
    status: "NEW" as LeadStatus,
    source: "Manual Entry",
    notes: "",
    demoDate: "",
    followUpDate: "",
  });

  useEffect(() => {
    fetchLeads();
    fetchBatches();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (e) {
      console.error("Error fetching leads:", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchBatches = async () => {
    try {
      const res = await fetch("/api/batches");
      if (res.ok) {
        const data = await res.json();
        setBatches(data);
        if (data.length > 0) setSelectedBatch(data[0].name);
      }
    } catch (e) {
      console.error("Error fetching batches:", e);
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const created = await res.json();
        setLeads([created, ...leads]);
        setShowAddModal(false);
        setFormData({
          name: "",
          age: "",
          phone: "",
          email: "",
          level: "Beginner",
          mode: "Online",
          status: "NEW",
          source: "Manual Entry",
          notes: "",
          demoDate: "",
          followUpDate: "",
        });
      } else {
        const err = await res.json();
        alert(err.error || "Failed to create lead");
      }
    } catch (e) {
      alert("Network error while creating lead");
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
      }
    } catch (e) {
      console.error("Error updating status:", e);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;

    try {
      const res = await fetch("/api/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingLead),
      });
      if (res.ok) {
        const updated = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
        setEditingLead(null);
      }
    } catch (e) {
      alert("Failed to update lead");
    }
  };

  const handleConvertToStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!convertingLead) return;

    try {
      const res = await fetch("/api/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: convertingLead.id,
          name: convertingLead.name,
          age: convertingLead.age,
          phone: convertingLead.phone,
          email: convertingLead.email,
          level: convertingLead.level,
          batch: selectedBatch || "Beginner Morning",
          convertToStudent: true,
          status: "CONVERTED",
        }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) =>
            l.id === convertingLead.id ? { ...l, status: "CONVERTED" } : l
          )
        );
        setConvertingLead(null);
        alert(`🎉 ${convertingLead.name} successfully converted and enrolled as an Active Student!`);
      }
    } catch (e) {
      alert("Failed to convert lead to student");
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === "ALL" || lead.status === statusFilter;
    const matchesMode =
      modeFilter === "ALL" ||
      (lead.mode || "").toLowerCase().includes(modeFilter.toLowerCase());
    const matchesSearch =
      search === "" ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.toLowerCase().includes(search.toLowerCase()) ||
      (lead.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (lead.notes || "").toLowerCase().includes(search.toLowerCase()) ||
      (lead.source || "").toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesMode && matchesSearch;
  });

  // KPI Metrics
  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "NEW").length,
    contacted: leads.filter((l) => l.status === "CONTACTED").length,
    demo: leads.filter((l) => l.status === "DEMO_SCHEDULED").length,
    converted: leads.filter((l) => l.status === "CONVERTED").length,
    lost: leads.filter((l) => l.status === "LOST").length,
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case "NEW":
        return "bg-sky-50 text-[#29A3DD] border-sky-300";
      case "CONTACTED":
        return "bg-amber-50 text-amber-700 border-amber-300";
      case "DEMO_SCHEDULED":
        return "bg-purple-50 text-purple-700 border-purple-300";
      case "CONVERTED":
        return "bg-emerald-50 text-emerald-700 border-emerald-300";
      case "LOST":
        return "bg-rose-50 text-rose-700 border-rose-300";
      default:
        return "bg-slate-50 text-slate-700 border-slate-300";
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* ── Top Header Banner ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#29A3DD] animate-pulse" />
            <h1 className="text-2xl font-black tracking-tight text-slate-950 uppercase">
              🎯 Lead & Enquiry CRM
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-semibold">
            Capture, track, follow up, and convert incoming trial inquiries into enrolled academy students.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition-colors cursor-pointer"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#29A3DD] to-[#FDB813] hover:opacity-95 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Lead</span>
          </button>
        </div>
      </div>

      {/* ── KPI Metric Cards Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {[
          { label: "Total Inquiries", count: stats.total, color: "text-slate-950", border: "border-slate-200", bg: "bg-white", icon: "📊" },
          { label: "New Leads", count: stats.new, color: "text-[#29A3DD]", border: "border-sky-200", bg: "bg-sky-50/70", icon: "⚡" },
          { label: "Contacted", count: stats.contacted, color: "text-amber-700", border: "border-amber-200", bg: "bg-amber-50/70", icon: "📞" },
          { label: "Demo Booked", count: stats.demo, color: "text-purple-700", border: "border-purple-200", bg: "bg-purple-50/70", icon: "📅" },
          { label: "Converted 🎓", count: stats.converted, color: "text-emerald-700", border: "border-emerald-200", bg: "bg-emerald-50/70", icon: "🏆" },
          { label: "Dropped / Lost", count: stats.lost, color: "text-rose-700", border: "border-rose-200", bg: "bg-rose-50/70", icon: "❌" },
        ].map((kpi, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl border ${kpi.border} ${kpi.bg} shadow-xs flex flex-col justify-between space-y-2`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="text-[11px] uppercase tracking-wider">{kpi.label}</span>
              <span>{kpi.icon}</span>
            </div>
            <p className={`text-2xl sm:text-3xl font-black ${kpi.color} leading-none`}>
              {kpi.count}
            </p>
          </div>
        ))}
      </div>

      {/* ── Search, Filters & Views ── */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search name, phone, email, notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#29A3DD] focus:bg-white transition-colors font-medium"
            />
          </div>

          {/* Mode Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-slate-500 font-bold whitespace-nowrap">Mode:</span>
            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#29A3DD] font-semibold cursor-pointer"
            >
              <option value="ALL">All Modes (Online & Offline)</option>
              <option value="Online">Online Batches</option>
              <option value="Offline">Physical Center (Danavai Peta)</option>
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {[
            { id: "ALL", label: "All Leads", count: stats.total },
            { id: "NEW", label: "🆕 New", count: stats.new },
            { id: "CONTACTED", label: "📞 Contacted", count: stats.contacted },
            { id: "DEMO_SCHEDULED", label: "📅 Demo Scheduled", count: stats.demo },
            { id: "CONVERTED", label: "🏆 Converted", count: stats.converted },
            { id: "LOST", label: "❌ Lost", count: stats.lost },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                statusFilter === tab.id
                  ? "bg-[#29A3DD] text-white border-[#29A3DD] font-black shadow-xs"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${statusFilter === tab.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Leads Table / List ── */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-400 space-y-2">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#29A3DD]" />
            <p className="text-xs font-bold uppercase tracking-wider">Loading Leads Data...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <span className="text-5xl">🎯</span>
            <h3 className="text-lg font-black text-slate-950 uppercase">No Leads Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No inquiries match your current search/filter criteria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-extrabold uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-5">Student / Parent</th>
                  <th className="py-4 px-4">Contact Info</th>
                  <th className="py-4 px-4">Skill & Mode</th>
                  <th className="py-4 px-4">Status & Pipeline</th>
                  <th className="py-4 px-4">Demo / Follow-up</th>
                  <th className="py-4 px-4">Notes & Source</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Student & Age */}
                    <td className="py-4 px-5">
                      <div className="space-y-0.5">
                        <p className="font-black text-slate-950 text-sm tracking-tight">{lead.name}</p>
                        <p className="text-slate-500 text-[11px]">
                          {lead.age ? `Age/Grade: ${lead.age}` : "Age not provided"}
                        </p>
                        <span className="text-[10px] text-slate-400">
                          Added: {new Date(lead.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                    </td>

                    {/* Phone & Direct Links */}
                    <td className="py-4 px-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${lead.phone}`}
                            className="font-bold text-slate-900 hover:text-[#29A3DD] transition-colors flex items-center gap-1"
                            title="Call Phone"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#29A3DD]" />
                            <span>{lead.phone}</span>
                          </a>
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(lead.name)},%20greeting%20from%20Elephant%20Chess%20Academy!`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                            title="Instant WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>
                        {lead.email && (
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-[11px] text-slate-500 hover:text-slate-900 flex items-center gap-1 truncate max-w-[160px]"
                            title={lead.email}
                          >
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span className="truncate">{lead.email}</span>
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Skill Level & Mode */}
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 font-bold text-[10px] border border-amber-200 uppercase">
                          {lead.level || "Beginner"}
                        </span>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {lead.mode || "Online"}
                        </p>
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value as LeadStatus)}
                        className={`px-2.5 py-1 rounded-xl text-xs font-black border uppercase tracking-wider focus:outline-none cursor-pointer ${getStatusBadge(lead.status)}`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="DEMO_SCHEDULED">DEMO SCHEDULED</option>
                        <option value="CONVERTED">CONVERTED</option>
                        <option value="LOST">LOST</option>
                      </select>
                    </td>

                    {/* Demo / Follow-up */}
                    <td className="py-4 px-4">
                      <div className="space-y-1 text-[11px]">
                        {lead.demoDate ? (
                          <p className="text-purple-700 font-bold flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-purple-600" />
                            <span>Demo: {new Date(lead.demoDate).toLocaleDateString()}</span>
                          </p>
                        ) : (
                          <p className="text-slate-400 italic">No demo set</p>
                        )}
                        {lead.followUpDate && (
                          <p className="text-amber-700 font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>Follow: {new Date(lead.followUpDate).toLocaleDateString()}</span>
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Notes & Source */}
                    <td className="py-4 px-4">
                      <div className="max-w-[200px] space-y-1">
                        <p className="text-slate-700 text-[11px] truncate" title={lead.notes || "No notes"}>
                          {lead.notes || <span className="text-slate-400 italic">No notes</span>}
                        </p>
                        <span className="text-[10px] text-slate-400 block truncate">
                          Via: {lead.source || "Website"}
                        </span>
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {lead.status !== "CONVERTED" && (
                          <button
                            onClick={() => setConvertingLead(lead)}
                            className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] rounded-lg border border-emerald-300 transition-colors flex items-center gap-1 cursor-pointer"
                            title="Enroll as Academy Student"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Enroll</span>
                          </button>
                        )}

                        <button
                          onClick={() => setEditingLead(lead)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                          title="Edit Lead Details"
                        >
                          <Pencil className="w-3.5 h-3.5" />
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

      {/* ── Modal: Add New Lead ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="space-y-0.5">
                <h3 className="text-xl font-black text-white uppercase">Add New Lead</h3>
                <p className="text-xs text-slate-400 font-medium">Record a walk-in, phone, or manual chess enquiry.</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Siddharth Rao"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Age / Grade</label>
                  <input
                    type="text"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="e.g. 10 Years / Grade 5"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Parent Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Parent Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="parent@example.com"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Skill Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                  >
                    <option value="Beginner">Beginner (Rules & Fundamentals)</option>
                    <option value="Casual">Casual / Intermediate (Tactics)</option>
                    <option value="Advanced">Advanced (FIDE Tournament Prep)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Preferred Mode</label>
                  <select
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                  >
                    <option value="Online">Live Online Interactive</option>
                    <option value="Offline Center">Physical Center (Danavai Peta)</option>
                    <option value="1-on-1 Mentorship">1-on-1 Private Mentorship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Initial Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatus })}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="DEMO_SCHEDULED">DEMO SCHEDULED</option>
                    <option value="CONVERTED">CONVERTED</option>
                    <option value="LOST">LOST</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Enquiry Source</label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    placeholder="e.g. Phone Call, Walk-in, Referral"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Demo Class Date</label>
                  <input
                    type="datetime-local"
                    value={formData.demoDate}
                    onChange={(e) => setFormData({ ...formData, demoDate: e.target.value })}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Follow-up Reminder Date</label>
                  <input
                    type="date"
                    value={formData.followUpDate}
                    onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Notes / Coaching History</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Parent requested weekend batch, student knows openings..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#29A3DD] to-[#FDB813] text-slate-950 font-black rounded-xl shadow-lg hover:opacity-95 transition-all cursor-pointer"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Edit Lead ── */}
      {editingLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="space-y-0.5">
                <h3 className="text-xl font-black text-white uppercase">Edit Lead Details</h3>
                <p className="text-xs text-slate-400 font-medium">Update status, demo appointment, or notes.</p>
              </div>
              <button
                onClick={() => setEditingLead(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingLead.name}
                    onChange={(e) => setEditingLead({ ...editingLead, name: e.target.value })}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Age / Grade</label>
                  <input
                    type="text"
                    value={editingLead.age || ""}
                    onChange={(e) => setEditingLead({ ...editingLead, age: e.target.value })}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Parent Phone *</label>
                  <input
                    type="tel"
                    required
                    value={editingLead.phone}
                    onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Parent Email</label>
                  <input
                    type="email"
                    value={editingLead.email || ""}
                    onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Status</label>
                  <select
                    value={editingLead.status}
                    onChange={(e) => setEditingLead({ ...editingLead, status: e.target.value as LeadStatus })}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="DEMO_SCHEDULED">DEMO SCHEDULED</option>
                    <option value="CONVERTED">CONVERTED</option>
                    <option value="LOST">LOST</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Skill Level</label>
                  <input
                    type="text"
                    value={editingLead.level || ""}
                    onChange={(e) => setEditingLead({ ...editingLead, level: e.target.value })}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Demo Class Date</label>
                  <input
                    type="datetime-local"
                    value={editingLead.demoDate ? new Date(editingLead.demoDate).toISOString().slice(0, 16) : ""}
                    onChange={(e) => setEditingLead({ ...editingLead, demoDate: e.target.value })}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Follow-up Date</label>
                  <input
                    type="date"
                    value={editingLead.followUpDate ? new Date(editingLead.followUpDate).toISOString().slice(0, 10) : ""}
                    onChange={(e) => setEditingLead({ ...editingLead, followUpDate: e.target.value })}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Notes & Follow-up Log</label>
                <textarea
                  rows={3}
                  value={editingLead.notes || ""}
                  onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#29A3DD] font-semibold"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingLead(null)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#29A3DD] hover:bg-sky-400 text-slate-950 font-black rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Convert Lead to Enrolled Student ── */}
      {convertingLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎓</span>
                  <h3 className="text-xl font-black text-white uppercase">Enroll as Student</h3>
                </div>
                <p className="text-xs text-slate-400">
                  Convert lead <strong className="text-white">{convertingLead.name}</strong> into an active student record.
                </p>
              </div>
              <button
                onClick={() => setConvertingLead(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConvertToStudent} className="space-y-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Student Name:</span>
                  <span className="font-bold text-white">{convertingLead.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Parent Phone:</span>
                  <span className="font-bold text-slate-200">{convertingLead.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Skill Level:</span>
                  <span className="font-bold text-[#FDB813]">{convertingLead.level || "Beginner"}</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">Assign Academy Batch *</label>
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-semibold"
                >
                  {batches.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                  {batches.length === 0 && (
                    <option value="Beginner Morning">Beginner Morning</option>
                  )}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setConvertingLead(null)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Confirm Enrollment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
