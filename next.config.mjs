/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Chế độ nghiêm ngặt giúp phát hiện lỗi dễ dàng hơn
    swcMinify: true, // Dùng SWC để minify (nhanh hơn Terser)
    images: {
        domains: ['backend.hanguyen.online'], // Add your image host here
        // domains: ['localhost'], // Add your image host here
    },
};

export default nextConfig;
