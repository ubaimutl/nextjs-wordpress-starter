import { formatDate, getPostCategories, getReadingTime } from "@/lib/utils";

export function PostContent({ post }) {
  const author = post._embedded?.author?.[0];
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const categories = getPostCategories(post);
  const readingTime = getReadingTime(post.content.rendered);

  return (
    <article className="mx-auto max-w-4xl">
      {featuredImage?.source_url ? (
        <div className="mb-8 overflow-hidden rounded-2xl border border-[var(--line)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || post.title.rendered}
            className="h-[340px] w-full object-cover"
          />
        </div>
      ) : null}

      <header className="space-y-5 border-b border-[var(--line)] pb-8">
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

        <h1
          className="font-serif text-4xl leading-tight text-[var(--ink)] sm:text-5xl"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {author?.name ? <span>By {author.name}</span> : null}
          <span>{readingTime} min read</span>
        </div>
      </header>

      <div
        className="mt-10 space-y-6 leading-relaxed text-[var(--ink)] [&_a]:text-[var(--brand)] [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--line)] [&_blockquote]:pl-4 [&_h2]:font-serif [&_h2]:text-3xl [&_h3]:font-serif [&_h3]:text-2xl [&_img]:rounded-xl [&_img]:border [&_img]:border-[var(--line)]"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
