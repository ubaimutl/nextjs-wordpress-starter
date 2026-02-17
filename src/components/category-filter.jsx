import Link from "next/link";

function getHref(query, categoryIds) {
  const params = new URLSearchParams();

  if (query) {
    params.set("q", query);
  }

  if (categoryIds.length > 0) {
    params.set("categories", categoryIds.join(","));
  }

  const serialized = params.toString();
  return serialized ? `/?${serialized}` : "/";
}

export function CategoryFilter({ categories, selectedCategoryIds, query }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">
        Categories
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          href={getHref(query, [])}
          className={`rounded-full px-3 py-1.5 text-sm transition ${
            selectedCategoryIds.length === 0
              ? "bg-[var(--brand)] text-white"
              : "bg-[var(--surface-2)] text-[var(--ink)] hover:bg-[var(--brand-soft)]"
          }`}
        >
          All
        </Link>

        {categories.map((category) => {
          const isActive = selectedCategoryIds.includes(category.id);
          const nextIds = isActive
            ? selectedCategoryIds.filter((id) => id !== category.id)
            : [...selectedCategoryIds, category.id];

          return (
            <Link
              key={category.id}
              href={getHref(query, nextIds)}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                isActive
                  ? "bg-[var(--brand)] text-white"
                  : "bg-[var(--surface-2)] text-[var(--ink)] hover:bg-[var(--brand-soft)]"
              }`}
            >
              {category.name}
              <span className="ml-1 text-xs opacity-70">({category.count})</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
