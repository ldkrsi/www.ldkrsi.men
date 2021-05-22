"use strict";

const fs = require('fs');
const exec = require('util').promisify(require('child_process').exec);
const hljs = require('highlight.js');
const YAML = require('yaml');
const markdown = require('markdown-it')({ html: true });
const moment = require('moment');
const { pugRender, xmlRender } = require('./lib/pugRender');
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

function main() {
	return fs.promises.readdir('./articles/').then((files) => {
		return Promise.all(files.map((file) => {
			return fs.promises.readFile(`./articles/${file}`, { encoding: 'utf8' }).then((article) => {
				return Promise.all([
					exec(`git log --format=%aD ./articles/${file} | tail -1`).then(({ stdout }) => moment(stdout.toString())),
					exec(`git log -1 --format=%aD ./articles/${file}`).then(({ stdout }) => moment(stdout.toString()))
				]).then(([createdAt, updateAt]) => {
					const tokens = markdown.parse(article);
					const config = YAML.parse(tokens.shift().content);
					const title = tokens.splice(tokens.findIndex(t => t.type === 'heading_open' && t.tag === 'h1'), 3)[1].content;
					const options = compileTokens(tokens);

					return {
						title, options,
						path: `/articles/${file.replace(/\.md$/, '')}.html`,
						article: markdown.renderer.render(tokens, renderOptions),
						timestamp: updateAt.valueOf(),
						metadata: Object.assign(config, {
							created_at: createdAt.format('Y-M-D'),
							update_at: updateAt.format('Y-M-D'),
							description: options.description
						})
					};
				});
			});
		})).then((rows) => {
			const sitemaps = [];
			const tasks = rows.map(d => {
				sitemaps.push({
					loc: d.path,
					lastmod: d.metadata.update_at
				});
				return pugRender('article.pug', d.path, d);
			});

			rows.sort((a, b) => b.timestamp - a.timestamp);
			tasks.push(pugRender('index.pug', '/index.html', { rows }));
			sitemaps.push({
				loc: '',
				lastmod: rows[0].metadata.update_at
			});

			const tags = {};
			rows.forEach(row => {
				row.metadata.tags.forEach(tag => {
					if (tag in tags) {
						return tags[tag].push(row);
					}
					tags[tag] = [row];
				});
			});

			tasks.push(pugRender('tags.pug', '/tags/index.html', {
				tags: Object.entries(tags).map(([key, value]) => {
					return {
						key, size: value.length
					};
				}).sort((a, b) => b.size - a.size)
			}));
			sitemaps.push({
				loc: '/tags/',
				lastmod: rows[0].metadata.update_at
			});

			tasks.push(...Object.entries(tags).map(([key, value]) => {
				sitemaps.push({
					loc: `/tags/${key}.html`,
					lastmod: value[0].metadata.update_at
				});
				return pugRender('tag.pug', `/tags/${key}.html`, {
					tag: key,
					rows: value
				});
			}));

			tasks.push(xmlRender('sitemap.pug', '/sitemap.xml', { sitemaps }));

			return Promise.all(tasks);
		});
	});

}

module.exports = utility.myStream(main);