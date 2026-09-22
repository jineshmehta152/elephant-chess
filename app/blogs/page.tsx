"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SubpageBanner from "@/components/ui/SubpageBanner";
import { DemoBookingCTA } from "@/components/demo-booking-cta";
import {
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  User,
  Tag,
  Search,
  Layers,
} from "lucide-react";

import { blogs as staticBlogs } from "@/lib/blogs-data";

const categories = ["All", "Chess Tips", "Tournament Tips", "Educational", "Mindset", "Academy News"];

const categoryStyles: Record<string, { bg: string; text: string; border: string }> = {
  "Chess Tips":      { bg: "bg-sky-100",    text: "text-[#29A3DD]",  border: "border-sky-300" },
  "Tournament Tips": { bg: "bg-amber-100",  text: "text-amber-800",  border: "border-amber-300" },
  "Educational":     { bg: "bg-emerald-100",text: "text-emerald-800",border: "border-emerald-300" },
  "Mindset":         { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300" },
  "Academy News":    { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300" },
};

function CategoryBadge({ cat, overlay = false }: { cat: string; overlay?: boolean }) {
  if (overlay) {
    return (
      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#FDB813] text-[10px] font-[1000] uppercase tracking-wider border border-white/20 shadow-sm">
        {cat}
      </span>
    );
  }
  const style = categoryStyles[cat] ?? { bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-300" };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-[1000] uppercase tracking-wider border ${style.bg} ${style.text} ${style.border}`}>
      {cat}
    </span>
  );
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>(staticBlogs);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setBlogs(data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center space-y-3 p-8 rounded-3xl border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="w-10 h-10 border-4 border-[#29A3DD] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-950 text-xs font-[1000] uppercase tracking-widest">Loading Insights...</p>
        </div>
      </div>
    );
  }

  const categoryFiltered =
    activeCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === activeCategory);

  const filtered = searchQuery.trim()
    ? categoryFiltered.filter(
        (b) =>
          b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.author?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categoryFiltered;

  const [hero, second, third, ...rest] = filtered;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      {/* ── Subpage Banner ── */}
      <SubpageBanner
        title="Chess"
        highlight="Insights."
        subtitle="Tactical guides, grandmaster analyses, academy news and tournament tips."
        breadcrumbLabel="Blogs"
        bgImage="/inter.jpg"
        widgetLeft1Icon="FileText"
        widgetLeft1Label="Articles"
        widgetLeft1Value="10+ Guides"
        widgetLeft2Icon="Layers"
        widgetLeft2Label="Analysis"
        widgetLeft2Value="GM Breakdowns"
        widgetRightIcon="Sparkles"
        widgetRightLabel="Updates"
        widgetRightValue="Weekly Strategy"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-20">

        {/* ── Section Header & Filter Controls ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border-2 border-black text-[#29A3DD] font-[1000] text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>FROM THE ACADEMY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] tracking-tight text-slate-950 uppercase leading-none">
              LATEST{" "}
              <span className="bg-gradient-to-r from-[#29A3DD] via-sky-500 to-[#FDB813] bg-clip-text text-transparent">
                ARTICLES.
              </span>
            </h2>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles or topics..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-black bg-white text-xs font-bold text-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-[#29A3DD]"
              />
            </div>
          </div>
        </div>

        {/* Category Pill Selector */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12 pb-4 border-b border-slate-200">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-[1000] uppercase tracking-wider transition-all cursor-pointer border-2 border-black ${
                  isActive
                    ? "bg-[#FDB813] text-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5"
                    : "bg-white text-slate-700 hover:bg-slate-100 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24 rounded-3xl border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-slate-400 space-y-3">
            <p className="text-5xl">♟</p>
            <p className="font-[1000] text-base text-slate-800 uppercase">No articles found in this category.</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="px-5 py-2 bg-[#29A3DD] text-white font-[1000] text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* ── TOP SHOWCASE ROW: Large Hero + 2 Stacked Side Cards ── */}
        {hero && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">

            {/* Left Large Hero Card (7 cols) */}
            <Link
              href={`/blogs/${hero.slug}`}
              className="lg:col-span-7 group relative rounded-[2rem] border-[3px] border-black bg-slate-950 overflow-hidden min-h-[460px] flex flex-col justify-end shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(253,184,19,1)] transition-all duration-300"
            >
              <img
                src={hero.image}
                alt={hero.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />

              {/* Top Badges */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
                <CategoryBadge cat={hero.category} overlay />
                <span className="px-3 py-1 rounded-full bg-[#FDB813] text-slate-950 border border-black text-[10px] font-[1000] uppercase tracking-wider shadow-sm">
                  Featured
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-20 p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-3 text-sky-200 text-xs font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {hero.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {hero.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-[1000] text-white uppercase tracking-tight leading-tight group-hover:text-[#FDB813] transition-colors">
                  {hero.title}
                </h2>

                <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed line-clamp-2">
                  {hero.summary}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-white/15">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#FDB813]" />
                    {hero.author}
                  </span>

                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-950 font-[1000] text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_rgba(253,184,19,1)] group-hover:bg-[#FDB813] transition-all">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Right Stacked 2 Cards (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {[second, third].filter(Boolean).map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blogs/${blog.slug}`}
                  className="group rounded-3xl border-[3px] border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 flex gap-4 sm:gap-5 flex-1 items-center"
                >
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-2 border-black overflow-hidden shrink-0 bg-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-col justify-between h-full min-w-0 space-y-2 flex-1">
                    <div className="space-y-1">
                      <CategoryBadge cat={blog.category} />
                      <h3 className="text-sm sm:text-base font-[1000] text-slate-950 uppercase tracking-tight group-hover:text-[#29A3DD] transition-colors leading-snug line-clamp-2 pt-1">
                        {blog.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold pt-1 border-t border-slate-100">
                      <span className="text-slate-400 text-[10px]">{blog.readTime}</span>
                      <span className="text-[#29A3DD] font-[1000] uppercase text-[11px] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        )}

        {/* ── REMAINING ARTICLES GRID: 3-Column Neo-Brutalist Layout ── */}
        {rest.length > 0 && (
          <div className="space-y-8 mt-12">
            <div className="flex items-center gap-3">
              <div className="h-0.5 flex-1 bg-slate-200" />
              <span className="px-3 py-1 rounded-full border border-black bg-black text-white text-[10px] font-[1000] uppercase tracking-widest">
                More Articles & Guides
              </span>
              <div className="h-0.5 flex-1 bg-slate-200" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blogs/${blog.slug}`}
                  className="group rounded-3xl border-[3px] border-black bg-white overflow-hidden shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="relative aspect-[16/10] bg-slate-900 border-b-[3px] border-black overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <CategoryBadge cat={blog.category} overlay />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-2.5">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-[1000] text-slate-950 uppercase tracking-tight group-hover:text-[#29A3DD] transition-colors leading-snug line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-xs font-semibold text-slate-600 leading-relaxed line-clamp-2">
                        {blog.summary}
                      </p>
                    </div>
                  </div>

                  {/* Footer Author & Link */}
                  <div className="p-6 pt-0">
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 truncate max-w-[140px]">
                        ✍️ {blog.author}
                      </span>
                      <span className="text-xs font-[1000] uppercase text-[#29A3DD] group-hover:text-[#0A1128] flex items-center gap-1 transition-colors">
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── Compact Trial Booking CTA ── */}
      <DemoBookingCTA />
    </div>
  );
}