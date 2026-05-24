import Section from "@/components/Section";

const EVENTS = [
  { year: "???", event: "First collective eye-roll recorded in a municipal queue." },
  { year: "2020", event: "Global realization that 'unprecedented' is just a word." },
  { year: "2022", event: "Someone says 'we are all in this together' on mute." },
  { year: "2024", event: "FPP draft manifesto written on a napkin that survived laundry." },
  { year: "2026", event: "This website. One page. Maximum volume." },
];

export default function Timeline() {
  return (
    <Section
      id="timeline"
      title="Timeline"
      subtitle="History as experienced by people who refresh their inbox."
    >
      <ol className="relative border-l-2 border-accent/40 pl-8 md:pl-12">
        {EVENTS.map((item) => (
          <li key={item.year + item.event} className="relative mb-12 last:mb-0">
            <span
              className="absolute -left-[calc(0.5rem+2px)] top-1 h-4 w-4 rounded-full bg-accent md:-left-[calc(0.75rem+2px)]"
              aria-hidden
            />
            <time className="font-display text-4xl text-accent md:text-5xl">
              {item.year}
            </time>
            <p className="mt-2 w-full max-w-[min(100%,52rem)] text-lg text-muted md:text-xl">
              {item.event}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
