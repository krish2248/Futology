import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/onboarding"];
const SESSION_COOKIE = "futology_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  const session = request.cookies.get(SESSION_COOKIE)?.value;
  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    if (pathname !== "/") {
      url.searchParams.set("next", pathname);
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|robots.txt|manifest.json|icons|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|json)$).*)",
  ],
};
