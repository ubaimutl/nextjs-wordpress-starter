export function SearchBar({ query, categoriesCsv }) {
  return (
    <form action="/" className="grid gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 sm:grid-cols-[1fr_auto]">
      <input
        type="search"
        name="q"
        defaultValue={query}
        placeholder="Search posts..."
        className="h-11 rounded-xl border border-[var(--line)] bg-white px-4 text-sm outline-none transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-soft)]"
      />
      {categoriesCsv ? <input type="hidden" name="categories" value={categoriesCsv} /> : null}
      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--brand)] px-6 text-sm font-semibold text-white transition hover:brightness-95"
      >
        Search
      </button>
    </form>
  );
}
