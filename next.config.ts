
import type { NextConfig } from "next";

const configuredBackend =
  process.env.BACKEND_URL || "https://api.iilstudyabroad.com";

const backendBaseUrl = configuredBackend
  .trim()
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/enquiry",
        destination: `${backendBaseUrl}/api/enquiry`,
      },
      {
        source: "/api/visa",
        destination: `${backendBaseUrl}/api/visa`,
      },
      {
        source: "/api/academy/:path*",
        destination: `${backendBaseUrl}/api/academy/:path*`,
      },
      {
        source: "/api/contact",
        destination: `${backendBaseUrl}/api/contact`,
      },
    ];
  },
};

export default nextConfig;
