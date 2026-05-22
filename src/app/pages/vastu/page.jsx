"use client";
import { useEffect, useState } from "react";
import { FiCompass, FiHome } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RASHIS } from "@/lib/astro/constants";

const DIRS = ["N","NE","E","SE","S","SW","W","NW"];

export default function VastuPage() {
  const [direction, setDirection] = useState("NE");
  const [rashi, setRashi] = useState("");
  const [result, setResult] = useState(null);
  const [compass, setCompass] = useState(null);

  useEffect(() => {
    fetch("/api/vastu").then((r) => r.json()).then((d) => setCompass(d.compass));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const body = { direction };
    if (rashi !== "") body.rashiIdx = parseInt(rashi, 10);
    const res = await fetch("/api/vastu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setResult(data.analysis);
  };

  const rating = (k) => compass?.find((c) => c.key === k)?.rating;

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              <FiCompass className="w-3 h-3" /> 8-Direction Vastu Analysis
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Vastu Shastra</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              The direction of your main entrance shapes the energy of every room behind it. Find your reading.
            </p>
          </div>
        </section>

        <section className="px-6 pb-8 max-w-4xl mx-auto">
          <form onSubmit={submit} className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-5">
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-3 block">Main Entrance Direction</label>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {DIRS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDirection(d)}
                    title={rating(d)}
                    className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                      direction === d ? "bg-veda-orange text-white border border-veda-orange" : "bg-white/[0.04] border border-white/10 text-white/70 hover:border-veda-orange/40"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Your Moon Sign (optional, for personal compass)</label>
              <Select value={rashi} onValueChange={setRashi}>
                <SelectTrigger><SelectValue placeholder="Select moon sign" /></SelectTrigger>
                <SelectContent>
                  {RASHIS.map((r, idx) => (<SelectItem key={r.en} value={String(idx)}>{r.en} · {r.hi}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="primary-fill" className="rounded-xl px-8">Analyse</Button>
            </div>
          </form>
        </section>

        {result && (
          <section className="px-6 pb-24 max-w-4xl mx-auto space-y-5">
            <div className="glass border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-veda-orange/15 border border-veda-orange/20 text-veda-orange flex items-center justify-center">
                  <FiHome className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-white/40">Entrance</p>
                  <h2 className="font-serif text-3xl text-white">{result.direction.name}</h2>
                  <p className="text-white/55 text-sm mt-0.5">Lord {result.direction.lord} · {result.direction.element}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Governs</div>
                  <div className="text-white text-sm mt-1">{result.direction.governs}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Rating</div>
                  <div className="text-white text-sm mt-1">{result.direction.rating}</div>
                </div>
              </div>
              {result.resonance && (
                <div className="rounded-xl border border-veda-gold/20 bg-veda-gold/5 p-4 mt-3">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-veda-gold">Personal Compass</div>
                  <div className="text-white text-sm mt-1">{result.resonance}</div>
                  {result.personal && <div className="text-xs text-white/55 mt-1.5">Your favourable directions: {result.personal.favourable.join(", ")} · Element: {result.personal.element}</div>}
                </div>
              )}
              <div className="mt-5">
                <h4 className="text-[11px] uppercase font-bold tracking-widest text-veda-orange mb-2">Remedies</h4>
                <ul className="space-y-1.5">
                  {result.remedies.map((r, i) => (
                    <li key={i} className="text-sm text-white/70 flex gap-2"><span className="text-veda-orange">·</span> {r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
