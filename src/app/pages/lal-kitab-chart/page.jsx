"use client";
import { useState } from "react";
import { FiGrid } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BirthForm from "@/components/BirthForm";
import { RASHIS } from "@/lib/astro/constants";

const PLANET_SYMBOL = { Sun: "☉", Moon: "☽", Mars: "♂", Mercury: "☿", Jupiter: "♃", Venus: "♀", Saturn: "♄", Rahu: "☊", Ketu: "☋" };

// North-Indian-style cell layout for Lal Kitab. Same diamond geometry; the
// HOUSE NUMBER is fixed (1-12 in spatial position), and signs are also fixed
// because Lal Kitab anchors House 1 = Aries.
const HOUSES = [
  { n: 1,  poly: "200,0 300,100 200,200 100,100",     planets: [200, 90] },
  { n: 2,  poly: "0,0 200,0 100,100",                 planets: [100, 55] },
  { n: 3,  poly: "0,0 100,100 0,200",                 planets: [55, 100] },
  { n: 4,  poly: "0,200 100,100 200,200 100,300",     planets: [90, 200] },
  { n: 5,  poly: "0,200 100,300 0,400",               planets: [55, 300] },
  { n: 6,  poly: "0,400 100,300 200,400",             planets: [100, 345] },
  { n: 7,  poly: "200,400 100,300 200,200 300,300",   planets: [200, 310] },
  { n: 8,  poly: "200,400 300,300 400,400",           planets: [300, 345] },
  { n: 9,  poly: "400,200 400,400 300,300",           planets: [345, 300] },
  { n: 10, poly: "400,200 300,300 200,200 300,100",   planets: [310, 200] },
  { n: 11, poly: "400,0 400,200 300,100",             planets: [345, 100] },
  { n: 12, poly: "200,0 400,0 300,100",               planets: [300, 55] },
];

function ChartSVG({ houses }) {
  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-[400px] mx-auto block">
      <rect x="0" y="0" width="400" height="400" fill="none" className="stroke-white/30 print:stroke-black/60" strokeWidth="1.5" />
      <polygon points="200,0 400,200 200,400 0,200" fill="none" className="stroke-white/30 print:stroke-black/60" strokeWidth="1.5" />
      <line x1="0" y1="0" x2="400" y2="400" className="stroke-white/30 print:stroke-black/60" strokeWidth="1.5" />
      <line x1="400" y1="0" x2="0" y2="400" className="stroke-white/30 print:stroke-black/60" strokeWidth="1.5" />
      {HOUSES.map((h) => {
        const house = houses[h.n - 1];
        return (
          <g key={h.n}>
            <text x={h.planets[0]} y={h.planets[1] - 18} textAnchor="middle"
                  className="fill-veda-gold/80 print:fill-black"
                  style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1 }}>
              H{h.n} · {RASHIS[h.n - 1].en.slice(0,3)}
            </text>
            {house.planets.map((p, i) => {
              const offset = (i - (house.planets.length - 1) / 2) * 14;
              return (
                <text key={p.key}
                  x={h.planets[0]}
                  y={h.planets[1] + offset}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`${p.needsRemedy ? "fill-rose-400" : "fill-veda-orange"} print:fill-black`}
                  style={{ fontSize: 12, fontWeight: 600 }}
                >
                  {PLANET_SYMBOL[p.key]} {p.key.slice(0, 2)}{p.retrograde ? "R" : ""}
                </text>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

export default function LalKitabChartPage() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const submit = async (b) => {
    setError("");
    const res = await fetch("/api/reports", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "lal-kitab", ...b }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error);
    else setReport(data.report);
  };

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
            <FiGrid className="w-3 h-3" /> Fixed-house Chart
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Lal Kitab Chart Online</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            The chart never rotates with the Lagna — houses 1–12 always sit in Aries–Pisces. Your grahas drop into their sidereal sign cell.
          </p>
        </section>

        <section className="px-6 pb-8 max-w-3xl mx-auto">
          <BirthForm onSubmit={submit} submitLabel="Draw My Chart" />
          {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
        </section>

        {report && (
          <section className="px-6 pb-24 max-w-6xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div className="glass border border-white/10 rounded-2xl p-6">
                <p className="text-center text-[11px] uppercase font-bold tracking-widest text-veda-orange mb-3">North-style Lal Kitab Chart</p>
                <ChartSVG houses={report.houses} />
                <p className="text-center text-[11px] text-white/35 mt-2">
                  Red glyphs · planet needs remedy
                </p>
              </div>
              <div className="glass border border-white/10 rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-white/10 font-serif text-white">Planet Placements</div>
                <ul className="divide-y divide-white/5">
                  {report.placements.map((p) => (
                    <li key={p.key} className="px-5 py-2.5 flex items-center justify-between text-sm">
                      <span className="text-white font-medium">{PLANET_SYMBOL[p.key]} {p.key}</span>
                      <span className="text-white/55">{p.sign.en}</span>
                      <span className="text-veda-gold font-mono">H{p.house}</span>
                      {p.needsRemedy ? (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300">Remedy</span>
                      ) : (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">OK</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {report.debts.length > 0 && (
              <div className="glass border border-amber-500/20 rounded-xl p-5">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-amber-300 mb-2">Karmic Debts (Rinanubandh)</h4>
                <ul className="space-y-1.5">
                  {report.debts.map((d, i) => (<li key={i} className="text-sm text-white/70 flex gap-2"><span className="text-amber-300">·</span> {d}</li>))}
                </ul>
              </div>
            )}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
