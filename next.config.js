/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Включаем standalone режим для Docker
  output: 'standalone',
  // Оптимизация для production
  swcMinify: true,
}

module.exports = nextConfig
