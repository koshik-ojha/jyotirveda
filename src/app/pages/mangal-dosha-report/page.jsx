"use client";
import { useState } from "react";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BirthForm from "@/components/BirthForm";

const SEVERITY_COLOR = {
  high:      "border-rose-500/30 bg-rose-500/5 text-rose-300",
  moderate:  "border-amber-500/30 bg-amber-500/5 text-amber-300",
  mild:      "border-amber-500/20 bg-amber-500/5 text-amber-300",
  cancelled: "border-emerald-500/30 bg-emerald-500/5 text-emerald-300",
  none:      "border-emerald-500/30 bg-emerald-500/5 text-emerald-300",
};

export default function MangalDoshaPage() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const submit = async (b) => {
    setError("");
    const res = await fetch("/api/reports", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "mangal-dosha", ...b }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error);
    else setReport(data.report);
  };

  const colorClass = report ? SEVERITY_COLOR[report.severity] || "" : "";

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              Mars-in-marriage Analysis
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Mangal Dosha Report</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Is Mars in the 1st, 4th, 7th, 8th or 12th from your Lagna, Moon or Venus? Find out.
            </p>
          </div>
        </section>

        <section className="px-6 pb-10 max-w-3xl mx-auto">
          <BirthForm onSubmit={submit} submitLabel="Check Manglik Status" />
          {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
        </section>

        {report && (
          <section className="px-6 pb-24 max-w-4xl mx-auto space-y-5">
            <div className={`glass border rounded-2xl p-8 text-center ${colorClass.split(" ").slice(0,2).join(" ")}`}>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${colorClass.split(" ")[0]} ${colorClass.split(" ")[2]}`}>
                {report.isManglik ? <FiAlertTriangle className="w-8 h-8" /> : <FiCheckCircle className="w-8 h-8" />}
              </div>
              <p className="text-xs uppercase font-bold tracking-widest text-white/50">Result</p>
              <h2 className="font-serif text-3xl text-white mt-2 capitalize">{report.severity} Mangal Dosha</h2>
              <p className="text-white/70 mt-3 max-w-md mx-auto">{report.summary}</p>
              {report.cancellation && (
                <p className="text-emerald-200 text-sm mt-3">✓ {report.cancellation}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="glass border border-white/10 rounded-xl p-4 text-center">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Mars from Lagna</div>
                <div className="text-3xl font-serif text-veda-orange mt-1">{report.marsHouseFromLagna}</div>
              </div>
              <div className="glass border border-white/10 rounded-xl p-4 text-center">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">From Moon</div>
                <div className="text-3xl font-serif text-veda-orange mt-1">{report.marsHouseFromMoon}</div>
              </div>
              <div className="glass border border-white/10 rounded-xl p-4 text-center">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">From Venus</div>
                <div className="text-3xl font-serif text-veda-orange mt-1">{report.marsHouseFromVenus}</div>
              </div>
            </div>

            <div className="glass border border-white/10 rounded-xl p-5">
              <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Mars in</div>
              <div className="text-white text-lg font-serif mt-1">{report.marsSign.en} ({report.marsSign.hi})</div>
              <div className="text-xs text-white/40 mt-1">Element {report.marsSign.element} · Lord {report.marsSign.lord}</div>
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
