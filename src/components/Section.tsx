import PageShell from "@/components/PageShell";
import { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  variant?: "default" | "alt";
  /** Lab-style section code shown in header */
  labCode?: string;
};

export default function Section({
  id,
  title,
  subtitle,
  children,
  variant = "default",
  labCode,
}: SectionProps) {
  const code = labCode ?? id.toUpperCase().replace(/-/g, "_");

  return (
    <section
      id={id}
      className={`section-anchor section-pad-y w-full ${
        variant === "alt" ? "section-band" : ""
      }`}
    >
      <PageShell>
        <header
          className="lab-section-header w-full"
          data-scroll-header
          style={{ marginBottom: "var(--section-header-gap)" }}
        >
          <p className="lab-meta" data-scroll-header-item>
            <span className="text-accent">SECTION</span>
            <span className="text-muted"> · </span>
            {code}
          </p>
          <h2
            className="font-display mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-tight text-foreground"
            data-scroll-header-item
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="mt-4 w-full max-w-[min(100%,52rem)] text-lg leading-relaxed text-muted"
              data-scroll-header-item
            >
              {subtitle}
            </p>
          )}
        </header>
        <div className="w-full">{children}</div>
      </PageShell>
    </section>
  );
}
