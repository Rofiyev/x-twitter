import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_AUTH_JWT_SECRET as string,
  });

  const publicRoutes = ["/authentication", "/"];
  const privateRoutes = ["/notifications", "/posts/", "/users/"];

  const pathname = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(pathname);
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isPublicRoute || token) return NextResponse.next();

  if (isPrivateRoute && !token)
    return NextResponse.redirect(new URL("/authentication", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|static|public|_next).*)",
};
