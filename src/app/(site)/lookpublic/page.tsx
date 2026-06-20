import type { Metadata } from "next";
import LookForPublic from "@/components/sections/LookForPublic";

export const metadata: Metadata = {
  title: "LookPublic | The Research Bharat",
  description:
    "District-level government data for India—open civic intelligence via ForThePeople.in.",
};

export default function LookPublicPage() {
  return (
    <main className="w-full">
      <LookForPublic />
    </main>
  );
}
