export const metadata = {
  title: "Daily Horoscope RSS Feeds",
  description: "Subscribe to free daily horoscope RSS feeds for every zodiac sign — fresh astrology updates delivered daily.",
  alternates: { canonical: "/pages/horoscope-rss" },
  openGraph: {
    title: "Daily Horoscope RSS Feeds",
    description: "Subscribe to free daily horoscope RSS feeds for every zodiac sign — fresh astrology updates delivered daily.",
    url: "/pages/horoscope-rss",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Horoscope RSS Feeds",
    description: "Subscribe to free daily horoscope RSS feeds for every zodiac sign — fresh astrology updates delivered daily.",
  },
};

export default function Layout({ children }) {
  return children;
}
