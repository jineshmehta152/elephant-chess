"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModernKnightLogo } from "@/components/logo";
import { useBookDemoModal } from "@/components/ui/BookDemoModal";

const MenuIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface NavItem {
  name: string;
  href: string;
  icon: string;
  badgeColor: string;
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { openModal } = useBookDemoModal();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { name: "Home", href: "/", icon: "🏠", badgeColor: "hover:text-[#29A3DD]" },
    { name: "About Us", href: "/about", icon: "🐘", badgeColor: "hover:text-[#FDB813]" },
    { name: "Courses", href: "/courses", icon: "📚", badgeColor: "hover:text-[#38B6FF]" },
    { name: "Achievements", href: "/achievements", icon: "🏆", badgeColor: "hover:text-amber-500" },
    { name: "Gallery", href: "/gallery", icon: "📸", badgeColor: "hover:text-purple-500" },
    { name: "Blogs", href: "/blogs", icon: "✏️", badgeColor: "hover:text-rose-500" },
    { name: "Contact Us", href: "/contact", icon: "📞", badgeColor: "hover:text-sky-500" },
  ];

  if (pathname.startsWith("/admin") || pathname.startsWith("/student")) {
    return null;
  }

  return (
    <>
      {/* Top Spacer */}
      <div className="h-20 lg:h-22 invisible" />

      {/* Main Header Container */}
      <header
        className={`w-full fixed top-0 left-0 z-[100] transition-all duration-300 ease-in-out ${scrolled ? "pt-2 px-2 md:px-6" : "bg-white/95 backdrop-blur-md border-b-2 border-sky-100 py-2 shadow-sm"
          }`}
      >
        <div
          className={`transition-all duration-300 flex items-center justify-between w-full max-w-full ${scrolled
            ? "bg-[#0A1128]/95 backdrop-blur-xl border-2 border-[#29A3DD]/40 shadow-[0_12px_35px_rgba(10,17,40,0.3)] rounded-full px-4 md:px-8 py-2.5"
            : "px-4 md:px-8"
            }`}
        >
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group shrink-0 hover:scale-105 transition-transform">
            <div className="block md:hidden">
              <ModernKnightLogo size="xs" />
            </div>
            <div className="hidden md:block">
              <ModernKnightLogo size="md" />
            </div>
          </Link>

          {/* Desktop Navigation - Playful Colorful Pill Style */}
          <nav
            className={`hidden xl:flex items-center transition-all duration-300 ${scrolled
              ? "bg-white/10 backdrop-blur-md rounded-full px-2 py-1 border border-white/20 gap-1"
              : "bg-slate-50/90 rounded-full px-3 py-1.5 border border-slate-200/80 gap-1 shadow-inner"
              }`}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-all text-[13px] font-black rounded-full px-3.5 py-1.5 flex items-center gap-1.5 ${scrolled
                    ? isActive
                      ? "bg-gradient-to-r from-[#29A3DD] to-sky-400 text-white shadow-md scale-105"
                      : "text-slate-200 hover:text-[#FDB813] hover:bg-white/10"
                    : isActive
                      ? "bg-[#0A1128] text-[#FDB813] shadow-md border border-[#29A3DD]/40"
                      : `text-slate-700 ${item.badgeColor} hover:bg-white hover:shadow-sm`
                    }`}
                >
                  <span className="text-xs">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              href="/student"
              className={`text-xs font-black px-4 py-2 rounded-full transition-all flex items-center gap-1.5 border-2 ${scrolled
                ? "bg-white/10 text-white border-white/20 hover:bg-[#29A3DD] hover:border-[#29A3DD]"
                : "bg-sky-50 text-[#0A1128] border-sky-200 hover:bg-[#29A3DD] hover:text-white hover:border-[#29A3DD]"
                } shadow-sm hover:scale-105 active:scale-95`}
            >
              <span>🐘</span> Classroom
            </Link>

            <button
              onClick={openModal}
              className="text-xs font-black px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FDB813] via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-[#FDB813] text-slate-950 shadow-[0_6px_20px_rgba(253,184,19,0.5)] hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shrink-0 border border-yellow-200 uppercase tracking-wider cursor-pointer"
            >
              <span>⭐</span> Free Trial Class
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={openModal}
              className="text-[11px] font-black px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#FDB813] to-amber-400 text-slate-950 shrink-0 shadow-md border border-amber-300 cursor-pointer"
            >
              ⭐ Free Trial
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-full transition-colors ${scrolled ? "text-white hover:bg-white/20" : "text-slate-800 bg-sky-50 hover:bg-sky-100"
                }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden fixed inset-x-4 top-20 z-[110] bg-[#0A1128] border-2 border-[#29A3DD]/50 rounded-3xl p-5 space-y-3 shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col space-y-1.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-black py-2.5 px-4 rounded-2xl transition-all flex items-center gap-2.5 ${isActive
                      ? "bg-[#29A3DD] text-white shadow-md"
                      : "text-slate-200 hover:bg-white/10 hover:text-[#FDB813]"
                      }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              <div className="h-px bg-white/15 my-2" />

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openModal();
                }}
                className="text-sm font-black text-slate-950 bg-gradient-to-r from-[#FDB813] via-amber-400 to-yellow-500 py-3 px-4 rounded-2xl text-center flex items-center justify-center gap-2 shadow-lg uppercase tracking-wider border border-amber-200 cursor-pointer"
              >
                ⭐ Book Free Trial Class
              </button>

              <div className="mt-2">
                <Link
                  href="/student"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs font-black text-white bg-white/10 border border-white/20 py-2.5 px-3 rounded-xl text-center hover:bg-[#29A3DD] flex items-center justify-center gap-1.5 w-full"
                >
                  🐘 Classroom
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;