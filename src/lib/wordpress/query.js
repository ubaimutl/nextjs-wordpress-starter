export function getSingleParam(value) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function parsePositiveInt(value, fallback) {
  const parsed = Number.parseInt(value ?? "", 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}

export function parseIdsCsv(value) {
  if (!value) {
    return [];
  }

  const ids = value
    .split(",")
    .map((part) => Number.parseInt(part.trim(), 10))
    .filter((id) => Number.isFinite(id) && id > 0);

  return Array.from(new Set(ids));
}

export function buildBaseQuery(params) {
  const query = new URLSearchParams();

  if (params.q) {
    query.set("q", params.q);
  }

  if (params.categories && params.categories.length > 0) {
    query.set("categories", params.categories.join(","));
  }

  if (params.page && params.page > 1) {
    query.set("page", String(params.page));
  }

  return query;
}
