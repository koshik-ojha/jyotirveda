"use client";
import { useEffect, useState } from "react";
import { FiSun, FiSunset, FiMoon, FiClock } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DateLocationBar from "@/components/DateLocationBar";

function isoDate(d) {
  return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` : "";
}
function fmt(iso) { return iso ? new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) : "—"; }

export default function TodayPanchangPage() {
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!place?.latitude) return;
    fetch(`/api/panchang?date=${isoDate(date)}&lat=${place.latitude}&lng=${place.longitude}`)
      .then((r) => r.json()).then((d) => d.panchang && setData(d.panchang));
  }, [date, place]);

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-3">Today&apos;s Panchang</h1>
          <p className="text-lg text-white/60">Five threads of time — tithi, vara, nakshatra, yoga, karana.</p>
        </section>

        <section className="px-6 pb-6 max-w-3xl mx-auto">
          <DateLocationBar date={date} setDate={setDate} place={place} setPlace={setPlace} />
        </section>

        {data && (
          <section className="px-6 pb-24 max-w-5xl mx-auto space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                ["Vara", data.vara.en, data.vara.hi],
                ["Tithi", data.tithi.name, data.tithi.paksha + " · " + data.tithi.completion.toFixed(0) + "%"],
                ["Nakshatra", data.nakshatra.en, "Pada " + data.nakshatra.pada],
                ["Yoga", data.yoga.name, ""],
                ["Karana", data.karana.name, ""],
              ].map(([k, v, sub]) => (
                <div key={k} className="glass border border-white/10 rounded-xl p-4">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">{k}</div>
                  <div className="font-serif text-white mt-1">{v}</div>
                  {sub && <div className="text-xs text-white/45 mt-0.5">{sub}</div>}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="glass border border-amber-500/20 rounded-xl p-5">
                <FiSun className="text-amber-300 w-5 h-5 mb-2" />
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Sunrise</div>
                <div className="text-white font-mono">{fmt(data.sunrise)}</div>
              </div>
              <div className="glass border border-rose-500/20 rounded-xl p-5">
                <FiSunset className="text-rose-300 w-5 h-5 mb-2" />
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Sunset</div>
                <div className="text-white font-mono">{fmt(data.sunset)}</div>
              </div>
              <div className="glass border border-white/10 rounded-xl p-5">
                <FiClock className="text-veda-orange w-5 h-5 mb-2" />
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Day length</div>
                <div className="text-white font-mono">{data.dayLengthHours.toFixed(2)} h</div>
              </div>
              <div className="glass border border-white/10 rounded-xl p-5">
                <FiMoon className="text-veda-gold w-5 h-5 mb-2" />
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Night length</div>
                <div className="text-white font-mono">{data.nightLengthHours.toFixed(2)} h</div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
