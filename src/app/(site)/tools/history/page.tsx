import type { Metadata } from "next";
import ToolPageHeader from "@/components/ToolPageHeader";
import HistoryLearner from "@/components/tools/HistoryLearner";

export const metadata: Metadata = {
  title: "Policy History Lab | ResearchIndia",
  description: "Curated historical briefs for civic and policy literacy.",
};

export default function HistoryPage() {
  return (
    <main className="w-full section-pad-y">
      <ToolPageHeader
        title="Policy History Lab"
        subtitle="Curated lessons on movements that shaped modern governance and public accountability."
      />
      <HistoryLearner />
    </main>
  );
}
