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
				destination: `${process.env.BACK_END}/index/:path*`,
      },
      {
				source: "/ranking/:path*",
				destination: `${process.env.BACK_END}/ranking/:path*`,
      },
      {
				source: "/entry/:path*",
				destination: `${process.env.BACK_END}/entry/:path*`,
      },
      {
				source: "/admin/:path*",
				destination: `${process.env.BACK_END}/admin/:path*`,
      },
      {
				source: "/auth/:path*",
				destination: `${process.env.BACK_END}/auth/:path*`,
      }
    ]
  }
}
