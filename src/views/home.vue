<template>
  <div class="home-container">
    <div class="top">
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.home-container {
  height: calc(100vh - @topBarHeight);
  overflow: auto;

  .top {
    padding: 56px 24px 48px;
    position: relative;
    height: calc(100vh - @topBarHeight);
    background-color: #fff;
    background-image: url(../assets/media/home-bg.svg);
    transform: translateZ(0);
    display: flex;
    justify-content: center;
    position: relative;

    .top-img {
      position: absolute;
      width: 80%;
    }
  }
}
</style>
