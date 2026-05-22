"use client";
import { useState } from "react";
import { FiFileText, FiAlertCircle, FiCheck } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BirthForm from "@/components/BirthForm";

const PLANET_SYMBOL = { Sun: "☉", Moon: "☽", Mars: "♂", Mercury: "☿", Jupiter: "♃", Venus: "♀", Saturn: "♄", Rahu: "☊", Ketu: "☋" };

export default function LalKitabWorksheetPage() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const submit = async (b) => {
    setError("");
    const res = await fetch("/api/reports", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "lal-kitab", ...b }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error);
    else setReport(data.report);
  };

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
            <FiFileText className="w-3 h-3" /> Teva Worksheet
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Lal Kitab Worksheet</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            The classical tabular teva — planet by planet, with house meaning and remedies (totke).
          </p>
        </section>

        <section className="px-6 pb-8 max-w-3xl mx-auto">
          <BirthForm onSubmit={submit} submitLabel="Generate Worksheet" />
          {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
        </section>

        {report && (
          <section className="px-6 pb-24 max-w-6xl mx-auto space-y-5">
            <div className="glass border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 text-white/50 text-[10px] uppercase tracking-wider">
                    <tr>
                      <th className="text-left px-4 py-3">Graha</th>
                      <th className="text-left px-3 py-3">House</th>
                      <th className="text-left px-3 py-3">Sign</th>
                      <th className="text-left px-3 py-3">Teva Reading</th>
                      <th className="text-center px-3 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.placements.map((p) => (
                      <tr key={p.key} className={`border-t border-white/5 ${p.needsRemedy ? "bg-rose-500/[0.04]" : ""}`}>
                        <td className="px-4 py-3 font-medium text-white">
                          <span className="text-veda-gold mr-2">{PLANET_SYMBOL[p.key]}</span> {p.key}
                          {p.retrograde && <span className="ml-1 text-[10px] text-rose-300">(R)</span>}
                        </td>
                        <td className="px-3 py-3 text-veda-gold font-mono">H{p.house}</td>
                        <td className="px-3 py-3 text-white/80">{p.sign.en}</td>
                        <td className="px-3 py-3 text-white/65 leading-relaxed">{p.keynote}</td>
                        <td className="px-3 py-3 text-center">
                          {p.needsRemedy
                            ? <span className="inline-flex items-center gap-1 text-rose-300 text-[10px] uppercase font-bold"><FiAlertCircle className="w-3 h-3" /> Remedy</span>
                            : <span className="inline-flex items-center gap-1 text-emerald-300 text-[10px] uppercase font-bold"><FiCheck className="w-3 h-3" /> Settled</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Remedies section */}
            <div>
              <h3 className="font-serif text-xl text-white mb-3">Remedies (Totke)</h3>
              {report.placements.filter((p) => p.needsRemedy).length === 0 ? (
                <div className="glass border border-emerald-500/20 rounded-xl p-5 text-center">
                  <FiCheck className="w-8 h-8 mx-auto text-emerald-300 mb-2" />
                  <p className="text-white">All grahas are settled. No remedies needed at this time.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {report.placements.filter((p) => p.needsRemedy).map((p) => (
                    <div key={p.key} className="glass border border-rose-500/20 bg-rose-500/5 rounded-xl p-5">
                      <div className="flex items-baseline justify-between mb-2">
                        <h4 className="font-serif text-white">{PLANET_SYMBOL[p.key]} {p.key}</h4>
                        <span className="text-xs text-white/45">in H{p.house}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {p.remedies.map((r, i) => (<li key={i} className="text-sm text-white/70 flex gap-2"><span className="text-rose-300">·</span> {r}</li>))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 35-year teva */}
            <div className="glass border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/10 font-serif text-white">35-Year Teva (Saturn's house each year)</div>
              <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 lg:grid-cols-12 gap-1.5 p-4 text-center">
                {report.teva.map((t) => (
                  <div key={t.age} className="rounded-md border border-white/10 bg-white/[0.03] py-1.5">
                    <div className="text-[10px] text-white/40">{t.age}</div>
                    <div className="text-sm font-mono text-veda-orange">H{t.house}</div>
                  </div>
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
