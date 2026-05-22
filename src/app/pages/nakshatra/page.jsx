"use client";
import { useState } from "react";
import { FiStar } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { Button } from "@/components/ui/button";
import PlacePicker from "@/components/PlacePicker";

function isoDate(d) {
  return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` : "";
}

export default function NakshatraPage() {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [place, setPlace] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!date || !time || !place?.timezone) return setError("Date, time and place needed");
    setLoading(true);
    setResult(null);
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

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              <FiStar className="w-3 h-3" /> 27 Lunar Mansions
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Nakshatra Finder</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Find your birth nakshatra (janma nakshatra) — the 13°20' arc of the moon at the moment you were born.
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
                {loading ? "Computing…" : "Find My Nakshatra"}
              </Button>
            </div>
          </form>
        </section>

        {result && (
          <section className="px-6 pb-24 max-w-4xl mx-auto space-y-5">
            <div className="glass border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-xs uppercase font-bold tracking-widest text-veda-orange">Your Birth Nakshatra</p>
              <h2 className="font-serif text-5xl text-gradient-gold mt-3">{result.nakshatra.en}</h2>
              <p className="font-serif text-2xl text-white/80 mt-1">{result.nakshatra.hi}</p>
              <p className="text-white/55 mt-2">Pada {result.nakshatra.pada} · in {result.rashi.en}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                ["Ruling Planet", result.nakshatra.lord],
                ["Deity", result.nakshatra.deity],
                ["Gana", result.nakshatra.gana],
                ["Nadi", result.nakshatra.nadi],
                ["Yoni (animal)", result.nakshatra.yoni],
                ["Moon Sign", result.rashi.en],
                ["Syllables", (result.nakshatra.syllables || []).join(", ")],
                ["Moon longitude", `${result.moonLongitude.toFixed(2)}°`],
              ].map(([k, v]) => (
                <div key={k} className="glass border border-white/10 rounded-xl p-4">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">{k}</div>
                  <div className="text-white text-sm mt-1">{v || "—"}</div>
                </div>
              ))}
            </div>

            {result.nakshatra.traits && (
              <div className="glass border border-veda-orange/20 rounded-xl p-5">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-veda-orange mb-2">Core Traits</h4>
                <p className="text-white/80 italic">{result.nakshatra.traits}</p>
              </div>
            )}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
