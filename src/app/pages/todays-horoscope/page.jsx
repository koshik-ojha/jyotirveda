import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignsReadingGrid from "@/components/horoscope/SignsReadingGrid";

export const metadata = {
  title: "Today's Horoscope — Daily Predictions for All Signs | JyotirVeda",
  description:
    "Free daily horoscope for all 12 zodiac signs. Vedic predictions on love, career, finance and health for Aries through Pisces.",
};

const today = new Date().toLocaleDateString(undefined, {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function TodaysHoroscopePage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute top-10 left-1/3 w-[36rem] h-[36rem] rounded-full bg-veda-orange/10 blur-3xl animate-pulse-glow" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              {today}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              Today&apos;s Horoscope
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Daily guidance for every zodiac sign — drawn from the current position of the Moon, Sun and active planetary transits.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <SignsReadingGrid periodLabel="Today" period="today" />
        </section>
      </main>
      <Footer />
    </>
  );
}
