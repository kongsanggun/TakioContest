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
				destination: "http://localhost:5001/index/:path*",
      },
      {
				source: "/ranking/:path*",
				destination: "http://localhost:5001/ranking/:path*",
      },
      {
				source: "/entry/:path*",
				destination: "http://localhost:5001/entry/:path*",
      },
      {
				source: "/admin/:path*",
				destination: "http://localhost:5001/admin/:path*",
      },
      {
				source: "/auth/:path*",
				destination: "http://localhost:5001/auth/:path*",
      }
    ]
  }
}
