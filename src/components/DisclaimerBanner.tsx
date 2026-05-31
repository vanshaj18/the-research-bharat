import PageShell from "@/components/PageShell";

export default function DisclaimerBanner() {
  return (
    <div className="disclaimer-banner" role="note" aria-label="Site disclaimer">
      <PageShell className="py-2 text-center text-[0.6875rem] leading-snug text-muted md:py-1.5 md:text-xs">
        <p>
          <strong className="font-medium text-foreground/87">
            ResearchIndia is NOT an official government website.
          </strong>{" "}
          Data is taken from independent surveys, government websites, national news
          websites, and public submissions (ForThePeople.in).
        </p>
      </PageShell>
    </div>
  );
}
