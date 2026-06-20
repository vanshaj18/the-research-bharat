import {
  getTopicCategoryAccent,
  isBlogPublication,
  isResearchPublication,
  type Publication,
} from "@/lib/publications";
import Link from "next/link";
import type { ReactNode } from "react";

function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

function PublicationLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (isExternalUrl(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function PublicationEntry({ pub }: { pub: Publication }) {
  const isBlog = isBlogPublication(pub);
  const isResearch = isResearchPublication(pub);
  const topicAccent = getTopicCategoryAccent(pub.topic_category);
  const titleLinkClass = "transition-colors hover:text-accent";

  return (
    <article
      className="relative overflow-hidden border-l-4 pl-6"
      style={{ borderLeftColor: topicAccent }}
    >
      {isResearch && pub.key_paper && (
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-14 w-14 overflow-hidden"
          aria-hidden
        >
          <span className="absolute right-[-30px] top-[10px] block w-[120px] rotate-45 bg-accent py-0.5 text-center text-[10px] font-semibold uppercase tracking-wide text-primary shadow-[0_2px_8px_rgb(0_0_0/0.35)]">
            Key Paper
          </span>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <span className="glass-chip px-3 py-0.5 text-xs font-medium text-accent">
          {isResearch ? pub.type : "Blog"}
        </span>
        <span className="inline-flex items-center gap-2 text-xs font-medium">
          <span
            className="vision-timeline-dot shrink-0"
            style={{
              backgroundColor: topicAccent,
              boxShadow: `0 0 10px ${topicAccent}99`,
            }}
            aria-hidden
          />
          <span style={{ color: topicAccent }}>{pub.topic_category}</span>
        </span>
        <time className="text-sm font-medium text-muted">{pub.date}</time>
      </div>
      <h2 className="font-display mt-3 text-2xl text-foreground md:text-3xl">
        {isBlog ? (
          <Link href={`/blog/${pub.slug}`} className={titleLinkClass}>
            {pub.title}
          </Link>
        ) : (
          <PublicationLink href={pub.url} className={titleLinkClass}>
            {pub.title}
          </PublicationLink>
        )}
      </h2>
      {pub.authors && (
        <p className="mt-2 text-sm text-muted">{pub.authors}</p>
      )}
      <p className="mt-3 max-w-[min(100%,52rem)] leading-relaxed text-muted">
        {pub.excerpt}
      </p>
      {pub.tags && pub.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {pub.tags.map((tag) => (
            <li key={tag}>
              <span className="glass-chip inline-flex px-3 py-1.5 text-xs font-medium text-accent">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      )}
      {isBlog ? (
        <Link
          href={`/blog/${pub.slug}`}
          className="mt-4 inline-block text-sm font-semibold text-accent transition-colors hover:text-accent"
        >
          Read post →
        </Link>
      ) : (
        <PublicationLink
          href={pub.url}
          className="mt-4 inline-block text-sm font-semibold text-accent transition-colors hover:text-accent"
        >
          Read full brief →
        </PublicationLink>
      )}
    </article>
  );
}
