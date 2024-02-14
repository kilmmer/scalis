/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: { instrumentationHook: true, mdxRs: true, },
    pageExtensions: ['ts', 'tsx', 'mdx']
};

export default nextConfig;
