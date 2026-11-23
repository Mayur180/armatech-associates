/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow the dev server to be opened from the LAN IP as well as localhost.
  // Without this, Next 16 returns 403 for /_next/static chunks cross-origin,
  // which leaves the page visible but never hydrated.
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.56.1"],
  images: {
    unoptimized: true,
  },
}

export default nextConfig
