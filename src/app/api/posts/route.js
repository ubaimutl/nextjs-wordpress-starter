import { NextResponse } from "next/server";

import { parseIdsCsv, parsePositiveInt } from "@/lib/wordpress/query";
import { getPosts } from "@/lib/wordpress/server";

export async function GET(request) {
  try {
    const page = parsePositiveInt(request.nextUrl.searchParams.get("page"), 1);
    const perPage = parsePositiveInt(request.nextUrl.searchParams.get("per_page"), 9);
    const search = request.nextUrl.searchParams.get("search")?.trim() || undefined;
    const categories = parseIdsCsv(request.nextUrl.searchParams.get("categories"));

    const result = await getPosts({
      page,
      per_page: perPage,
      search,
      categories: categories.length > 0 ? categories : undefined,
      orderby: "date",
      order: "desc",
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}
