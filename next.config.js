/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/roadplanner',
                destination: 'https://github.com/xbl4z3r/roadplanner',
                permanent: true,
            },
        ];
    }
};

module.exports = nextConfig;
