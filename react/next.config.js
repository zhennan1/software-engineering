/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    reactStrictMode: false, /* @note: To prevent duplicated call of useEffect */
    swcMinify: true,

    async rewrites() {
        return [{
            source: "/api/:path*",
            // Change to your backend URL in production
            destination: "http://127.0.0.1:8000/:path*",
        }];
    }
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
