module.exports = {
  poweredByHeader: false,
  trailingSlash: false,
  env: {
    API_PATH: process.env.API_PATH,
    REACT_APP_ACCESS_ID: process.env.REACT_APP_ACCESS_ID,
    REACT_APP_ACCESS_KEY: process.env.REACT_APP_ACCESS_KEY,
    REACT_APP_BUCKET_NAME: process.env.REACT_APP_BUCKET_NAME,
    REACT_APP_REGION: process.env.REACT_APP_REGION,
    REACT_APP_S3_URL: process.env.REACT_APP_S3_URL,
    CLIENT_HOST: process.env.CLIENT_HOST,
    IAMPORT_USER_CODE: process.env.IAMPORT_USER_CODE,
    IAMPORT_REST_API_KEY: process.env.IAMPORT_REST_API_KEY,
    IAMPORT_REST_API_SECRET: process.env.IAMPORT_REST_API_SECRET
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
