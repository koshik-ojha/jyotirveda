import tzlookup from "tz-lookup";

const NOMINATIM = "https://nominatim.openstreetmap.org/search";

/** Geocode a free-text place name → first match with lat/lng/tz. */
export async function geocode(query) {
  if (!query || query.trim().length < 2) return [];
  const url = `${NOMINATIM}?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1`;
  const res = await fetch(url, {
    headers: {
      // Nominatim usage policy: identify yourself.
      "User-Agent": "JyotirVeda/1.0 (https://jyotirveda.local)",
      "Accept-Language": "en",
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Nominatim ${res.status}`);
  const rows = await res.json();
  return rows.map((r) => {
    const lat = parseFloat(r.lat);
    const lon = parseFloat(r.lon);
    let timezone = null;
    try { timezone = tzlookup(lat, lon); } catch { /* outside tz table */ }
    const addr = r.address || {};
    const name = r.name || addr.road || addr.suburb || addr.neighbourhood || "";
    const city = addr.city || addr.town || addr.village || addr.county || "";
    const state = addr.state || "";
    const country = addr.country || "";
    const shortName = [name, city, state, country].filter(Boolean).slice(0, 3).join(", ") || r.display_name;
    return {
      displayName: r.display_name,
      shortName,
      latitude: lat,
      longitude: lon,
      timezone,
      type: r.type,
      country,
    };
  });
}

/**
 * Build a UTC Date from a local date + time + IANA timezone.
 * Handles historical DST automatically via Intl APIs.
 */
export function localToUTC({ year, month, day, hour, minute, timezone }) {
  // Strategy: pick a UTC instant guess, ask what local time it represents in
  // the target zone, compute offset, correct. Two iterations handle DST edges.
  const guess = Date.UTC(year, month - 1, day, hour, minute, 0);
  const offset1 = zoneOffsetMinutes(guess, timezone);
  const corrected = guess - offset1 * 60 * 1000;
  const offset2 = zoneOffsetMinutes(corrected, timezone);
  return new Date(guess - offset2 * 60 * 1000);
}

function zoneOffsetMinutes(utcMs, timezone) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  });
  const parts = fmt.formatToParts(new Date(utcMs)).reduce((a, p) => {
    if (p.type !== "literal") a[p.type] = p.value;
    return a;
  }, {});
  const asUTC = Date.UTC(
    +parts.year, +parts.month - 1, +parts.day,
    +parts.hour === 24 ? 0 : +parts.hour, +parts.minute, +parts.second
  );
  return (asUTC - utcMs) / 60000;
}
