<template>
  <svg class="icon svg-icon" :style="{ fontSize: state.size }" aria-hidden="true">
    <use :xlink:href="`#icon-${state.name}`"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  props: {
    name: String,
    size: {
      type: String,
      default: '1em'
    }
  },
  setup(props) {
    const state = reactive({
      name: props.name,
      size: props.size
    })
    return {
      state
    }
  }
})
</script>

<style lang="less" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>