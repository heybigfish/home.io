//取消 http 代理
git config --global --unset http.proxy
//取消 https 代理
git config --global --unset https.proxy

ipconfig/flushdns

##### 插件

#### unplugin-auto-import/vite

unplugin-auto-import 是一个按需自动导入 Vue/Vue Router 等官方 Api 的插件，使用此插件后，不需要手动编写 import {xxx} from vue 这样的代码了，提升开发效率。

#### unplugin-vue-components/vite

unplugin-vue-components 插件可以在 Vue 文件中自动引入组件（包括项目自身的组件和各种组件库中的组件）,使用此插件后，不需要手动编写 import { Button } from 'ant-design-vue'这样的代码了，插件会自动识别 template 中使用的自定义组件并自动注册。
