import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import KundliPanchangSection from "@/components/KundliPanchangSection";
import VedicWisdom from "@/components/VedicWisdom";
import AstrologicalTools from "@/components/AstrologicalTools";
import DetailedReports from "@/components/DetailedReports";
import Footer from "@/components/Footer";

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
