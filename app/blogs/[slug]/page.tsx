import React from "react";
import Link from "next/link";
import { blogs as staticBlogs } from "@/lib/blogs-data";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DemoBookingCTA } from "@/components/demo-booking-cta";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Share2,
  Bookmark,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Phone,
  MessageCircle,
} from "lucide-react";

export const revalidate = 3600; // Cache for 1 hour (ISR)

export async function generateStaticParams() {
  try {
    const dbBlogs = await prisma.blog.findMany({ select: { slug: true } });
    const dbSlugs = dbBlogs.map((b) => ({ slug: b.slug }));
    const staticSlugs = staticBlogs.map((b) => ({ slug: b.slug }));
    return [...dbSlugs, ...staticSlugs];
  } catch (e) {
    return staticBlogs.map((b) => ({ slug: b.slug }));
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  let blog = null;
  try {
    blog = await prisma.blog.findUnique({ where: { slug: params.slug } });
  } catch (e) {}
  if (!blog) {
    blog = staticBlogs.find((b) => b.slug === params.slug);
  }
  if (!blog) return {};
  return {
    title: `${blog.title} | Elephant Chess Academy`,
    description: blog.summary,
  };
}

const categoryStyles: Record<string, { bg: string; text: string; border: string }> = {
  "Chess Tips":      { bg: "bg-sky-100",    text: "text-[#29A3DD]",  border: "border-sky-300" },
  "Tournament Tips": { bg: "bg-amber-100",  text: "text-amber-800",  border: "border-amber-300" },
  "Educational":     { bg: "bg-emerald-100",text: "text-emerald-800",border: "border-emerald-300" },
  "Mindset":         { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300" },
  "Academy News":    { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300" },
};

function renderContent(text: string) {
  const paragraphs = text.split("\n\n");
  return paragraphs.map((para, i) => {
    if (para.startsWith("## ")) {
      return (
        <div key={i} className="pt-6 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-8 rounded-xl bg-[#29A3DD] text-white flex items-center justify-center font-[1000] text-xs border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              ♟
            </span>
            <h3 className="text-xl sm:text-2xl font-[1000] text-slate-950 uppercase tracking-tight">
              {para.replace("## ", "")}
            </h3>
          </div>
        </div>
      );
    }
    if (para.split("\n").every((l) => l.startsWith("- "))) {
      const items = para.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={i} className="space-y-3 my-4 pl-2">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              <span className="mt-1 w-5 h-5 rounded-md bg-[#FDB813] border border-black flex items-center justify-center text-slate-950 font-black text-[10px] shrink-0 shadow-xs">
                ✓
              </span>
              <span>{item.replace(/^- /, "")}</span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="text-slate-700 text-sm sm:text-base md:text-[16px] leading-relaxed md:leading-[1.9] font-medium">
        {para}
      </p>
    );
  });
}

export default async function BlogSlugPage({ params }: { params: { slug: string } }) {
  let blog = null;
  try {
    blog = await prisma.blog.findUnique({ where: { slug: params.slug } });
  } catch (e) {}
  if (!blog) {
    blog = staticBlogs.find((b) => b.slug === params.slug) || null;
  }
  if (!blog) notFound();

  let allBlogs = staticBlogs;
  try {
    const dbBlogs = await prisma.blog.findMany();
    if (dbBlogs.length > 0) {
      allBlogs = dbBlogs;
    }
  } catch (e) {}

  const related = allBlogs
    .filter((b) => b.slug !== blog.slug && b.category === blog.category)
    .slice(0, 3);

  const style = categoryStyles[blog.category] ?? { bg: "bg-sky-100", text: "text-[#29A3DD]", border: "border-sky-300" };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      
      {/* ── Article Header Banner ── */}
      <div className="relative bg-[#0A1128] text-white pt-28 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden border-b-[3px] border-black">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#29A3DD]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#FDB813]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          {/* Breadcrumb and Back */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-[1000] text-xs uppercase tracking-wider transition-all hover:-translate-x-0.5"
            >
              <ArrowLeft className="w-4 h-4 stroke-[3]" />
              <span>All Articles</span>
            </Link>

            <div className="flex items-center gap-2 text-xs font-bold text-sky-200/70">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blogs" className="hover:text-white transition-colors">Blogs</Link>
              <span>/</span>
              <span className="text-[#FDB813] truncate max-w-[160px] sm:max-w-xs">{blog.category}</span>
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`px-3.5 py-1 rounded-full text-[11px] font-[1000] uppercase tracking-wider border ${style.bg} ${style.text} ${style.border}`}>
                {blog.category}
              </span>
              <span className="flex items-center gap-1.5 text-sky-200 text-xs font-bold">
                <Clock className="w-3.5 h-3.5" />
                {blog.readTime}
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5 text-sky-200 text-xs font-bold">
                <Calendar className="w-3.5 h-3.5" />
                {blog.date}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-[1000] text-white uppercase tracking-tight leading-tight">
              {blog.title}
            </h1>

            {/* Author Quick Info */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-xl bg-[#29A3DD] border-2 border-black flex items-center justify-center text-white font-[1000] text-sm shadow-[2px_2px_0px_0px_rgba(253,184,19,1)]">
                🐘
              </div>
              <div>
                <p className="font-[1000] text-sm text-white uppercase tracking-tight">{blog.author}</p>
                <p className="text-[11px] font-bold text-sky-300">{blog.authorRole}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ── Left Content Column (8 cols) ── */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Featured Hero Image */}
            <div className="relative rounded-[2.5rem] border-[3px] border-black bg-slate-950 overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full max-h-[440px] object-cover"
              />
            </div>

            {/* Executive Summary Card */}
            <div className="p-6 sm:p-8 rounded-3xl border-[3px] border-black bg-[#FDB813]/10 border-l-[8px] border-l-[#FDB813] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 mb-2 text-[#0A1128] font-[1000] text-xs uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Executive Summary</span>
              </div>
              <p className="text-slate-900 text-sm sm:text-base font-bold leading-relaxed italic">
                "{blog.summary}"
              </p>
            </div>

            {/* Rendered Markdown Body */}
            <div className="rounded-[2.5rem] border-[3px] border-black bg-white p-6 sm:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-5">
              {renderContent(blog.content)}
            </div>

            {/* Author Footnote Box */}
            <div className="rounded-3xl border-[3px] border-black bg-slate-950 text-white p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(41,163,221,1)] flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#29A3DD] border-2 border-black flex items-center justify-center text-3xl shrink-0 shadow-[3px_3px_0px_0px_rgba(253,184,19,1)]">
                🐘
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-[1000] text-lg text-white uppercase tracking-tight">{blog.author}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-[#FDB813] text-slate-950 font-[1000] text-[9px] uppercase tracking-wider">
                    Coach
                  </span>
                </div>
                <p className="text-xs font-bold text-sky-200">{blog.authorRole}</p>
                <p className="text-xs font-medium text-slate-300 leading-relaxed pt-1">
                  Dedicated to grooming next-generation state, national, and international champions at Elephant Chess Academy.
                </p>
              </div>
            </div>

          </div>

          {/* ── Right Sticky Sidebar (4 cols) ── */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            
            {/* Quick Demo CTA Card */}
            <div className="rounded-3xl border-[3px] border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 font-[1000] text-[10px] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Admissions Active</span>
              </div>

              <h3 className="font-[1000] text-xl text-slate-950 uppercase tracking-tight leading-snug">
                Put These Strategies Into Real Practice
              </h3>

              <p className="text-xs font-medium text-slate-600 leading-relaxed">
                Join Elephant Chess Academy for live interactive batches, GM analysis sessions, and weekend arena games.
              </p>

              <div className="space-y-2.5 pt-2">
                <Link
                  href="/bookdemo"
                  className="w-full py-3.5 px-4 bg-[#FDB813] hover:bg-amber-400 text-slate-950 font-[1000] text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>Book Free Trial Class</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </Link>

                <a
                  href="https://wa.me/919887821721?text=Hi%20Elephant%20Chess%20Academy,%20I%20read%20your%20blog%20article%20and%20would%20like%20to%20know%20more."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-[1000] text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Coach</span>
                </a>
              </div>
            </div>

            {/* Quick Contact & Info Card */}
            <div className="rounded-3xl border-[3px] border-black bg-[#0A1128] text-white p-6 shadow-[6px_6px_0px_0px_rgba(253,184,19,1)] space-y-4">
              <div className="flex items-center gap-2 text-[#FDB813] font-[1000] text-xs uppercase tracking-widest">
                <Phone className="w-4 h-4" />
                <span>Helpline Desk</span>
              </div>

              <div className="space-y-1.5 text-xs font-bold text-sky-100">
                <p className="flex items-center gap-2">
                  <span>📞</span> +91 98878 21721
                </p>
                <p className="flex items-center gap-2">
                  <span>📱</span> +91 62812 50967
                </p>
                <p className="text-[11px] font-medium text-slate-300 pt-1">
                  📍 Danavai Peta, Rajamahendravaram, AP 533103
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-[1000] uppercase tracking-wider text-[#29A3DD] hover:text-[#FDB813] transition-colors"
              >
                <span>Visit Contact Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

        {/* ── Related Articles Section ── */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t-2 border-slate-200 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-[1000] uppercase tracking-wider text-[#29A3DD] block">
                  More in {blog.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-[1000] text-slate-950 uppercase tracking-tight">
                  Related Guides
                </h3>
              </div>

              <Link
                href="/blogs"
                className="text-xs font-[1000] uppercase tracking-wider text-[#29A3DD] hover:text-[#0A1128] flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rb) => (
                <Link
                  key={rb.slug}
                  href={`/blogs/${rb.slug}`}
                  className="group rounded-3xl border-[3px] border-black bg-white overflow-hidden shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] bg-slate-900 overflow-hidden border-b-2 border-black">
                      <img
                        src={rb.image}
                        alt={rb.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {rb.readTime}
                      </span>
                      <h4 className="font-[1000] text-sm sm:text-base text-slate-950 uppercase tracking-tight group-hover:text-[#29A3DD] transition-colors line-clamp-2">
                        {rb.title}
                      </h4>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <span className="text-xs font-[1000] uppercase text-[#29A3DD] flex items-center gap-1">
                      Read Guide →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── Bottom Demo Booking CTA ── */}
      <DemoBookingCTA />

    </div>
  );
}
