"use client";
import { useState } from "react";
import { FiHeart, FiUser, FiCheckCircle, FiXCircle } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import PlacePicker from "@/components/PlacePicker";

function isoDate(d) {
  return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` : "";
}

function PersonForm({ title, value, onChange }) {
  return (
    <div className="glass border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 bg-veda-orange/15 border border-veda-orange/20 rounded-xl text-veda-orange">
          <FiUser className="w-5 h-5" />
        </div>
        <h3 className="font-serif text-lg text-white">{title}</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Name</label>
          <Input value={value.name} onChange={(e) => onChange({ ...value, name: e.target.value })} placeholder="Name" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Date</label>
            <DatePicker value={value.date} onChange={(d) => onChange({ ...value, date: d })} maxDate={new Date()} placeholder="Birth date" />
          </div>
          <div>
            <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Time</label>
            <TimePicker value={value.time} onChange={(t) => onChange({ ...value, time: t })} placeholder="HH:MM" />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Place</label>
          <PlacePicker value={value.place} onChange={(p) => onChange({ ...value, place: p })} />
        </div>
      </div>
    </div>
  );
}

const EMPTY = { name: "", date: null, time: "", place: null };

export default function PoruthamPage() {
  const [boy, setBoy] = useState(EMPTY);
  const [girl, setGirl] = useState(EMPTY);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!boy.date || !boy.time || !boy.place?.timezone) return setError("Complete the boy's birth details");
    if (!girl.date || !girl.time || !girl.place?.timezone) return setError("Complete the girl's birth details");
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/porutham", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          boy:  { name: boy.name,  date: isoDate(boy.date),  time: boy.time,  timezone: boy.place.timezone },
          girl: { name: girl.name, date: isoDate(girl.date), time: girl.time, timezone: girl.place.timezone },
        }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error);
      else setResult(data.result);
    } finally { setLoading(false); }
  };

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-10 px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
            <FiHeart className="w-3 h-3" /> Tamil 10-fold Marriage Compatibility
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-4">Porutham</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            South India's 10-koot system — Dina, Gana, Mahendra, Stree-Deergha, Yoni, Rashi, Adhipathi, Vashya, Rajju, Vedha.
          </p>
        </section>

        <section className="px-6 pb-24 max-w-6xl mx-auto">
          <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <PersonForm title="Boy's Details"  value={boy}  onChange={setBoy} />
              <PersonForm title="Girl's Details" value={girl} onChange={setGirl} />
            </div>
            {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
            <div className="flex justify-center">
              <Button type="submit" disabled={loading} variant="primary-fill" className="rounded-xl px-10">
                {loading ? "Matching…" : "Check Porutham"}
              </Button>
            </div>
          </form>

          {result && (
            <div className="mt-10 space-y-5">
              <div className="glass border border-white/10 rounded-2xl p-6 md:p-8">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-veda-orange">10-Porutham · Total Passed</p>
                    <h2 className="font-serif text-5xl text-white mt-1">{result.passed}<span className="text-2xl text-white/40">/{result.total}</span></h2>
                    <p className="text-white/65 mt-1">{result.verdict}</p>
                  </div>
                  <div className="text-right text-sm text-white/55">
                    <div><b className="text-white">Boy:</b> {result.boy.rashi.en} · {result.boy.nakshatra.en}</div>
                    <div><b className="text-white">Girl:</b> {result.girl.rashi.en} · {result.girl.nakshatra.en}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(result.poruthams).map(([k, v]) => (
                    <div key={k} className={`rounded-xl border px-4 py-3 ${v.pass ? "border-emerald-500/20 bg-emerald-500/5" : "border-rose-500/20 bg-rose-500/5"}`}>
                      <div className="flex items-baseline justify-between">
                        <div className="font-medium text-white flex items-center gap-2">
                          {v.pass ? <FiCheckCircle className="w-4 h-4 text-emerald-300" /> : <FiXCircle className="w-4 h-4 text-rose-300" />}
                          {k}
                        </div>
                        <span className={`text-[10px] uppercase font-bold ${v.pass ? "text-emerald-300" : "text-rose-300"}`}>
                          {v.pass ? "Pass" : "Fail"}
                        </span>
                      </div>
                      <p className="text-xs text-white/55 mt-1.5 pl-6">{v.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
