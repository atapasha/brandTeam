/** @type {import('next').NextJSConfig} */
const nextConfig = {
  eslint: {
    // نادیده گرفتن خطاهای ESLint هنگام Build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // نادیده گرفتن خطاهای TypeScript هنگام Build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;