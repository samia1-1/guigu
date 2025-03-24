// vite.config.ts
import {defineConfig,loadEnv } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { en } from 'element-plus/es/locales.mjs'
export default defineConfig(({ command, mode }) => {
  // 获取环境变量
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
          iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
          symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
          enable: command === 'serve', // 只在开发环境启用 mock 接口
      })
  ],
  resolve: {
      alias: {
          "@": path.resolve("./src")
      }
  },
  css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/variable.scss" as *;',
        }
      }
    },
    server:{
      proxy:{
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
      