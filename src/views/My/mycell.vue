<template>
  <van-cell
    class="my-cell"
    :title="title"
    :value="value"
    :border="false"
    @click="clickCell"
  >
    <template #icon>
      <i class="iconfont" :class="icon"></i>
    </template>
    <template #right-icon>
      <i class="iconfont iconicon_more"></i>
    </template>
  </van-cell>
</template>

<script>
export default {
  props: ['title', 'value', 'icon'],
  methods: {
    clickCell () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.my-cell {
  height: 55px;
  align-items: center;
  // border-radius: 8px;
  .iconfont:first-child {
    font-size: 22px;
    margin-right: 12px;
  }
  .iconfont:last-child {
    font-size: 10px;
    margin-left: 9px;
    color: #5b5d75;
  }
}
</style>
