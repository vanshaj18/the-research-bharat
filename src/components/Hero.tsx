import PageShell from "@/components/PageShell";
import { TOOL_ROUTES } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative -mt-[var(--header-height)] flex min-h-[100svh] w-full items-end overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0" data-scroll-hero-bg>
        <Image
          src="/hero_image.png"
          alt="India landscape with temples and river, overlaid with research data visualization"
          fill
          priority
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/90 via-[#0a0a0b]/25 to-transparent"
          aria-hidden
        />
      </div>

      <PageShell className="relative z-[1] w-full pb-10 pt-[var(--header-height)] md:pb-14">
        <div className="flex flex-wrap gap-3" data-scroll-hero-item>
          <a href="#topics" className="lab-btn lab-btn-primary">
            Core topics
          </a>
          <a href="#vision" className="lab-btn lab-btn-secondary">
            Our vision
          </a>
          <Link href={TOOL_ROUTES.ghi} className="lab-btn lab-btn-secondary">
            Explore data tools
          </Link>
        </div>
      </PageShell>
    </section>
  );
}
