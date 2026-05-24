"use client";

import PageShell from "@/components/PageShell";
import { useState } from "react";

function estimateFederalTax(taxable: number, filing: string): number {
  const brackets =
    filing === "married"
      ? [
          [23200, 0.1],
          [94300, 0.12],
          [201050, 0.22],
          [383900, 0.24],
          [487450, 0.32],
          [731200, 0.35],
          [Infinity, 0.37],
        ]
      : [
          [11600, 0.1],
          [47150, 0.12],
          [100525, 0.22],
          [191950, 0.24],
          [243725, 0.32],
          [609350, 0.35],
          [Infinity, 0.37],
        ];
  let tax = 0;
  let prev = 0;
  for (const [limit, rate] of brackets) {
    const chunk = Math.min(taxable, limit) - prev;
    if (chunk <= 0) break;
    tax += chunk * rate;
    prev = limit;
    if (taxable <= limit) break;
  }
  return tax;
}

export default function TaxCalculator() {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState("14600");
  const [filing, setFiling] = useState("single");
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const gross = parseFloat(income);
    const ded = parseFloat(deductions) || 0;
    if (isNaN(gross) || gross <= 0) {
      setResult("Enter a valid gross income.");
      return;
    }
    const taxable = Math.max(0, gross - ded);
    const tax = estimateFederalTax(taxable, filing);
    const effective = ((tax / gross) * 100).toFixed(1);
    setResult(
      `Est. federal tax: $${Math.round(tax).toLocaleString()} (${effective}% effective on gross). Illustrative 2024-style brackets.`,
    );
  }

  return (
    <PageShell>
      <div className="glass-card w-full max-w-3xl space-y-6 p-[clamp(1.25rem,3vw,2rem)]">
        <label className="block">
          <span className="font-label text-accent">Gross income ($)</span>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="glass-input mt-2 w-full px-4 py-3 text-base outline-none"
            placeholder="85000"
          />
        </label>
        <label className="block">
          <span className="font-label text-accent">Deductions ($)</span>
          <input
            type="number"
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
            className="glass-input mt-2 w-full px-4 py-3 text-base outline-none"
          />
        </label>
        <label className="block">
          <span className="font-label text-accent">Filing status</span>
          <select
            value={filing}
            onChange={(e) => setFiling(e.target.value)}
            className="glass-input mt-2 w-full px-4 py-3 text-base outline-none"
          >
            <option value="single">Single</option>
            <option value="married">Married filing jointly</option>
          </select>
        </label>
        <button
          type="button"
          onClick={calculate}
          className="lab-btn lab-btn-primary w-full"
        >
          Estimate tax
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
