"use client";

import Link from "next/link";
import { ModernKnightLogo } from "@/components/logo";
import { Trophy, Crown, ArrowRight, Sparkles, UserCheck } from "lucide-react";

export default function SignupPage() {
  const roles = [
    {
      id: "student",
      label: "Student / Player",
      icon: Crown,
      href: "/signup/student",
      color: "from-blue-600 to-blue-800",
      description: "Join Elephant Chess Academy as a student",
      features: [
        "FIDE Certified Master Coaching",
        "3-Tier Tactical PGN Puzzles",
        "Personalized Rating & Streak Tracking"
      ],
    },
    {
      id: "teacher",
      label: "Chess Coach",
      icon: Trophy,
      href: "/signup/teacher",
      color: "from-rose-600 to-rose-800",
      description: "Apply as a certified FIDE coach or trainer",
      features: [
        "Conduct Interactive PGN Masterclasses",
        "Manage Student Batches & Attendance",
        "Track FIDE Rating Gains & Analytics"
      ],
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden font-sans">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#29A3DD]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#FDB813]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl space-y-8 relative z-10">
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <ModernKnightLogo size="md" variant="light" />
          </div>
          <span className="px-4 py-1.5 bg-sky-500/10 text-[#29A3DD] text-xs font-black uppercase tracking-widest rounded-full border border-sky-500/20 inline-flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Academy Registration
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Join Elephant Chess Academy</h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto">Select your registration profile to get started with grandmaster chess training.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Link
                key={role.id}
                href={role.href}
                className="group relative bg-slate-900 border border-slate-800 hover:border-[#E11D48] rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl space-y-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B4398] to-[#E11D48] flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <div>
                  <h2 className="text-2xl font-black text-white group-hover:text-amber-300 transition mb-2">
                    {role.label}
                  </h2>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <ul className="space-y-2 pt-2 border-t border-slate-800">
                  {role.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300 text-xs">
                      <UserCheck className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 text-[#E11D48] font-bold text-xs pt-2">
                  <span>Proceed to Portal Enrollment</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <p className="text-slate-400 text-xs">
            Already enrolled?{" "}
            <Link href="/login" className="text-amber-400 font-bold hover:underline">
              Sign In to Portal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
