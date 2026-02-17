import Link from "next/link";

import { buildBaseQuery } from "@/lib/wordpress/query";

function getHref(page, query, categories) {
  const params = buildBaseQuery({
    q: query || undefined,
    categories,
    page,
  });

  const serialized = params.toString();
  return serialized ? `/?${serialized}` : "/";
}

function buildPageWindow(page, totalPages) {
  const maxButtons = 5;

  if (totalPages <= maxButtons) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  let start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + maxButtons - 1);

  if (end - start + 1 < maxButtons) {
    start = Math.max(1, end - maxButtons + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export function Pagination({ page, totalPages, query, categories }) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = buildPageWindow(page, totalPages);

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <Link
        href={getHref(Math.max(1, page - 1), query, categories)}
        className={`rounded-lg border px-3 py-2 text-sm ${
          page === 1
            ? "pointer-events-none border-[var(--line)] text-[var(--muted)] opacity-50"
            : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--brand)]"
        }`}
      >
        Previous
      </Link>

      {pages.map((pageNumber) => (
        <Link
          key={pageNumber}
          href={getHref(pageNumber, query, categories)}
          className={`rounded-lg border px-3 py-2 text-sm ${
            pageNumber === page
              ? "border-[var(--brand)] bg-[var(--brand)] text-white"
              : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--brand)]"
          }`}
        >
          {pageNumber}
        </Link>
      ))}

      <Link
        href={getHref(Math.min(totalPages, page + 1), query, categories)}
        className={`rounded-lg border px-3 py-2 text-sm ${
          page === totalPages
            ? "pointer-events-none border-[var(--line)] text-[var(--muted)] opacity-50"
            : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--brand)]"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
