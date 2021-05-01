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

function compile(tokens) {
	tokens.forEach((token) => {
		if (token.children) {
			compile(token.children);
		}

		switch (token.type) {
			case 'image':
				return modifyImage(token);
			default:
				return;
		}
	});
}

module.exports = compile;