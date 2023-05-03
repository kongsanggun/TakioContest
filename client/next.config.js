/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  async rewrites() {
    return [
      {
				source: "/entry/:path*",
				destination: "http://localhost:8000/entry/:path*",
      },
    ]
  }
}
