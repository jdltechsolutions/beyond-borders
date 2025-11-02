import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/booking', destination: '/dashboard/booking', permanent: true },
      { source: '/bookings', destination: '/dashboard/bookings', permanent: true },
    ]
  },
}

export default nextConfig
