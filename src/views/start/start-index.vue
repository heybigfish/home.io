<!-- 整体的框架 -->

<template>
  <div class="common-layout">
    <el-container>
      <el-header> <Banner /> </el-header>
      <el-container>
        <el-aside width="200px">
          <el-affix> side </el-affix>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'
import Banner from './start-banner.vue'
export default {
  components: { Banner },

  setup() {
    const state = reactive({})
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="less">
.el-header {
  z-index: 0;
  height: 100vh;
  overflow: auto;
  padding: 0;
}
.el-container {
  min-height: 100vh;
  .el-aside {
    height: 100vh;
  }
  .el-main {
    height: 100vh;
    overflow: auto;
  }
}
</style>
