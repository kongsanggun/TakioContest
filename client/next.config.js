/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  async rewrites() {
    return [
      {
				source: "/index/:path*",
				destination: "http://localhost:8000/index/:path*",
      },
      {
				source: "/ranking/:path*",
				destination: "http://localhost:8000/ranking/:path*",
      },
      {
				source: "/entry/:path*",
				destination: "http://localhost:8000/entry/:path*",
      },
      {
				source: "/admin/:path*",
				destination: "http://localhost:8000/admin/:path*",
      },
      {
				source: "/auth/:path*",
				destination: "http://localhost:8000/auth/:path*",
      }
    ]
  }
}
