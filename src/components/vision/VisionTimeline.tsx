import VisionMilestoneCard from "@/components/vision/VisionMilestoneCard";
import {
  getCurrentMilestoneIndex,
  milestoneProgress,
  VISION_MILESTONE_COLORS,
  VISION_MILESTONES,
} from "@/lib/visionTimeline";

export default function VisionTimeline() {
  const count = VISION_MILESTONES.length;
  const currentIndex = getCurrentMilestoneIndex(VISION_MILESTONES);

  return (
    <div className="mb-[clamp(2.75rem,6vw,4.5rem)]" data-scroll-timeline>
      <div
        className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-8"
        data-scroll-reveal
      >
        <div>
          <p className="lab-meta text-accent">Timeline · India · 2026 — 2050</p>
          <h3 className="font-display mt-2 text-2xl text-foreground md:text-3xl">
            Vision timeline
          </h3>
        </div>
        <div className="vision-gradient-legend flex items-center gap-3">
          <span className="text-xs font-medium text-muted">Today</span>
          <div
            className="vision-gradient-bar h-2 w-32 rounded-full md:w-48"
            aria-hidden
          />
          <span className="text-xs font-medium text-accent-alt">2050</span>
        </div>
      </div>

      <div className="vision-timeline w-full">
        {/* Desktop: horizontal track + column markers above cards */}
        <div className="vision-timeline-rail hidden md:block">
          <div className="vision-timeline-track" aria-hidden />
          <ol className="vision-timeline-markers relative z-[1] grid grid-cols-5 gap-3">
            {VISION_MILESTONES.map((milestone, index) => {
              const isCurrent = index === currentIndex;
              const accentColor = VISION_MILESTONE_COLORS[index];

              return (
                <li key={milestone.year} className="flex justify-center">
                  <span
                    className={`vision-timeline-dot${isCurrent ? " vision-timeline-dot--current" : ""}`}
                    style={{
                      backgroundColor: accentColor,
                      "--milestone-accent": accentColor,
                      boxShadow: isCurrent
                        ? undefined
                        : `0 0 14px ${accentColor}99`,
                    } as React.CSSProperties}
                    aria-hidden
                  />
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile: vertical track beside stacked cards */}
        <div className="vision-timeline-mobile md:hidden">
          <div className="vision-timeline-track-vertical" aria-hidden />
          <ol className="vision-timeline-grid relative z-[1] grid grid-cols-1 gap-5" data-scroll-group>
            {VISION_MILESTONES.map((milestone, index) => (
              <li key={milestone.year} className="vision-timeline-block" data-scroll-item>
                <VisionMilestoneCard
                  milestone={milestone}
                  accentColor={VISION_MILESTONE_COLORS[index]}
                  progress={milestoneProgress(index, count)}
                  isCurrent={index === currentIndex}
                />
              </li>
            ))}
          </ol>
        </div>

        {/* Desktop: cards in a row below the track */}
        <ol className="vision-timeline-grid relative z-[1] mt-6 hidden gap-3 md:grid md:grid-cols-5" data-scroll-group>
          {VISION_MILESTONES.map((milestone, index) => (
            <li key={milestone.year} className="vision-timeline-block" data-scroll-item>
              <VisionMilestoneCard
                milestone={milestone}
                accentColor={VISION_MILESTONE_COLORS[index]}
                progress={milestoneProgress(index, count)}
                showDot={false}
                isCurrent={index === currentIndex}
              />
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-8 text-center text-xs text-muted md:mt-15">
        Gradient reflects rising research capacity, public optimism, and
        technological advancement toward 2050.
      </p>
    </div>
  );
}
