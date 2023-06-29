import { NextResponse } from "next/server";

export async function middleware(req: any) {
  // Clone the URL
  const url = req.nextUrl.clone();

  // Get value from a redis cache

  // If is in maintenance mode, point the url pathname to the maintenance page
  if (true) {
    url.pathname = `/maintenance`;

    // Rewrite to the url
    return NextResponse.rewrite(url);
  }
}
