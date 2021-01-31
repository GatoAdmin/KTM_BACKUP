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
	// enable when change to serverless-next with next.js 10
	// i18n: {
	// 	locales: ["ko", "vn"],
	// 	defaultLocale: "ko",
	// }
};
