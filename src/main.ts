import { createApp } from 'vue'
import '@/assets/css/init.less'
import router from './router/index.ts'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
