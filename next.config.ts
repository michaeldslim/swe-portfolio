import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/learning",
        destination: "/learning/index.html",
        permanent: false,
      },
      {
        source: "/learning/:topic((?!.*\\.).*)",
        destination: "/learning/:topic/index.html",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
