/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Asegúrate de especificar el pathname si es necesario
      },
    ],
  },
}

module.exports = nextConfig;
