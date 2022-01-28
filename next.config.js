/** @type {import('next').NextConfig} */
const path = require("path");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  output: { path: path.resolve(__dirname, "static") },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.pdf/,
      type: "asset/resource",
      generator: {
        filename: "static/[name]-[hash][ext]",
      },
    });

    return config;
  },
  images: {
    domains: ['localhost', 'faceofboe.martam.dev']
  }
});
