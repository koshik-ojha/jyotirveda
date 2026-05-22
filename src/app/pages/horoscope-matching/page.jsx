"use client";

import { useState } from "react";
import { FiHeart, FiUser, FiUsers } from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { Button } from "@/components/ui/button";

const ASHTAKOOTA = [
  { name: "Varna",   points: 1,  desc: "Spiritual compatibility — caste of the soul." },
  { name: "Vashya",  points: 2,  desc: "Mutual control and attraction between partners." },
  { name: "Tara",    points: 3,  desc: "Compatibility of birth stars — destiny alignment." },
  { name: "Yoni",    points: 4,  desc: "Physical and sexual compatibility." },
  { name: "Maitri",  points: 5,  desc: "Friendship between the ruling planets." },
  { name: "Gana",    points: 6,  desc: "Temperament — Deva, Manushya or Rakshasa nature." },
  { name: "Bhakoot", points: 7,  desc: "Health, wealth and family welfare." },
  { name: "Nadi",    points: 8,  desc: "Genetic and progeny compatibility — most important." },
];

function PartnerForm({ label, icon: Icon }) {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");

  return (
    <div className="glass border border-white/10 rounded-2xl p-7">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-veda-orange/15 border border-veda-orange/20 text-veda-orange flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="font-serif text-lg text-white">{label}</h3>
      </div>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Name</label>
          <Input placeholder="Full name" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Gender</label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Birth Date</label>
          <DatePicker value={date} onChange={setDate} placeholder="Select date" maxDate={new Date()} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Birth Time</label>
          <TimePicker value={time} onChange={setTime} placeholder="HH:MM" use24Hour={false} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Birth Place</label>
          <Input placeholder="City, state, country" />
        </div>
      </div>
    </div>
  );
}

export default function HoroscopeMatchingPage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-pink-500/10 blur-3xl animate-pulse-glow" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              Ashta Koota • Guna Milan
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              Horoscope Matching
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              The 36-point Vedic compatibility test. Eight kootas weighed across two birth charts to reveal harmony, destiny and the path of two lives meeting.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20 max-w-6xl mx-auto">
          <form className="grid md:grid-cols-2 gap-6 mb-6">
            <PartnerForm label="Boy / Partner 1" icon={FiUser} />
            <PartnerForm label="Girl / Partner 2" icon={FiUsers} />
          </form>
          <div className="flex justify-center">
            <Button variant="primary-fill" size="md" type="submit" className="rounded-xl px-10">
              <FiHeart className="w-4 h-4" />
              Match Horoscopes
            </Button>
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
              The Eight Kootas
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Out of 36 points, 18 or more is considered a compatible match. Nadi and Bhakoot weigh the heaviest.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ASHTAKOOTA.map((k) => (
              <div key={k.name} className="glass border border-white/10 rounded-2xl p-6">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-serif text-xl text-white">{k.name}</h3>
                  <span className="font-serif text-2xl text-veda-gold">{k.points}</span>
                </div>
                <p className="text-sm text-white/55 leading-relaxed">{k.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
