/** @type {import('next').NextConfig} */
const path = require("path");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  turbopack: {
    // ...
  },
  images: {
    domains: ['localhost', 'faceofboe.martam.dev']
  }
});
