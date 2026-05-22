"use client";
import { useState } from "react";
import { FiClock } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BirthForm from "@/components/BirthForm";

export default function VimshottariDashaPage() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const submit = async (b) => {
    setError("");
    const res = await fetch("/api/reports", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "dasha", ...b }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error);
    else setReport(data.report);
  };

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              <FiClock className="w-3 h-3" /> 120-year Cycle
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Vimshottari Dasha</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              The 120-year planetary timeline starting from your Moon's nakshatra at birth.
            </p>
          </div>
        </section>

        <section className="px-6 pb-10 max-w-3xl mx-auto">
          <BirthForm onSubmit={submit} submitLabel="Build My Dasha" />
          {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
        </section>

        {report && (
          <section className="px-6 pb-24 max-w-5xl mx-auto space-y-5">
            <div className="glass border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-xs uppercase font-bold tracking-widest text-veda-orange">Birth Mahadasha Lord</p>
              <h2 className="font-serif text-4xl text-white mt-2">{report.dasha.birthLord}</h2>
              <p className="text-white/50 mt-1">Moon in {report.moonRashi.en} · {report.janmaNakshatra.en} pada {report.janmaNakshatra.pada}</p>
              <p className="text-xs text-white/40 mt-3 font-mono">Balance at birth: {report.dasha.balanceYears.toFixed(2)} years</p>
            </div>

            <div className="glass border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/10 font-serif text-white">Mahadasha Timeline</div>
              <div className="divide-y divide-white/5">
                {report.dasha.mahadashas.map((m, i) => (
                  <details key={i} className="group">
                    <summary className="px-5 py-3 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] list-none">
                      <div className="flex items-center gap-4">
                        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                          i === 0 ? "bg-veda-orange/20 text-veda-orange border border-veda-orange/30" : "bg-white/5 text-white/60 border border-white/10"
                        }`}>{m.lord}</span>
                        <span className="text-sm text-white/70 font-mono">{m.start.slice(0,10)} → {m.end.slice(0,10)}</span>
                        <span className="text-xs text-white/40">{m.years.toFixed(1)} yrs</span>
                      </div>
                      <span className="text-veda-orange text-xs group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <div className="px-5 pb-4 pt-1 bg-black/20">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                        {m.antardashas.map((a, j) => (
                          <div key={j} className="flex items-center justify-between rounded-md bg-white/5 px-3 py-1.5">
                            <span className="font-medium text-white/80">{m.lord} / {a.lord}</span>
                            <span className="text-white/50 font-mono">{a.start.slice(0,10)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
