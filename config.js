const production = process.env.NODE_ENV === 'production';

module.exports = {
	production,
	request: {
		url_root: production ? 'https://www.ldkrsi.men' : 'http://192.168.50.192:8080'
	},
};