/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow cross-origin requests from v0 preview domains
  allowedDevOrigins: [
    "*.vusercontent.net",
    "*.vercel.app",
  ],
  
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

export default nextConfig
