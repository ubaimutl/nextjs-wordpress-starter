import "server-only";

const DEFAULT_REVALIDATE = 120;

function getWordPressUrl() {
  const configuredUrl =
    process.env.WORDPRESS_URL ?? process.env.NEXT_PUBLIC_WORDPRESS_URL;

  if (!configuredUrl) {
    throw new Error(
      "Missing WORDPRESS_URL. Add it to your environment before requesting content.",
    );
  }

  return configuredUrl.replace(/\/$/, "");
}

function buildQuery(params) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined || value === "") {
      continue;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        continue;
      }

      query.set(
        key,
        value
          .map((item) => String(item).trim())
          .filter(Boolean)
          .join(","),
      );
      continue;
    }

    query.set(key, String(value));
  }

  return query.toString();
}

function parseHeaderNumber(value) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

async function wpFetch(endpoint, options = {}) {
  const url = `${getWordPressUrl()}/wp-json/wp/v2${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: options.revalidate ?? DEFAULT_REVALIDATE,
      tags: options.tags,
    },
  });

  if (!response.ok) {
    throw new Error(
      `WordPress request failed (${response.status} ${response.statusText}) for ${endpoint}`,
    );
  }

  return response.json();
}

export async function getPosts(params = {}) {
  const query = buildQuery({
    page: params.page ?? 1,
    per_page: params.per_page ?? 9,
    search: params.search,
    categories: params.categories,
    orderby: params.orderby ?? "date",
    order: params.order ?? "desc",
    _embed: 1,
  });

  const endpoint = `/posts?${query}`;
  const response = await fetch(`${getWordPressUrl()}/wp-json/wp/v2${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
      tags: ["wp-posts"],
    },
  });

  if (!response.ok) {
    throw new Error(
      `WordPress request failed (${response.status} ${response.statusText}) for ${endpoint}`,
    );
  }

  const posts = await response.json();

  return {
    posts,
    total: parseHeaderNumber(response.headers.get("x-wp-total")),
    pages: parseHeaderNumber(response.headers.get("x-wp-totalpages")),
  };
}

export async function getPostBySlug(slug) {
  const query = buildQuery({
    slug,
    per_page: 1,
    _embed: 1,
  });

  const posts = await wpFetch(`/posts?${query}`, {
    revalidate: 60,
    tags: ["wp-post", `wp-post:${slug}`],
  });

  return posts[0] ?? null;
}

export async function getCategories(params = {}) {
  const query = buildQuery({
    per_page: params.per_page ?? 100,
    hide_empty: params.hide_empty ? 1 : undefined,
  });

  return wpFetch(`/categories?${query}`, {
    revalidate: 300,
    tags: ["wp-categories"],
  });
}

export async function getComments(params) {
  const query = buildQuery({
    post: params.post,
    per_page: params.per_page ?? 50,
    order: params.order ?? "asc",
  });

  return wpFetch(`/comments?${query}`, {
    revalidate: 45,
    tags: ["wp-comments", `wp-comments:${params.post}`],
  });
}
