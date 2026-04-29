/** @type {import('next').NextConfig} */
// App Pionieri - v1.0 - app_source separazione multi-app
const nextConfig = {
  // Variabili pubbliche esposte al client - identificano questa app nel database condiviso
  // Le 4 app nel DB condiviso: app_pionieri | chat_pionieri | marketplace | chat_bot_develop
  env: {
    NEXT_PUBLIC_APP_SOURCE: "app_pionieri",
    NEXT_PUBLIC_ADMIN_USERNAME: "cipollas",
  },

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
