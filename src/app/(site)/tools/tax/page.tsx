import type { Metadata } from "next";
import ToolPageHeader from "@/components/ToolPageHeader";
import TaxCalculator from "@/components/tools/TaxCalculator";

export const metadata: Metadata = {
  title: "Tax Policy Estimator | The Research Bharat",
  description: "Simplified federal tax estimate for policy analysis.",
};

export default function TaxPage() {
  return (
    <main className="w-full section-pad-y">
      <ToolPageHeader
        title="Tax Policy Estimator"
        subtitle="Federal tax estimate for comparative analysis. Consult a qualified professional for filing decisions."
      />
      <TaxCalculator />
    </main>
  );
}
