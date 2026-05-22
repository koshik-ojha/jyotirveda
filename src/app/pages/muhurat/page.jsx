"use client";

import { useState } from "react";
import {
  FiHeart, FiHome, FiBriefcase, FiTruck, FiBookOpen,
  FiAward, FiScissors, FiCoffee, FiSun, FiCompass,
  FiCalendar, FiClock,
} from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import PlacePicker from "@/components/PlacePicker";

const muhuratTypes = [
  { icon: FiHeart, title: "Vivah", subtitle: "Marriage Ceremony" },
  { icon: FiHome, title: "Griha Pravesh", subtitle: "Home Inauguration" },
  { icon: FiScissors, title: "Mundan", subtitle: "Tonsure Ceremony" },
  { icon: FiCoffee, title: "Annaprashan", subtitle: "First Solid Food" },
  { icon: FiBookOpen, title: "Vidyarambh", subtitle: "Start of Education" },
  { icon: FiAward, title: "Upanayan", subtitle: "Sacred Thread" },
  { icon: FiBriefcase, title: "Business Start", subtitle: "Naya Vyapar" },
  { icon: FiTruck, title: "Vehicle Purchase", subtitle: "Vahan Kharidi" },
  { icon: FiHome, title: "Property", subtitle: "Foundation / Buy" },
  { icon: FiSun, title: "Namkaran", subtitle: "Naming Ceremony" },
  { icon: FiCompass, title: "Travel", subtitle: "Yatra & Pilgrimage" },
  { icon: FiCalendar, title: "Karnavedha", subtitle: "Ear Piercing" },
];

const dayMuhurats = [
  { name: "Rudra", nature: "Inauspicious" },
  { name: "Ahi", nature: "Inauspicious" },
  { name: "Mitra", nature: "Auspicious" },
  { name: "Pitra", nature: "Inauspicious" },
  { name: "Vasu", nature: "Auspicious" },
  { name: "Jeev / Amrit", nature: "Extremely Auspicious" },
  { name: "Brahma", nature: "Extremely Auspicious" },
];

const panchangElements = [
  { name: "Tithi", desc: "Lunar day — 15 days per Shukla / Krishna paksha." },
  { name: "Var", desc: "Day of the week — Thursday is considered most auspicious." },
  { name: "Nakshatra", desc: "27 lunar mansions, each governed by a ruling planet." },
  { name: "Yoga", desc: "27 sun-moon configurations; nine are inauspicious." },
  { name: "Karana", desc: "Half-tithi divisions; Vishti / Bhadra are best avoided." },
];

const natureColor = (nature) => {
  if (nature.startsWith("Extremely")) return "text-veda-gold";
  if (nature === "Auspicious") return "text-emerald-300";
  return "text-rose-300/80";
};

