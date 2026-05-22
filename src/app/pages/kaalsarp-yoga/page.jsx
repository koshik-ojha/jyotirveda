"use client";
import { useState } from "react";
import { FiAlertOctagon, FiCheckCircle } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BirthForm from "@/components/BirthForm";

export default function KaalsarpPage() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const submit = async (b) => {
    setError("");
    const res = await fetch("/api/reports", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "kaalsarp", ...b }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || "Failed");
    else setReport(data.report);
  };

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              Rahu–Ketu Axis Analysis
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Kaalsarp Yoga / Dosha</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              When every traditional planet falls on one side of the Rahu–Ketu axis, the chart enters Kaalsarp.
            </p>
          </div>
        </section>

        <section className="px-6 pb-10 max-w-3xl mx-auto">
          <BirthForm onSubmit={submit} submitLabel="Check My Chart" />
          {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
        </section>

        {report && (
          <section className="px-6 pb-24 max-w-4xl mx-auto space-y-5">
            <div className={`glass border rounded-2xl p-8 text-center ${
              report.isYoga ? "border-rose-500/30 bg-rose-500/5"
              : report.partial ? "border-amber-500/30 bg-amber-500/5"
              : "border-emerald-500/30 bg-emerald-500/5"
            }`}>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                report.isYoga ? "bg-rose-500/15 text-rose-300"
                : report.partial ? "bg-amber-500/15 text-amber-300"
                : "bg-emerald-500/15 text-emerald-300"
              }`}>
                {report.isYoga ? <FiAlertOctagon className="w-8 h-8" /> : <FiCheckCircle className="w-8 h-8" />}
              </div>
              <p className="text-xs uppercase font-bold tracking-widest text-white/50">Verdict</p>
              <h2 className="font-serif text-3xl text-white mt-2">
                {report.isYoga ? report.type.name : report.partial ? "Partial Kaalsarp" : "No Kaalsarp Yoga"}
              </h2>
              <p className="text-white/70 mt-3 max-w-md mx-auto">{report.summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="glass border border-white/10 rounded-xl p-4">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Rahu in</div>
                <div className="text-white text-lg font-serif mt-1">House {report.rahuHouse}</div>
              </div>
              <div className="glass border border-white/10 rounded-xl p-4">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Ketu in</div>
                <div className="text-white text-lg font-serif mt-1">House {report.ketuHouse}</div>
              </div>
              <div className="glass border border-white/10 rounded-xl p-4">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Planets in arc</div>
                <div className="text-white text-lg font-serif mt-1">{report.planetsInFrontArc} / 7</div>
              </div>
            </div>

            {report.type && (
              <div className="glass border border-veda-orange/20 rounded-xl p-5">
                <h4 className="font-serif text-white mb-2">Theme of {report.type.name}</h4>
                <p className="text-white/70">{report.type.theme}</p>
              </div>
            )}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
