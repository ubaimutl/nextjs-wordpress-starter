import Link from "next/link";
import { notFound } from "next/navigation";

import { CommentsList } from "@/components/comments-list";
import { PostContent } from "@/components/post-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getComments, getPostBySlug } from "@/lib/wordpress/server";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title.rendered.replace(/<[^>]+>/g, ""),
    description: post.excerpt.rendered.replace(/<[^>]+>/g, " ").trim(),
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const comments =
    post.comment_status === "open"
      ? await getComments({
          post: post.id,
          per_page: 50,
          order: "asc",
        })
      : [];

  return (
    <div className="min-h-screen">
      <SiteHeader
        title="Article"
        subtitle="Single post template with embedded media, author metadata, and comment feed."
      />

      <main className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--ink)] hover:border-[var(--brand)]"
        >
          Back to posts
        </Link>

        <PostContent post={post} />

        {post.comment_status === "open" ? (
          <section className="mx-auto max-w-4xl space-y-4 border-t border-[var(--line)] pt-8">
            <h2 className="font-serif text-2xl text-[var(--ink)]">Comments ({comments.length})</h2>
            <CommentsList comments={comments} />
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
}
