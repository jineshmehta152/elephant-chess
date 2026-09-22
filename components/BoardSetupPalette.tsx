"use client";

import React from "react";
import { ChessPieceSvg } from "@/components/ChessPieceSvg";
import { Trash2, Plus, Minus, Target } from "lucide-react";

type Tool = null | "TRASH" | "PLUS" | "MINUS" | "TARGET" | { type: string; color: string };

interface BoardSetupPaletteProps {
  selectedTool: Tool;
  setSelectedTool: (tool: Tool) => void;
  onClear: () => void;
  onReset: () => void;
  onClearArrows?: () => void;
  showSpecialTools?: boolean;
}

export const BoardSetupPalette: React.FC<BoardSetupPaletteProps> = ({
  selectedTool,
  setSelectedTool,
  onClear,
  onReset,
  showSpecialTools = false,
}) => {
  const pieces = [
    { type: "p", color: "w" },
    { type: "n", color: "w" },
    { type: "b", color: "w" },
    { type: "r", color: "w" },
    { type: "q", color: "w" },
    { type: "k", color: "w" },
    { type: "p", color: "b" },
    { type: "n", color: "b" },
    { type: "b", color: "b" },
    { type: "r", color: "b" },
    { type: "q", color: "b" },
    { type: "k", color: "b" },
  ];

  const isPieceSelected = (type: string, color: string) => {
    return (
      typeof selectedTool === "object" &&
      selectedTool !== null &&
      selectedTool.type === type &&
      selectedTool.color === color
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
      {/* Palette Title */}
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Setup Palette</h4>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onReset}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-extrabold rounded-lg border border-slate-700 transition-colors"
          >
            Reset Board
          </button>
          <button
            type="button"
            onClick={onClear}
            className="px-2.5 py-1 bg-rose-950/40 hover:bg-rose-900/40 text-rose-300 text-[10px] font-extrabold rounded-lg border border-rose-900/30 transition-colors"
          >
            Clear Board
          </button>
        </div>
      </div>

      {/* Piece Placement Section */}
      <div>
        <span className="text-[10px] text-slate-500 font-bold block mb-2 uppercase">Place Pieces</span>
        <div className="grid grid-cols-6 gap-2">
          {pieces.map((p, idx) => {
            const active = isPieceSelected(p.type, p.color);
            return (
              <button
                type="button"
                key={idx}
                onClick={() => setSelectedTool({ type: p.type, color: p.color })}
                className={`aspect-square flex items-center justify-center p-1 rounded-xl border transition-all ${
                  active
                    ? "bg-blue-600/30 border-blue-500 shadow-md ring-2 ring-blue-500/20"
                    : "bg-slate-200 hover:bg-slate-300 border-slate-350"
                }`}
                title={`${p.color === "w" ? "White" : "Black"} ${p.type.toUpperCase()}`}
              >
                <ChessPieceSvg type={p.type as any} color={p.color as any} className="w-8 h-8 drop-shadow" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Tools Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Basic Tools */}
        <div>
          <span className="text-[10px] text-slate-500 font-bold block mb-2 uppercase">Editor Tools</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSelectedTool(selectedTool === "TRASH" ? null : "TRASH")}
              className={`flex-1 py-2 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-all ${
                selectedTool === "TRASH"
                  ? "bg-rose-600/30 border-rose-500 text-rose-300 shadow-md"
                  : "bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400"
              }`}
              title="Remove Piece"
            >
              <Trash2 className="w-4 h-4" />
              Trash
            </button>
          </div>
        </div>

        {/* Special Indicators / Target Tools */}
        <div>
          <span className="text-[10px] text-slate-500 font-bold block mb-2 uppercase">Custom Markers</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSelectedTool(selectedTool === "TARGET" ? null : "TARGET")}
              className={`flex-1 py-2 rounded-xl border flex items-center justify-center gap-1 text-xs font-bold transition-all ${
                selectedTool === "TARGET"
                  ? "bg-amber-600/30 border-amber-500 text-amber-300 shadow-md"
                  : "bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400"
              }`}
              title="Numbered Target Square"
            >
              <Target className="w-4 h-4" />
              Target
            </button>
          </div>
        </div>
      </div>

      {/* Sequence Tools (Signs) */}
      {showSpecialTools && (
        <div>
          <span className="text-[10px] text-slate-500 font-bold block mb-2 uppercase">Sign Indicators</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSelectedTool(selectedTool === "PLUS" ? null : "PLUS")}
              className={`flex-1 py-2 rounded-xl border flex items-center justify-center gap-1 text-xs font-bold transition-all ${
                selectedTool === "PLUS"
                  ? "bg-green-600/30 border-green-500 text-green-300 shadow-md"
                  : "bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400"
              }`}
            >
              <Plus className="w-4 h-4" />
              Plus (+)
            </button>
            <button
              type="button"
              onClick={() => setSelectedTool(selectedTool === "MINUS" ? null : "MINUS")}
              className={`flex-1 py-2 rounded-xl border flex items-center justify-center gap-1 text-xs font-bold transition-all ${
                selectedTool === "MINUS"
                  ? "bg-red-600/30 border-red-500 text-red-300 shadow-md"
                  : "bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400"
              }`}
            >
              <Minus className="w-4 h-4" />
              Minus (-)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
