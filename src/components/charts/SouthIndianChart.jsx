"use client";
import { RASHIS } from "@/lib/astro/constants";

// South Indian chart: fixed sign positions on a 4x4 grid, signs reading
// clockwise from Pisces (top-left). Center 2x2 is empty / used as title.
// Grid coords: row 0..3, col 0..3. Map signIdx → {row, col}.
const SIGN_CELLS = [
  /* 0 Aries        */ { row: 0, col: 1 },
  /* 1 Taurus       */ { row: 0, col: 2 },
  /* 2 Gemini       */ { row: 0, col: 3 },
  /* 3 Cancer       */ { row: 1, col: 3 },
  /* 4 Leo          */ { row: 2, col: 3 },
  /* 5 Virgo        */ { row: 3, col: 3 },
  /* 6 Libra        */ { row: 3, col: 2 },
  /* 7 Scorpio      */ { row: 3, col: 1 },
  /* 8 Sagittarius  */ { row: 3, col: 0 },
  /* 9 Capricorn    */ { row: 2, col: 0 },
  /*10 Aquarius     */ { row: 1, col: 0 },
  /*11 Pisces       */ { row: 0, col: 0 },
];

const CELL = 90;
const STROKE = "stroke-white/30 print:stroke-black/60";

export default function SouthIndianChart({ ascSignIdx, planetsBySign, title }) {
  const W = CELL * 4;
  return (
    <div className="glass border border-white/10 rounded-2xl p-5">
      {title && (
        <div className="text-center mb-3">
          <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
            {title}
          </span>
        </div>
      )}
      <svg viewBox={`0 0 ${W} ${W}`} className="w-full max-w-[360px] mx-auto block">
        {/* Outer square */}
        <rect x="0" y="0" width={W} height={W}
              fill="none" className={STROKE} strokeWidth="1.5" />
        {/* Inner vertical lines */}
        <line x1={CELL}   y1="0" x2={CELL}   y2={W} className={STROKE} strokeWidth="1" />
        <line x1={CELL*3} y1="0" x2={CELL*3} y2={W} className={STROKE} strokeWidth="1" />
        {/* Inner horizontal lines */}
        <line x1="0" y1={CELL}   x2={W} y2={CELL}   className={STROKE} strokeWidth="1" />
        <line x1="0" y1={CELL*3} x2={W} y2={CELL*3} className={STROKE} strokeWidth="1" />
        {/* Top edge of bottom-row middle cells: row 3 dividers */}
        <line x1={CELL*2} y1="0"      x2={CELL*2} y2={CELL}   className={STROKE} strokeWidth="1" />
        <line x1={CELL*2} y1={CELL*3} x2={CELL*2} y2={W}      className={STROKE} strokeWidth="1" />
        <line x1="0"      y1={CELL*2} x2={CELL}   y2={CELL*2} className={STROKE} strokeWidth="1" />
        <line x1={CELL*3} y1={CELL*2} x2={W}      y2={CELL*2} className={STROKE} strokeWidth="1" />

        {SIGN_CELLS.map((cell, signIdx) => {
          const x = cell.col * CELL;
          const y = cell.row * CELL;
          const planets = planetsBySign[signIdx];
          const isLagna = signIdx === ascSignIdx;
          return (
            <g key={signIdx}>
              {isLagna && (
                <line x1={x} y1={y} x2={x + 28} y2={y + 28}
                      className="stroke-veda-orange/80 print:stroke-black"
                      strokeWidth="2" />
              )}
              <text x={x + 6} y={y + 14}
                    className="fill-veda-gold/80 print:fill-black"
                    style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>
                {RASHIS[signIdx].en.slice(0, 3).toUpperCase()}
              </text>
              {planets && planets.length > 0 && (
                <g>
                  {planets.slice(0, 6).map((p, i) => (
                    <text key={p.key}
                          x={x + CELL / 2}
                          y={y + CELL / 2 + (i - (Math.min(planets.length, 6) - 1) / 2) * 12}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-veda-orange print:fill-black"
                          style={{ fontSize: 11, fontWeight: 600 }}>
                      {p.short}{p.retrograde ? "(R)" : ""}
                    </text>
                  ))}
                </g>
              )}
            </g>
          );
        })}

        {/* Centre title */}
        <text x={W / 2} y={W / 2 - 4} textAnchor="middle"
              className="fill-white/40 print:fill-black/70"
              style={{ fontSize: 12, fontStyle: "italic" }}>
          South
        </text>
        <text x={W / 2} y={W / 2 + 12} textAnchor="middle"
              className="fill-white/40 print:fill-black/70"
              style={{ fontSize: 12, fontStyle: "italic" }}>
          Indian
        </text>
      </svg>
      <p className="text-center text-[11px] text-white/35 mt-2 print:text-black/60">
        Signs fixed · Lagna marked with diagonal line in the ascendant&apos;s cell
      </p>
    </div>
  );
}
