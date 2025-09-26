import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: "export",
    distDir: "build",
    images: {unoptimized: true}
};

export default nextConfig;
