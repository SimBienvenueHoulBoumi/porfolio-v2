import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/tutorial",
  //       destination: "/maintenance",
  //       permanent: false,
  //     },
  //   ];
  // },
};

export default nextConfig;
