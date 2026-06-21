import PageShell from "@/components/PageShell";

export default function ToolComingSoon() {
  return (
    <PageShell>
      <div className="glass-card lab-card w-full max-w-3xl p-[clamp(1.25rem,3vw,2rem)]">
        <p className="font-label text-accent">Coming soon</p>
        <p className="font-display mt-3 text-2xl text-foreground md:text-3xl">
          Under development
        </p>
        <p className="mt-3 max-w-[min(100%,40rem)] leading-relaxed text-muted">
          This instrument is being built and will be available here soon.
        </p>
      </div>
    </PageShell>
  );
}
