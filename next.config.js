/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
          bodySizeLimit: "3MB"  
        }
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "us-west-2.storage.xata.sh",
            }
        ]
    }
}

module.exports = nextConfig
