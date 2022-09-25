const { defineConfig } = require('vite');
const { hasPackage } = require('../utilities');
const react = require('@vitejs/plugin-react');
const babelOptions = require('./babel.options');

const plugins = [];

if (hasPackage('react')) {
    plugins.push(react({
        babel: babelOptions
    }));
}

module.exports = defineConfig({
    mode: process.env.NODE_ENV,
    plugins,
    publicDir: '/',
    server: {
        open: '/'
    }
});