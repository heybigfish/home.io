// 以下两种方案二选一

// 方案一
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module "element-plus";
declare module "element-plus/global";
