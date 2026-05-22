import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import KundliPanchangSection from "@/components/KundliPanchangSection";
import VedicWisdom from "@/components/VedicWisdom";
import AstrologicalTools from "@/components/AstrologicalTools";
import DetailedReports from "@/components/DetailedReports";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Free Kundli, Daily Horoscope & Panchang Online",
  description:
    "Jyotirveda brings AI-powered Vedic astrology — free kundli, daily rashifal, panchang, kundli matching, numerology, tarot, muhurat and 60+ tools in one place.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <KundliPanchangSection />
      <VedicWisdom />
      <AstrologicalTools />
      <DetailedReports />
      <Footer />
    </>
  );
}
