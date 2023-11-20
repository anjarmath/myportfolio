/** @type {import('next').NextConfig} */
const nextConfig = {
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
