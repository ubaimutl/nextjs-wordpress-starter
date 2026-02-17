import Link from "next/link";

export function SiteHeader({ title, subtitle }) {
  return (
    <header className="border-b border-[var(--line)] bg-[var(--surface)]/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/" className="inline-block">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--brand)]">
            Next.js + WordPress Starter
          </p>
          <h1 className="mt-2 font-serif text-3xl leading-tight text-[var(--ink)] sm:text-4xl">
            {title}
          </h1>
        </Link>
        <p className="mt-3 max-w-2xl text-sm text-[var(--muted)] sm:text-base">
          {subtitle}
        </p>
      </div>
    </header>
  );
}
