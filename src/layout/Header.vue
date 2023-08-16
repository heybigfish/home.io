<template>
  <div class="top-container">
    <div class="left">logo</div>
    <div class="right">
      <div class="item">首页</div>
      <div class="item">笔记</div>
      <div class="item">随记</div>
      <div class="item">相册</div>
      <div class="item">关于我</div>
    </div>
  </div>
</template>

<script setup lang='ts'>
</script>

<style lang="less" scoped>
.top-container {
  height: @topBarHeight;
  padding: 6px 20px 6px 25px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #aaa;
  .right {
    display: flex;
    .item + .item {
      margin-left: 15px;
    }
  }
}
</style>