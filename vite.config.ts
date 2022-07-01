import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import Unocss from 'unocss/vite'
import path from 'path'

export default defineConfig({
    resolve: {
        alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
        }
    },
    plugins: [
        vue({
            template: { transformAssetUrls }
        }),
        quasar({
            sassVariables: 'src/assets/sass/quasar-variables.sass'
        }),
        Unocss()
    ]
})