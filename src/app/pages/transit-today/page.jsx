"use client";
import { useEffect, useState } from "react";
import { FiTrendingUp } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RASHIS } from "@/lib/astro/constants";

export default function TransitTodayPage() {
  const [rashi, setRashi] = useState("");
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetch("/api/reports", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "transit-today", rashiIdx: rashi === "" ? null : parseInt(rashi, 10) }),
    }).then((r) => r.json()).then((d) => setReport(d.report));
  }, [rashi]);

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              <FiTrendingUp className="w-3 h-3" /> Live Planetary Positions
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Transit Today</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              All 9 grahas, right now — sidereal longitudes and house transits relative to your moon sign.
            </p>
          </div>
        </section>

        <section className="px-6 pb-6 max-w-3xl mx-auto">
          <div className="glass border border-white/10 rounded-xl p-4">
            <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Your Moon Sign (for house transits)</label>
            <Select value={rashi} onValueChange={setRashi}>
              <SelectTrigger><SelectValue placeholder="Select your rashi" /></SelectTrigger>
              <SelectContent>
                {RASHIS.map((r, idx) => (<SelectItem key={r.en} value={String(idx)}>{r.en} · {r.hi}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
        </section>

        {report && (
          <section className="px-6 pb-24 max-w-5xl mx-auto">
            <div className="glass border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-serif text-white">All 9 Grahas — {new Date(report.at).toLocaleString()}</h3>
                {report.refRashi && <span className="text-xs text-veda-gold">From {report.refRashi.en} as Lagna</span>}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 text-white/50 text-[10px] uppercase tracking-wider">
                    <tr>
                      <th className="text-left px-5 py-3">Planet</th>
                      <th className="text-left px-3 py-3">Sign</th>
                      <th className="text-left px-3 py-3">Degree</th>
                      <th className="text-left px-3 py-3">House</th>
                      <th className="text-left px-3 py-3">Motion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.transits.map((t) => (
                      <tr key={t.key} className="border-t border-white/5 hover:bg-white/[0.02]">
                        <td className="px-5 py-3 text-white font-medium">
                          <span className="text-veda-gold mr-2">{t.meta?.symbol}</span> {t.key}
                        </td>
                        <td className="px-3 py-3 text-white/80">{t.sign.en}</td>
                        <td className="px-3 py-3 text-white/55 font-mono">{t.degInSign.toFixed(2)}°</td>
                        <td className="px-3 py-3 text-white/80">{t.house ? `H${t.house}` : "—"}</td>
                        <td className="px-3 py-3">
                          {t.retrograde ? (
                            <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-red-500/15 text-red-300 border border-red-500/20">R</span>
                          ) : <span className="text-white/30 text-xs">Direct</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
