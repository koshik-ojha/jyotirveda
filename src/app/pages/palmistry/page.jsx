"use client";
import { useState } from "react";
import { FiAperture } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const FIELDS = [
  { key: "shape", label: "Palm Shape", options: [
    ["earth", "Earth — square palm, short fingers"],
    ["air", "Air — square palm, long fingers"],
    ["fire", "Fire — rectangular palm, short fingers"],
    ["water", "Water — long palm, long fingers"],
  ]},
  { key: "heart", label: "Heart Line", options: [
    ["curved", "Curved — sweeps upward toward fingers"],
    ["straight", "Straight — runs horizontally"],
    ["broken", "Broken — has gaps or breaks"],
    ["long", "Long — extends across the palm"],
    ["short", "Short — ends near middle finger"],
  ]},
  { key: "head", label: "Head Line", options: [
    ["straight", "Straight — runs across the palm"],
    ["curved", "Curved — bends toward wrist"],
    ["long", "Long — extends to far edge of palm"],
    ["short", "Short — ends below middle finger"],
    ["forked", "Forked — splits at the end"],
  ]},
  { key: "life", label: "Life Line", options: [
    ["long_deep", "Long and deep"],
    ["long_thin", "Long but faint"],
    ["short", "Short (note: doesn't predict lifespan)"],
    ["broken", "Broken or has breaks"],
    ["curved", "Curves widely around the thumb"],
  ]},
  { key: "fate", label: "Fate Line", options: [
    ["strong", "Strong, well-defined"],
    ["weak", "Weak or faint"],
    ["none", "Not visible"],
    ["branched", "Branches at top"],
  ]},
  { key: "mount", label: "Most Prominent Mount", options: [
    ["venus", "Venus (base of thumb)"],
    ["jupiter", "Jupiter (below index finger)"],
    ["saturn", "Saturn (below middle finger)"],
    ["apollo", "Apollo (below ring finger)"],
    ["mercury", "Mercury (below little finger)"],
    ["mars", "Mars (palm sides)"],
    ["moon", "Moon (outer edge below pinky)"],
    ["none", "None — palm is flat"],
  ]},
];

export default function PalmistryPage() {
  const [features, setFeatures] = useState({});
  const [reading, setReading] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/palmistry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(features) });
    const data = await res.json();
    setReading(data.reading);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              <FiAperture className="w-3 h-3" /> Hasta Samudrika
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Palmistry</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Look at your dominant palm. Identify each feature below — your personalised reading follows.
            </p>
          </div>
        </section>

        <section className="px-6 pb-8 max-w-5xl mx-auto">
          <form onSubmit={submit} className="space-y-4">
            {FIELDS.map((f) => (
              <div key={f.key} className="glass border border-white/10 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-white/70 uppercase tracking-wide mb-3">{f.label}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {f.options.map(([val, lbl]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setFeatures((s) => ({ ...s, [f.key]: val }))}
                      className={`text-left text-sm rounded-lg px-3 py-2.5 border transition-colors ${
                        features[f.key] === val ? "bg-veda-orange/20 border-veda-orange text-white" : "bg-white/[0.03] border-white/10 text-white/70 hover:border-veda-orange/40"
                      }`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <Button type="submit" disabled={loading} variant="primary-fill" className="rounded-xl px-8">
                {loading ? "Reading…" : "Read My Palm"}
              </Button>
            </div>
          </form>
        </section>

        {reading && (
          <section className="px-6 pb-24 max-w-4xl mx-auto space-y-4">
            <div className="glass border border-white/10 rounded-2xl p-6">
              <h2 className="font-serif text-2xl text-white mb-3">Your Palm Reading</h2>
              <p className="text-white/70 leading-relaxed">{reading.summary}</p>
            </div>
            {[
              ["palmShape", "Palm Shape"],
              ["heartLine", "Heart Line"],
              ["headLine", "Head Line"],
              ["lifeLine", "Life Line"],
              ["fateLine", "Fate Line"],
              ["dominantMount", "Dominant Mount"],
            ].map(([k, title]) => (
              reading[k] && (
                <div key={k} className="glass border border-white/10 rounded-2xl p-5">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-veda-orange mb-2">{title}</h4>
                  {reading[k].name && <p className="font-serif text-white mb-1">{reading[k].name}</p>}
                  <p className="text-sm text-white/70 leading-relaxed">{reading[k].reading || reading[k].desc}</p>
                </div>
              )
            ))}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
