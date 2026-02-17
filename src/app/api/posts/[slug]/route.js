import { NextResponse } from "next/server";

import { getPostBySlug } from "@/lib/wordpress/server";

export async function GET(_request, context) {
  try {
    const { slug } = await context.params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
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
