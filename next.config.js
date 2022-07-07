/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl)$/,
      use: [
        {
          loader: 'ts-shader-loader',
        },
      ],
    })
    return config
  },
}

module.exports = nextConfig
