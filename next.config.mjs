/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true, // Disable image optimization if exporting statically
      },
};

export default nextConfig;
