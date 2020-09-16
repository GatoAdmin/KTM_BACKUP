const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	poweredByHeader: false,
	trailingSlash: false,
	env: {
		API_PATH: process.env.API_PATH,
	},
};
