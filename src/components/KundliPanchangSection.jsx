import KundliForm from "./KundliForm";
import PanchangWidget from "./PanchangWidget";

export default function KundliPanchangSection() {
  return (
    <section className="py-20 px-6 bg-veda-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-veda-orange text-xs font-bold uppercase tracking-[0.2em] mb-3">Your Cosmic Blueprint</p>
          <h2 className="text-4xl md:text-5xl font-serif text-white">
            Generate Your <span className="text-gradient-gold">Free Kundli</span>
          </h2>
          <p className="text-white/35 text-sm mt-3 max-w-md mx-auto">
            Enter your birth details for a complete AI-enhanced Vedic birth chart analysis.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <KundliForm />
          </div>
          <PanchangWidget />
        </div>
      </div>
    </section>
  );
}
