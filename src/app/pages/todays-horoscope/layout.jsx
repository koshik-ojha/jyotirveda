export const metadata = {
  title: "Today's Horoscope – Free Daily Astrology",
  description: "Read today's free daily horoscope for all 12 zodiac signs. Accurate AI-powered predictions for love, career, money and health.",
  alternates: { canonical: "/pages/todays-horoscope" },
  openGraph: {
    title: "Today's Horoscope – Free Daily Astrology",
    description: "Read today's free daily horoscope for all 12 zodiac signs. Accurate AI-powered predictions for love, career, money and health.",
    url: "/pages/todays-horoscope",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Today's Horoscope – Free Daily Astrology",
    description: "Read today's free daily horoscope for all 12 zodiac signs. Accurate AI-powered predictions for love, career, money and health.",
  },
};

export default function Layout({ children }) {
  return children;
}
