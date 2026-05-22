"use client";
import { useState } from "react";
import { FiHeart, FiUser } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HEART_SHADE = (s) =>
  s >= 80 ? "from-rose-500/25 to-pink-500/15 border-rose-400/40"
  : s >= 60 ? "from-rose-500/15 to-pink-500/10 border-rose-400/30"
  : s >= 40 ? "from-amber-500/15 to-rose-500/10 border-amber-400/30"
  : "from-slate-500/15 to-rose-500/5 border-slate-400/30";

export default function LoveCalculatorPage() {
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!nameA.trim() || !nameB.trim()) return;
    setLoading(true);
    const res = await fetch("/api/love-calc", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nameA: nameA.trim(), nameB: nameB.trim() }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
            <FiHeart className="w-3 h-3" /> Numerology-based
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Love Calculator</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Two names, one percentage — playful but grounded in real Pythagorean numerology.
          </p>
        </section>

        <section className="px-6 pb-10 max-w-2xl mx-auto">
          <form onSubmit={submit} className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Your Name</label>
                <div className="relative">
                  <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                  <Input value={nameA} onChange={(e) => setNameA(e.target.value)} className="pl-10" placeholder="e.g. Romeo" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Their Name</label>
                <div className="relative">
                  <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                  <Input value={nameB} onChange={(e) => setNameB(e.target.value)} className="pl-10" placeholder="e.g. Juliet" />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={loading} variant="primary-fill" className="rounded-xl px-8">
                {loading ? "Computing…" : "Calculate Love %"}
              </Button>
            </div>
          </form>
        </section>

        {result && (
          <section className="px-6 pb-24 max-w-3xl mx-auto space-y-4">
            <div className={`glass border bg-linear-to-br rounded-2xl p-10 text-center ${HEART_SHADE(result.score)}`}>
              <FiHeart className="w-12 h-12 mx-auto text-rose-300 mb-3" />
              <h2 className="font-serif text-7xl text-white">{result.score}<span className="text-3xl text-white/40">%</span></h2>
              <p className="text-lg text-white/80 mt-3 italic">{nameA} ♡ {nameB}</p>
              <p className="text-white/75 mt-4 max-w-md mx-auto">{result.verdict}</p>
            </div>

            <div className="glass border border-white/10 rounded-xl p-5">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-veda-orange mb-3">Breakdown</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-white/40 text-xs">Shared letters</div>
                  <div className="text-white font-mono">{result.breakdown.sharedLetters} pts</div>
                </div>
                <div>
                  <div className="text-white/40 text-xs">Destiny numbers</div>
                  <div className="text-white font-mono">{result.breakdown.numerology.destiny.a} · {result.breakdown.numerology.destiny.b}</div>
                </div>
                <div>
                  <div className="text-white/40 text-xs">Soul-urge numbers</div>
                  <div className="text-white font-mono">{result.breakdown.numerology.soulUrge.a} · {result.breakdown.numerology.soulUrge.b}</div>
                </div>
              </div>
            </div>

            <div className="glass border border-veda-orange/20 rounded-xl p-5">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-veda-orange mb-2">Tips</h4>
              <ul className="space-y-1.5">
                {result.tips.map((t, i) => (<li key={i} className="text-sm text-white/70 flex gap-2"><span className="text-veda-orange">·</span> {t}</li>))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
