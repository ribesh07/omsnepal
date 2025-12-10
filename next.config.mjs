/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "omsnepal.com",
    "www.omsnepal.com",
    "omsnepal.vercel.app",
    "omsnepal.omsok.com"
    "localhost:3000",
  ],
  async redirects() {
    return [
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.plx",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      
     
      {
        protocol: "https",
        hostname: "omsnepal.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "omsnepal.omsok.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "omsnepal.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "omsnepal.vercel.app",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
