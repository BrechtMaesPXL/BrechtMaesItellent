import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit(),
        SvelteKitPWA({
            srcDir: './src',
            mode: 'development',
            strategies: 'generateSW',
            registerType: 'autoUpdate',
            manifest: {
                name: 'Brecht Maes Portfolio',
                short_name: 'Brecht',
                theme_color: '#000000',
                background_color: '#000000',
                display: 'standalone'
            }, // <--- Hier ontbrak de komma!
            workbox: {
                maximumFileSizeToCacheInBytes: 10485760, 
            }
        })
    ],
    server: {
        headers: {
            'Cross-Origin-Embedder-Policy': 'require-corp',
            'Cross-Origin-Opener-Policy': 'same-origin'
        }
    }
});