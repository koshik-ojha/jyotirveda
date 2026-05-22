"use client";
import { useEffect, useRef, useState } from "react";
import { FiDownload, FiBookOpen, FiPrinter } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BirthForm from "@/components/BirthForm";

const PLANET_SYMBOL = { Sun: "☉", Moon: "☽", Mars: "♂", Mercury: "☿", Jupiter: "♃", Venus: "♀", Saturn: "♄", Rahu: "☊", Ketu: "☋" };

export default function LalKitabEbookPage() {
  const [report, setReport] = useState(null);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");
  const rootRef = useRef(null);

  useEffect(() => {
    const open = () => rootRef.current?.querySelectorAll("details").forEach((el) => { el.dataset.prevOpen = el.open ? "1" : "0"; el.open = true; });
    const close = () => rootRef.current?.querySelectorAll("details").forEach((el) => { if (el.dataset.prevOpen === "0") el.open = false; });
    window.addEventListener("beforeprint", open);
    window.addEventListener("afterprint", close);
    return () => { window.removeEventListener("beforeprint", open); window.removeEventListener("afterprint", close); };
  }, []);

  const submit = async (b) => {
    setError("");
    setInfo({ date: b.date, time: b.time, place: b.place?.shortName || b.place?.displayName });
    const res = await fetch("/api/reports", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "lal-kitab", ...b }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error);
    else setReport(data.report);
  };

  const handleExport = () => typeof window !== "undefined" && window.print();

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6 text-center no-print">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
            <FiBookOpen className="w-3 h-3" /> Personal Lal Kitab E-book
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Your Free Lal Kitab E-book</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Generate a complete personal Lal Kitab report — chart, teva, remedies, 35-year forecast — then save it as a PDF.
          </p>
        </section>

        <section className="px-6 pb-6 max-w-3xl mx-auto no-print">
          <BirthForm onSubmit={submit} submitLabel="Compile My E-book" />
          {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
        </section>

        {report && (
          <>
            <section className="px-6 pb-6 max-w-5xl mx-auto no-print">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="text-sm text-white/55">Report ready — {report.placements.length} grahas, {report.teva.length} year teva.</p>
                <button onClick={handleExport}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #F18C3A, #D99152)", boxShadow: "0 4px 18px rgba(241,140,58,0.3)" }}>
                  <FiDownload className="w-4 h-4" /> Download as PDF
                </button>
              </div>
            </section>

            <section className="px-6 pb-24 max-w-5xl mx-auto">
              <article ref={rootRef} className="print-area space-y-6">
                <header className="hidden print:block">
                  <h1 className="text-3xl font-serif">Lal Kitab Personal Teva</h1>
                  {info && <p className="text-sm opacity-75 mt-1">{info.date} {info.time} · {info.place}</p>}
                </header>

                <div className="glass border border-white/10 rounded-2xl p-6">
                  <h2 className="font-serif text-2xl text-white mb-1">Chapter 1 — Planet Placements</h2>
                  <p className="text-xs text-white/50 mb-4">Each graha lives in one of the 12 fixed houses (Aries to Pisces). The keynote tells you what it brings.</p>
                  <ul className="divide-y divide-white/5">
                    {report.placements.map((p) => (
                      <li key={p.key} className="py-2.5 grid grid-cols-12 gap-3 text-sm items-baseline">
                        <span className="col-span-3 text-white font-medium">{PLANET_SYMBOL[p.key]} {p.key}</span>
                        <span className="col-span-2 text-veda-gold font-mono">House {p.house}</span>
                        <span className="col-span-7 text-white/65 leading-relaxed">{p.keynote}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass border border-white/10 rounded-2xl p-6">
                  <h2 className="font-serif text-2xl text-white mb-1">Chapter 2 — Remedies (Totke)</h2>
                  <p className="text-xs text-white/50 mb-4">Only for grahas flagged as needing remediation. Practical, household-scale.</p>
                  {report.placements.filter((p) => p.needsRemedy).length === 0 ? (
                    <p className="text-emerald-200">All grahas are settled. Maintain general dharma and your reading is complete.</p>
                  ) : (
                    <div className="space-y-4">
                      {report.placements.filter((p) => p.needsRemedy).map((p) => (
                        <details key={p.key} open className="border-l-2 border-veda-orange/40 pl-4">
                          <summary className="cursor-pointer font-serif text-veda-orange">{PLANET_SYMBOL[p.key]} {p.key} in House {p.house}</summary>
                          <ul className="mt-2 space-y-1.5">
                            {p.remedies.map((r, i) => (<li key={i} className="text-sm text-white/70">· {r}</li>))}
                          </ul>
                        </details>
                      ))}
                    </div>
                  )}
                </div>

                <div className="glass border border-white/10 rounded-2xl p-6">
                  <h2 className="font-serif text-2xl text-white mb-1">Chapter 3 — 35-Year Teva</h2>
                  <p className="text-xs text-white/50 mb-4">Saturn's house each year of life — the year-by-year backdrop.</p>
                  <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
                    {report.teva.map((t) => (
                      <div key={t.age} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5 text-center">
                        <div className="text-[10px] text-white/40">Age {t.age}</div>
                        <div className="text-sm font-mono text-veda-orange">H{t.house}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {report.debts.length > 0 && (
                  <div className="glass border border-amber-500/20 rounded-2xl p-6">
                    <h2 className="font-serif text-2xl text-white mb-1">Chapter 4 — Karmic Debts</h2>
                    <ul className="space-y-2 mt-3">
                      {report.debts.map((d, i) => (<li key={i} className="text-sm text-white/70">· {d}</li>))}
                    </ul>
                  </div>
                )}
              </article>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
