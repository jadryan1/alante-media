import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                'who-we-are': resolve(__dirname, 'who-we-are.html'),
                'what-we-do': resolve(__dirname, 'what-we-do.html'),
                contact: resolve(__dirname, 'contact.html'),
                'book-consultation': resolve(__dirname, 'book-consultation.html'),
            },
        },
    },
})
