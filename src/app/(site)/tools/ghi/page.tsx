import type { Metadata } from "next";
import ToolPageHeader from "@/components/ToolPageHeader";
import GHICalculator from "@/components/tools/GHICalculator";

export const metadata: Metadata = {
  title: "Household Income Index | ResearchIndia",
  description:
    "Gross household income vs. federal poverty level—research instrument for fiscal analysis.",
};

export default function GHIPage() {
  return (
    <main className="w-full section-pad-y">
      <ToolPageHeader
        badge="Fiscal research"
        title="Household Income Index"
        subtitle="Compare gross household income to federal poverty benchmarks. Illustrative model for research—not tax or benefits advice."
      />
      <GHICalculator />
    </main>
  );
}
