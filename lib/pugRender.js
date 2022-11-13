import path from 'path';
import pug from 'pug';
import Vinyl from 'vinyl';
import AmpOptimizer from '@ampproject/toolbox-optimizer';
import { minify as htmlMinify } from 'html-minifier';
import config from '../config.js';
import { fileURLToPath } from 'url';
// const manifest = require('./manifest');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const htmlMinifyConfig = {
    caseSensitive: true,
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    decodeEntities: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    sortAttributes: true,
    sortClassName: true,
    useShortDoctype: true,
    minifyCSS: true
}
const ampOptimizer = AmpOptimizer.create({
    minify: false
});
const compiled = {};
const options = {
    basedir: path.join(__dirname, '..', 'views'),
    filters: {}
};

export const pugRender = (src, dist, args = {}) => {
    if (!(src in compiled)) {
        compiled[src] = pug.compileFile(path.join(__dirname, '..', 'views', src), options);
    }

    return ampOptimizer.transformHtml(compiled[src](Object.assign({
        production: config.production,
        url: new URL(dist.replace(/index\.html$/, ''), config.request.url_root)
    }, args))).then((amp) => {
        return Buffer.from(htmlMinify(amp, htmlMinifyConfig));
    }).then((contents) => {
        return new Vinyl({
            cwd: __dirname,
            base: '/',
            path: dist,
            contents
        });
    });
};

export const xmlRender = (src, dist, args = {}) => {
    if (!(src in compiled)) {
        compiled[src] = pug.compileFile(path.join(__dirname, '..', 'views', src), options);
    }

    return Promise.resolve(
        new Vinyl({
            cwd: __dirname,
            base: '/',
            path: dist,
            contents: Buffer.from(compiled[src](Object.assign({ origin: config.request.url_root }, args)))
        })
    );
}
