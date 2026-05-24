import type { VisionMilestone } from "@/lib/visionTimeline";

export type VisionMilestoneCardProps = {
  milestone: VisionMilestone;
  accentColor: string;
  /** 0–1 position along the 2026→2050 gradient */
  progress: number;
  /** Show accent dot beside year (mobile timeline) */
  showDot?: boolean;
  className?: string;
};

export default function VisionMilestoneCard({
  milestone,
  accentColor,
  progress,
  showDot = true,
  className = "",
}: VisionMilestoneCardProps) {
  return (
    <article
      className={`vision-timeline-card glass-card lab-card h-full p-4 md:p-5 ${className}`.trim()}
      style={{ "--milestone-progress": progress } as React.CSSProperties}
    >
      <div className="flex items-center gap-3">
        {showDot && (
          <span
            className="vision-timeline-dot shrink-0"
            style={{
              backgroundColor: accentColor,
              boxShadow: `0 0 14px ${accentColor}99`,
            }}
            aria-hidden
          />
        )}
        <time
          dateTime={String(milestone.year)}
          className="font-display text-2xl text-foreground"
        >
          {milestone.year}
        </time>
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
