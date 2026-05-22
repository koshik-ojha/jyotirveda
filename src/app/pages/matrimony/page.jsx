"use client";

import { useState } from "react";
import { FiHeart, FiUsers, FiShield, FiStar } from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";

const FEATURES = [
  { icon: FiHeart,  title: "Astro-Matched Profiles", desc: "Every profile rated for Guna Milan compatibility against yours." },
  { icon: FiShield, title: "ID-Verified Members",    desc: "Aadhaar, passport or government-ID verification on every account." },
  { icon: FiUsers,  title: "Family-Curated",         desc: "Profiles often managed by parents — privacy by design." },
  { icon: FiStar,   title: "Free Kundli Matching",   desc: "Built-in Ashta Koota check on every shortlist." },
];

const COMMUNITIES = [
  "Brahmin", "Kshatriya", "Vaishya", "Marwari", "Gujarati",
  "Punjabi", "Bengali", "Tamil", "Telugu", "Malayali",
  "Kannadiga", "Maharashtrian", "Sindhi", "Parsi", "Christian",
  "Muslim", "Sikh", "Jain", "Buddhist", "Inter-Caste",
];

export default function MatrimonyPage() {
  const [lookingFor, setLookingFor] = useState("");
  const [age, setAge] = useState("");
  const [community, setCommunity] = useState("");
  const [dob, setDob] = useState(null);

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-pink-500/15 blur-3xl animate-pulse-glow" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              Astro-Matched Matrimony
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              Find a Partner Written in the Stars
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              India&apos;s most thoughtful matrimony — every profile screened, every match scored by Guna Milan, every connection rooted in family.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto glass border border-white/10 rounded-2xl p-8 md:p-10">
            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 bg-veda-orange/15 border border-veda-orange/20 rounded-xl text-veda-orange">
                <FiHeart className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-serif text-white">Begin Your Search</h2>
                <p className="text-white/40 text-sm mt-1">Tell us a little — we&apos;ll surface astrologically aligned profiles.</p>
              </div>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide">I am looking for</label>
                <Select value={lookingFor} onValueChange={setLookingFor}>
                  <SelectTrigger><SelectValue placeholder="Bride / Groom" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bride">A Bride</SelectItem>
                    <SelectItem value="groom">A Groom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Age</label>
                <Select value={age} onValueChange={setAge}>
                  <SelectTrigger><SelectValue placeholder="Age range" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="21-25">21 – 25</SelectItem>
                    <SelectItem value="26-30">26 – 30</SelectItem>
                    <SelectItem value="31-35">31 – 35</SelectItem>
                    <SelectItem value="36-40">36 – 40</SelectItem>
                    <SelectItem value="40plus">40+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Community</label>
                <Select value={community} onValueChange={setCommunity}>
                  <SelectTrigger><SelectValue placeholder="Any community" /></SelectTrigger>
                  <SelectContent>
                    {COMMUNITIES.map((c) => (
                      <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Your Birth Date</label>
                <DatePicker value={dob} onChange={setDob} placeholder="For Kundli matching" maxDate={new Date()} />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Email or Phone</label>
                <Input placeholder="To create your free profile" />
              </div>
              <div className="md:col-span-2 flex justify-end mt-2">
                <Button variant="primary-fill" size="md" type="submit" className="rounded-xl px-10">
                  Create Free Profile
                </Button>
              </div>
            </form>
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">Why JyotirVeda Matrimony</h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Built for serious matches, with Vedic astrology at the core.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="glass border border-white/10 rounded-2xl p-6 hover:border-veda-orange/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-veda-orange/15 border border-veda-orange/20 text-veda-orange flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-white mb-1.5">{f.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pb-28 max-w-5xl mx-auto">
          <div className="glass border border-white/10 rounded-2xl p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-3">
              Already have a shortlist?
            </h3>
            <p className="text-white/55 mb-6 max-w-xl mx-auto">
              Run a free 36-point Ashta Koota match against any prospect.
            </p>
            <a href="/horoscope-matching" className="inline-flex items-center gap-2 bg-veda-orange text-white px-7 py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-veda-gold transition-colors">
              <FiUsers className="w-4 h-4" />
              Match Horoscopes
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
