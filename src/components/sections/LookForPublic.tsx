import Section from "@/components/Section";
import {
  FOR_THE_PEOPLE_HOME,
  FOR_THE_PEOPLE_LINKS,
} from "@/lib/forthepeople";

export default function LookForPublic() {
  return (
    <Section
      id="look-public"
      variant="alt"
      title="LookPublic"
      subtitle="District-level government data for India—open civic intelligence via ForThePeople.in."
    >
      <div className="glass-panel lab-card w-full overflow-hidden">
        <div className="border-b border-white/15 bg-accent/12 p-[clamp(1.25rem,3vw,2rem)] backdrop-blur-sm">
          <p className="font-label text-accent">Data partner</p>
          <h3 className="font-display mt-2 text-3xl text-foreground md:text-4xl">
            ForThePeople.in
          </h3>
          <p className="mt-3 w-full max-w-[min(100%,52rem)] leading-relaxed text-muted">
            Access budgets, schemes, crop prices, water levels, and verified
            public sources—independent of official portals. Built for researchers
            who need ground-truth at the district level.
          </p>
          <a
            href={FOR_THE_PEOPLE_HOME}
            target="_blank"
            rel="noopener noreferrer"
            className="lab-btn lab-btn-primary mt-6 gap-2 normal-case tracking-normal"
          >
            Open data portal
            <span aria-hidden>↗</span>
          </a>
        </div>

        <ul className="grid divide-y divide-border md:grid-cols-2 md:divide-y-0">
          {FOR_THE_PEOPLE_LINKS.map((link) => (
            <li
              key={link.href}
              className="border-border md:border-b md:[&:nth-child(odd)]:border-r"
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col p-[clamp(1.25rem,3vw,2rem)] transition hover:bg-white/5"
              >
                <span className="font-display text-xl text-foreground group-hover:text-accent">
                  {link.label}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-muted">
                  {link.description}
                </span>
                <span className="mt-3 text-xs font-medium text-muted group-hover:text-accent">
                  forthepeople.in ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-sm text-muted">
        ForThePeople.in is an independent citizen transparency platform (not an
        official government service).
      </p>
    </Section>
  );
}
