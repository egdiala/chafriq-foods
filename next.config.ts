import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  async redirects() {
    return [
      {
        source: "/vendor/storefront/edit",
        destination: "/vendor/storefront",
        permanent: false,
      },
      {
        source: "/customer",
        destination: "/",
        permanent: false,
      },
    ]
  }
};

export default nextConfig;
