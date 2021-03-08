module.exports = {
  env: {
    SANITY_DATASET_NAME: process.env.SANITY_DATASET_NAME,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     require('./scripts/generate-sitemap');
  //   }

  //   return config;
  // },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },

  images: {
    domains: ['cdn.sanity.io'],
  },
};
