"use client";
import { useState } from "react";
import { FiUsers, FiUser } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";

function isoDate(d) {
  return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` : "";
}

const SHADE = (s) =>
  s >= 80 ? "from-emerald-500/25 to-sky-500/15 border-emerald-400/40"
  : s >= 60 ? "from-sky-500/20 to-emerald-500/10 border-sky-400/30"
  : s >= 40 ? "from-amber-500/15 to-sky-500/10 border-amber-400/30"
  : "from-slate-500/15 to-sky-500/5 border-slate-400/30";

export default function FriendshipCalculatorPage() {
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [dobA, setDobA] = useState(null);
  const [dobB, setDobB] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!nameA.trim() || !nameB.trim()) return;
    setLoading(true);
    const res = await fetch("/api/friendship-calc", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nameA: nameA.trim(), nameB: nameB.trim(),
        dobA: dobA ? isoDate(dobA) : undefined,
        dobB: dobB ? isoDate(dobB) : undefined,
      }),
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
            <FiUsers className="w-3 h-3" /> Numerology Friendship
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Friendship Calculator</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            How well do two friends harmonise? Add birthdays for a deeper life-path check.
          </p>
        </section>

        <section className="px-6 pb-10 max-w-3xl mx-auto">
          <form onSubmit={submit} className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Your Name</label>
                <div className="relative">
                  <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                  <Input value={nameA} onChange={(e) => setNameA(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Friend&apos;s Name</label>
                <div className="relative">
                  <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                  <Input value={nameB} onChange={(e) => setNameB(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Your DOB (optional)</label>
                <DatePicker value={dobA} onChange={setDobA} maxDate={new Date()} />
              </div>
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Friend&apos;s DOB (optional)</label>
                <DatePicker value={dobB} onChange={setDobB} maxDate={new Date()} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={loading} variant="primary-fill" className="rounded-xl px-8">
                {loading ? "Computing…" : "Calculate Friendship %"}
              </Button>
            </div>
          </form>
        </section>

        {result && (
          <section className="px-6 pb-24 max-w-3xl mx-auto space-y-4">
            <div className={`glass border bg-linear-to-br rounded-2xl p-10 text-center ${SHADE(result.score)}`}>
              <FiUsers className="w-12 h-12 mx-auto text-sky-300 mb-3" />
              <h2 className="font-serif text-7xl text-white">{result.score}<span className="text-3xl text-white/40">%</span></h2>
              <p className="text-lg text-white/80 mt-3">{nameA} &amp; {nameB}</p>
              <p className="text-white/75 mt-4 max-w-md mx-auto">{result.verdict}</p>
            </div>

            <div className="glass border border-white/10 rounded-xl p-5">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-veda-orange mb-3">Numerology Breakdown</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div><div className="text-white/40 text-xs">Shared letters</div><div className="text-white font-mono">{result.breakdown.sharedLetters} pts</div></div>
                <div><div className="text-white/40 text-xs">Destiny</div><div className="text-white font-mono">{result.breakdown.destiny.a} · {result.breakdown.destiny.b}</div></div>
                <div><div className="text-white/40 text-xs">Soul-urge</div><div className="text-white font-mono">{result.breakdown.soulUrge.a} · {result.breakdown.soulUrge.b}</div></div>
                {result.breakdown.lifePath && (
                  <div>
                    <div className="text-white/40 text-xs">Life Path</div>
                    <div className="text-white font-mono">{result.breakdown.lifePath.a} · {result.breakdown.lifePath.b}</div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
