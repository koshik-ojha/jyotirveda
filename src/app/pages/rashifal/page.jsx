import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HoroscopeViewer from "@/components/HoroscopeViewer";

export const metadata = {
  title: "राशिफल — आज का राशिफल हिन्दी में | JyotirVeda",
  description:
    "सभी 12 राशियों के लिए आज का राशिफल। मेष से मीन तक — प्रेम, करियर, धन और स्वास्थ्य पर वैदिक भविष्यवाणी।",
};

const today = new Date().toLocaleDateString("hi-IN", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function RashifalPage() {
  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-12 px-6 overflow-hidden">
          <div className="absolute top-10 left-1/3 w-[36rem] h-[36rem] rounded-full bg-veda-orange/10 blur-3xl animate-pulse-glow" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              {today}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-3 leading-tight">
              आज का राशिफल
            </h1>
            <p className="text-xl text-white/70 font-serif mb-6">Daily Rashifal in Hindi</p>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              वर्तमान ग्रह गोचर के आधार पर सटीक राशिफल — प्रेम, कार्य, धन और स्वास्थ्य पर ग्रहों का संदेश।
            </p>
          </div>
        </section>

        <section className="px-6 pb-24 max-w-6xl mx-auto">
          <HoroscopeViewer period="today" lang="hi" />
        </section>
      </main>
      <Footer />
    </>
  );
}
