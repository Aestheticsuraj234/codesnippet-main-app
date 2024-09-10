/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: 'img.icons8.com',
          protocol: 'https',
        },
        {
          hostname: 'res.cloudinary.com',
          protocol: 'https',
        },
        {
          hostname: 'placehold.co',
          protocol: 'https',
        },
        {
          hostname: 'avatars.githubusercontent.com',
          protocol: 'https',
        },
        {
          hostname: 'avatar.iran.liara.run',
          protocol: 'https',
        },
        {
          hostname: 'utfs.io',
          protocol: 'https',
        },
        {
          hostname: 'www.codewithantonio.com',
          protocol: 'https',
        },
      ],
    },
  };
  
  export default nextConfig;
  