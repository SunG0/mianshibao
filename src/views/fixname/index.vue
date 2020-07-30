<template>
  <div class="fixname">
    <div class="top">
      <navbar
        title="修改昵称"
        rightText="保存"
        @onClickRight="onClickRight"
        @onClickLeft="onClickLeft"
      ></navbar>
    </div>
    <div class="content">
      <van-field
        class="input"
        v-model="value"
        :placeholder="userInfo.nickname"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'fixname',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onClickRight () {
      this.$store.commit('SETNICKNAME', this.value)
      this.$router.push('/userInfo')
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style lang="less">
.fixname {
  font-family: PingFangSC, PingFangSC-Semibold;
  .top {
    .van-nav-bar {
      box-shadow: 0px 2px 4px 0px rgba(24, 26, 57, 0.04);
    }
    .van-nav-bar__title {
      font-size: 18px;
      font-weight: 600;
      color: #222222;
    }
    .van-nav-bar__text {
      font-size: 14px;
      font-weight: 400;
      color: #181a39;
    }
  }

  .content {
    padding: 0 15px;
    margin-top: 20px;
    .input {
      padding-left: 10px;
      background: #f7f4f5;
      border-radius: 4px;
    }
  }
}
</style>
