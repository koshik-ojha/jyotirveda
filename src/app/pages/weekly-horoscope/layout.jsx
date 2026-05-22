export const metadata = {
  title: "Weekly Horoscope – 7-Day Astrology Forecast",
  description: "Your free weekly horoscope for all zodiac signs. Love, work and money predictions for the week ahead.",
  alternates: { canonical: "/pages/weekly-horoscope" },
  openGraph: {
    title: "Weekly Horoscope – 7-Day Astrology Forecast",
    description: "Your free weekly horoscope for all zodiac signs. Love, work and money predictions for the week ahead.",
    url: "/pages/weekly-horoscope",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weekly Horoscope – 7-Day Astrology Forecast",
    description: "Your free weekly horoscope for all zodiac signs. Love, work and money predictions for the week ahead.",
  },
};

export default function Layout({ children }) {
  return children;
}
