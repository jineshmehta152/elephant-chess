"use client";

import React, { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  Sparkles,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// --- DIRECT DATA: Just add your image URLs here ---
const GALLERY_IMAGES = [
  { id: 1, category: "chess", src: "/gallery-1.jpg" },
  { id: 2, category: "coding", src: "/gallery-2.jpg" },
  { id: 3, category: "logic", src: "/gallery-3.jpg" },
  { id: 4, category: "memory", src: "/gallery-4.jpg" },
  { id: 5, category: "communication", src: "/gallery-5.jpg" },
  { id: 6, category: "chess", src: "/gallery-6.jpg" },
  { id: 7, category: "chess", src: "/gallery-7.jpg" },
  { id: 8, category: "coding", src: "/gallery-8.jpg" },
];

const FILTERS = [
  { id: "all", label: "All Photos" },
  { id: "chess", label: "Chess" },
  { id: "coding", label: "Coding & AI" },
  { id: "logic", label: "Logic" },
  { id: "memory", label: "Memory" },
  { id: "communication", label: "Communication" },
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<typeof GALLERY_IMAGES[0] | null>(null);

  const filteredItems = activeFilter === "all" 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeFilter);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!lightboxImage) return;
    const currentIndex = filteredItems.findIndex(img => img.id === lightboxImage.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setLightboxImage(filteredItems[nextIndex]);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!lightboxImage) return;
    const currentIndex = filteredItems.findIndex(img => img.id === lightboxImage.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxImage(filteredItems[prevIndex]);
  };

  return (
    <section className="relative py-16 md:py-24 bg-white" id="gallery">
      <div className="container mx-auto px-4 max-w-7xl relative">
        
        {/* --- Minimal Header --- */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3 h-3 text-[#46B94A]" />
            <span>Academy Gallery</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
            Life at <span className="text-[#01539D]">FutureMind</span>
          </h2>
        </div>

        {/* --- Filters --- */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all duration-300 uppercase tracking-wider border
                ${activeFilter === filter.id 
                  ? 'bg-[#01539D] text-white border-[#01539D] shadow-lg shadow-blue-100' 
                  : 'bg-white text-slate-400 border-slate-100 hover:border-[#46B94A] hover:text-[#46B94A]'
                }
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* --- Image Grid --- */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((image) => (
              <motion.div 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={image.id}
                className="group relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer bg-slate-100"
                onClick={() => setLightboxImage(image)}
              >
                <img 
                  src={image.src} 
                  alt="Gallery Item" 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Minimal Overlay Icon */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <Camera className="w-10 h-10 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No images yet</p>
          </div>
        )}
      </div>

      {/* --- Simple Lightbox --- */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setLightboxImage(null)}
          >
            {/* Close Button */}
            <button className="absolute top-6 right-6 p-3 text-white/50 hover:text-white transition-colors z-[110]">
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            <button onClick={handlePrev} className="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white transition-all hidden md:block z-[110]">
              <ChevronLeft className="w-12 h-12" />
            </button>
            <button onClick={handleNext} className="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white transition-all hidden md:block z-[110]">
              <ChevronRight className="w-12 h-12" />
            </button>

            {/* Centered Image Only */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxImage.src} 
                alt="Enlarged view" 
                className="max-w-full max-h-full rounded-lg object-contain shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}