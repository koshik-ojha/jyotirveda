"use client";
import { useState } from "react";
import { FiHash, FiUser } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SCORE_CLASS = (s) =>
  s >= 75 ? "border-emerald-500/30 bg-emerald-500/5"
  : s >= 55 ? "border-sky-500/30 bg-sky-500/5"
  : s >= 40 ? "border-amber-500/30 bg-amber-500/5"
  : "border-rose-500/30 bg-rose-500/5";

const CAT_BADGE = {
  friend:    "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  neutral:   "border-white/10 bg-white/5 text-white/55",
  challenge: "border-rose-500/30 bg-rose-500/10 text-rose-300",
};

export default function NameCompatibilityPage() {
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!nameA.trim() || !nameB.trim()) return;
    setLoading(true);
    const res = await fetch("/api/compatibility", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "name", nameA: nameA.trim(), nameB: nameB.trim() }),
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
            <FiHash className="w-3 h-3" /> Numerology Name Match
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Name Compatibility</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Two names, two destinies. The numerology of letters reveals the resonance between you.
          </p>
        </section>

        <section className="px-6 pb-10 max-w-3xl mx-auto">
          <form onSubmit={submit} className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Your Full Name</label>
              <div className="relative">
                <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                <Input value={nameA} onChange={(e) => setNameA(e.target.value)} className="pl-10" placeholder="e.g. Krishna" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Partner&apos;s Full Name</label>
              <div className="relative">
                <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                <Input value={nameB} onChange={(e) => setNameB(e.target.value)} className="pl-10" placeholder="e.g. Radha" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={loading} variant="primary-fill" className="rounded-xl px-8">
                {loading ? "Computing…" : "Match Our Names"}
              </Button>
            </div>
          </form>
        </section>

        {result && (
          <section className="px-6 pb-24 max-w-4xl mx-auto space-y-5">
            <div className={`glass border rounded-2xl p-8 text-center ${SCORE_CLASS(result.score)}`}>
              <p className="text-xs uppercase font-bold tracking-widest text-veda-orange">Numerology Match</p>
              <h2 className="font-serif text-5xl text-white mt-2">{result.score}<span className="text-2xl text-white/40">/100</span></h2>
              <p className="text-white/70 mt-1">{result.rating}</p>
              <p className="text-white/65 mt-4 max-w-md mx-auto">{result.summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="glass border border-white/10 rounded-xl p-5">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Destiny</div>
                <div className="text-white font-mono mt-1">{result.destiny.a} <span className="text-white/40">vs</span> {result.destiny.b}</div>
                <span className={`inline-block mt-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${CAT_BADGE[result.destiny.category]}`}>
                  {result.destiny.category}
                </span>
              </div>
              <div className="glass border border-white/10 rounded-xl p-5">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Soul Urge</div>
                <div className="text-white font-mono mt-1">{result.soulUrge.a} <span className="text-white/40">vs</span> {result.soulUrge.b}</div>
                <span className={`inline-block mt-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${CAT_BADGE[result.soulUrge.category]}`}>
                  {result.soulUrge.category}
                </span>
              </div>
              <div className="glass border border-white/10 rounded-xl p-5">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Personality</div>
                <div className="text-white font-mono mt-1">{result.personality.a} <span className="text-white/40">vs</span> {result.personality.b}</div>
                <span className="inline-block mt-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/55">reference</span>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
