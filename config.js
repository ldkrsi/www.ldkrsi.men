export default {
	production: process.env.NODE_ENV === 'production',
	request: {
		url_root: process.env.ORIGIN || 'https://www.ldkrsi.men'
	},
};