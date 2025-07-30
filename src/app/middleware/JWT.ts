import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const PUBLIC_ROUTES = ["/login", "/api/login", "/"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isPublic = PUBLIC_ROUTES.includes(request.nextUrl.pathname);

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const pathname = request.nextUrl.pathname;

    if (
      (pathname.startsWith("/admin") && decoded.role !== "admin") ||
      (pathname.startsWith("/incharge") && decoded.role !== "incharge") ||
      (pathname.startsWith("/employee") && decoded.role !== "employee")
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/employee/:path*", "/incharge/:path*"],
};
