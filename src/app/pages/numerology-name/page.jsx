"use client";
import { useState } from "react";
import { FiUser, FiHash } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function NumberCard({ title, n }) {
  return (
    <div className="glass border border-white/10 rounded-2xl p-5">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">{title}</span>
        <span className="text-3xl font-serif text-veda-orange">{n.value}</span>
      </div>
      <p className="text-white font-serif">{n.meaning?.title}</p>
      <p className="text-xs text-white/55 mt-1.5 leading-relaxed">{n.meaning?.traits}</p>
    </div>
  );
}

export default function NumerologyNamePage() {
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    const res = await fetch("/api/compatibility", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "name-profile", name: name.trim() }),
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
            <FiHash className="w-3 h-3" /> Pythagorean Name Numerology
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Numerology Name</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Your name alone tells three numbers — Destiny, Soul Urge, Personality. Discover yours.
          </p>
        </section>

        <section className="px-6 pb-10 max-w-2xl mx-auto">
          <form onSubmit={submit} className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Full Name</label>
              <div className="relative">
                <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                <Input value={name} onChange={(e) => setName(e.target.value)} className="pl-10" placeholder="e.g. Albert Einstein" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={loading} variant="primary-fill" className="rounded-xl px-8">
                {loading ? "Computing…" : "Reveal My Name Numbers"}
              </Button>
            </div>
          </form>
        </section>

        {result && (
          <section className="px-6 pb-24 max-w-4xl mx-auto">
            <p className="text-center text-white/55 mb-5">Profile for <b className="text-white">{result.name}</b></p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <NumberCard title="Destiny / Expression" n={result.destiny} />
              <NumberCard title="Soul Urge / Heart's Desire" n={result.soulUrge} />
              <NumberCard title="Personality" n={result.personality} />
            </div>
            <p className="text-center text-xs text-white/40 mt-5">
              Want the full report with Life Path, Maturity, and karmic numbers? Try{" "}
              <a href="/pages/numerology" className="text-veda-orange hover:text-veda-gold">Numerology Calculator</a>.
            </p>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
