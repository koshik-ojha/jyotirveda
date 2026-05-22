import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HoroscopeViewer from "@/components/HoroscopeViewer";

export const metadata = {
  title: "राशिफल 2026 — वार्षिक राशिफल हिन्दी में | JyotirVeda",
  description:
    "2026 का वार्षिक राशिफल — मेष से मीन तक। शनि, गुरु और राहु-केतु की चाल और बारह राशियों पर इनका प्रभाव।",
};

export default function Rashifal2026Page() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-12 px-6 overflow-hidden">
          <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-veda-gold/10 blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-0 right-10 w-72 h-72 rounded-full bg-veda-orange/10 blur-3xl" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              वार्षिक राशिफल
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-3 leading-tight">
              राशिफल 2026
            </h1>
            <p className="text-xl text-white/70 font-serif mb-6">Annual Horoscope 2026 in Hindi</p>
            <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              शनि, गुरु, राहु-केतु — 2026 में बड़े ग्रहों की चाल और हर राशि पर इसका प्रभाव।
            </p>
          </div>
        </section>

        <section className="px-6 pb-24 max-w-6xl mx-auto">
          <HoroscopeViewer period="yearly" lang="hi" />
        </section>
      </main>
      <Footer />
    </>
  );
}
