import Hero from "@/components/Hero";
import CoreTopics from "@/components/sections/CoreTopics";
import Vision from "@/components/sections/Vision";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <CoreTopics />
      <Vision />
    </main>
  );
}
