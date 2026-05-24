import PageShell from "@/components/PageShell";

type ToolPageHeaderProps = {
  title: string;
  subtitle: string;
  badge?: string;
  labCode?: string;
};

export default function ToolPageHeader({
  title,
  subtitle,
  badge,
  labCode = "INSTRUMENT",
}: ToolPageHeaderProps) {
  return (
    <PageShell>
      <header className="lab-section-header mb-12 w-full md:mb-14" data-scroll-header>
        <p className="lab-meta" data-scroll-header-item>
          <span className="text-accent">MODULE</span>
          <span className="text-muted"> · </span>
          {labCode}
        </p>
        {badge && (
          <p className="font-label mt-3 text-accent" data-scroll-header-item>
            {badge}
          </p>
        )}
        <h1
          className="font-display mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-tight text-foreground"
          data-scroll-header-item
        >
          {title}
        </h1>
        <p
          className="mt-4 w-full max-w-[min(100%,52rem)] text-lg leading-relaxed text-muted"
          data-scroll-header-item
        >
          {subtitle}
        </p>
      </header>
    </PageShell>
  );
}
