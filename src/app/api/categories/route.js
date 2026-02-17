import { NextResponse } from "next/server";

import { parsePositiveInt } from "@/lib/wordpress/query";
import { getCategories } from "@/lib/wordpress/server";

export async function GET(request) {
  try {
    const perPage = parsePositiveInt(request.nextUrl.searchParams.get("per_page"), 100);
    const hideEmpty = request.nextUrl.searchParams.get("hide_empty") !== "0";

    const categories = await getCategories({
      per_page: perPage,
      hide_empty: hideEmpty,
    });

    return NextResponse.json(categories);
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
