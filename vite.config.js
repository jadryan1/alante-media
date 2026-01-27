import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                'who-we-are': resolve(__dirname, 'who-we-are.html'),
                'what-we-do': resolve(__dirname, 'what-we-do.html'),
                portfolio: resolve(__dirname, 'portfolio.html'),
                contact: resolve(__dirname, 'contact.html'),
                'book-consultation': resolve(__dirname, 'book-consultation.html'),
            },
        },
    },
})
