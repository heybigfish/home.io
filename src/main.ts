import { createApp } from 'vue'
import '@/assets/css/init.less'
import router from './router/index.ts'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueSmoothScroll from 'vue3-smooth-scroll'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'animate.css'

// 打印字体效果
import { AutoTyperVue } from 'auto-typer-vue3'
import 'auto-typer-vue3/dist/style.css'
const app = createApp(App)

for (const [
  key,
  component
] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('AutoTyperVue', AutoTyperVue)
app.use(router)
app.use(VueSmoothScroll)
app.use(ElementPlus)
app.mount('#app')
