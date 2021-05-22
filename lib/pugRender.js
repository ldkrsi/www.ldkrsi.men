const path = require('path');
const pug = require('pug');
const Vinyl = require('vinyl');
const AmpOptimizer = require('@ampproject/toolbox-optimizer');
const htmlMinify = require('html-minifier').minify;
const config = require('../config.js');
// const manifest = require('./manifest');

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

const pugRender = (src, dist, args = {}) => {
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

const xmlRender = (src, dist, args = {}) => {
    if (!(src in compiled)) {
        compiled[src] = pug.compileFile(path.join(__dirname, '..', 'views', src), options);
    }
    
    return Promise.resolve(
        new Vinyl({
            cwd: __dirname,
            base: '/',
            path: dist,
            contents: Buffer.from(compiled[src](Object.assign({origin: config.request.url_root}, args)))
        })
    );
}

module.exports = {
    pugRender, xmlRender
}