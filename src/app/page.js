import { CategoryFilter } from "@/components/category-filter";
import { Pagination } from "@/components/pagination";
import { PostsGrid } from "@/components/posts-grid";
import { SearchBar } from "@/components/search-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSingleParam, parseIdsCsv, parsePositiveInt } from "@/lib/wordpress/query";
import { getCategories, getPosts } from "@/lib/wordpress/server";

export default async function HomePage({ searchParams }) {
  const params = await searchParams;

  const query = (getSingleParam(params.q) ?? "").trim();
  const page = parsePositiveInt(getSingleParam(params.page), 1);
  const selectedCategoryIds = parseIdsCsv(getSingleParam(params.categories));
  let categories = [];
  let postsResult = null;
  let fetchError = "";

  try {
    [categories, postsResult] = await Promise.all([
      getCategories({ hide_empty: true, per_page: 100 }),
      getPosts({
        page,
        per_page: 9,
        search: query || undefined,
        categories: selectedCategoryIds.length > 0 ? selectedCategoryIds : undefined,
        orderby: "date",
        order: "desc",
      }),
    ]);
  } catch (error) {
    fetchError = error instanceof Error ? error.message : "Unknown error";
  }

  return (
    <div className="min-h-screen">
      <SiteHeader
        title="WordPress Content, Modern Next.js"
        subtitle={
          fetchError
            ? "Set WORDPRESS_URL and make sure your WordPress site exposes the REST API."
            : "A production-ready starter using Next.js App Router and route handlers on top of the WordPress REST API."
        }
      />

      <main
        className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${
          fetchError ? "py-12" : "space-y-6 py-8"
        }`}
      >
        {fetchError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            Failed to fetch posts: {fetchError}
          </div>
        ) : (
          <>
            <SearchBar query={query} categoriesCsv={selectedCategoryIds.join(",")} />

            {categories.length > 0 ? (
              <CategoryFilter
                categories={categories}
                selectedCategoryIds={selectedCategoryIds}
                query={query}
              />
            ) : null}

            <PostsGrid posts={postsResult?.posts ?? []} />

            <Pagination
              page={page}
              totalPages={postsResult?.pages ?? 0}
              query={query}
              categories={selectedCategoryIds}
            />

            {(postsResult?.total ?? 0) > 0 ? (
              <p className="text-center text-sm text-[var(--muted)]">
                Showing {postsResult?.posts.length ?? 0} posts on page {page} of{" "}
                {postsResult?.pages ?? 0}
              </p>
            ) : null}
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
