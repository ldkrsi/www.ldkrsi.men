const config = require('../config');
const removeFromImgur = new Set(['src', 'alt']);

function modifyImage(token) {
	let src = new URL(token.attrGet('src'));
	if (src.hostname.endsWith('imgur.com')) {
		token.tag = 'amp-imgur';
		token.attrs = token.attrs.filter(a => !removeFromImgur.has(a[0]));
		token.attrSet('layout', 'responsive');
		token.attrSet('height', '99');
		token.attrSet('width', '99');
		token.attrSet('data-imgur-id', src.pathname.match(/\/(\w+)\.(png|jpg)/)[1]);
	} else {
		throw `${src.href} is not from imgur.com`;
	}
}

function modifyLink(token) {
	let href = new URL(token.attrGet('href'), config.request.url_root);
	if (href.origin === config.request.url_root) {
		return;
	}
	token.attrSet('rel', 'noreferrer noopener');
}

function modifyHeading(token, text) {
	token.attrSet('id', text);
}

function compile(tokens) {
	const options = {
		code: false,
		image: false,
		description: ''
	};

	tokens.forEach((token, i) => {
		if (token.children) {
			const _ops = compile(token.children);
			options.code = options.code || _ops.code;
			options.image = options.image || _ops.image;
			if (options.description.length < 150){
				options.description = `${options.description} ${_ops.description}`
			}
		}

		switch (token.type) {
			case 'image':
				options.image = true;
				return modifyImage(token);
			case 'fence':
				if (token.info !== 'text') {
					options.code = true;
				}
				return;
			case 'link_open':
				return modifyLink(token);
			case 'heading_open':
				return modifyHeading(token, tokens[i+1].content);
			case 'text':
				options.description = options.description.concat(' ', token.content).trim();
				return;
			default:
				return;
		}
	});

	return options;
}

module.exports = compile;