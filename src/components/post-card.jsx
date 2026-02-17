import Link from "next/link";

import { excerptFromHtml, formatDate, getPostCategories } from "@/lib/utils";

export function PostCard({ post }) {
  const author = post._embedded?.author?.[0];
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const categories = getPostCategories(post);

  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-[0_12px_40px_rgba(2,20,13,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_50px_rgba(2,20,13,0.12)]">
      {featuredImage?.source_url ? (
        <div className="h-56 w-full bg-[var(--surface-2)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || post.title.rendered}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : null}

      <div className="space-y-4 p-5">
        {categories.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category.id}
                className="rounded-full bg-[var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand)]"
              >
                {category.name}
              </span>
            ))}
          </div>
        ) : null}

        <Link href={`/posts/${post.slug}`} className="block">
          <h2
            className="font-serif text-xl leading-tight text-[var(--ink)] hover:text-[var(--brand)]"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </Link>

        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {excerptFromHtml(post.excerpt.rendered)}
        </p>

        <div className="flex flex-wrap items-center gap-3 border-t border-[var(--line)] pt-4 text-xs text-[var(--muted)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {author?.name ? <span>By {author.name}</span> : null}
        </div>
      </div>
    </article>
  );
}
