import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const isApiOnlyBuild = process.env.API_ONLY === "true";

const nextConfig: NextConfig = {
  output: isApiOnlyBuild ? undefined : "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
