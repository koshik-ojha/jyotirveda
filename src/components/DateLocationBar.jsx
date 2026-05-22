"use client";
import { useEffect } from "react";
import { DatePicker } from "@/components/ui/date-picker";
import PlacePicker from "@/components/PlacePicker";

/**
 * Compact date + place picker used by all Panchang pages.
 * Auto-tries geolocation on mount if no `place` set.
 */
export default function DateLocationBar({ date, setDate, place, setPlace, showDate = true }) {
  useEffect(() => {
    if (place || typeof navigator === "undefined" || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const r = await fetch(`/api/geocode?q=${pos.coords.latitude},${pos.coords.longitude}`);
        const j = await r.json();
        if (j.results?.[0]) setPlace(j.results[0]);
      } catch {}
    }, () => {}, { timeout: 5000 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`glass border border-white/10 rounded-2xl p-5 grid ${showDate ? "md:grid-cols-2" : ""} gap-4`}>
      {showDate && (
        <div>
          <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Date</label>
          <DatePicker value={date} onChange={setDate} />
        </div>
      )}
      <div>
        <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Location</label>
        <PlacePicker value={place} onChange={setPlace} />
      </div>
    </div>
  );
}
