"use client";
import { RASHIS } from "@/lib/astro/constants";

const SYMBOLS = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];

export default function RashiPicker({ value, onChange, label = "Pick sign" }) {
  return (
    <div>
      <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">{label}</label>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
        {RASHIS.map((r, idx) => {
          const active = value === idx;
          return (
            <button
              key={r.en}
              type="button"
              onClick={() => onChange(idx)}
              className={`rounded-xl border p-3 text-left transition-colors ${
                active
                  ? "border-veda-orange bg-veda-orange/15 text-white"
                  : "border-white/10 bg-white/[0.03] text-white/70 hover:border-veda-orange/40"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <span className="text-xl text-veda-gold">{SYMBOLS[idx]}</span>
                <span className="text-[10px] text-white/40">{r.element}</span>
              </div>
              <p className="font-serif text-sm mt-1">{r.en}</p>
              <p className="text-[10px] text-white/45">{r.hi}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
