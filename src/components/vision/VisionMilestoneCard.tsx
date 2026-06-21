import type { VisionMilestone } from "@/lib/visionTimeline";

export type VisionMilestoneCardProps = {
  milestone: VisionMilestone;
  accentColor: string;
  /** 0–1 position along the 2026→2050 gradient */
  progress: number;
  /** Show accent dot beside year (mobile timeline) */
  showDot?: boolean;
  /** Highlight the phase that contains the current calendar year */
  isCurrent?: boolean;
  className?: string;
};

export default function VisionMilestoneCard({
  milestone,
  accentColor,
  progress,
  showDot = true,
  isCurrent = false,
  className = "",
}: VisionMilestoneCardProps) {
  return (
    <article
      className={`vision-timeline-card glass-card lab-card h-full p-4 md:p-5${
        isCurrent ? " vision-timeline-card--current" : ""
      } ${className}`.trim()}
      style={
        {
          "--milestone-progress": progress,
          "--milestone-accent": accentColor,
        } as React.CSSProperties
      }
    >
      <div className="flex items-center gap-3">
        {showDot && (
          <span
            className={`vision-timeline-dot shrink-0${
              isCurrent ? " vision-timeline-dot--current" : ""
            }`}
            style={{
              backgroundColor: accentColor,
              "--milestone-accent": accentColor,
              boxShadow: isCurrent
                ? undefined
                : `0 0 14px ${accentColor}99`,
            } as React.CSSProperties}
            aria-hidden
          />
        )}
        <time
          dateTime={milestone.year.replace(/[^\d]/g, "-")}
          className="font-display text-xl text-foreground md:text-2xl"
        >
          {milestone.year}
        </time>
        {isCurrent && (
          <span className="vision-timeline-now-badge">Now</span>
        )}
      </div>
      <span className="vision-timeline-signal mt-3 inline-block rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide">
        {milestone.signal}
      </span>
      <h4 className="font-display mt-3 text-lg leading-snug text-foreground">
        {milestone.title}
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-muted">{milestone.body}</p>
    </article>
  );
}
