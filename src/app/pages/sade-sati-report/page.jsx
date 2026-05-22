"use client";
import { useState } from "react";
import { FiClock } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BirthForm from "@/components/BirthForm";

export default function SadeSatiPage() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const submit = async (b) => {
    setError("");
    const res = await fetch("/api/reports", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "sade-sati", ...b }),
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
              Saturn's 7½-year Transit
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Sade Sati Report</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Saturn's transit through your 12th, 1st and 2nd from natal Moon — the great reorganiser.
            </p>
          </div>
        </section>

        <section className="px-6 pb-10 max-w-3xl mx-auto">
          <BirthForm onSubmit={submit} submitLabel="Check My Sade Sati" />
          {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
        </section>

        {report && (
          <section className="px-6 pb-24 max-w-4xl mx-auto space-y-5">
            <div className={`glass border rounded-2xl p-8 text-center ${
              report.active ? "border-amber-500/30 bg-amber-500/5"
              : report.isDhaiya ? "border-amber-500/20 bg-amber-500/5"
              : "border-emerald-500/30 bg-emerald-500/5"
            }`}>
              <FiClock className={`w-10 h-10 mx-auto mb-3 ${report.active || report.isDhaiya ? "text-amber-300" : "text-emerald-300"}`} />
              <p className="text-xs uppercase font-bold tracking-widest text-white/50">Status</p>
              <h2 className="font-serif text-3xl text-white mt-2">
                {report.active ? report.phase.name : report.isDhaiya ? report.dhaiyaType : "Not Currently Active"}
              </h2>
              <p className="text-white/70 mt-3 max-w-md mx-auto">{report.summary}</p>
              {report.active && report.progressPct != null && (
                <div className="mt-5 max-w-xs mx-auto">
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-amber-400/70" style={{ width: `${report.progressPct}%` }} />
                  </div>
                  <p className="text-[11px] text-white/45 mt-2">{report.progressPct}% through this sub-phase</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="glass border border-white/10 rounded-xl p-4">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Saturn currently in</div>
                <div className="text-white font-serif mt-1">{report.saturnSign.en}</div>
              </div>
              <div className="glass border border-white/10 rounded-xl p-4">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Your natal Moon</div>
                <div className="text-white font-serif mt-1">{report.natalMoonSign.en}</div>
              </div>
              <div className="glass border border-white/10 rounded-xl p-4">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">House from Moon</div>
                <div className="text-3xl font-serif text-veda-orange mt-1">{report.house}</div>
              </div>
            </div>

            {report.remedies.length > 0 && (
              <div className="glass border border-amber-500/20 rounded-xl p-5">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-amber-300 mb-2">Remedies</h4>
                <ul className="space-y-1.5">
                  {report.remedies.map((r, i) => (<li key={i} className="text-sm text-white/70 flex gap-2"><span className="text-amber-300">·</span> {r}</li>))}
                </ul>
              </div>
            )}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
