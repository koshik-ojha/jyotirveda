"use client";

import { useEffect, useState } from "react";
import { FiStar, FiSearch, FiHeart, FiX } from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { Button } from "@/components/ui/button";

const NAKSHATRAS = [
  { name: "Ashwini", syllables: "Chu, Che, Cho, La" },
  { name: "Bharani", syllables: "Li, Lu, Le, Lo" },
  { name: "Krittika", syllables: "A, I, U, E" },
  { name: "Rohini", syllables: "O, Va, Vi, Vu" },
  { name: "Mrigasira", syllables: "Ve, Vo, Ka, Ki" },
  { name: "Ardra", syllables: "Ku, Gha, Nga, Chha" },
  { name: "Punarvasu", syllables: "Ke, Ko, Ha, Hi" },
  { name: "Pushyami", syllables: "Hu, He, Ho, Da" },
  { name: "Aslesha", syllables: "Di, Du, De, Do" },
  { name: "Magha", syllables: "Ma, Mi, Mu, Me" },
  { name: "P. Phalguni", syllables: "Mo, Ta, Ti, Tu" },
  { name: "U. Phalguni", syllables: "Te, To, Pa, Pi" },
  { name: "Hasta", syllables: "Pu, Sha, Na, Tha" },
  { name: "Chitra", syllables: "Pe, Po, Ra, Ri" },
  { name: "Swati", syllables: "Ru, Re, Ro, Ta" },
  { name: "Vishakha", syllables: "Ti, Tu, Te, To" },
  { name: "Anuradha", syllables: "Na, Ni, Nu, Ne" },
  { name: "Jyeshta", syllables: "No, Ya, Yi, Yu" },
  { name: "Moola", syllables: "Ye, Yo, Bha, Bhi" },
  { name: "P. Shadha", syllables: "Bhu, Dha, Pha, Dha" },
  { name: "U. Shadha", syllables: "Bhe, Bho, Ja, Ji" },
  { name: "Sravana", syllables: "Ju, Je, Jo, Gha" },
  { name: "Dhanishta", syllables: "Ga, Gi, Gu, Ge" },
  { name: "Satabishak", syllables: "Go, Sa, Si, Su" },
  { name: "P. Bhadra", syllables: "Se, So, Da, Di" },
  { name: "U. Bhadra", syllables: "Du, Tha, Jha, Da" },
  { name: "Revati", syllables: "De, Do, Cha, Chi" },
];

