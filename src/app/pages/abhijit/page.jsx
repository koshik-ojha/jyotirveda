"use client";
import { useEffect, useState } from "react";
import { FiCheckCircle, FiXCircle, FiSun } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DateLocationBar from "@/components/DateLocationBar";

function isoDate(d) {
  return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` : "";
}
function fmt(iso) { return iso ? new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) : "—"; }

export default function AbhijitPage() {
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!place?.latitude) return;
    fetch(`/api/muhurat?date=${isoDate(date)}&lat=${place.latitude}&lng=${place.longitude}`)
      .then((r) => r.json()).then((d) => setData(d));
  }, [date, place]);

  const inauspicious = data?.muhurat?.abhijit?.quality?.includes("Inauspicious");

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-3">Abhijit Muhurat</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            The 48-minute window around solar noon. Auspicious every day except Wednesday.
          </p>
        </section>

        <section className="px-6 pb-6 max-w-3xl mx-auto">
          <DateLocationBar date={date} setDate={setDate} place={place} setPlace={setPlace} />
        </section>

        {data?.muhurat && (
          <section className="px-6 pb-24 max-w-3xl mx-auto space-y-5">
            <div className={`glass border rounded-2xl p-8 text-center ${
              inauspicious ? "border-rose-500/30 bg-rose-500/5" : "border-emerald-500/30 bg-emerald-500/5"
            }`}>
              {inauspicious ? <FiXCircle className="w-10 h-10 mx-auto mb-3 text-rose-300" /> : <FiCheckCircle className="w-10 h-10 mx-auto mb-3 text-emerald-300" />}
              <p className="text-xs uppercase font-bold tracking-widest text-white/50">Abhijit Window</p>
              <h2 className="font-serif text-4xl text-white mt-2 font-mono">
                {fmt(data.muhurat.abhijit.start)} <span className="text-veda-gold">→</span> {fmt(data.muhurat.abhijit.end)}
              </h2>
              <p className={`mt-3 ${inauspicious ? "text-rose-200" : "text-emerald-200"}`}>{data.muhurat.abhijit.quality}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="glass border border-white/10 rounded-xl p-5">
                <FiSun className="text-amber-300 w-5 h-5 mb-2" />
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Sunrise</div>
                <div className="text-white font-mono">{fmt(data.muhurat.sunrise)}</div>
              </div>
              <div className="glass border border-white/10 rounded-xl p-5">
                <FiSun className="text-rose-300 w-5 h-5 mb-2" />
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Sunset</div>
                <div className="text-white font-mono">{fmt(data.muhurat.sunset)}</div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
