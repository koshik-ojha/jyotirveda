"use client";
import { useState } from "react";
import { FiHash, FiCalendar, FiUser, FiStar } from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";

function isoDate(d) {
  return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` : "";
}

const QUICK_CORE = [
  { key: "lifePath",    label: "Life Path" },
  { key: "destiny",     label: "Destiny" },
  { key: "soulUrge",    label: "Soul Urge" },
  { key: "personality", label: "Personality" },
];

function ResultCard({ n, title }) {
  return (
    <div className="glass border border-white/10 rounded-2xl p-5">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">{title}</span>
        <span className="text-3xl font-serif text-veda-orange">{n.value}</span>
      </div>
      {n.meaning && (
        <>
          <p className="text-white font-serif text-base">{n.meaning.title}</p>
          <p className="text-xs text-white/55 mt-1.5 leading-relaxed">{n.meaning.traits}</p>
        </>
      )}
    </div>
  );
}

export default function NumerologyPage() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !dob) return setError("Please enter your full name and date of birth.");
    setLoading(true);
    setReport(null);
    try {
      const res = await fetch("/api/numerology", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), dob: isoDate(dob) }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed"); return; }
      setReport(data.report);
    } catch { setError("Network error"); }
    finally { setLoading(false); }
  };

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-12 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              <FiHash className="w-3 h-3" /> Pythagorean Numerology
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Numerology Calculator</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Your full name and date of birth contain the blueprint of your soul's mathematics.
            </p>
          </div>
        </section>

        <section className="px-6 pb-10 max-w-3xl mx-auto">
          <form onSubmit={submit} className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-5">
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Full Name (as on birth records)</label>
              <div className="relative">
                <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                <Input value={name} onChange={(e) => setName(e.target.value)} className="pl-10" placeholder="e.g. Albert Einstein" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Date of Birth</label>
              <DatePicker value={dob} onChange={setDob} placeholder="Pick birth date" maxDate={new Date()} />
            </div>
            {error && <p className="text-sm text-red-400/90 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
            <div className="flex justify-end">
              <Button type="submit" disabled={loading} variant="primary-fill" className="rounded-xl px-8">
                {loading ? "Computing…" : "Reveal My Numbers"}
              </Button>
            </div>
          </form>
        </section>

        {report && (
          <section className="px-6 pb-24 max-w-5xl mx-auto space-y-6">
            <div className="text-center">
              <p className="text-xs uppercase font-bold tracking-widest text-veda-orange">Your Numerology Profile</p>
              <h2 className="font-serif text-3xl text-white mt-1">{report.input.name}</h2>
              <p className="text-white/40 text-sm">Born {report.input.dob}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {QUICK_CORE.map((c) => (
                <ResultCard key={c.key} n={report.coreNumbers[c.key]} title={c.label} />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="glass border border-white/10 rounded-2xl p-5">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">Today is your Personal Day</div>
                <div className="text-4xl font-serif text-veda-gold">{report.cycles.personalDay.value}</div>
                <div className="text-xs text-white/55 mt-2">{report.cycles.personalDay.meaning?.traits}</div>
              </div>
              <div className="glass border border-white/10 rounded-2xl p-5">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">Personal Month</div>
                <div className="text-4xl font-serif text-veda-gold">{report.cycles.personalMonth.value}</div>
                <div className="text-xs text-white/55 mt-2">{report.cycles.personalMonth.meaning?.title}</div>
              </div>
              <div className="glass border border-white/10 rounded-2xl p-5">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">Personal Year</div>
                <div className="text-4xl font-serif text-veda-gold">{report.cycles.personalYear.value}</div>
                <div className="text-xs text-white/55 mt-2">{report.cycles.personalYear.meaning?.title}</div>
              </div>
            </div>

            {(report.karmic.debts.length > 0 || report.karmic.lessons.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="glass border border-rose-500/20 rounded-2xl p-5">
                  <h4 className="font-serif text-white mb-2 flex items-center gap-2"><FiStar className="text-rose-300 w-4 h-4" /> Karmic Debts</h4>
                  {report.karmic.debts.length === 0 ? <p className="text-sm text-white/50">None — your slate is clean.</p> :
                    <ul className="space-y-2 text-sm">{report.karmic.debts.map((d) => <li key={d.number} className="text-white/70"><b className="text-rose-300">{d.number}</b> — {d.meaning}</li>)}</ul>
                  }
                </div>
                <div className="glass border border-amber-500/20 rounded-2xl p-5">
                  <h4 className="font-serif text-white mb-2 flex items-center gap-2"><FiStar className="text-amber-300 w-4 h-4" /> Karmic Lessons</h4>
                  {report.karmic.lessons.length === 0 ? <p className="text-sm text-white/50">Your name is energetically complete.</p> :
                    <ul className="space-y-2 text-sm">{report.karmic.lessons.map((l) => <li key={l.number} className="text-white/70"><b className="text-amber-300">{l.number}</b> — {l.meaning}</li>)}</ul>
                  }
                </div>
              </div>
            )}

            <div className="glass border border-white/10 rounded-2xl p-5">
              <h4 className="font-serif text-white mb-3">Maturity Number</h4>
              <div className="flex items-center gap-4">
                <div className="text-5xl font-serif text-veda-orange">{report.coreNumbers.maturity.value}</div>
                <div>
                  <p className="text-white font-serif">{report.coreNumbers.maturity.meaning?.title}</p>
                  <p className="text-xs text-white/55 mt-1">{report.coreNumbers.maturity.meaning?.traits}</p>
                </div>
              </div>
              <p className="text-[11px] text-white/35 mt-3">The maturity number emerges as a guiding theme from around age 35 onwards.</p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
