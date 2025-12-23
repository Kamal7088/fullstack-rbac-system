import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("user_role")?.value;
  const path = req.nextUrl.pathname;

  const adminRoutes = ["/users", "/roles", "/permissions"];

  if (adminRoutes.some(r => path.startsWith(r))) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/users/:path*", "/roles/:path*", "/permissions/:path*"],
};
