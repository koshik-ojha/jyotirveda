"use client";
import { useState } from "react";
import { FiHash, FiUser, FiGrid } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";

function isoDate(d) {
  return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` : "";
}

const PYTHAGOREAN = { A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9, J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9, S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8 };

export default function NumerologyChartPage() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !dob) return setError("Name and DOB needed");
    setLoading(true);
    try {
      const res = await fetch("/api/numerology", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), dob: isoDate(dob) }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error);
      else setReport(data.report);
    } finally { setLoading(false); }
  };

  const letters = name.toUpperCase().split("").filter((c) => /[A-Z]/.test(c));

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-12 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              <FiGrid className="w-3 h-3" /> Full Numerology Chart
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Numerology Chart</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">Every letter of your name carries a number — see the entire grid laid out.</p>
          </div>
        </section>

        <section className="px-6 pb-10 max-w-3xl mx-auto">
          <form onSubmit={submit} className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-5">
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Full Name</label>
              <div className="relative">
                <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                <Input value={name} onChange={(e) => setName(e.target.value)} className="pl-10" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Date of Birth</label>
              <DatePicker value={dob} onChange={setDob} maxDate={new Date()} />
            </div>
            {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
            <div className="flex justify-end">
              <Button type="submit" disabled={loading} variant="primary-fill" className="rounded-xl px-8">
                {loading ? "Computing…" : "Build My Chart"}
              </Button>
            </div>
          </form>
        </section>

        {report && (
          <section className="px-6 pb-24 max-w-5xl mx-auto space-y-6">
            <div className="glass border border-white/10 rounded-2xl p-6">
              <h3 className="font-serif text-xl text-white mb-4">Letter-by-Letter Breakdown</h3>
              <div className="flex flex-wrap gap-2">
                {letters.map((c, i) => (
                  <div key={i} className="flex flex-col items-center px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10">
                    <span className="font-serif text-lg text-white">{c}</span>
                    <span className="text-xs text-veda-orange font-mono">{PYTHAGOREAN[c]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                <div><span className="text-white/40">Letters:</span> <span className="text-white">{report.sums.letters}</span></div>
                <div><span className="text-white/40">Vowels:</span> <span className="text-white">{report.sums.vowels}</span></div>
                <div><span className="text-white/40">Consonants:</span> <span className="text-white">{report.sums.consonants}</span></div>
                <div><span className="text-white/40">Letter sum:</span> <span className="text-white">{report.sums.destinySum}</span></div>
                <div><span className="text-white/40">Vowel sum:</span> <span className="text-white">{report.sums.soulUrgeSum}</span></div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                ["Life Path", report.coreNumbers.lifePath],
                ["Destiny", report.coreNumbers.destiny],
                ["Soul Urge", report.coreNumbers.soulUrge],
                ["Personality", report.coreNumbers.personality],
                ["Birthday", report.coreNumbers.birthday],
                ["Maturity", report.coreNumbers.maturity],
              ].map(([t, n]) => (
                <div key={t} className="glass border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-[10px] uppercase tracking-widest text-white/40">{t}</div>
                  <div className="text-3xl font-serif text-veda-orange mt-1">{n.value}</div>
                  <div className="text-[11px] text-white/55 mt-1">{n.meaning?.title}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="glass border border-white/10 rounded-2xl p-5">
                <h4 className="font-serif text-white mb-2">Karmic Debts</h4>
                {report.karmic.debts.length === 0 ? <p className="text-sm text-white/50">None — clean slate.</p> :
                  <ul className="space-y-1.5 text-sm">{report.karmic.debts.map((d) => <li key={d.number} className="text-white/70"><b className="text-rose-300">{d.number}</b> — {d.meaning}</li>)}</ul>
                }
              </div>
              <div className="glass border border-white/10 rounded-2xl p-5">
                <h4 className="font-serif text-white mb-2">Karmic Lessons</h4>
                {report.karmic.lessons.length === 0 ? <p className="text-sm text-white/50">Energetically complete.</p> :
                  <ul className="space-y-1.5 text-sm">{report.karmic.lessons.map((l) => <li key={l.number} className="text-white/70"><b className="text-amber-300">{l.number}</b> — {l.meaning}</li>)}</ul>
                }
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
