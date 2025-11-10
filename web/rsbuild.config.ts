import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
    plugins: [pluginReact()],
    server: {
        port: 3000,
        proxy: {
            '/api': 'http://127.0.0.1:8000',
        },
    },

});
