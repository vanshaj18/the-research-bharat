import Section from "@/components/Section";

const CRITERIA = [
  "You have waited on hold for more than 40 minutes.",
  "You have explained the same problem to three different chatbots.",
  "You believe 'temporary' surcharges are a lifestyle.",
  "You own at least one object you yell at (printer counts).",
  "You want solutions, not another survey about your experience.",
];

export default function Eligibility() {
  return (
    <Section
      id="eligibility"
      variant="alt"
      title="Eligibility"
      subtitle="No gatekeeping. If you are human and tired, you qualify."
    >
      <ul className="space-y-4">
        {CRITERIA.map((item) => (
          <li
            key={item}
            className="flex gap-4 border-b border-border pb-4 last:border-0"
          >
            <span
              className="shrink-0 font-display text-3xl text-accent"
              aria-hidden
            >
              ✓
            </span>
            <p className="text-lg text-foreground/90 md:text-xl">{item}</p>
          </li>
        ))}
      </ul>
      <p className="font-display mt-12 text-3xl tracking-wide text-accent md:text-4xl">
        Membership fee: one deep breath you did not know you were holding.
      </p>
    </Section>
  );
}
