/** @type {import('next').NextConfig} */
const nextConfig = {
  // 这里是为了兼容 Notion 的图片，虽然你现在用的是 img 标签，但加上这个以防万一
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;