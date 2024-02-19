const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    // concurrentFeatures: true,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  images: {
    remotePatterns: [
        {
            protocol: 'http',
            hostname: '16.171.134.7',
        },
        {
          protocol: 'https',
          hostname: 'api.panteramebel.uz' 
        }
    ],
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
