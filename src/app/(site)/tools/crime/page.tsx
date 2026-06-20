import type { Metadata } from "next";
import ToolPageHeader from "@/components/ToolPageHeader";
import CrimeRates from "@/components/tools/CrimeRates";

export const metadata: Metadata = {
  title: "Public Safety Data | The Research Bharat",
  description: "Crime trend lookup for transparency research.",
};

export default function CrimePage() {
  return (
    <main className="w-full section-pad-y">
      <ToolPageHeader
        title="Public Safety Data"
        subtitle="Query crime trends from our demo dataset. Connect live UCR or local open-data feeds for production research."
      />
      <CrimeRates />
    </main>
  );
}
