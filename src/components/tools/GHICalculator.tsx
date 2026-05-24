"use client";

import PageShell from "@/components/PageShell";
import { useState } from "react";

export default function GHICalculator() {
  const [income, setIncome] = useState("");
  const [household, setHousehold] = useState("1");
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const inc = parseFloat(income);
    const size = parseInt(household, 10) || 1;
    if (isNaN(inc) || inc <= 0) {
      setResult("Enter a valid annual income.");
      return;
    }
    const fpl = 15060 + (size - 1) * 5380;
    const ratio = inc / fpl;
    let tier: string;
    if (ratio <= 1.38)
      tier = "Likely eligible for expanded subsidies (illustrative).";
    else if (ratio <= 4)
      tier = "May qualify for marketplace plans; verify with official ACA tools.";
    else tier = "Above typical subsidy range per illustrative FPL benchmarks.";
    setResult(
      `Household ${size} · Income ${ratio.toFixed(2)}× FPL (~$${fpl.toLocaleString()}). ${tier}`,
    );
  }

  return (
    <PageShell>
      <div className="glass-card w-full max-w-3xl space-y-6 p-[clamp(1.25rem,3vw,2rem)]">
        <label className="block">
          <span className="font-label text-accent">
            Annual household income ($)
          </span>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="glass-input mt-2 w-full px-4 py-3 text-base outline-none"
            placeholder="52000"
          />
        </label>
        <label className="block">
          <span className="font-label text-accent">Household size</span>
          <input
            type="number"
            min={1}
            value={household}
            onChange={(e) => setHousehold(e.target.value)}
            className="glass-input mt-2 w-full px-4 py-3 text-base outline-none"
          />
        </label>
        <button
          type="button"
          onClick={calculate}
          className="lab-btn lab-btn-primary w-full"
        >
          Run analysis
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
