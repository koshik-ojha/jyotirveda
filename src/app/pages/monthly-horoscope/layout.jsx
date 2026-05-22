export const metadata = {
  title: "Monthly Horoscope – Free Astrology Forecast",
  description: "Free monthly horoscope predictions for every zodiac sign. Find out what the planets have in store this month.",
  alternates: { canonical: "/pages/monthly-horoscope" },
  openGraph: {
    title: "Monthly Horoscope – Free Astrology Forecast",
    description: "Free monthly horoscope predictions for every zodiac sign. Find out what the planets have in store this month.",
    url: "/pages/monthly-horoscope",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monthly Horoscope – Free Astrology Forecast",
    description: "Free monthly horoscope predictions for every zodiac sign. Find out what the planets have in store this month.",
  },
};

export default function Layout({ children }) {
  return children;
}
