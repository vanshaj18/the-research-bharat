import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { BLOG_POSTS } from "@/lib/blog";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insights | ResearchIndia",
  description: "Research notes and data-driven commentary.",
  robots: { index: false, follow: false },
};

export default function BlogPage() {
  return (
    <main className="w-full section-pad-y">
      <PageShell>
        <header className="mb-12 w-full md:mb-14">
          <p className="font-label text-accent">Research notes</p>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight text-foreground">
            Insights
          </h1>
          <p className="mt-4 max-w-[min(100%,52rem)] text-lg leading-relaxed text-muted">
            Extended analysis from our data and policy research agenda.
          </p>
        </header>

        <ul className="w-full divide-y divide-border">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug} className="py-10 first:pt-0">
              <article className="border-l-4 border-accent pl-6">
                <time className="text-sm font-medium text-muted">
                  {post.date}
                </time>
                <h2 className="font-display mt-2 text-2xl text-foreground md:text-3xl">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-[min(100%,52rem)] leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-accent transition-colors hover:text-accent"
                >
                  Read brief →
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </PageShell>
    </main>
  );
}
