import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/register", "/forgot-password", "/admin","/crm","/adminpanel"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const segments = pathname.split("/").filter(Boolean);
  const lang = segments[0] || "en";
  const pathWithoutLang = "/" + (segments.slice(1).join("/") || "");

  const token = request.cookies.get("accessToken")?.value;
  const isPublicRoute = PUBLIC_PATHS.includes(pathWithoutLang);

  const loginPath = `/${lang}/signin`;
  const homePath = `/${lang}`;

  if (!isPublicRoute && !token) {
    if (pathname !== loginPath) {
      return NextResponse.redirect(new URL(loginPath, request.url));
    }
    return NextResponse.next(); 
  }

  if (isPublicRoute && token) {
    if (pathname !== homePath) {
      return NextResponse.redirect(new URL(homePath, request.url));
    }
    return NextResponse.next(); 
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|assets).*)"],
};
