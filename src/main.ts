import { createApp } from 'vue'
import '@/assets/css/init.less'
import router from './router/index'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueSmoothScroll from 'vue3-smooth-scroll'

// ali iconfont
import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont.js'

import IconSvg from '@/components/IconSvg.vue'

// element-plus 图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// animate动画库
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
app.component('IconSvg', IconSvg)
app.use(router)
app.use(VueSmoothScroll)
app.use(ElementPlus)
app.mount('#app')
