"use client";
import { useState } from "react";
import { FiCompass } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BirthForm from "@/components/BirthForm";

export default function AscendantCalculatorPage() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const submit = async (b) => {
    setError("");
    const res = await fetch("/api/ascendant", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(b),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error);
    else setResult(data);
  };

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
            <FiCompass className="w-3 h-3" /> Lagna · Rising Sign
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Ascendant Calculator</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            The Lagna — the sign rising on the eastern horizon at your birth. The cornerstone of any Vedic chart.
          </p>
        </section>

        <section className="px-6 pb-10 max-w-3xl mx-auto">
          <BirthForm onSubmit={submit} submitLabel="Find My Lagna" />
          {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
        </section>

        {result && (
          <section className="px-6 pb-24 max-w-4xl mx-auto space-y-5">
            <div className="glass border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-xs uppercase font-bold tracking-widest text-veda-orange">Your Ascendant</p>
              <h2 className="font-serif text-5xl text-gradient-gold mt-3">{result.ascendant.sign.en}</h2>
              <p className="text-2xl font-serif text-white/80 mt-1">{result.ascendant.sign.hi} · {result.ascendant.sign.sa}</p>
              <p className="text-sm text-white/55 mt-3 font-mono">
                {result.ascendant.degInSign.toFixed(4)}° in {result.ascendant.sign.en}
              </p>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Lord</div>
                  <div className="text-white font-serif mt-0.5">{result.ascendant.sign.lord}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Element</div>
                  <div className="text-white font-serif mt-0.5">{result.ascendant.sign.element}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Nakshatra</div>
                  <div className="text-white font-serif mt-0.5">{result.ascendant.nakshatra.en}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Pada</div>
                  <div className="text-white font-serif mt-0.5">{result.ascendant.nakshatra.pada}</div>
                </div>
              </div>
            </div>

            <div className="glass border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/10 font-serif text-white">Whole-Sign House Cusps</div>
              <ul className="divide-y divide-white/5">
                {result.houseCusps.map((c) => (
                  <li key={c.house} className="px-5 py-2 flex items-center justify-between text-sm">
                    <span className="text-white/55">House {c.house}</span>
                    <span className="text-white">{c.sign.en}</span>
                    <span className="text-white/45 font-mono text-xs">{c.longitude.toFixed(2)}°</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
