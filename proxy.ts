import { NextRequest, NextResponse } from "next/server";

const protectedVendorRoutes = ["/vendor", "/vendor/orders", "/vendor/reporting", "/vendor/profile", "/vendor/storefront"];
const protectedCustomerRoutes = ["/customer", "/customer/profile", "/customer/orders", "/customer/cart", "/customer/checkout"]
const unProtectedRoutes = ["/login", "/register", "/forgot-password", "/reset-password"]
const landingRoutes = ["/", "/contact-us", "/privacy-policy", "/terms-and-conditions"]
const landingDynamicPrefixes = ["/meals","/cooks"];

export function proxy(request: Request) {
    const nextRequest = request as NextRequest;
    const { pathname } = nextRequest.nextUrl;

    const accessToken = nextRequest.cookies.get("access_token")?.value;
    const userType = nextRequest.cookies.get("user_type")?.value as UserType | undefined;

    // ✅ 1. Landing routes → always allowed
    const isLanding = landingRoutes.includes(pathname) || landingDynamicPrefixes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
    if (isLanding) {
        return NextResponse.next();
    }

    // ✅ 2. Detect route types
    const isVendorRoute = pathname === "/vendor" || pathname.startsWith("/vendor/");
    const isCustomerRoute = pathname === "/customer" || pathname.startsWith("/customer/");

    // ✅ 3. Protected route matching
    const isVendorProtected = protectedVendorRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    const isCustomerProtected = protectedCustomerRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    // ✅ 4. Unprotected routes (/vendor/login, etc.)
    const isUnprotected = unProtectedRoutes.some(
        (route) =>
        pathname.startsWith(`/vendor${route}`) ||
        pathname.startsWith(`/customer${route}`)
    );

    // ✅ 5. Handle unauthenticated users
    if (!accessToken || !userType) {
        if (isUnprotected) {
        return NextResponse.next();
        }

        return NextResponse.redirect(new URL("/", nextRequest.url));
    }

    // ✅ 6. Prevent authenticated users from accessing auth pages
    if (isUnprotected) {
        return NextResponse.redirect(new URL(`/${userType}`, nextRequest.url));
    }

    // ✅ 7. Strict role separation
    if (userType === "vendor" && isCustomerRoute) {
        return NextResponse.redirect(new URL("/vendor", nextRequest.url));
    }

    if (userType === "customer" && isVendorRoute) {
        return NextResponse.redirect(new URL("/customer", nextRequest.url));
    }

    // ✅ 8. Enforce allowed routes within role
    if (userType === "vendor" && isVendorRoute && !isVendorProtected) {
        return NextResponse.redirect(new URL("/vendor", nextRequest.url));
    }

    if (userType === "customer" && isCustomerRoute && !isCustomerProtected) {
        return NextResponse.redirect(new URL("/customer", nextRequest.url));
    }

    // ✅ 9. Allow everything else
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
