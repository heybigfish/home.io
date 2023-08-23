<template>
  <div class="banner" id="banner">
    <!-- 加载层 -->
    <div class="bg back"><h1>正在进入家园...</h1></div>

    <div data-aos="fade-in" class="bg"></div>
    <!-- 内容层 -->
    <div data-aos="fade-in" class="desc">
      <span class="avatar">
        <el-avatar :size="160" src="/src/assets/images/avatar.jpg" />
      </span>

      <h1 class="banner-title">林中小舍</h1>

      <h3 class="typer">
        <span class="start">鄙人，</span>
        <span class="end">
          <AutoTyperVue
            componentTag="span"
            :text="['This is a demo.', 'And this is another Demo!']"
            :repeat="true"
          ></AutoTyperVue>
        </span>
      </h3>
    </div>
    <!-- 图标 -->
    <div
      class="point-icon animate__animated animate__infinite animate__bounce"
      @click="scrollNext"
    >
      <IconSvg name="iconset0435" size="60px" />
    </div>
  </div>
</template>

<script  lang='ts'>
import { computed, reactive, toRefs } from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0
    })
    const rootHeight = computed(() => {
      return window.innerHeight || 0
    })
    const scrollNext = () => {
      window.scrollTo({
        top: rootHeight.value,
        left: 0,
        behavior: 'smooth'
      })
    }
    return {
      ...toRefs(state),
      scrollNext
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/fork';

.banner {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  overflow-x: hidden;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: @--color-cyan url('../../assets/images/bg_banner.jpg') no-repeat
      center center scroll;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    .back {
      z-index: -2;
    }

    h1 {
      display: block;
      margin-top: 45vh;
      color: @--font-color;
      font-size: 2em;
      text-shadow: 0 0 5px @--color-gray;
    }
  }

  .desc {
    margin-bottom: 20vh;

    * {
      display: block;
      margin: auto;
      color: @--font-color;
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }

    .avatar {
      // z-index: -1;
      // width: 160px;
      // height: 160px;
      // line-height: 160px;
      // box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
    .banner-title {
      text-align: center;
    }
    .typer {
      display: flex;
      justify-content: flex-start;
      min-width: 300px;
      .start {
        width: 80px;
        flex-shrink: 0;
      }
      .end {
        flex: 1;
      }
    }
    h1 {
      font-size: 3em;
      margin: 3rem auto 1rem;
    }

    h3 {
      font-size: 1.5em;

      .vue-typer {
        display: inline-block;
      }
    }

    @media screen and (max-width: @--screen-sm-min) {
      h1 {
        font-size: 2.3em;
      }

      h3 {
        font-size: 1.3em;
      }
    }
  }

  .point-icon {
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translate(-50%, 0);
    cursor: pointer;
    color: @--font-color;
    animation-duration: 2s;
    animation-delay: 1s;

    * {
      transform: rotate(-45deg);
    }
  }
}
</style>