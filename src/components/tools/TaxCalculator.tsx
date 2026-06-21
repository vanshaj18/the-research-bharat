"use client";

import PageShell from "@/components/PageShell";
import {
  calculateSalary,
  formatInr,
  type SalaryTaxResult,
} from "@/lib/indianSalaryTax";
import { type ChangeEvent, FormEvent, useRef, useState } from "react";

type InputMode = "manual" | "upload";

function parseAmount(value: string): number {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function applyUploadPayload(
  data: Record<string, unknown>,
  setters: {
    setCtc: (v: string) => void;
    setAnnualRentPaid: (v: string) => void;
    setMetroCity: (v: boolean) => void;
    setAnnualFoodBenefit: (v: string) => void;
    setSection80c: (v: string) => void;
    setSection80d: (v: string) => void;
    setEmployeePf: (v: string) => void;
    setEmployerPf: (v: string) => void;
    setEmployeeNps: (v: string) => void;
    setEmployerNps: (v: string) => void;
  },
) {
  const numberField = (key: string, setter: (v: string) => void) => {
    const value = data[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      setter(String(value));
    }
  };

  numberField("ctc", setters.setCtc);
  numberField("annualRentPaid", setters.setAnnualRentPaid);
  numberField("annualFoodBenefit", setters.setAnnualFoodBenefit);
  numberField("section80c", setters.setSection80c);
  numberField("section80d", setters.setSection80d);
  numberField("employeePf", setters.setEmployeePf);
  numberField("employerPf", setters.setEmployerPf);
  numberField("employeeNps", setters.setEmployeeNps);
  numberField("employerNps", setters.setEmployerNps);

  if (typeof data.metroCity === "boolean") {
    setters.setMetroCity(data.metroCity);
  }
}

export default function TaxCalculator() {
  const [inputMode, setInputMode] = useState<InputMode>("manual");
  const [ctc, setCtc] = useState("");
  const [annualRentPaid, setAnnualRentPaid] = useState("");
  const [metroCity, setMetroCity] = useState(false);
  const [annualFoodBenefit, setAnnualFoodBenefit] = useState("");
  const [section80c, setSection80c] = useState("");
  const [section80d, setSection80d] = useState("");
  const [employeePf, setEmployeePf] = useState("");
  const [employerPf, setEmployerPf] = useState("");
  const [employeeNps, setEmployeeNps] = useState("");
  const [employerNps, setEmployerNps] = useState("");
  const [error, setError] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [result, setResult] = useState<SalaryTaxResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsedCtc = parseAmount(ctc);
    if (parsedCtc <= 0) {
      setError("Enter a valid annual CTC.");
      setResult(null);
      return;
    }

    setError("");
    setUploadMessage("");
    setResult(
      calculateSalary({
        ctc: parsedCtc,
        annualRentPaid: parseAmount(annualRentPaid),
        metroCity,
        annualFoodBenefit: parseAmount(annualFoodBenefit),
        section80c: parseAmount(section80c),
        section80d: parseAmount(section80d),
        employeePf: parseAmount(employeePf),
        employerPf: parseAmount(employerPf),
        employeeNps: parseAmount(employeeNps),
        employerNps: parseAmount(employerNps),
      }),
    );
  }

  async function handleFileUpload(file: File) {
    setError("");
    setUploadMessage("");
    setResult(null);

    if (file.type === "application/json" || file.name.endsWith(".json")) {
      try {
        const text = await file.text();
        const data = JSON.parse(text) as Record<string, unknown>;
        applyUploadPayload(data, {
          setCtc,
          setAnnualRentPaid,
          setMetroCity,
          setAnnualFoodBenefit,
          setSection80c,
          setSection80d,
          setEmployeePf,
          setEmployerPf,
          setEmployeeNps,
          setEmployerNps,
        });
        setInputMode("manual");
        setUploadMessage("Salary data loaded. Review the fields below, then compare regimes.");
      } catch {
        setError("Could not parse JSON file. Check the format and try again.");
      }
      return;
    }

    setError("Payslip and PDF upload is coming soon. Use a JSON file or switch to Manual entry.");
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) void handleFileUpload(file);
    e.target.value = "";
  }

  return (
    <PageShell>
      <form
        onSubmit={handleSubmit}
        className="glass-card w-full max-w-3xl space-y-6 p-[clamp(1.25rem,3vw,2rem)]"
      >
        <p className="text-sm leading-relaxed text-muted">
          Compare old vs new income tax regimes for salaried employees in India.
          Includes HRA exemption, food benefit, PF, Section 80C/80D, NPS,
          standard deduction, and 4% cess on tax.
        </p>

        <div
          className="grid grid-cols-2 gap-2"
          role="group"
          aria-label="Salary input mode"
        >
          {(["manual", "upload"] as const).map((mode) => {
            const isActive = inputMode === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  setInputMode(mode);
                  setError("");
                  setUploadMessage("");
                }}
                aria-pressed={isActive}
                className={`lab-btn normal-case tracking-normal ${
                  isActive
                    ? "lab-btn-active"
                    : "lab-btn-secondary text-foreground/75"
                }`}
              >
                {mode === "manual" ? "Manual" : "Upload"}
              </button>
            );
          })}
        </div>

        {inputMode === "upload" ? (
          <div className="space-y-4 rounded-lg border border-dashed border-border/80 bg-black/20 p-6">
            <p className="text-sm leading-relaxed text-muted">
              Upload a JSON salary breakdown to pre-fill the form. Payslip and PDF
              parsing is coming soon.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              className="sr-only"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="lab-btn lab-btn-secondary w-full"
            >
              Choose file
            </button>
            <pre className="overflow-x-auto rounded-md border border-border/60 bg-black/30 p-3 text-xs leading-relaxed text-muted">
{`{
  "ctc": 1800000,
  "annualRentPaid": 360000,
  "metroCity": true,
  "annualFoodBenefit": 26400,
  "employeePf": 86400,
  "employerPf": 86400,
  "section80c": 150000,
  "section80d": 25000,
  "employeeNps": 50000,
  "employerNps": 108000
}`}
            </pre>
          </div>
        ) : (
          <>
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
            <span className="font-label text-accent">Employee PF (₹)</span>
            <input
              type="number"
              min={0}
              value={employeePf}
              onChange={(e) => setEmployeePf(e.target.value)}
              className="glass-input mt-2 w-full px-4 py-3 text-base outline-none"
              placeholder="86400"
            />
            <span className="mt-1 block text-xs text-muted">
              Annual employee provident fund contribution.
            </span>
          </label>

          <label className="block">
            <span className="font-label text-accent">Employer PF (₹)</span>
            <input
              type="number"
              min={0}
              value={employerPf}
              onChange={(e) => setEmployerPf(e.target.value)}
              className="glass-input mt-2 w-full px-4 py-3 text-base outline-none"
              placeholder="86400"
            />
            <span className="mt-1 block text-xs text-muted">
              Annual employer provident fund contribution.
            </span>
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
          </>
        )}

        {uploadMessage && (
          <p className="text-sm font-medium text-accent">{uploadMessage}</p>
        )}

        {error && (
          <p role="alert" className="text-sm font-medium text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="lab-btn lab-btn-primary w-full"
          disabled={inputMode === "upload"}
        >
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
