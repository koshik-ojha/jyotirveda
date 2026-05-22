"use client";

import { useState } from "react";
import { FiMoon } from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { Button } from "@/components/ui/button";
import { ZODIAC } from "@/lib/zodiac";

export const dynamic = "force-static";

const MOON_TRAITS = {
  Aries:       "Quick to feel, quicker to act. Emotions flash and pass like sparks — short fuse, short forgiveness.",
  Taurus:      "Steady, sensuous, slow to anger. Comfort matters; routine soothes. The Moon is exalted here — its happiest seat.",
  Gemini:      "Curious heart. Many moods rotate in a day; conversation regulates the inner weather.",
  Cancer:      "The Moon's own sign. Deeply intuitive, family-oriented, emotionally fluent — but easily wounded.",
  Leo:         "Big-hearted, dramatic, generous. Needs to be seen; love expressed loudly is love received loudly.",
  Virgo:       "Analytical even in feeling. Worries are how this Moon loves. Service is its language.",
  Libra:       "Harmony-seeking, fair-minded. Conflict drains; beauty restores. Needs a partner to feel whole.",
  Scorpio:     "The Moon is debilitated here — emotions run deep, occasionally dark. Intense, magnetic, secretive.",
  Sagittarius: "Optimistic, restless, philosophical. Needs freedom to roam; clipped wings make this Moon brittle.",
  Capricorn:   "Reserved emotional life. Slow to trust, loyal once given. Achievement is the love letter.",
  Aquarius:    "Cool, detached affection. Loves humanity in the abstract; tenderness with one person takes work.",
  Pisces:      "Boundless empathy. Feels the room before entering it. Needs solitude to recharge from the world's static.",
};

export default function MoonSignsPage() {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl animate-pulse-glow" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              Janma Rashi • Chandra Rashi
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              Moon Signs
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              In Vedic astrology, the Moon sign — the rasi the Moon occupied at your birth — matters more than the Sun sign. It rules emotion, instinct, and how you love.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto glass border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-veda-orange/15 border border-veda-orange/20 text-veda-orange flex items-center justify-center">
                <FiMoon className="w-4 h-4" />
              </div>
              <h2 className="font-serif text-xl text-white">Find Your Moon Sign</h2>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Birth Date</label>
                <DatePicker value={date} onChange={setDate} placeholder="Select date" maxDate={new Date()} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Birth Time</label>
                <TimePicker value={time} onChange={setTime} placeholder="HH:MM" use24Hour={false} />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Birth Place</label>
                <Input placeholder="City, state, country" />
              </div>
              <div className="md:col-span-2 flex justify-end mt-2">
                <Button variant="primary-fill" size="md" type="submit" className="rounded-xl px-8">
                  Calculate Moon Sign
                </Button>
              </div>
            </form>
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
              The Twelve Moons
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Each rasi colours the Moon differently — and the Moon, in turn, colours the inner life.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ZODIAC.map((sign) => (
              <div
                key={sign.en}
                className="glass border border-white/10 rounded-2xl p-6 hover:border-veda-orange/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-veda-orange/15 border border-veda-orange/20 text-veda-orange text-xl flex items-center justify-center">
                    {sign.symbol}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-white">{sign.en} Moon</h3>
                    <p className="text-xs text-white/40">{sign.hi}</p>
                  </div>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{MOON_TRAITS[sign.en]}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
