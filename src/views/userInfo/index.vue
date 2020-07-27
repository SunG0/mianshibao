<template>
  <div class="userInfo">
    <div class="top">
      <navbar @onClickLeft="onClickLeft">
        <template #title>
          <slot name:title>我的资料</slot>
        </template>
      </navbar>
    </div>
    <div class="content">
      <mycell class="userImg" title="头像">
        <template>
          <slot><img :src="userInfo.avatar" alt=""/></slot>
        </template>
      </mycell>
      <van-cell-group>
        <mycell title="昵称" value="12"></mycell>
        <mycell title="性别" value="12"></mycell>
        <mycell title="地区" value="12"></mycell>
        <mycell title="个人简介" value="12"></mycell>
      </van-cell-group>
      <van-button block class="logout_btn">
        退出登录
      </van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'userInfo',
  methods: {
    onClickLeft () {}
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style lang="less">
.userInfo {
  font-family: PingFangSC, PingFangSC-Semibold;
  .top {
    box-shadow: 0px 2px 4px 0px rgba(24, 26, 57, 0.04);

    .van-nav-bar__title {
      font-size: 18px;
      font-weight: 600;
      color: #222222;
    }
  }
  .content {
    margin-top: 18px;
    padding: 0 15px;
    .userImg {
      height: 60px;
      border-radius: 8px;
      .van-cell__value {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
    }
    .van-cell-group {
      margin-top: 10px;
      border-radius: 8px;
      overflow: hidden;
    }
    .logout_btn {
      margin-top: 15px;
      height: 50px;
      background: #ffffff;
      border-radius: 8px;
      color: @main-color;
      border: none;
      font-size: 16px;
      font-weight: 400;
    }
  }
}
</style>
