import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--brand)]">404</p>
      <h1 className="mt-3 font-serif text-4xl text-[var(--ink)]">Post not found</h1>
      <p className="mt-4 max-w-lg text-sm text-[var(--muted)]">
        The content may have been unpublished or the slug might be wrong.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white"
      >
        Return home
      </Link>
    </main>
  );
}
