"use client";
import { useState } from "react";
import { FiAward } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BirthForm from "@/components/BirthForm";

function GemCard({ g, accent = false }) {
  return (
    <div className={`glass border rounded-2xl p-5 ${accent ? "border-veda-orange/40 bg-veda-orange/5" : "border-white/10"}`}>
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] uppercase font-bold tracking-widest text-veda-orange">{g.role || g.planet}</p>
        <span className="text-xs text-white/40">{g.day}</span>
      </div>
      <h3 className="font-serif text-2xl text-white mt-1">{g.gem}</h3>
      <p className="text-sm text-white/55 mt-0.5">For {g.planet}</p>
      <dl className="grid grid-cols-2 gap-x-3 gap-y-1 mt-4 text-xs">
        <dt className="text-white/40">Metal</dt><dd className="text-white">{g.metal}</dd>
        <dt className="text-white/40">Finger</dt><dd className="text-white">{g.finger}</dd>
        <dt className="text-white/40">Weight</dt><dd className="text-white">{g.weight}</dd>
      </dl>
    </div>
  );
}

export default function GemstonesPage() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const submit = async (b) => {
    setError("");
    const res = await fetch("/api/reports", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "gemstones", ...b }),
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
              <FiAward className="w-3 h-3" /> Ratna Recommendation
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Gemstones Report</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Your Lagna lord and friendly planets each have a gemstone signature. Find yours.
            </p>
          </div>
        </section>

        <section className="px-6 pb-10 max-w-3xl mx-auto">
          <BirthForm onSubmit={submit} submitLabel="Recommend My Gems" />
          {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
        </section>

        {report && (
          <section className="px-6 pb-24 max-w-5xl mx-auto space-y-5">
            <div className="text-center mb-2">
              <p className="text-xs uppercase font-bold tracking-widest text-veda-orange">Your Ascendant</p>
              <h2 className="font-serif text-3xl text-white mt-1">{report.ascendant.en} <span className="text-white/40 text-xl">({report.ascendant.hi})</span></h2>
              <p className="text-white/45 text-sm">Lagna Lord · {report.ascendantLord}</p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-white mb-3">Recommended Gemstones</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <GemCard g={report.primaryGem} accent />
                {report.secondaryGems.map((g) => <GemCard key={g.planet} g={g} />)}
              </div>
            </div>

            {report.avoid?.length > 0 && (
              <div>
                <h3 className="font-serif text-lg text-white mb-3">Gemstones to Avoid (without expert consultation)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {report.avoid.map((g) => (
                    <div key={g.planet} className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
                      <p className="font-serif text-white">{g.gem}</p>
                      <p className="text-xs text-rose-300/80 mt-1">For {g.planet} — may not suit your lagna without remedies</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="glass border border-white/10 rounded-xl p-5">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">Notes</h4>
              <ul className="space-y-1.5">
                {report.notes.map((n, i) => (<li key={i} className="text-sm text-white/65 flex gap-2"><span className="text-veda-gold">·</span> {n}</li>))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
