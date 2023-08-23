// 以下两种方案二选一

// 方案一
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// 方案二
declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}

declare module "element-plus";
declare module "element-plus/global";
