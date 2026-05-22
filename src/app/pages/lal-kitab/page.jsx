"use client";
import { useState } from "react";
import Link from "next/link";
import { FiBookOpen, FiGrid, FiFileText, FiDownload, FiArrowRight } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BirthForm from "@/components/BirthForm";

export default function LalKitabHomePage() {
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
            <FiBookOpen className="w-3 h-3" /> Pandit Roopchand Joshi · 1939
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Lal Kitab</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            "The Red Book" — Vedic astrology re-imagined with a fixed-house chart and breathtakingly practical remedies (totke). Compute your teva below.
          </p>
        </section>

        <section className="px-6 pb-8 max-w-3xl mx-auto">
          <BirthForm onSubmit={submit} submitLabel="Build My Teva" />
          {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
        </section>

        {report && (
          <section className="px-6 pb-12 max-w-5xl mx-auto space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="glass border border-white/10 rounded-xl p-5">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Planets needing remedy</div>
                <div className="text-4xl font-serif text-veda-orange mt-1">{report.placements.filter((p) => p.needsRemedy).length}</div>
                <div className="text-xs text-white/55 mt-1">out of 9 grahas</div>
              </div>
              <div className="glass border border-white/10 rounded-xl p-5">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Karmic debts</div>
                <div className="text-4xl font-serif text-veda-orange mt-1">{report.debts.length}</div>
                <div className="text-xs text-white/55 mt-1">rinanubandh flags</div>
              </div>
              <div className="glass border border-white/10 rounded-xl p-5">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">35-year Teva</div>
                <div className="text-4xl font-serif text-veda-orange mt-1">{report.teva.length}</div>
                <div className="text-xs text-white/55 mt-1">years of yearly predictions</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/pages/lal-kitab-chart" className="glass border border-veda-orange/30 bg-veda-orange/5 hover:bg-veda-orange/15 rounded-xl p-5 transition-colors group">
                <FiGrid className="w-6 h-6 text-veda-orange mb-2" />
                <p className="font-serif text-white">View Full Chart</p>
                <p className="text-xs text-white/55 mt-0.5 group-hover:text-white/80">12-house visual layout with all planets</p>
                <FiArrowRight className="w-4 h-4 text-veda-orange mt-3" />
              </Link>
              <Link href="/pages/lal-kitab-worksheet" className="glass border border-white/10 hover:border-veda-orange/40 rounded-xl p-5 transition-colors group">
                <FiFileText className="w-6 h-6 text-veda-gold mb-2" />
                <p className="font-serif text-white">Worksheet & Remedies</p>
                <p className="text-xs text-white/55 mt-0.5">Tabular teva with planet-by-planet remedies</p>
                <FiArrowRight className="w-4 h-4 text-veda-gold mt-3" />
              </Link>
              <Link href="/pages/lal-kitab-ebook" className="glass border border-white/10 hover:border-veda-orange/40 rounded-xl p-5 transition-colors group">
                <FiDownload className="w-6 h-6 text-veda-gold mb-2" />
                <p className="font-serif text-white">Personal E-book</p>
                <p className="text-xs text-white/55 mt-0.5">Printable comprehensive Lal Kitab report</p>
                <FiArrowRight className="w-4 h-4 text-veda-gold mt-3" />
              </Link>
            </div>
          </section>
        )}

        <section className="px-6 pb-24 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "Fixed Houses", body: "House 1 is always Aries, House 12 always Pisces. Your ascendant does not move them." },
              { title: "Practical Totke", body: "Remedies use everyday items — wheat, jaggery, mustard oil, copper coins — rather than expensive gems." },
              { title: "Yearly Teva", body: "A pyramid arrangement gives a year-by-year forecast for 35 years of life." },
            ].map((f) => (
              <div key={f.title} className="glass border border-white/10 rounded-2xl p-6">
                <h3 className="font-serif text-lg text-veda-orange">{f.title}</h3>
                <p className="text-sm text-white/65 mt-2 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
