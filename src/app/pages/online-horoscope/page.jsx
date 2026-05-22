import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignsReadingGrid from "@/components/horoscope/SignsReadingGrid";
import { FiSun, FiClock, FiCalendar, FiHeart, FiTrendingUp, FiBookOpen } from "react-icons/fi";

export const metadata = {
  title: "Online Horoscope — Free Vedic Predictions | JyotirVeda",
  description:
    "Free online horoscope grounded in Vedic astrology. Daily, weekly, monthly, yearly and love predictions for all 12 zodiac signs.",
};

const periods = [
  { icon: FiSun,        title: "Today",     href: "/todays-horoscope",       desc: "Daily guidance" },
  { icon: FiClock,      title: "Tomorrow",  href: "/tomorrows-horoscope",    desc: "Plan ahead" },
  { icon: FiCalendar,   title: "Week",      href: "/weekly-horoscope",       desc: "Seven days" },
  { icon: FiCalendar,   title: "Month",     href: "/monthly-horoscope",      desc: "Thirty days" },
  { icon: FiHeart,      title: "Love",      href: "/love-horoscope",         desc: "Romance & bonds" },
  { icon: FiTrendingUp, title: "2026",      href: "/horoscope-2026",         desc: "Year in preview" },
  { icon: FiBookOpen,   title: "Rashifal",  href: "/rashifal",               desc: "हिन्दी राशिफल" },
  { icon: FiHeart,      title: "Matching",  href: "/horoscope-matching",     desc: "Guna Milan" },
];

export default function OnlineHoroscopePage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 left-1/3 w-[40rem] h-[40rem] rounded-full bg-veda-orange/10 blur-3xl animate-pulse-glow" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              Free Vedic Astrology
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              Online Horoscope
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Every reading you need, one click away. Pick your horizon — from the next hour to the next year — and find your sign&apos;s forecast.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {periods.map((p) => (
              <a
                key={p.title}
                href={p.href}
                className="glass border border-white/10 rounded-2xl p-5 hover:border-veda-orange/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-veda-orange/15 border border-veda-orange/20 text-veda-orange flex items-center justify-center mb-3">
                  <p.icon className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg text-white group-hover:text-veda-orange transition-colors">{p.title}</h3>
                <p className="text-xs text-white/45 mt-0.5">{p.desc}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">Pick Your Sign</h2>
            <p className="text-white/50 max-w-2xl mx-auto">Today&apos;s reading for every rasi — tap any card to dive deeper.</p>
          </div>
          <SignsReadingGrid periodLabel="Today" period="today" />
        </section>
      </main>
      <Footer />
    </>
  );
}
