import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

const publicAuthPages = ["/auth/login", "/auth/signup"];
const publicPages = ["/", ...publicAuthPages];

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/auth/signin",
    },
  },
);

// Function to check if a page is public (reusable for routing)
const routesRegex = (routes: string[]) => {
  return RegExp(
    `^(/(${routing.locales.join("|")}))?(${routes
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );
};

export default async function middleware(req: NextRequest) {
  const publicPathnameRegex = routesRegex(publicPages); // Add locale to public page paths dynamically
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname); // Check if the current page is public
  if (isPublicPage) {
    const publicAuthPathnameRegex = routesRegex(publicAuthPages); // Add locale to auth page paths (login, signup) dynamically
    const isAuthPublicPage = publicAuthPathnameRegex.test(req.nextUrl.pathname); // Check if the current page is a public auth page
    const token = await getToken({ req });
    const redirectUrl = new URL("/", req.nextUrl.origin);

    // Check if the user is logged in and trying to access a public auth page (login, signup) — if so, redirect to home page
    if (token && isAuthPublicPage) {
      return NextResponse.redirect(redirectUrl);
    }
    return handleI18nRouting(req);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
