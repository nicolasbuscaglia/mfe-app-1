/** @type {import('next').NextConfig} */

const NextFederationPlugin = require("@module-federation/nextjs-mf");

const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "mfeApp1",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./CustomButton": "./src/components/CustomButton.tsx",
        },
      })
    );
    config.optimization.splitChunks = false;
    return config;
  },
};

module.exports = nextConfig;
