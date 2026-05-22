"use client";
import { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";

function isoDate(d) {
  return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` : "";
}

const SCORE_CLASS = (s) =>
  s >= 75 ? "border-emerald-500/30 bg-emerald-500/5"
  : s >= 55 ? "border-sky-500/30 bg-sky-500/5"
  : s >= 40 ? "border-amber-500/30 bg-amber-500/5"
  : "border-rose-500/30 bg-rose-500/5";

export default function BirthDateCompatibilityPage() {
  const [dobA, setDobA] = useState(null);
  const [dobB, setDobB] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!dobA || !dobB) return;
    setLoading(true);
    const res = await fetch("/api/compatibility", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "birth-date", dobA: isoDate(dobA), dobB: isoDate(dobB) }),
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
            <FiCalendar className="w-3 h-3" /> Life Path Compatibility
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Birth Date Compatibility</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Two dates of birth, two life paths — see how naturally they harmonise.
          </p>
        </section>

        <section className="px-6 pb-10 max-w-3xl mx-auto">
          <form onSubmit={submit} className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Your Birth Date</label>
                <DatePicker value={dobA} onChange={setDobA} maxDate={new Date()} />
              </div>
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Partner&apos;s Birth Date</label>
                <DatePicker value={dobB} onChange={setDobB} maxDate={new Date()} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={loading} variant="primary-fill" className="rounded-xl px-8">
                {loading ? "Computing…" : "Match Our Dates"}
              </Button>
            </div>
          </form>
        </section>

        {result && (
          <section className="px-6 pb-24 max-w-4xl mx-auto space-y-5">
            <div className={`glass border rounded-2xl p-8 text-center ${SCORE_CLASS(result.score)}`}>
              <p className="text-xs uppercase font-bold tracking-widest text-veda-orange">Life Path Compatibility</p>
              <h2 className="font-serif text-5xl text-white mt-2">{result.score}<span className="text-2xl text-white/40">/100</span></h2>
              <p className="text-white/70 mt-1">{result.rating}</p>
              <p className="text-white/65 mt-4 max-w-md mx-auto">{result.summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="glass border border-white/10 rounded-xl p-5">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Your Life Path</div>
                <div className="text-4xl font-serif text-veda-orange mt-1">{result.lifePath.a.value}</div>
                <p className="text-sm text-white mt-1">{result.lifePath.a.meaning?.title}</p>
                <p className="text-xs text-white/55 mt-1">{result.lifePath.a.meaning?.traits}</p>
              </div>
              <div className="glass border border-white/10 rounded-xl p-5">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Partner&apos;s Life Path</div>
                <div className="text-4xl font-serif text-veda-orange mt-1">{result.lifePath.b.value}</div>
                <p className="text-sm text-white mt-1">{result.lifePath.b.meaning?.title}</p>
                <p className="text-xs text-white/55 mt-1">{result.lifePath.b.meaning?.traits}</p>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
