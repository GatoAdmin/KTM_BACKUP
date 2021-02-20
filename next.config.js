module.exports = {
  poweredByHeader: false,
  trailingSlash: false,
  env: {
    API_PATH: process.env.API_PATH,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(ts|tsx)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
  // 쿠키 정책 (SameSite)때문에 proxy 설정을 해주어야 합니다.
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: `${process.env.API_PATH}/api/:slug*/`,
      },
    ];
  },
  // enable when change to serverless-next with next.js 10
  // i18n: {
  // 	locales: ["ko", "vn"],
  // 	defaultLocale: "ko",
  // }
};
