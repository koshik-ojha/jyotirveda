"use client";
import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { Button } from "@/components/ui/button";
import PlacePicker from "@/components/PlacePicker";

function isoDate(d) {
  return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` : "";
}

/**
 * Compact birth-details collector (date, time, place) used by all Reports
 * pages. On submit, calls `onSubmit({date,time,latitude,longitude,timezone})`.
 */
export default function BirthForm({ onSubmit, submitLabel = "Generate Report", extras = null }) {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [place, setPlace] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setError("");
    if (!date)  return setError("Pick a birth date");
    if (!time)  return setError("Pick a birth time");
    if (!place?.timezone) return setError("Pick a birth place from the suggestions");
    setLoading(true);
    try {
      await onSubmit({
        date: isoDate(date),
        time,
        latitude:  place.latitude,
        longitude: place.longitude,
        timezone:  place.timezone,
        place,
      });
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handle} className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Birth Date</label>
          <DatePicker value={date} onChange={setDate} placeholder="Pick date" maxDate={new Date()} />
        </div>
        <div>
          <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Birth Time</label>
          <TimePicker value={time} onChange={setTime} placeholder="HH:MM" />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2 block">Birth Place</label>
        <PlacePicker value={place} onChange={setPlace} />
      </div>
      {extras}
      {error && <p className="text-sm text-red-400/90 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
      <div className="flex justify-end">
        <Button type="submit" disabled={loading} variant="primary-fill" className="rounded-xl px-8">
          {loading ? "Computing…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
