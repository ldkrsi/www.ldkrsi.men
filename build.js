"use strict";

const fs = require('fs');
const { execSync } = require('child_process');
const hljs = require('highlight.js');
const YAML = require('yaml');
const markdown = require('markdown-it')({ html: true });
const moment = require('moment');
const { pugRender } = require('./lib/pugRender');
const utility = require('./lib/utility');
const compileTokens = require('./lib/compileTokens');

const renderOptions = {
	langPrefix: 'language-',
	highlight: (str, lang) => hljs.highlight(str, { language: lang }).value
};
markdown.renderer.rules.image = function (tokens, idx, options, env, slf) {
	const token = tokens[idx];
	if (token.attrIndex('alt') >= 0) {
		token.attrs[token.attrIndex('alt')][1] = slf.renderInlineAsText(token.children, options, env);
	}
	return slf.renderToken(tokens, idx, options);
};

function* main() {
	for (const file of fs.readdirSync('./articles/')) {
		yield fs.promises.readFile(`./articles/${file}`, { encoding: 'utf8' }).then((article) => {
			const tokens = markdown.parse(article);
			const config = YAML.parse(tokens.shift().content);
			const title = tokens.splice(tokens.findIndex(t => t.type === 'heading_open' && t.tag === 'h1'), 3)[1].content;
			const createdAt = moment(execSync(`git log --format=%aD ./articles/${file} | tail -1`).toString());
			const updateAt = moment(execSync(`git log -1 --format=%aD ./articles/${file}`).toString());
			const options = compileTokens(tokens);
			return pugRender('article.pug', `/articles/${file.replace(/\.md$/, '')}.html`, {
				title, config, options,
				article: markdown.renderer.render(tokens, renderOptions),
				created_at: createdAt.format('Y-M-D'),
				update_at: updateAt.format('Y-M-D')
			});
		});
	}
}

module.exports = utility.myStream(main);