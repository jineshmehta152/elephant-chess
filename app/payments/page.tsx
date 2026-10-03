"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Copy,
  Check,
  Building2,
  ShieldCheck,
  Smartphone,
  MessageCircle,
  Phone,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function PaymentsPage() {
  const bankDetails = {
    accountHolder: "Anshul Bangar",
    accountNumber: "61322870769",
    ifscCode: "SBIN0031240",
    bankName: "State Bank of India (SBI)",
    accountType: "Saving",
    branchAddress: "Bari Sadri",
    contact: "9887821721",
    upiId: "9887821721@axl",
  };

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const upiIntentUrl = `upi://pay?pa=${encodeURIComponent(
    bankDetails.upiId
  )}&pn=${encodeURIComponent(bankDetails.accountHolder)}&cu=INR`;

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 py-8 sm:py-14 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* ── Minimal Clean Header ── */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#29A3DD] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Academy Payments</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
            Fee Payment
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-md mx-auto">
            Scan via any UPI app or transfer directly to our official bank account.
          </p>
        </div>

        {/* ── Main Responsive Grid (Side-by-Side on Desktop, Stacked on Mobile) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* ── 1. PhonePe / UPI QR Code Card ── */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6 flex flex-col justify-between space-y-5">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#5f259f] text-white flex items-center justify-center font-black text-xs shadow-sm">
                    पे
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-slate-900 leading-none">
                      UPI & PhonePe
                    </h2>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Scan & Pay with any UPI app
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>

              {/* QR Code Container */}
              <div className="my-5 flex flex-col items-center justify-center">
                <div className="p-3 bg-white rounded-2xl border-2 border-slate-200 shadow-xs relative">
                  <QRCodeSVG
                    value={upiIntentUrl}
                    size={170}
                    level="H"
                    includeMargin={false}
                    className="w-40 h-40 sm:w-44 sm:h-44"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-9 h-9 rounded-full bg-[#5f259f] border-2 border-white shadow-md flex items-center justify-center text-white font-black text-xs">
                      पे
                    </div>
                  </div>
                </div>
                <p className="text-[11px] font-medium text-slate-400 mt-2.5">
                  {bankDetails.accountHolder} • ******1721
                </p>
              </div>

              {/* UPI ID Pill with Copy */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center justify-between gap-2">
                <div className="min-w-0 pl-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block leading-none">
                    UPI ID
                  </span>
                  <span className="font-mono font-bold text-xs sm:text-sm text-slate-900 truncate block mt-0.5">
                    {bankDetails.upiId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(bankDetails.upiId, "upiId")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    copiedKey === "upiId"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  {copiedKey === "upiId" ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Instant Pay Button */}
            <div className="pt-2">
              <a
                href={upiIntentUrl}
                className="w-full py-2.5 px-4 bg-[#5f259f] hover:bg-[#521f8a] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Pay via UPI App</span>
              </a>
            </div>
          </div>

          {/* ── 2. Bank Details Card ── */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6 flex flex-col justify-between space-y-5">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-sky-100 text-[#29A3DD] flex items-center justify-center font-bold text-xs">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-slate-900 leading-none">
                      Bank Transfer
                    </h2>
                    <span className="text-[11px] text-slate-400 font-medium">
                      IMPS / NEFT / RTGS
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  SBI
                </span>
              </div>

              {/* Minimal List of Details */}
              <div className="space-y-2.5 my-4">
                
                {/* Account Number */}
                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-2.5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block leading-none">
                      Account Number
                    </span>
                    <span className="font-mono font-bold text-sm text-slate-950 mt-0.5 block">
                      {bankDetails.accountNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(bankDetails.accountNumber, "accNum")}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-md transition-all cursor-pointer"
                    title="Copy Account Number"
                  >
                    {copiedKey === "accNum" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* IFSC Code */}
                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-2.5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block leading-none">
                      IFSC Code
                    </span>
                    <span className="font-mono font-bold text-sm text-slate-950 mt-0.5 block">
                      {bankDetails.ifscCode}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(bankDetails.ifscCode, "ifsc")}
                    className="p-1.5 text-slate-500 hover:text-slate-950 hover:bg-slate-200/60 rounded-md transition-all cursor-pointer"
                    title="Copy IFSC"
                  >
                    {copiedKey === "ifsc" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Account Holder Name */}
                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-2.5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block leading-none">
                      Account Holder
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-slate-900 mt-0.5 block">
                      {bankDetails.accountHolder}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(bankDetails.accountHolder, "holder")}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-md transition-all cursor-pointer"
                    title="Copy Name"
                  >
                    {copiedKey === "holder" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Account Type & Branch */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-2.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block leading-none">
                      Type
                    </span>
                    <span className="font-semibold text-xs text-slate-800 mt-0.5 block">
                      {bankDetails.accountType}
                    </span>
                  </div>
                  <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-2.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block leading-none">
                      Branch
                    </span>
                    <span className="font-semibold text-xs text-slate-800 mt-0.5 block truncate">
                      {bankDetails.branchAddress}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Helpline / Contact */}
            <div className="pt-1">
              <a
                href={`tel:+91${bankDetails.contact}`}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-slate-600" />
                <span>Contact: +91 {bankDetails.contact}</span>
              </a>
            </div>
          </div>

        </div>

        {/* ── WhatsApp Receipt Confirmation Card (Minimal & Actionable) ── */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              Paid already? Share your screenshot on WhatsApp
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Send your payment receipt / UTR for instant class confirmation and access.
            </p>
          </div>

          <a
            href={`https://wa.me/91${bankDetails.contact}?text=Hi%20Elephant%20Chess%20Academy,%20I%20have%20completed%20the%20fee%20payment.%20Here%20is%20my%20screenshot%20and%20UTR.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shrink-0 shadow-xs transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Receipt via WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
}
