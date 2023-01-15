import { defineUserConfig, defaultTheme } from "vuepress"
import { searchPlugin } from '@vuepress/plugin-search'
import { navbar, sidebar } from './configs'

export default defineUserConfig({
    // site base
    base: '/',
    lang: "zh-CN",
    title: "zhfc-cli",
    description: "智慧房产微前端文档",

    // theme
    theme: defaultTheme({
        logo: '/images/logo.png',
        navbar,
        sidebar
    }),

    // plugins
    plugins: [
        searchPlugin()
    ]
})