const RASHIS = [
  { hi: "मेष", en: "Aries", letter: "A, L, E" },
  { hi: "वृषभ", en: "Taurus", letter: "B, V, U" },
  { hi: "मिथुन", en: "Gemini", letter: "K, Chh, Gh" },
  { hi: "कर्क", en: "Cancer", letter: "D, H" },
  { hi: "सिंह", en: "Leo", letter: "M, T" },
  { hi: "कन्या", en: "Virgo", letter: "P, Th, N" },
  { hi: "तुला", en: "Libra", letter: "R, T" },
  { hi: "वृश्चिक", en: "Scorpio", letter: "N, Y" },
  { hi: "धनु", en: "Sagittarius", letter: "B, Dh, F" },
  { hi: "मकर", en: "Capricorn", letter: "Kh, J" },
  { hi: "कुम्भ", en: "Aquarius", letter: "G, S, Sh" },
  { hi: "मीन", en: "Pisces", letter: "D, Ch, Th" },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function BabyNamesPage() {
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(null);
  const [time, setTime] = useState("");
  const [tab, setTab] = useState("boy");

  const [nakshatra, setNakshatra] = useState("");
  const [rashi, setRashi] = useState("");
  const [letter, setLetter] = useState("");
  const [search, setSearch] = useState("");
  const [names, setNames] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingNames, setLoadingNames] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("gender", tab);
    if (nakshatra) params.set("nakshatra", nakshatra);
    if (rashi)     params.set("rashi", rashi);
    if (letter)    params.set("letter", letter);
    if (search)    params.set("q", search);
    params.set("limit", "60");

    const t = setTimeout(async () => {
      setLoadingNames(true);
      try {
        const res = await fetch(`/api/baby-names?${params}`);
        const data = await res.json();
        setNames(data.results || []);
        setTotal(data.total || 0);
      } finally { setLoadingNames(false); }
    }, 250);
    return () => clearTimeout(t);
  }, [tab, nakshatra, rashi, letter, search]);

  const clearFilters = () => { setNakshatra(""); setRashi(""); setLetter(""); setSearch(""); };
  const activeFilter = nakshatra || rashi || letter || search;

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-veda-gold/10 blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-veda-orange/10 blur-3xl" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              Vedic Baby Names
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              A Name Written in the Stars
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              In Vedic tradition, a child&apos;s name begins with the syllable of their birth nakshatra. Find that perfect first letter, then a name carrying its meaning.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto glass border border-white/10 rounded-2xl p-8 md:p-10">
            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 bg-veda-orange/15 border border-veda-orange/20 rounded-xl text-veda-orange">
                <FiStar className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-serif text-white">Find by Birth Star</h2>
                <p className="text-white/40 text-sm mt-1">
                  We calculate the Janma Nakshatra and suggest names from its syllables.
                </p>
              </div>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Gender</label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Boy / Girl" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boy">Boy</SelectItem>
                    <SelectItem value="girl">Girl</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Birth Date</label>
                <DatePicker value={dob} onChange={setDob} placeholder="Select date" maxDate={new Date()} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Birth Time</label>
                <TimePicker value={time} onChange={setTime} placeholder="HH:MM" use24Hour={false} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Birth Place</label>
                <Input placeholder="City, state, country" />
              </div>
              <div className="md:col-span-2 flex justify-end mt-2">
                <Button variant="primary-fill" size="md" type="submit" className="rounded-xl px-8">
                  Suggest Names
                </Button>
              </div>
            </form>
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-veda-orange">
                Browse by Nakshatra
              </span>
              <h2 className="text-3xl font-serif text-white mt-2">
                27 Birth Stars, 108 Padas
              </h2>
            </div>
            <p className="text-white/45 text-sm max-w-md">
              Each nakshatra blesses four syllables — the traditional starting sounds for names born under it.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {NAKSHATRAS.map((n) => (
              <button
                key={n.name}
                type="button"
                onClick={() => { clearFilters(); setNakshatra(n.name); }}
                className={`text-left glass border rounded-xl p-4 transition-colors group ${
                  nakshatra === n.name ? "border-veda-orange bg-veda-orange/10" : "border-white/10 hover:border-veda-orange/40"
                }`}
              >
                <p className="text-white font-medium text-sm group-hover:text-veda-orange transition-colors">
                  {n.name}
                </p>
                <p className="text-white/40 text-xs mt-1 leading-relaxed">{n.syllables}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-veda-orange">
              Browse by Rashi
            </span>
            <h2 className="text-3xl font-serif text-white mt-2">Twelve Moon Signs</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {RASHIS.map((r) => (
              <button
                key={r.en}
                type="button"
                onClick={() => { clearFilters(); setRashi(r.en); }}
                className={`text-left glass border rounded-xl p-5 transition-colors group ${
                  rashi === r.en ? "border-veda-orange bg-veda-orange/10" : "border-white/10 hover:border-veda-orange/40"
                }`}
              >
                <p className="font-serif text-lg text-white group-hover:text-veda-orange transition-colors">
                  {r.hi}
                </p>
                <p className="text-white/60 text-sm">{r.en}</p>
                <p className="text-veda-gold/70 text-xs mt-2 uppercase tracking-wider">
                  {r.letter}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="px-6 pb-28 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-veda-orange">
                Browse A–Z
              </span>
              <h2 className="text-3xl font-serif text-white mt-2">By Starting Letter</h2>
            </div>
            <div className="inline-flex p-1 bg-white/5 border border-white/10 rounded-full">
              <button
                type="button"
                onClick={() => setTab("boy")}
                className={`px-5 py-1.5 text-sm rounded-full transition-colors ${
                  tab === "boy" ? "bg-veda-orange text-white" : "text-white/60 hover:text-white"
                }`}
              >
                Boy Names
              </button>
              <button
                type="button"
                onClick={() => setTab("girl")}
                className={`px-5 py-1.5 text-sm rounded-full transition-colors ${
                  tab === "girl" ? "bg-veda-orange text-white" : "text-white/60 hover:text-white"
                }`}
              >
                Girl Names
              </button>
            </div>
          </div>
          <div className="glass border border-white/10 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <FiSearch className="text-white/40 w-4 h-4" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${tab === "boy" ? "boy" : "girl"} names...`}
                className="border-0 bg-transparent shadow-none px-0 focus-visible:ring-0"
              />
              {activeFilter && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-xs text-white/50 hover:text-veda-orange transition-colors shrink-0"
                >
                  <FiX className="w-3.5 h-3.5" /> Clear
                </button>
              )}
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
              {ALPHABET.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => { clearFilters(); setLetter(l); }}
                  className={`aspect-square flex items-center justify-center rounded-lg border font-serif text-lg transition-colors ${
                    letter === l
                      ? "bg-veda-orange border-veda-orange text-white"
                      : "border-white/10 bg-white/5 hover:bg-veda-orange/20 hover:border-veda-orange/60 text-white/70"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-white/50">
              <span className="flex items-center gap-1.5">
                <FiHeart className="w-3 h-3" />
                {loadingNames ? "Loading…" : `${total} ${tab === "boy" ? "boy" : "girl"} names`}
                {activeFilter && <span className="text-veda-gold ml-1">• {nakshatra || rashi || (letter && `starting with ${letter}`) || `matching “${search}”`}</span>}
              </span>
            </div>

            {names.length > 0 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {names.map((n) => (
                  <div key={n.name} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-4 py-3 transition-colors">
                    <div className="w-9 h-9 rounded-md bg-veda-orange/15 border border-veda-orange/20 text-veda-orange flex items-center justify-center font-serif text-sm shrink-0">
                      {n.syllable}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-medium text-sm truncate">{n.name}</p>
                      <p className="text-white/45 text-xs mt-0.5 leading-snug">{n.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loadingNames && names.length === 0 && (
              <p className="text-center text-white/35 text-sm mt-6 py-6">
                No names found for these filters yet — try a different syllable.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
