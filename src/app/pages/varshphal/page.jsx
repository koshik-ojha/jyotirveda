"use client";
import { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BirthForm from "@/components/BirthForm";
import { Input } from "@/components/ui/input";

export default function VarshphalPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const submit = async (b) => {
    setError("");
    const res = await fetch("/api/reports", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "varshphal", year: parseInt(year, 10), ...b }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error);
    else setReport(data.report);
  };

  const yearInput = (
    <div>
      <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Year for Varshphal</label>
      <Input type="number" min="1900" max="2100" value={year} onChange={(e) => setYear(e.target.value)} />
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              <FiCalendar className="w-3 h-3" /> Tajik Annual Chart
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Varshphal</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Your annual chart begins when the Sun returns to its exact natal position.
            </p>
          </div>
        </section>

        <section className="px-6 pb-10 max-w-3xl mx-auto">
          <BirthForm onSubmit={submit} submitLabel="Compute Year Chart" extras={yearInput} />
          {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
        </section>

        {report && (
          <section className="px-6 pb-24 max-w-4xl mx-auto space-y-5">
            <div className="glass border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-xs uppercase font-bold tracking-widest text-veda-orange">Varshpravesh ({report.year})</p>
              <h2 className="font-serif text-3xl text-white mt-2 font-mono">{new Date(report.varshapravesh).toLocaleString()}</h2>
              <p className="text-white/50 text-sm mt-1">Sun returns to natal longitude</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="glass border border-white/10 rounded-xl p-5">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Year Age</div>
                <div className="font-serif text-3xl text-veda-orange mt-1">{report.yearAge}</div>
              </div>
              <div className="glass border border-white/10 rounded-xl p-5">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Muntha Sign</div>
                <div className="font-serif text-xl text-white mt-1">{report.munthaSign.en}</div>
                <div className="text-xs text-white/40 mt-0.5">{report.munthaSign.hi}</div>
              </div>
              <div className="glass border border-white/10 rounded-xl p-5">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Year Lord</div>
                <div className="font-serif text-xl text-white mt-1">{report.varshaLord}</div>
              </div>
            </div>

            <div className="glass border border-veda-orange/20 rounded-xl p-5">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-veda-orange mb-2">Summary</h4>
              <p className="text-white/75">{report.summary}</p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
