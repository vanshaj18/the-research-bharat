"use client";

import PageShell from "@/components/PageShell";
import { useState } from "react";

const SAMPLE_DATA: Record<string, { rate: number; trend: string }> = {
  "new york, ny": { rate: 2.1, trend: "↓ vs prior year (illustrative)" },
  "chicago, il": { rate: 4.8, trend: "→ flat (illustrative)" },
  "austin, tx": { rate: 3.2, trend: "↑ localized hotspots (illustrative)" },
  default: {
    rate: 3.5,
    trend: "Data placeholder—wire to FBI UCR / local open data.",
  },
};

export default function CrimeRates() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function lookup() {
    const key = city.trim().toLowerCase();
    if (!key) {
      setResult("Enter a city and state, e.g. Austin, TX");
      return;
    }
    const data = SAMPLE_DATA[key] ?? SAMPLE_DATA.default;
    setResult(
      `Violent crime index (demo): ${data.rate} per 1k · ${data.trend}`,
    );
  }

  return (
    <PageShell>
      <div className="glass-card w-full max-w-3xl space-y-6 p-[clamp(1.25rem,3vw,2rem)]">
        <label className="block">
          <span className="font-label text-accent">City, State</span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="glass-input mt-2 w-full px-4 py-3 text-base outline-none"
            placeholder="New York, NY"
          />
        </label>
        <button
          type="button"
          onClick={lookup}
          className="lab-btn lab-btn-secondary w-full"
        >
          Query dataset
        </button>
        {result && (
          <p className="border-t border-border pt-4 text-sm leading-relaxed text-foreground/90">
            {result}
          </p>
        )}
      </div>
    </PageShell>
  );
}
