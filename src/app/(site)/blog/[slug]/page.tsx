import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { BLOG_POSTS, getPost } from "@/lib/blog";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Brief not found" };
  return {
    title: `${post.title} | The Research Bharat`,
    description: post.excerpt,
    robots: { index: false, follow: false },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="w-full section-pad-y">
      <PageShell>
        <Link
          href="/blog"
          className="text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          ← Back to insights
        </Link>

        <article className="mt-8 w-full border-l-4 border-accent pl-6">
          <time className="text-sm font-medium text-muted">{post.date}</time>
          <h1 className="font-display mt-2 text-[clamp(1.75rem,4vw,3rem)] leading-tight text-foreground">
            {post.title}
          </h1>
          <p className="mt-4 max-w-[min(100%,52rem)] text-lg leading-relaxed text-muted">
            {post.excerpt}
          </p>
          <div className="mt-10 max-w-[min(100%,52rem)] space-y-5 text-base leading-relaxed text-foreground/90">
            {post.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </article>
      </PageShell>
    </main>
  );
}
