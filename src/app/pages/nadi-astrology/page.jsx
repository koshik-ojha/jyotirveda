"use client";
import { useState } from "react";
import { FiBook } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { Button } from "@/components/ui/button";
import PlacePicker from "@/components/PlacePicker";

const NADI_DESC = {
  Aadi:   { name: "Aadi (Vata)",    element: "Air",   traits: "Active, fast, creative, restless — Vata constitution; prone to nervous-system imbalance." },
  Madhya: { name: "Madhya (Pitta)", element: "Fire",  traits: "Intense, sharp, ambitious — Pitta constitution; prone to inflammation and heat-related issues." },
  Antya:  { name: "Antya (Kapha)",  element: "Earth", traits: "Steady, grounded, nurturing — Kapha constitution; prone to weight, sluggishness, congestion." },
};

function isoDate(d) {
  return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` : "";
}

export default function NadiAstrologyPage() {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [place, setPlace] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!date || !time || !place?.timezone) return setError("Birth details needed");
    setLoading(true);
    try {
      const res = await fetch("/api/nakshatra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: isoDate(date), time, latitude: place.latitude, longitude: place.longitude, timezone: place.timezone }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error);
      else setResult(data);
    } finally { setLoading(false); }
  };

  const nadiInfo = result?.nakshatra?.nadi ? NADI_DESC[result.nakshatra.nadi] : null;

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              <FiBook className="w-3 h-3" /> Nadi Classification
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Nadi Astrology</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Discover your Nadi — Aadi, Madhya or Antya — derived from your janma nakshatra. The three nadis map to Ayurvedic constitutions and inform marriage compatibility.
            </p>
          </div>
        </section>

        <section className="px-6 pb-10 max-w-3xl mx-auto">
          <form onSubmit={submit} className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Birth Date</label>
                <DatePicker value={date} onChange={setDate} maxDate={new Date()} />
              </div>
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Birth Time</label>
                <TimePicker value={time} onChange={setTime} />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Birth Place</label>
              <PlacePicker value={place} onChange={setPlace} />
            </div>
            {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
            <div className="flex justify-end">
              <Button type="submit" disabled={loading} variant="primary-fill" className="rounded-xl px-8">
                {loading ? "Computing…" : "Find My Nadi"}
              </Button>
            </div>
          </form>
        </section>

        {result && nadiInfo && (
          <section className="px-6 pb-24 max-w-4xl mx-auto space-y-5">
            <div className="glass border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-xs uppercase font-bold tracking-widest text-veda-orange">Your Nadi</p>
              <h2 className="font-serif text-5xl text-gradient-gold mt-3">{nadiInfo.name}</h2>
              <p className="text-white/55 mt-1">Element · {nadiInfo.element}</p>
              <p className="text-white/75 mt-4 max-w-md mx-auto leading-relaxed">{nadiInfo.traits}</p>
            </div>

            <div className="glass border border-veda-gold/20 rounded-xl p-5">
              <h4 className="font-serif text-white mb-3">Marriage Compatibility Note</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                In Ashtakoot matching, <b>Nadi dosha</b> arises when both partners share the same nadi (e.g. both Antya).
                Your nadi is <b>{result.nakshatra.nadi}</b> — for full ashtakoot scoring,
                {" "}<a className="text-veda-orange hover:text-veda-gold underline-offset-2 hover:underline" href="/pages/horoscope-matching">use Horoscope Matching</a>.
              </p>
            </div>

            <div className="glass border border-white/10 rounded-xl p-5">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-veda-orange mb-2">Derived from your Nakshatra</h4>
              <p className="text-white">{result.nakshatra.en} <span className="text-white/40">(pada {result.nakshatra.pada})</span></p>
              <p className="text-xs text-white/45 mt-1">Moon at {result.moonLongitude.toFixed(2)}° sidereal · in {result.rashi.en}</p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
