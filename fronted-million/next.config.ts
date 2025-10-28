import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: 'images.ctfassets.net' }, { hostname: 'px-web-images4.pixpa.com' }],
  },
};

export default nextConfig;
