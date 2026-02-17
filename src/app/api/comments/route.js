import { NextResponse } from "next/server";

import { parsePositiveInt } from "@/lib/wordpress/query";
import { getComments } from "@/lib/wordpress/server";

export async function GET(request) {
  try {
    const postId = parsePositiveInt(request.nextUrl.searchParams.get("post"), 0);

    if (postId <= 0) {
      return NextResponse.json(
        {
          error: "Missing or invalid 'post' query parameter.",
        },
        { status: 400 },
      );
    }

    const perPage = parsePositiveInt(request.nextUrl.searchParams.get("per_page"), 50);
    const orderParam = request.nextUrl.searchParams.get("order");
    const order = orderParam === "desc" ? "desc" : "asc";

    const comments = await getComments({
      post: postId,
      per_page: perPage,
      order,
    });

    return NextResponse.json(comments);
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
