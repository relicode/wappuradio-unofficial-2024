/** @type {import('next').NextConfig} */
const nextConfig = {
  // trailingSlash: true,
  // skipTrailingSlashRedirect: true,

  distDir: 'dist',
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
