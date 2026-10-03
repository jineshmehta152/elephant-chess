"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ModernKnightLogo } from "@/components/logo";
import { ShieldCheck, GraduationCap, UserCheck, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function SimpleLoginPage() {
  const [activeRole, setActiveRole] = useState<"admin" | "coach" | "student">("coach");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const role = params.get("role");
      if (role === "student") {
        setActiveRole("student");
      } else if (role === "admin") {
        setActiveRole("admin");
      } else if (role === "coach") {
        setActiveRole("coach");
      }
    }
  }, []);

  const processSubmission = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    const u = username.trim().toLowerCase();
    const p = password.trim();

    if (!u || !p) {
      setErrorMsg("Please enter username/email and password.");
      return;
    }

    if (activeRole === "admin") {
      try {
        const res = await fetch("/api/auth/admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: u, password: p }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setSuccessMsg("Valid Admin! Directing to Admin Hub...");
            window.location.href = "/admin";
            return;
          }
        }
      } catch (err) {
        console.error("Admin login error:", err);
      }
      setErrorMsg("Invalid Admin Credentials.");
    } else if (activeRole === "coach") {
      try {
        const res = await fetch("/api/auth/coach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: u, password: p }),
        });

        const data = await res.json();
        if (res.ok && data.success && data.coach) {
          setSuccessMsg(`Welcome Coach ${data.coach.name}! Directing to Coach Panel...`);
          localStorage.setItem("currentCoach", JSON.stringify(data.coach));
          window.location.href = "/coach";
          return;
        } else {
          setErrorMsg(data.error || "Invalid Coach Credentials. Please check with academy admin.");
          return;
        }
      } catch (err) {
        console.error("Coach login error:", err);
        setErrorMsg("Failed to connect to login service.");
      }
    } else {
      // Check registered students database
      try {
        const res = await fetch("/api/students");
        if (res.ok) {
          const students = await res.json();
          const found = students.find(
            (s: any) =>
              (s.email?.toLowerCase() === u || s.name?.toLowerCase() === u) &&
              (s.password ? s.password === p : true)
          );
          if (found) {
            setSuccessMsg(`Welcome, ${found.name}! Directing to Student Arena...`);
            localStorage.setItem("currentStudent", JSON.stringify(found));
            window.location.href = "/student";
            return;
          }
        }
      } catch (err) {
        console.error("Student login error:", err);
      }

      setErrorMsg("Invalid Student Credentials. Check your registered email and password.");
    }
  };

  const getRoleTheme = () => {
    switch (activeRole) {
      case "admin":
        return {
          btnBg: "bg-blue-600 hover:bg-blue-700",
          tabActive: "bg-blue-600 text-white shadow-md",
          accentColor: "text-blue-400",
          title: "Admin Control Hub",
          placeholderEmail: "admin@elephantchess.com",
        };
      case "coach":
        return {
          btnBg: "bg-[#29A3DD] hover:bg-[#1f87b8]",
          tabActive: "bg-[#29A3DD] text-white shadow-md",
          accentColor: "text-[#29A3DD]",
          title: "Coach Dashboard",
          placeholderEmail: "coach@elephantchess.com",
        };
      case "student":
      default:
        return {
          btnBg: "bg-[#E11D48] hover:bg-rose-700",
          tabActive: "bg-[#E11D48] text-white shadow-md",
          accentColor: "text-[#E11D48]",
          title: "Student Arena",
          placeholderEmail: "student@elephantchess.com",
        };
    }
  };

  const theme = getRoleTheme();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <ModernKnightLogo size="md" variant="light" />
          </div>
          <h1 className="text-2xl font-black text-white">Academy Login Portal</h1>
          <p className="text-xs text-slate-400">Select your role below to access your portal</p>
        </div>

        {/* Role Selector 3-Way Tabs */}
        <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setActiveRole("coach");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition cursor-pointer ${
              activeRole === "coach" ? theme.tabActive : "text-slate-400 hover:text-white"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" /> Coach
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveRole("student");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition cursor-pointer ${
              activeRole === "student" ? "bg-[#E11D48] text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" /> Student
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveRole("admin");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition cursor-pointer ${
              activeRole === "admin" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Admin
          </button>
        </div>

        {/* Error / Success Messages */}
        {errorMsg && (
          <div className="p-3.5 bg-red-950/90 border border-red-500/60 rounded-xl text-red-200 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 bg-emerald-950/90 border border-emerald-500/60 rounded-xl text-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Container */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1 capitalize">
              {activeRole} Email / Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  processSubmission();
                }
              }}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#29A3DD]"
              placeholder={theme.placeholderEmail}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  processSubmission();
                }
              }}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#29A3DD]"
              placeholder="••••••••"
            />
          </div>

          {activeRole === "coach" && (
            <div className="p-2.5 bg-sky-950/40 border border-sky-800/40 rounded-xl text-[11px] text-sky-300/80">
              💡 <strong>Coach Tip:</strong> Default login is <span className="text-white font-mono">coach@elephantchess.com</span> / <span className="text-white font-mono">coach@elephant.com</span>
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              processSubmission();
            }}
            className={`w-full py-3.5 text-white font-extrabold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${theme.btnBg}`}
          >
            <span>Sign In to {theme.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation footer */}
        <div className="pt-2 text-center border-t border-slate-800 flex justify-center items-center text-xs">
          <Link href="/" className="text-slate-400 hover:text-white font-semibold">
            ← Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
