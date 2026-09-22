"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  Puzzle as PuzzleIcon, 
  Trophy, 
  Image as ImageIcon, 
  CalendarCheck, 
  ArrowRight,
  TrendingUp,
  Layers,
  BookOpen
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  age: number;
  batch: string;
  level: string;
  rating: number;
}

interface Puzzle {
  id: string;
  title: string;
  level: string;
}

interface Achievement {
  id: string;
  title: string;
}

interface GalleryItem {
  id: string;
  title: string;
}

export default function AdminOverviewDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resLeads, resStu, resPuz, resAch, resGal, resBlog] = await Promise.all([
        fetch("/api/leads"),
        fetch("/api/students"),
        fetch("/api/puzzles"),
        fetch("/api/achievements"),
        fetch("/api/gallery"),
        fetch("/api/blogs"),
      ]);

      if (resLeads.ok) setLeads(await resLeads.json());
      if (resStu.ok) setStudents(await resStu.json());
      if (resPuz.ok) setPuzzles(await resPuz.json());
      if (resAch.ok) setAchievements(await resAch.json());
      if (resGal.ok) setGallery(await resGal.json());
      if (resBlog.ok) setBlogs(await resBlog.json());
    } catch (e) {
      console.error("Error fetching overview data:", e);
    } finally {
      setLoading(false);
    }
  };

  const newLeadsCount = leads.filter((l) => l.status === "NEW").length;

  return (
    <div className="space-y-8 font-sans">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
        <Link href="/admin/leads" className="bg-gradient-to-br from-sky-50 to-white p-5 rounded-2xl border-2 border-sky-200 hover:border-[#29A3DD] transition-all space-y-1.5 shadow-xs hover:shadow-md group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#29A3DD] font-black uppercase tracking-wider">Leads & Enquiries</span>
            {newLeadsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#29A3DD] text-white font-black text-[10px] animate-pulse">
                {newLeadsCount} New
              </span>
            )}
          </div>
          <p className="text-3xl font-black text-slate-950">{leads.length}</p>
          <p className="text-[11px] text-[#29A3DD] font-bold flex items-center gap-1 group-hover:underline">
            Manage CRM & Demos →
          </p>
        </Link>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Total Students</span>
          <p className="text-3xl font-black text-slate-950">{students.length}</p>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Active Enrolled
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Tactical Puzzles</span>
          <p className="text-3xl font-black text-slate-950">{puzzles.length}</p>
          <p className="text-[11px] text-sky-600 font-semibold">3 Difficulty Tiers</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Hall of Fame</span>
          <p className="text-3xl font-black text-slate-950">{achievements.length}</p>
          <p className="text-[11px] text-amber-600 font-semibold">Tournament Trophies</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Gallery Photos</span>
          <p className="text-3xl font-black text-slate-950">{gallery.length}</p>
          <p className="text-[11px] text-purple-600 font-semibold">Events & Media</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Blogs & News</span>
          <p className="text-3xl font-black text-slate-950">{blogs.length}</p>
          <p className="text-[11px] text-rose-600 font-semibold">Published Articles</p>
        </div>
      </div>

      {/* Navigation Quick Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">Management Sections</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/leads"
            className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-[#29A3DD] transition-all space-y-4 shadow-xs hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-sky-50 rounded-2xl text-[#29A3DD] border border-sky-100">
                <span className="text-xl">🎯</span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#29A3DD] group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h4 className="font-black text-slate-950 text-base uppercase tracking-tight">Leads & Enquiry CRM</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                Track parent contact requests, free demo class schedules, follow-up logs, and convert leads to students.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/students"
            className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-[#29A3DD] transition-all space-y-4 shadow-xs hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 border border-blue-100">
                <Users className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h4 className="font-black text-slate-950 text-base uppercase tracking-tight">Students Roster & Logins</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                Add new students, set login emails and passwords, and manage active student directory.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/puzzles"
            className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-rose-400 transition-all space-y-4 shadow-xs hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-rose-50 rounded-2xl text-rose-600 border border-rose-100">
                <PuzzleIcon className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h4 className="font-black text-slate-950 text-base uppercase tracking-tight">Puzzle Arena & PGN</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                Upload chess PGN notation puzzles categorized by Beginner, Intermediate, and Advanced tiers.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/attendance"
            className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-emerald-400 transition-all space-y-4 shadow-xs hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 border border-emerald-100">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h4 className="font-black text-slate-950 text-base uppercase tracking-tight">Daily Attendance</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                Track and mark daily attendance records (Present / Absent / Late) for all enrolled batches.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/achievements"
            className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-amber-400 transition-all space-y-4 shadow-xs hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-amber-50 rounded-2xl text-amber-600 border border-amber-100">
                <Trophy className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h4 className="font-black text-slate-950 text-base uppercase tracking-tight">Hall of Fame Achievements</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                Highlight student tournament champions, state titles, and grandmaster trophies.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/gallery"
            className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-purple-400 transition-all space-y-4 shadow-xs hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-purple-50 rounded-2xl text-purple-600 border border-purple-100">
                <ImageIcon className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h4 className="font-black text-slate-950 text-base uppercase tracking-tight">Gallery Media Management</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                Upload and categorize high-resolution photos of classroom tactics and tournament awards.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/blogs"
            className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-rose-400 transition-all space-y-4 shadow-xs hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-rose-50 rounded-2xl text-rose-600 border border-rose-100">
                <BookOpen className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h4 className="font-black text-slate-950 text-base uppercase tracking-tight">Chess Articles & Blogs</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                Create and publish tactical articles, grandmaster tips, and tournament news.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
