<template>
  <div class="app">
    <router-view></router-view>
    <van-tabbar
      v-model="active"
      route
      active-color="#e40137"
      inactive-color="#B4B4BD"
    >
      <van-tabbar-item to="/Company" icon="home-o">
        <span>公司</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_gs_sel"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/Question" icon="search">
        <span>刷题</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_st_nor"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/Find" icon="friends-o">
        <span>发现</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_fx_sel"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/My" icon="setting-o">
        <span>我的</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_wode_nor"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less">
.app {
  .van-tabbar {
    height: 88px;
    background: #fcfcfc;
    border: 1px solid #edebeb;
    .iconfont {
      font-size: 28px;
    }
  }
}
</style>
