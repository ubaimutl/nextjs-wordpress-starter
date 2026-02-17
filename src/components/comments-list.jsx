import { formatDate, stripHtml } from "@/lib/utils";

export function CommentsList({ comments }) {
  if (comments.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--muted)]">
        No comments yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <article
          key={comment.id}
          className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4"
        >
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <strong className="text-[var(--ink)]">{comment.author_name || "Anonymous"}</strong>
            <time className="text-[var(--muted)]" dateTime={comment.date}>
              {formatDate(comment.date)}
            </time>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            {stripHtml(comment.content.rendered)}
          </p>
        </article>
      ))}
    </div>
  );
}
