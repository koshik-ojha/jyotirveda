"use client";
import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiWind } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlacePicker from "@/components/PlacePicker";

function fmt(iso) { return iso ? new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) : "—"; }

export default function SwarodayaPage() {
  const [place, setPlace] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!("geolocation" in navigator)) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const r = await fetch(`/api/geocode?q=${pos.coords.latitude},${pos.coords.longitude}`);
        const j = await r.json();
        if (j.results?.[0]) setPlace(j.results[0]);
      } catch {}
    }, () => {}, { timeout: 5000 });
  }, []);

  useEffect(() => {
    if (!place?.latitude) return;
    setLoading(true);
    fetch(`/api/swarodaya?lat=${place.latitude}&lng=${place.longitude}`)
      .then((r) => r.json())
      .then((d) => d.nadi && setData(d.nadi))
      .finally(() => setLoading(false));
  }, [place]);

  const isSurya = data?.currentNadi === "Surya";

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              <FiWind className="w-3 h-3" /> Shiva Swarodaya · Breath Yoga
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Swarodaya</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Which nadi is flowing right now? The ancient science of timing through the breath.
            </p>
          </div>
        </section>

        <section className="px-6 pb-8 max-w-3xl mx-auto">
          <div className="glass border border-white/10 rounded-2xl p-6">
            <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Your Location</label>
            <PlacePicker value={place} onChange={setPlace} />
          </div>
        </section>

        {loading && <p className="text-center text-white/40">Computing…</p>}

        {data && (
          <section className="px-6 pb-24 max-w-4xl mx-auto space-y-5">
            <div className={`glass border rounded-2xl p-8 text-center ${isSurya ? "border-amber-500/30 bg-amber-500/5" : "border-sky-500/30 bg-sky-500/5"}`}>
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 ${isSurya ? "bg-amber-500/15 text-amber-300" : "bg-sky-500/15 text-sky-300"}`}>
                {isSurya ? <FiSun className="w-10 h-10" /> : <FiMoon className="w-10 h-10" />}
              </div>
              <p className="text-xs uppercase font-bold tracking-widest text-white/50">Currently Flowing</p>
              <h2 className="text-5xl font-serif text-white mt-2">{data.currentNadi} Nadi</h2>
              <p className="text-white/70 mt-1">{data.side}</p>
              <p className={`text-sm mt-4 ${isSurya ? "text-amber-200" : "text-sky-200"}`}>{data.quality}</p>
              <p className="text-sm text-white/70 mt-4 max-w-md mx-auto leading-relaxed">{data.advice}</p>
              <p className="text-xs text-white/40 mt-6 font-mono">
                Started at sunrise in {data.startNadi} · next flip at {fmt(data.nextFlipAt)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="glass border border-amber-500/20 rounded-xl p-5">
                <FiSun className="text-amber-300 w-5 h-5 mb-2" />
                <h3 className="font-serif text-white">Surya / Right (Pingala)</h3>
                <p className="text-xs text-white/55 mt-1.5 leading-relaxed">
                  Hot, expansive, masculine. Best for: physical effort, important meetings, eating, competitive work, decisive action.
                </p>
              </div>
              <div className="glass border border-sky-500/20 rounded-xl p-5">
                <FiMoon className="text-sky-300 w-5 h-5 mb-2" />
                <h3 className="font-serif text-white">Chandra / Left (Ida)</h3>
                <p className="text-xs text-white/55 mt-1.5 leading-relaxed">
                  Cool, receptive, feminine. Best for: study, devotion, healing, planning, creative work, sleep, recovery.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
