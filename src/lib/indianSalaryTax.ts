export type SalaryStructure = {
  ctc: number;
  basicPercent?: number;
  hraPercentOfBasic?: number;
  employeePf?: number;
  employeeNps?: number;
  employerPf?: number;
  employerNps?: number;
  annualFoodBenefit?: number;
  annualRentPaid?: number;
  metroCity?: boolean;
  section80c?: number;
  section80d?: number;
  standardDeduction?: number;
};

export type SalaryTaxResult = {
  ctc: number;
  basic: number;
  hra: number;
  hraExemption: number;
  oldRegimeTaxableIncome: number;
  oldRegimeTax: number;
  newRegimeTaxableIncome: number;
  newRegimeTax: number;
  annualSaving: number;
  betterRegime: "Old" | "New";
};

const SECTION_80C_LIMIT = 150_000;
const DEFAULT_STANDARD_DEDUCTION = 75_000;
const CESS_MULTIPLIER = 1.04;

function applySlabTax(
  taxableIncome: number,
  slabs: readonly (readonly [number, number])[],
): number {
  let tax = 0;
  let lower = 0;

  for (const [upper, rate] of slabs) {
    if (taxableIncome > lower) {
      const taxable = Math.min(taxableIncome, upper) - lower;
      tax += taxable * rate;
      lower = upper;
    }
  }

  return tax;
}

export function hraExemption(
  basicSalary: number,
  hraReceived: number,
  annualRent: number,
  metro: boolean,
): number {
  return Math.max(
    0,
    Math.min(
      hraReceived,
      annualRent - 0.1 * basicSalary,
      (metro ? 0.5 : 0.4) * basicSalary,
    ),
  );
}

export function taxNewRegime(taxableIncome: number): number {
  const slabs: (readonly [number, number])[] = [
    [400_000, 0],
    [800_000, 0.05],
    [1_200_000, 0.1],
    [1_600_000, 0.15],
    [2_000_000, 0.2],
    [2_400_000, 0.25],
    [Infinity, 0.3],
  ];

  let tax = applySlabTax(taxableIncome, slabs);

  if (taxableIncome <= 1_200_000) {
    tax = 0;
  }

  return tax;
}

export function taxOldRegime(taxableIncome: number): number {
  const slabs: (readonly [number, number])[] = [
    [250_000, 0],
    [500_000, 0.05],
    [1_000_000, 0.2],
    [Infinity, 0.3],
  ];

  let tax = applySlabTax(taxableIncome, slabs);

  if (taxableIncome <= 500_000) {
    tax = 0;
  }

  return tax;
}

export function calculateSalary(struct: SalaryStructure): SalaryTaxResult {
  const basicPercent = struct.basicPercent ?? 0.4;
  const hraPercentOfBasic = struct.hraPercentOfBasic ?? 0.5;
  const standardDeduction = struct.standardDeduction ?? DEFAULT_STANDARD_DEDUCTION;
  const employeeNps = struct.employeeNps ?? 0;
  const employerNps = struct.employerNps ?? 0;
  const annualFoodBenefit = struct.annualFoodBenefit ?? 0;
  const annualRentPaid = struct.annualRentPaid ?? 0;
  const metroCity = struct.metroCity ?? false;
  const section80c = struct.section80c ?? 0;
  const section80d = struct.section80d ?? 0;

  const basic = struct.ctc * basicPercent;
  const hra = basic * hraPercentOfBasic;
  const grossSalary = struct.ctc;

  const taxableNew = Math.max(
    0,
    grossSalary - standardDeduction - employerNps - annualFoodBenefit,
  );

  const baseTaxNew = taxNewRegime(taxableNew);
  const taxNew = baseTaxNew * CESS_MULTIPLIER;

  const hraExempt = hraExemption(basic, hra, annualRentPaid, metroCity);

  const taxableOld = Math.max(
    0,
    grossSalary
      - standardDeduction
      - hraExempt
      - annualFoodBenefit
      - Math.min(section80c, SECTION_80C_LIMIT)
      - section80d
      - employeeNps
      - employerNps,
  );

  const baseTaxOld = taxOldRegime(taxableOld);
  const taxOld = baseTaxOld * CESS_MULTIPLIER;

  return {
    ctc: struct.ctc,
    basic: round2(basic),
    hra: round2(hra),
    hraExemption: round2(hraExempt),
    oldRegimeTaxableIncome: round2(taxableOld),
    oldRegimeTax: round2(taxOld),
    newRegimeTaxableIncome: round2(taxableNew),
    newRegimeTax: round2(taxNew),
    annualSaving: round2(Math.abs(taxOld - taxNew)),
    betterRegime: taxOld < taxNew ? "Old" : "New",
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
