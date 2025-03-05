/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  trailingSlash: true, // Có thể giúp tránh lỗi khi export
};

export default nextConfig;
