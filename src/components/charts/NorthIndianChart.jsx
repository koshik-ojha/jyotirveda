"use client";
import { signOfHouse, rashiShort } from "@/lib/astro/chartLayout";

// 400×400 viewBox. Center at (200,200). House polygons follow the standard
// North Indian (Lagna) layout: outer square + inner diamond + both diagonals
// of the outer square create 12 cells. House 1 sits as the top-centre kite;
// houses go counter-clockwise.
const HOUSES = [
  // n, polygon points (SVG), label anchor (x,y) for sign number, planet anchor (x,y)
  { n: 1,  poly: "200,0 300,100 200,200 100,100",     label: [200, 18], planets: [200, 90] },
  { n: 2,  poly: "0,0 200,0 100,100",                 label: [100, 18], planets: [100, 55] },
  { n: 3,  poly: "0,0 100,100 0,200",                 label: [18, 100], planets: [55, 100] },
  { n: 4,  poly: "0,200 100,100 200,200 100,300",     label: [100, 200], planets: [90, 200] },
  { n: 5,  poly: "0,200 100,300 0,400",               label: [18, 300], planets: [55, 300] },
  { n: 6,  poly: "0,400 100,300 200,400",             label: [100, 382], planets: [100, 345] },
  { n: 7,  poly: "200,400 100,300 200,200 300,300",   label: [200, 382], planets: [200, 310] },
  { n: 8,  poly: "200,400 300,300 400,400",           label: [300, 382], planets: [300, 345] },
  { n: 9,  poly: "400,200 400,400 300,300",           label: [382, 300], planets: [345, 300] },
  { n: 10, poly: "400,200 300,300 200,200 300,100",   label: [300, 200], planets: [310, 200] },
  { n: 11, poly: "400,0 400,200 300,100",             label: [382, 100], planets: [345, 100] },
  { n: 12, poly: "200,0 400,0 300,100",               label: [300, 18], planets: [300, 55] },
];

function PlanetStack({ planets, x, y }) {
  if (!planets || planets.length === 0) return null;
  // Stack planets vertically, capped at 4 visible.
  const visible = planets.slice(0, 5);
  const lineH = 11;
  const total = visible.length;
  return (
    <g>
      {visible.map((p, i) => (
        <text
          key={p.key}
          x={x}
          y={y + (i - (total - 1) / 2) * lineH}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-veda-orange print:fill-black"
          style={{ fontSize: 11, fontWeight: 600 }}
        >
          {p.short}{p.retrograde ? "(R)" : ""}
        </text>
      ))}
    </g>
  );
}

export default function NorthIndianChart({ ascSignIdx, planetsBySign, title }) {
  return (
    <div className="glass border border-white/10 rounded-2xl p-5">
      {title && (
        <div className="text-center mb-3">
          <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
            {title}
          </span>
        </div>
      )}
      <svg viewBox="0 0 400 400" className="w-full max-w-[360px] mx-auto block">
        {/* Outer square */}
        <rect x="0" y="0" width="400" height="400"
              fill="none" className="stroke-white/30 print:stroke-black/60"
              strokeWidth="1.5" />
        {/* Inner diamond */}
        <polygon points="200,0 400,200 200,400 0,200"
                 fill="none" className="stroke-white/30 print:stroke-black/60"
                 strokeWidth="1.5" />
        {/* Both diagonals */}
        <line x1="0" y1="0" x2="400" y2="400"
              className="stroke-white/30 print:stroke-black/60" strokeWidth="1.5" />
        <line x1="400" y1="0" x2="0" y2="400"
              className="stroke-white/30 print:stroke-black/60" strokeWidth="1.5" />

        {/* House regions (transparent click-targets keep the look clean) */}
        {HOUSES.map((h) => {
          const signIdx = signOfHouse(ascSignIdx, h.n);
          const planets = planetsBySign[signIdx];
          return (
            <g key={h.n}>
              <polygon points={h.poly} fill="transparent" />
              <text
                x={h.label[0]}
                y={h.label[1]}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-veda-gold/90 print:fill-black"
                style={{ fontSize: 10, fontWeight: 700 }}
              >
                {signIdx + 1}
              </text>
              <PlanetStack planets={planets} x={h.planets[0]} y={h.planets[1]} />
            </g>
          );
        })}

        {/* Lagna marker on House 1 */}
        <text x="200" y="38" textAnchor="middle"
              className="fill-veda-orange/70 print:fill-black"
              style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1 }}>
          AS
        </text>
      </svg>
      <p className="text-center text-[11px] text-white/35 mt-2 print:text-black/60">
        Sign numbers: 1 = Aries … 12 = Pisces · AS = Lagna
      </p>
    </div>
  );
}
