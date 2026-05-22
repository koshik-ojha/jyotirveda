import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiAlertTriangle, FiSun, FiClock } from "react-icons/fi";

export const metadata = {
  title: "Rahu Kaal Today — Inauspicious Time Calculator | JyotirVeda",
  description:
    "Today's Rahu Kaal timings — the 90-minute inauspicious window of the day. Plus daily Rahu Kaal for all seven weekdays.",
};

const today = new Date();
const dayName = today.toLocaleDateString(undefined, { weekday: "long" });
const dateStr = today.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

const RAHU_KAAL_BY_DAY = [
  { day: "Sunday",    time: "4:30 PM – 6:00 PM", lord: "Sun" },
  { day: "Monday",    time: "7:30 AM – 9:00 AM", lord: "Moon" },
  { day: "Tuesday",   time: "3:00 PM – 4:30 PM", lord: "Mars" },
  { day: "Wednesday", time: "12:00 PM – 1:30 PM", lord: "Mercury" },
  { day: "Thursday",  time: "1:30 PM – 3:00 PM", lord: "Jupiter" },
  { day: "Friday",    time: "10:30 AM – 12:00 PM", lord: "Venus" },
  { day: "Saturday",  time: "9:00 AM – 10:30 AM", lord: "Saturn" },
];

const todaySlot = RAHU_KAAL_BY_DAY.find((d) => d.day === dayName) ?? RAHU_KAAL_BY_DAY[3];

const avoidances = [
  "Starting a new business or signing contracts",
  "Travelling to begin an important journey",
  "Marriage, engagement or any auspicious ceremony",
  "Buying gold, vehicles or property",
  "Beginning new financial investments",
];

export default function RahuKaalPage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-rose-500/10 blur-3xl animate-pulse-glow" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              {dateStr}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              Rahu Kaal Today
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              A 90-minute window each day when Rahu&apos;s shadow is heaviest. Tradition advises against starting anything important during these minutes.
            </p>
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="max-w-3xl mx-auto glass border border-rose-500/20 rounded-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 mb-4">
              <FiAlertTriangle className="w-6 h-6" />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2">Today is {dayName}</p>
            <p className="text-5xl md:text-6xl font-serif text-gradient-gold mb-4 tabular-nums">{todaySlot.time}</p>
            <p className="text-white/55 text-sm">
              Approximate window — actual timing depends on local sunrise and sunset. Avoid starting new tasks during this period.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass border border-white/10 rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-5">
                <FiClock className="w-5 h-5 text-veda-orange" />
                <h3 className="font-serif text-xl text-white">Rahu Kaal by Weekday</h3>
              </div>
              <ul className="divide-y divide-white/5">
                {RAHU_KAAL_BY_DAY.map((d) => (
                  <li key={d.day} className={`flex items-center justify-between py-3 ${d.day === dayName ? "text-veda-orange" : "text-white/70"}`}>
                    <div>
                      <p className="text-sm font-medium">{d.day}</p>
                      <p className="text-[10px] uppercase tracking-widest text-white/35">Lord • {d.lord}</p>
                    </div>
                    <p className="text-sm tabular-nums">{d.time}</p>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-white/40 mt-5 leading-relaxed">
                Calculated by dividing daylight (sunrise to sunset) into 8 equal parts. Each weekday assigns Rahu Kaal to a different part.
              </p>
            </div>

            <div className="glass border border-white/10 rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-5">
                <FiSun className="w-5 h-5 text-veda-orange" />
                <h3 className="font-serif text-xl text-white">What to Avoid During Rahu Kaal</h3>
              </div>
              <ul className="space-y-3">
                {avoidances.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-sm text-white/65">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-white/40 mt-6 leading-relaxed border-t border-white/10 pt-5">
                Routine activities — eating, working, studying — are unaffected. The caution applies specifically to beginnings.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
