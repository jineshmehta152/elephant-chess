"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ModernKnightLogo } from "@/components/logo";
import { ShieldCheck, UserCheck, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function SimpleLoginPage() {
  const [activeRole, setActiveRole] = useState<"admin" | "student">("admin");
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

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <ModernKnightLogo size="md" variant="light" />
          </div>
          <h1 className="text-2xl font-black text-white">Academy Login Portal</h1>
          <p className="text-xs text-slate-400">Select your portal tab below to log in</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setActiveRole("admin");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeRole === "admin"
                ? "bg-blue-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Admin Login
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveRole("student");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeRole === "student"
                ? "bg-[#E11D48] text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <UserCheck className="w-4 h-4" /> Student Login
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

        {/* Pure React Container (No <form> element anywhere) */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              {activeRole === "admin" ? "Admin Email / Username" : "Student Email / Username"}
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
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
              placeholder={activeRole === "admin" ? "admin@elephantchess.com" : "student@elephantchess.com"}
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
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              processSubmission();
            }}
            className={`w-full py-3.5 text-white font-extrabold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
              activeRole === "admin"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-[#E11D48] hover:bg-rose-700"
            }`}
          >
            <span>Sign In to {activeRole === "admin" ? "Admin Control Hub" : "Student Arena"}</span>
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
