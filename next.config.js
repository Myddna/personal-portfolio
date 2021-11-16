/** @type {import('next').NextConfig} */
const path = require("path");
module.exports = {
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
};
