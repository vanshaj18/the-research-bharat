import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact | The Research Bharat",
  description:
    "Research partnerships, media inquiries, and dataset collaborations.",
};

export default function ContactPage() {
  return (
    <main className="w-full">
      <Contact />
    </main>
  );
}
