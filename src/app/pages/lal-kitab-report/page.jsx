"use client";
import { useState } from "react";
import { FiBookOpen } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BirthForm from "@/components/BirthForm";

export default function LalKitabReportPage() {
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
        <section className="relative stars-bg pt-20 pb-10 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              <FiBookOpen className="w-3 h-3" /> Lal Kitab Teva
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Lal Kitab Report</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Lal Kitab uses a fixed-house chart — House 1 is always Aries, House 12 always Pisces. Your planets land in their sidereal sign-house.
            </p>
          </div>
        </section>

        <section className="px-6 pb-10 max-w-3xl mx-auto">
          <BirthForm onSubmit={submit} submitLabel="Build My Teva" />
          {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
        </section>

        {report && (
          <section className="px-6 pb-24 max-w-5xl mx-auto space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {report.houses.map((h) => (
                <div key={h.house} className="glass border border-white/10 rounded-xl p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-veda-orange">House {h.house}</span>
                    <span className="text-xs text-white/40">{h.sign.en}</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {h.planets.length === 0 ? (
                      <p className="text-xs text-white/30 italic">Empty</p>
                    ) : (
                      h.planets.map((p) => (
                        <div key={p.key} className="flex items-center justify-between text-sm">
                          <span className="text-white font-medium">{p.meta?.symbol} {p.key}</span>
                          {p.retrograde && <span className="text-[10px] text-rose-300">R</span>}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/10 font-serif text-white">Planet Readings</div>
              <div className="divide-y divide-white/5">
                {report.placements.map((p) => (
                  <div key={p.key} className="px-5 py-3 flex items-start gap-4">
                    <div className="w-10 shrink-0">
                      <div className="font-medium text-white">{p.meta?.symbol} {p.key}</div>
                      <div className="text-[10px] text-white/40">H{p.house}</div>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed flex-1">{p.keynote}</p>
                  </div>
                ))}
              </div>
            </div>

            {report.debts.length > 0 && (
              <div className="glass border border-amber-500/20 rounded-xl p-5">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-amber-300 mb-2">Rinanubandh (Karmic Debts)</h4>
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
