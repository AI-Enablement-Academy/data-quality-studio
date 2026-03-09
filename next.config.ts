import type { NextConfig } from "next";
import path from "node:path";

const rootDir = path.dirname(new URL(import.meta.url).pathname);

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(rootDir),
  },
};

export default nextConfig;
