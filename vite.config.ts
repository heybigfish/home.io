import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/home/',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            'src/assets/css/base.less'
          )}";`
        },
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
      '@hooks': resolve(
        __dirname,
        'src/hooks'
      ), // 设置 `@` 指向 `src` 目录
      '@images': resolve(
        __dirname,
        'src/assets/images'
      ), // 设置 `@` 指向 `src` 目录
      '@components': resolve(
        __dirname,
        'src/components'
      ) // 设置 `@` 指向 `src` 目录
    }
  },
  server: {
    host: '0.0.0.0', //ip地址
    hmr: true, // 热更新
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    fs: {
      allow: ['..']
    },
    // 设置代理，根据我们项目实际情况配置
    proxy: {
      // '/api/': {
      //   target:
      //     'http://219.144.185.121:14481/', // 开发环境
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: (path) =>
      //     path.replace('/api/', '')
      // }
    }
  }
})
