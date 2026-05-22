"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DateLocationBar from "@/components/DateLocationBar";

function isoDate(d) {
  return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` : "";
}
function fmt(iso) { return iso ? new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) : "—"; }

export default function PanchangamPage() {
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
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-3">Panchangam</h1>
          <p className="text-lg text-white/60">Pick any date to see its five-fold panchang.</p>
        </section>

        <section className="px-6 pb-6 max-w-3xl mx-auto">
          <DateLocationBar date={date} setDate={setDate} place={place} setPlace={setPlace} />
        </section>

        {data && (
          <section className="px-6 pb-24 max-w-4xl mx-auto">
            <div className="glass border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-6 py-3 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-serif text-xl text-white">Panchang for {isoDate(date)}</h3>
                <span className="text-xs text-white/45">Sunrise {fmt(data.sunrise)} · Sunset {fmt(data.sunset)}</span>
              </div>
              <dl className="divide-y divide-white/5 text-sm">
                {[
                  ["Vara (Weekday)", `${data.vara.en} · ${data.vara.hi} · Lord ${data.vara.lord}`],
                  ["Tithi", `${data.tithi.name} (${data.tithi.paksha}) — ${data.tithi.completion.toFixed(1)}% complete`],
                  ["Nakshatra", `${data.nakshatra.en} · ${data.nakshatra.hi} · Pada ${data.nakshatra.pada} · Lord ${data.nakshatra.lord}`],
                  ["Yoga", data.yoga.name],
                  ["Karana", data.karana.name],
                  ["Day length", `${data.dayLengthHours.toFixed(2)} hours`],
                  ["Night length", `${data.nightLengthHours.toFixed(2)} hours`],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-3 gap-4 px-6 py-3">
                    <dt className="text-white/50">{k}</dt>
                    <dd className="col-span-2 text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
