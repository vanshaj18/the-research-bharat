import type { Metadata } from "next";
import ToolPageHeader from "@/components/ToolPageHeader";
import TaxCalculator from "@/components/tools/TaxCalculator";

export const metadata: Metadata = {
  title: "Indian Salary Tax Estimator | The Research Bharat",
  description:
    "Compare old vs new income tax regimes for salaried employees in India.",
};

export default function TaxPage() {
  return (
    <main className="w-full section-pad-y">
      <ToolPageHeader
        title="Indian Salary Tax Estimator"
        subtitle="Compare old and new income tax regimes with HRA, food benefits, Section 80C/80D, and NPS. Illustrative model—not tax filing advice."
      />
      <TaxCalculator />
    </main>
  );
}
