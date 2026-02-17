import { PostCard } from "@/components/post-card";

export function PostsGrid({ posts }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface)] p-10 text-center text-sm text-[var(--muted)]">
        No posts matched your filters.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
