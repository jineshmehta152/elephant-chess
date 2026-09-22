"use client";
import React, { useState, useEffect } from "react";
import SubpageBanner from "@/components/ui/SubpageBanner";
import { DemoBookingCTA } from "@/components/demo-booking-cta";
import { useBookDemoModal } from "@/components/ui/BookDemoModal";
import {
  Sparkles,
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Brain,
  Calendar,
  Heart,
  Image as ImageIcon,
} from "lucide-react";

type Category = "all" | "events" | "training" | "wins" | "family";

interface GalleryItem {
  src: string;
  category: Category;
  caption?: string;
}

const fallbackGalleryItems: GalleryItem[] = [
  { src: "/about-academy-classroom.jpg", category: "training", caption: "Tactical Diagnostics with Master Coach" },
  { src: "/about-chess-match.jpg",     category: "events",   caption: "FIDE Standard Clock Tournament Matchplay" },
  { src: "/hero.jpg",              category: "family",   caption: "Elephant Chess Academy Community" },
  { src: "/hero1.png",             category: "training", caption: "Interactive Tactical Analysis Session" },
  { src: "/anshul-bangad.jpg",     category: "wins",     caption: "Coach Anshul Bangad & Champions" },
];

const tabs: { id: Category; label: string; icon: string; countBadge?: string }[] = [
  { id: "all",      label: "All Moments",       icon: "✨" },
  { id: "wins",     label: "Trophies & Wins",   icon: "🏆" },
  { id: "training", label: "Training & Arenas", icon: "🧠" },
  { id: "events",   label: "Tournaments",       icon: "🎪" },
  { id: "family",   label: "Academy Life",      icon: "💛" },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [dynamicItems, setDynamicItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mapped: GalleryItem[] = data.map((item: any) => {
            const cat = (item.category || "events").toLowerCase();
            const validCategory: Category = ["events", "training", "wins", "family"].includes(cat)
              ? (cat as Category)
              : "events";
            return {
              src: item.imageUrl,
              category: validCategory,
              caption: item.caption || item.title || "Elephant Chess Moment",
            };
          });
          setDynamicItems(mapped);
        }
      })
      .catch((err) => console.error("Error loading dynamic gallery items:", err));
  }, []);

  const galleryItems = [...dynamicItems, ...fallbackGalleryItems];

  const filtered =
    activeTab === "all"
      ? galleryItems
      : galleryItems.filter((i) => i.category === activeTab);

  const openLightboxAt = (src: string) => {
    const idx = filtered.findIndex((item) => item.src === src);
    setLightboxIndex(idx !== -1 ? idx : 0);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filtered.length - 1));
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! < filtered.length - 1 ? prev! + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      {/* ── Subpage Banner ── */}
      <SubpageBanner
        title="Academy"
        highlight="Moments."
        subtitle="Glimpses of offline arenas, tournament halls, and trophy celebrations."
        breadcrumbLabel="Gallery"
        bgImage="/blog3.jpeg"
        widgetLeft1Icon="Image"
        widgetLeft1Label="Media Vault"
        widgetLeft1Value="200+ Captures"
        widgetLeft2Icon="MapPin"
        widgetLeft2Label="Venues"
        widgetLeft2Value="State & National"
        widgetRightIcon="Trophy"
        widgetRightLabel="Milestones"
        widgetRightValue="500+ Trophies"
      />

      {/* ── Gallery Section ── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative overflow-hidden">
        {/* Subtle Ambient Glowing Lights */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#29A3DD]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#FDB813]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border-2 border-black text-[#29A3DD] font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Camera className="w-3.5 h-3.5" />
            <span>ACADEMY PHOTO ALBUM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] text-slate-950 uppercase tracking-tight leading-tight">
            CAPTURE THE{" "}
            <span className="bg-gradient-to-r from-[#29A3DD] via-sky-500 to-[#FDB813] bg-clip-text text-transparent">
              MOMENTS.
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-semibold max-w-2xl mx-auto">
            From first tactical breakthroughs in live classrooms to standing tall on national tournament podiums.
          </p>
        </div>

        {/* ── Filter Tabs (Neo-Brutalist Pill Selector) ── */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-14">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl text-xs font-[1000] uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border-[2.5px] border-black ${
                  isActive
                    ? "bg-[#FDB813] text-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5"
                    : "bg-white text-slate-700 hover:bg-slate-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Masonry Image Grid ── */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filtered.map((item, idx) => (
            <div
              key={`${item.src}-${idx}`}
              className="break-inside-avoid rounded-3xl border-[3px] border-black bg-white overflow-hidden shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 group relative cursor-pointer"
              onClick={() => openLightboxAt(item.src)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-slate-900 aspect-auto">
                <img
                  src={item.src}
                  alt={item.caption || "Elephant Chess Academy"}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 block"
                  loading="lazy"
                />

                {/* Dark Hover Overlay with Zoom Icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                  {/* Category Pill Top-Right */}
                  <div className="flex justify-end">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[#FDB813] font-[1000] text-[10px] uppercase tracking-widest shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Bottom Caption & Action */}
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-[1000] text-white leading-snug">
                      {item.caption || "Chess Academy Moment"}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-sky-300 uppercase tracking-wider">
                      <Maximize2 className="w-3 h-3" />
                      <span>Click to view full photo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-28 text-slate-400 gap-4 rounded-3xl border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-6xl">♟</span>
            <p className="text-base font-black text-slate-800 uppercase">
              No photos found in this category.
            </p>
            <button
              onClick={() => setActiveTab("all")}
              className="px-5 py-2 rounded-xl bg-[#29A3DD] text-white font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            >
              View All Photos
            </button>
          </div>
        )}
      </section>

      {/* ── Compact Free Trial CTA Banner ── */}
      <DemoBookingCTA />

      {/* ── Fullscreen Interactive Lightbox Pop-up ── */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-50 w-11 h-11 rounded-2xl bg-white/10 hover:bg-[#FDB813] hover:text-slate-950 text-white flex items-center justify-center text-lg font-black transition-all border border-white/20 cursor-pointer shadow-lg"
            aria-label="Close"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={showPrev}
            className="absolute left-4 sm:left-8 z-50 w-12 h-12 rounded-2xl bg-white/10 hover:bg-[#29A3DD] text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer shadow-lg hover:scale-110 active:scale-95"
            aria-label="Previous"
          >
            <ChevronLeft className="w-7 h-7 stroke-[2.5]" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={showNext}
            className="absolute right-4 sm:right-8 z-50 w-12 h-12 rounded-2xl bg-white/10 hover:bg-[#29A3DD] text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer shadow-lg hover:scale-110 active:scale-95"
            aria-label="Next"
          >
            <ChevronRight className="w-7 h-7 stroke-[2.5]" />
          </button>

          {/* Active Image Modal */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center z-40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-3xl border-[3px] border-black bg-slate-900 overflow-hidden shadow-[8px_8px_0px_0px_rgba(253,184,19,1)]">
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].caption || "Gallery Moment"}
                className="max-w-full max-h-[72vh] object-contain block mx-auto"
              />

              {/* Caption Footer */}
              <div className="p-4 sm:p-5 bg-slate-950 text-white flex items-center justify-between gap-4 border-t-2 border-black">
                <div>
                  <p className="text-sm font-[1000] text-white uppercase tracking-tight">
                    {filtered[lightboxIndex].caption || "Elephant Chess Academy"}
                  </p>
                  <span className="text-[10px] font-bold text-[#FDB813] uppercase tracking-wider">
                    {filtered[lightboxIndex].category}
                  </span>
                </div>

                <span className="text-xs font-bold text-slate-400">
                  {lightboxIndex + 1} / {filtered.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

