"use client";
import { useState } from "react";
import { FiMoon } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BirthForm from "@/components/BirthForm";

export default function RasiCalculatorPage() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const submit = async (b) => {
    setError("");
    const res = await fetch("/api/moon-sign", {
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
            <FiMoon className="w-3 h-3" /> Vedic Rashi
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Rasi Calculator</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            In Vedic astrology your <b>rashi</b> is your moon sign — where the Moon was at your birth.
          </p>
        </section>

        <section className="px-6 pb-10 max-w-3xl mx-auto">
          <BirthForm onSubmit={submit} submitLabel="Find My Rasi" />
          {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
        </section>

        {result && (
          <section className="px-6 pb-24 max-w-3xl mx-auto">
            <div className="glass border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-xs uppercase font-bold tracking-widest text-veda-orange">Your Rasi</p>
              <h2 className="font-serif text-5xl text-gradient-gold mt-3">{result.moonRashi.en}</h2>
              <p className="text-2xl font-serif text-white/80 mt-1">{result.moonRashi.hi} · {result.moonRashi.sa}</p>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Lord</div>
                  <div className="text-white font-serif mt-0.5">{result.moonRashi.lord}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Element</div>
                  <div className="text-white font-serif mt-0.5">{result.moonRashi.element}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Nakshatra</div>
                  <div className="text-white font-serif mt-0.5">{result.nakshatra.en}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Pada</div>
                  <div className="text-white font-serif mt-0.5">{result.nakshatra.pada}</div>
                </div>
              </div>
              <p className="text-xs text-white/40 mt-6">
                Moon at {result.moonLongitude.toFixed(2)}° sidereal (Lahiri)
              </p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
