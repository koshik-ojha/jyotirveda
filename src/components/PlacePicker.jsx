"use client";
import { useEffect, useRef, useState } from "react";
import { FiMapPin, FiLoader } from "react-icons/fi";
import { Input } from "@/components/ui/input";

/**
 * Free-text place search backed by /api/geocode (Nominatim).
 * Calls onChange with { displayName, latitude, longitude, timezone } once a
 * suggestion is picked. Stores the chosen place internally for re-display.
 */
export default function PlacePicker({ value, onChange, placeholder = "Enter city, state, country", className }) {
  const [q, setQ] = useState(value?.shortName ?? value?.displayName ?? "");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    setQ(value?.shortName ?? value?.displayName ?? "");
  }, [value?.shortName, value?.displayName]);

  useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleChange = (e) => {
    const v = e.target.value;
    setQ(v);
    setOpen(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (v.trim().length < 3) { setResults([]); return; }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(v)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const pick = (r) => {
    onChange?.(r);
    setQ(r.shortName ?? r.displayName);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className={`relative ${className ?? ""}`}>
      <span className="pointer-events-none absolute left-3 top-3 text-gray-400">
        <FiMapPin className="w-4 h-4" />
      </span>
      <Input
        value={q}
        onChange={handleChange}
        onFocus={() => results.length > 0 && setOpen(true)}
        placeholder={placeholder}
        className="pl-10"
        autoComplete="off"
        title={value?.displayName ?? q}
      />
      {loading && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
          <FiLoader className="w-4 h-4 animate-spin" />
        </span>
      )}
      {open && results.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 mt-1 max-h-72 overflow-auto rounded-xl border border-white/10 bg-veda-dark/98 backdrop-blur-xl shadow-2xl">
          {results.map((r, i) => (
            <li key={`${r.latitude}-${r.longitude}-${i}`}>
              <button
                type="button"
                onClick={() => pick(r)}
                className="block w-full text-left px-4 py-2.5 text-sm text-white/80 hover:bg-veda-orange/15 hover:text-white transition-colors"
              >
                <div className="font-medium truncate">{r.displayName}</div>
                <div className="text-xs text-white/40 mt-0.5">
                  {r.latitude.toFixed(3)}, {r.longitude.toFixed(3)}
                  {r.timezone && <> • {r.timezone}</>}
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
      {value?.timezone && (
        <p className="text-xs text-white/40 mt-1.5 pl-1">
          {value.latitude.toFixed(3)}°, {value.longitude.toFixed(3)}° • {value.timezone}
        </p>
      )}
    </div>
  );
}
