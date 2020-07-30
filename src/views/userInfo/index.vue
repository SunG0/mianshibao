<template>
  <div class="userInfo">
    <div class="top">
      <navbar @onClickLeft="onClickLeft" title="我的资料"> </navbar>
    </div>
    <div class="content">
      <mycell class="userImg" title="头像">
        <template>
          <slot><img :src="userInfo.avatar" alt=""/></slot>
        </template>
      </mycell>
      <van-cell-group>
        <mycell to="/fixname" title="昵称" :value="userInfo.nickname"></mycell>
        <mycell title="性别" :value="SETGENDER"></mycell>
        <mycell
          title="地区"
          :value="userInfo.area"
          @click="show = true"
        ></mycell>
        <!-- 弹出层 -->
        <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
          <van-area
            title="标题"
            :area-list="areaList"
            :columns-num="2"
            :value="userInfo.area"
            @cancel="onAreaCancel"
            @confirm="onAreaConfirm"
            ref="area"
          />
        </van-popup>

        <mycell title="个人简介" :value="userInfo.intro"></mycell>
      </van-cell-group>
      <van-button block class="logout_btn" @click="logout">
        退出登录
      </van-button>
    </div>
  </div>
</template>

<script>
import { removeToken } from '@/utils/local.js'
import { mapState, mapMutations, mapGetters } from 'vuex'
import { Dialog } from 'vant'
import { areaList } from '@/utils/area.js'
export default {
  name: 'userInfo',
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  data () {
    return {
      show: false,
      areaList
    }
  },
  methods: {
    ...mapMutations(['SETISLOGIN']),
    ...mapMutations(['SETUSERSOME']),
    // 后退
    onClickLeft () {
      this.$router.go(-1)
    },
    // 退出登录
    logout () {
      Dialog.confirm({
        title: '提示',
        message: '确认退出？'
      })
        .then(() => {
          // 清除token
          removeToken()
          // 修改仓库中的是否登录的变量
          this.SETISLOGIN(false)
          // 跳转至登录页
          this.$router.push('/login')
        })
        .catch(() => {
          // on cancel
        })
    },
    onAreaCancel () {
      this.show = false
    },
    onAreaConfirm (res) {
      console.log('res', res)
      // const cityName = res[0].name
      this.show = false
      // this.SETUSERSOME({ area, cityName })
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['SETGENDER'])
    // ...mapGetters(['userArea'])
    // 性别
    // gender () {
    //   const map = { 0: '未知', 1: '男', 2: '女' }
    //   return map[this.userInfo.gender]
    // }
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
