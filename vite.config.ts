import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'
// 打包分析
import { visualizer } from 'rollup-plugin-visualizer'

// 自动引入组件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)

  return {
    plugins: [
      vue(),
      visualizer(),
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
            hack: `true; @import (reference) "${resolve('src/assets/css/root.less')}";`
          },
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
      }
    },
    base: './', // 设置打包路径
    server: {
      host: '0.0.0.0', //ip地址
      hmr: true, // 热更新
      port: 4000, // 设置服务启动端口号
      open: false, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      fs: {
        allow: ['..']
      },

      // 设置代理，根据我们项目实际情况配置
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          // secure: false,
          rewrite: (path) => path.replace('/api/', '')
        }
      }
    },
    esbuild: {
      pure: ['console.log'], // 删除 console.log
      drop: ['debugger'] // 删除 debugger
    },
    build: {
      rollupOptions: {
        output: {}
      }
    }
  }
})
