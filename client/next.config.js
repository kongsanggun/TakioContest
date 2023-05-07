/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  async rewrites() {
    return [
      {
				source: "/:path*",
				destination: "http://localhost:8000/:path*",
      }
    ]
  }
}
