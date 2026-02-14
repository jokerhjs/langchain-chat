import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("admin_session")?.value;
  if (session) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/platform/:path*",
    "/records/:path*",
    "/chat/:path*",
  ],
};
