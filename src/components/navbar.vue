<template>
  <div class="navbar">
    <van-nav-bar
      :title="title"
      :left-text="leftText"
      :right-text="rightText"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #title> <slot name="title"></slot> </template>
      <template #left>
        <i class="iconfont iconbtn_nav_back"></i>
      </template>
      <template #right> <slot name="right"></slot> </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  props: ['title', 'leftText', 'rightText'],
  methods: {
    onClickLeft () {
      this.$emit('onClickLeft')
    },
    onClickRight () {
      this.$emit('onClickRight')
    }
  }
}
</script>

<style lang="less">
.navbar {
  .van-nav-bar {
    .van-nav-bar__left {
      padding: 0;
    }
    .iconbtn_nav_back {
      font-size: 44px;
    }
  }
}
</style>
