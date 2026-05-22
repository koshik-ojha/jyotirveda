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

export default function SunriseSunsetPage() {
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!place?.latitude) return;
    fetch(`/api/sun-times?date=${isoDate(date)}&lat=${place.latitude}&lng=${place.longitude}`)
      .then((r) => r.json()).then((d) => d.times && setData(d.times));
  }, [date, place]);

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-3">Sunrise &amp; Sunset</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Precise sunrise, sunset, moonrise, moonset — Swiss Ephemeris accurate.
          </p>
        </section>

        <section className="px-6 pb-6 max-w-3xl mx-auto">
          <DateLocationBar date={date} setDate={setDate} place={place} setPlace={setPlace} />
        </section>

        {data && (
          <section className="px-6 pb-24 max-w-4xl mx-auto space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="glass border border-amber-500/20 rounded-xl p-6">
                <FiSun className="text-amber-300 w-7 h-7 mb-3" />
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Sunrise</div>
                <div className="text-3xl font-serif text-white mt-1 font-mono">{fmt(data.sunrise)}</div>
              </div>
              <div className="glass border border-rose-500/20 rounded-xl p-6">
                <FiSunset className="text-rose-300 w-7 h-7 mb-3" />
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Sunset</div>
                <div className="text-3xl font-serif text-white mt-1 font-mono">{fmt(data.sunset)}</div>
              </div>
              <div className="glass border border-sky-500/20 rounded-xl p-6">
                <FiMoon className="text-sky-300 w-7 h-7 mb-3" />
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Moonrise</div>
                <div className="text-3xl font-serif text-white mt-1 font-mono">{fmt(data.moonrise)}</div>
              </div>
              <div className="glass border border-indigo-500/20 rounded-xl p-6">
                <FiMoon className="text-indigo-300 w-7 h-7 mb-3" />
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Moonset</div>
                <div className="text-3xl font-serif text-white mt-1 font-mono">{fmt(data.moonset)}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="glass border border-white/10 rounded-xl p-5">
                <FiClock className="text-veda-orange w-5 h-5 mb-2" />
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Day length</div>
                <div className="text-xl font-serif text-white mt-1">{data.dayLengthHours.toFixed(2)} hours</div>
              </div>
              <div className="glass border border-white/10 rounded-xl p-5">
                <FiClock className="text-veda-gold w-5 h-5 mb-2" />
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Night length</div>
                <div className="text-xl font-serif text-white mt-1">{data.nightLengthHours.toFixed(2)} hours</div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
