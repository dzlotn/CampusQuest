/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'wallpapercave.com', pathname: '/**' },
      { protocol: 'https', hostname: 'wallpapers.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.freeiconspng.com', pathname: '/**' },
      { protocol: 'https', hostname: 'img.freepik.com', pathname: '/**' },
      { protocol: 'https', hostname: 'media.istockphoto.com', pathname: '/**' },
      { protocol: 'https', hostname: 'upload.wikimedia.org', pathname: '/**' },
    ],
  },
  reactStrictMode: true,
};



export default nextConfig;
