import { defineConfig } from 'vite';
import { hasPackage } from '../utilities';
import react from '@vitejs/plugin-react';
import babelOptions from './babel.options';

const plugins = [];

if (hasPackage('react')) {
    plugins.push(react({
        babel: babelOptions
    }));
}

export default defineConfig({
    mode: process.env.NODE_ENV,
    plugins,
    publicDir: '/',
    server: {
        open: '/'
    }
});