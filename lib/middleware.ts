import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("user_role")?.value;
  const path = req.nextUrl.pathname;

  // 🔐 ONLY ADMIN PROTECTED ROUTES
  const adminOnlyRoutes = [
    "/admin",
    "/roles",
    "/permissions",
  ];

  // ❌ user trying admin pages
  if (adminOnlyRoutes.some(route => path.startsWith(route))) {
    if (role !== "admin") {
      return NextResponse.redirect(
        new URL("/auth/login?type=user", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/roles/:path*",
    "/permissions/:path*",
  ],
};
