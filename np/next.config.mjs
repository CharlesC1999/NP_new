/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    domains: [
      "via.placeholder.com",
      "picsum.photos",
      "loremflickr.com",
      "localhost",
    ],
  },
  devIndicators: {
    buildActivity: false,
  }, //右下光明會讀取消失
};

export default nextConfig;
