"use client";

import PageShell from "@/components/PageShell";
import {
  calculateSalary,
  formatInr,
  type SalaryTaxResult,
} from "@/lib/indianSalaryTax";
import { FormEvent, useState } from "react";

function parseAmount(value: string): number {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function TaxCalculator() {
  const [ctc, setCtc] = useState("");
  const [annualRentPaid, setAnnualRentPaid] = useState("");
  const [metroCity, setMetroCity] = useState(false);
  const [annualFoodBenefit, setAnnualFoodBenefit] = useState("");
  const [section80c, setSection80c] = useState("");
  const [section80d, setSection80d] = useState("");
  const [employeeNps, setEmployeeNps] = useState("");
  const [employerNps, setEmployerNps] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<SalaryTaxResult | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsedCtc = parseAmount(ctc);
    if (parsedCtc <= 0) {
      setError("Enter a valid annual CTC.");
      setResult(null);
      return;
    }

    setError("");
    setResult(
      calculateSalary({
        ctc: parsedCtc,
        annualRentPaid: parseAmount(annualRentPaid),
        metroCity,
        annualFoodBenefit: parseAmount(annualFoodBenefit),
        section80c: parseAmount(section80c),
        section80d: parseAmount(section80d),
        employeeNps: parseAmount(employeeNps),
        employerNps: parseAmount(employerNps),
      }),
    );
  }

  return (
    <PageShell>
      <form
        onSubmit={handleSubmit}
        className="glass-card w-full max-w-3xl space-y-6 p-[clamp(1.25rem,3vw,2rem)]"
      >
        <p className="text-sm leading-relaxed text-muted">
          Compare old vs new income tax regimes for salaried employees in India.
          Includes HRA exemption, food benefit, Section 80C/80D, NPS, standard
          deduction, and 4% cess on tax.
        </p>

        <label className="block">
          <span className="font-label text-accent">Annual CTC (₹)</span>
          <input
            required
            type="number"
            min={1}
            value={ctc}
            onChange={(e) => setCtc(e.target.value)}
            className="glass-input mt-2 w-full px-4 py-3 text-base outline-none"
            placeholder="1800000"
          />
        </label>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="font-label text-accent">Annual rent paid (₹)</span>
            <input
              type="number"
              min={0}
              value={annualRentPaid}
              onChange={(e) => setAnnualRentPaid(e.target.value)}
              className="glass-input mt-2 w-full px-4 py-3 text-base outline-none"
              placeholder="360000"
            />
            <span className="mt-1 block text-xs text-muted">
              Used for HRA exemption under the old regime.
            </span>
          </label>

          <label className="flex items-end gap-3 pb-3">
            <input
              type="checkbox"
              checked={metroCity}
              onChange={(e) => setMetroCity(e.target.checked)}
              className="size-4 accent-[var(--accent)]"
            />
            <span className="text-sm text-foreground/90">Metro city (HRA cap 50%)</span>
          </label>
        </div>

        <label className="block">
          <span className="font-label text-accent">Annual food benefit (₹)</span>
          <input
            type="number"
            min={0}
            value={annualFoodBenefit}
            onChange={(e) => setAnnualFoodBenefit(e.target.value)}
            className="glass-input mt-2 w-full px-4 py-3 text-base outline-none"
            placeholder="26400"
          />
          <span className="mt-1 block text-xs text-muted">
            Exempt meal allowance reduces taxable income in both regimes.
          </span>
        </label>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="font-label text-accent">Section 80C (₹)</span>
            <input
              type="number"
              min={0}
              value={section80c}
              onChange={(e) => setSection80c(e.target.value)}
              className="glass-input mt-2 w-full px-4 py-3 text-base outline-none"
              placeholder="150000"
            />
            <span className="mt-1 block text-xs text-muted">Capped at ₹1,50,000 (old regime).</span>
          </label>

          <label className="block">
            <span className="font-label text-accent">Section 80D (₹)</span>
            <input
              type="number"
              min={0}
              value={section80d}
              onChange={(e) => setSection80d(e.target.value)}
              className="glass-input mt-2 w-full px-4 py-3 text-base outline-none"
              placeholder="25000"
            />
          </label>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="font-label text-accent">Employee NPS (₹)</span>
            <input
              type="number"
              min={0}
              value={employeeNps}
              onChange={(e) => setEmployeeNps(e.target.value)}
              className="glass-input mt-2 w-full px-4 py-3 text-base outline-none"
              placeholder="50000"
            />
          </label>

          <label className="block">
            <span className="font-label text-accent">Employer NPS (₹)</span>
            <input
              type="number"
              min={0}
              value={employerNps}
              onChange={(e) => setEmployerNps(e.target.value)}
              className="glass-input mt-2 w-full px-4 py-3 text-base outline-none"
              placeholder="108000"
            />
          </label>
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-red-300">
            {error}
          </p>
        )}

        <button type="submit" className="lab-btn lab-btn-primary w-full">
          Compare regimes
        </button>

        {result && (
          <div className="space-y-4 border-t border-border pt-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <ResultRow label="Basic (40% of CTC)" value={formatInr(result.basic)} />
              <ResultRow label="HRA (50% of basic)" value={formatInr(result.hra)} />
              <ResultRow
                label="HRA exemption (old regime)"
                value={formatInr(result.hraExemption)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <RegimeCard
                title="Old regime"
                taxableIncome={result.oldRegimeTaxableIncome}
                tax={result.oldRegimeTax}
                highlighted={result.betterRegime === "Old"}
              />
              <RegimeCard
                title="New regime"
                taxableIncome={result.newRegimeTaxableIncome}
                tax={result.newRegimeTax}
                highlighted={result.betterRegime === "New"}
              />
            </div>

            <p className="text-sm leading-relaxed text-foreground/90">
              <span className="font-semibold text-accent">
                {result.betterRegime} regime
              </span>{" "}
              is lower by {formatInr(result.annualSaving)} per year (includes 4%
              cess). Illustrative model—verify with a qualified tax professional.
            </p>
          </div>
        )}
      </form>
    </PageShell>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/70 bg-black/20 px-4 py-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-medium text-foreground">{value}</p>
    </div>
  );
}

function RegimeCard({
  title,
  taxableIncome,
  tax,
  highlighted,
}: {
  title: string;
  taxableIncome: number;
  tax: number;
  highlighted: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        highlighted
          ? "border-accent/50 bg-accent/10"
          : "border-border/70 bg-black/20"
      }`}
    >
      <h3 className="font-display text-lg text-foreground">{title}</h3>
      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Taxable income</dt>
          <dd className="font-medium text-foreground">
            {formatInr(taxableIncome)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Tax (incl. 4% cess)</dt>
          <dd className="font-medium text-foreground">{formatInr(tax)}</dd>
        </div>
      </dl>
    </div>
  );
}