function isoDate(d) {
  if (!d) return "";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function fmtTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function MuhuratResult({ data }) {
  if (!data) return null;
  const { muhurat, panchang } = data;
  const qualityClass = (q) =>
    q === "Auspicious" ? "text-emerald-300 bg-emerald-500/10 border-emerald-500/20" :
    q === "Inauspicious" ? "text-rose-300 bg-rose-500/10 border-rose-500/20" :
    "text-white/60 bg-white/5 border-white/10";

  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          ["Vara", panchang.vara.en],
          ["Tithi", `${panchang.tithi.name} (${panchang.tithi.paksha})`],
          ["Nakshatra", panchang.nakshatra.en],
          ["Yoga", panchang.yoga.name],
          ["Karana", panchang.karana.name],
        ].map(([k, v]) => (
          <div key={k} className="glass border border-white/10 rounded-xl p-4">
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{k}</div>
            <div className="font-serif text-white mt-1">{v}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass border border-white/10 rounded-xl p-5">
          <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Sunrise — Sunset</div>
          <div className="text-white font-mono mt-2">{fmtTime(muhurat.sunrise)} → {fmtTime(muhurat.sunset)}</div>
        </div>
        <div className="glass border border-rose-500/20 rounded-xl p-5">
          <div className="text-xs text-rose-300/80 uppercase tracking-widest font-bold">Rahu Kaal — avoid</div>
          <div className="text-white font-mono mt-2">{fmtTime(muhurat.rahuKaal.start)} → {fmtTime(muhurat.rahuKaal.end)}</div>
        </div>
        <div className={`glass border rounded-xl p-5 ${muhurat.abhijit.quality.includes("Inauspicious") ? "border-rose-500/20" : "border-emerald-500/20"}`}>
          <div className="text-xs uppercase tracking-widest font-bold text-veda-gold">Abhijit Muhurat</div>
          <div className="text-white font-mono mt-2">{fmtTime(muhurat.abhijit.start)} → {fmtTime(muhurat.abhijit.end)}</div>
          <div className="text-xs text-white/50 mt-1">{muhurat.abhijit.quality}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          ["Day Choghadiya", muhurat.dayChoghadiyas],
          ["Night Choghadiya", muhurat.nightChoghadiyas],
        ].map(([title, list]) => (
          <div key={title} className="glass border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/10 font-serif text-white">{title}</div>
            <ul className="divide-y divide-white/5">
              {list.map((c) => (
                <li key={c.slot} className="flex items-center justify-between px-5 py-2.5 text-sm">
                  <span className="text-white/80 font-medium">{c.name}</span>
                  <span className="text-white/50 font-mono">{fmtTime(c.start)} – {fmtTime(c.end)}</span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${qualityClass(c.quality)}`}>{c.quality}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MuhuratPage() {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!date) return setError("Pick a date");
    if (!place || place.latitude == null) return setError("Pick a location from the suggestions");
    setLoading(true);
    setResult(null);
    try {
      const url = `/api/muhurat?date=${isoDate(date)}&lat=${place.latitude}&lng=${place.longitude}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed"); return; }
      setResult(data);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-veda-orange/10 blur-3xl animate-pulse-glow" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              Shubh Muhurat 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              Find Your Auspicious Time
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              When planets and nakshatras align, every task moves with grace. Discover the right moment for marriage, griha pravesh, business, travel and every sacred undertaking.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto glass border border-white/10 rounded-2xl p-8 md:p-10">
            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 bg-veda-orange/15 border border-veda-orange/20 rounded-xl text-veda-orange">
                <FiClock className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-serif text-white">Personalised Muhurat</h2>
                <p className="text-white/40 text-sm mt-1">
                  Tell us the task and approximate date — we&apos;ll surface the best window.
                </p>
              </div>
            </div>
            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide">
                  Task (for reference)
                </label>
                <Select value={task} onValueChange={setTask}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select task type" />
                  </SelectTrigger>
                  <SelectContent>
                    {muhuratTypes.map((t) => (
                      <SelectItem key={t.title} value={t.title.toLowerCase()}>
                        {t.title} — {t.subtitle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide">
                  Date
                </label>
                <DatePicker
                  value={date}
                  onChange={setDate}
                  placeholder="Pick a target date"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide">
                  Location
                </label>
                <PlacePicker value={place} onChange={setPlace} />
              </div>
              {error && (
                <div className="md:col-span-2 text-sm text-red-400/90 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}
              <div className="md:col-span-2 flex justify-end mt-2">
                <Button variant="primary-fill" size="md" type="submit" disabled={loading} className="rounded-xl px-8">
                  {loading ? "Computing…" : "Find Shubh Muhurat"}
                </Button>
              </div>
            </form>
          </div>
          <MuhuratResult data={result} />
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
              Twelve Sacred Occasions
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              From the cradle to the threshold of a new home — a muhurat for every milestone.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {muhuratTypes.map((t) => (
              <div
                key={t.title}
                className="glass border border-white/10 rounded-2xl p-5 hover:border-veda-orange/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-veda-orange/15 border border-veda-orange/20 text-veda-orange flex items-center justify-center mb-3">
                  <t.icon className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base text-white">{t.title}</h3>
                <p className="text-xs text-white/45 mt-0.5">{t.subtitle}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="glass border border-white/10 rounded-2xl p-7">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-veda-orange">
                30 Muhurats in a Day
              </span>
              <h3 className="text-2xl font-serif text-white mt-2 mb-4">
                The day, divided into 48-minute windows
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-6">
                A 24-hour day holds thirty muhurats of two ghadis each. Some carry the blessing of Brahma and Amrit; others belong to Rudra and Pitra. The art is knowing which window opens at which hour.
              </p>
              <ul className="divide-y divide-white/5">
                {dayMuhurats.map((m) => (
                  <li key={m.name} className="flex items-center justify-between py-2.5">
                    <span className="text-white text-sm">{m.name}</span>
                    <span className={`text-xs font-medium ${natureColor(m.nature)}`}>
                      {m.nature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass border border-white/10 rounded-2xl p-7">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-veda-orange">
                Five Panchang Elements
              </span>
              <h3 className="text-2xl font-serif text-white mt-2 mb-4">
                What makes a muhurat shubh
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-6">
                Every auspicious moment is computed from five threads of the Panchang — Tithi, Var, Nakshatra, Yoga and Karana — woven together with planetary positions.
              </p>
              <ul className="space-y-4">
                {panchangElements.map((e, i) => (
                  <li key={e.name} className="flex gap-4">
                    <span className="font-serif text-veda-gold/80 text-2xl leading-none w-7 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-white font-medium text-sm">{e.name}</p>
                      <p className="text-white/50 text-sm leading-relaxed">{e.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
