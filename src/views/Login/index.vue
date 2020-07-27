<template>
  <div class="login">
    <div class="top">
      <div class="header"></div>
      <div class="bar">
        <navBar @onClickLeft="onClickLeft"></navBar>
      </div>
    </div>
    <div class="content">
      <h2>您好，请登录</h2>
      <div class="form">
        <van-form @submit="onSubmit">
          <van-row>
            <van-col span="24"></van-col>
            <van-field
              v-model="mobile"
              name="用户名"
              placeholder="请输入手机号"
              :rules="[{ required: true, message: '请填写手机号' }]"
            >
              <template #left-icon>
                <i class="iconfont iconbianzu1"></i> </template
            ></van-field>
          </van-row>
          <div class="line"></div>
          <van-row>
            <van-col span="16"
              ><van-field
                v-model="code"
                name="验证码"
                placeholder="请输入验证码"
                :rules="[{ required: true, message: '请填写验证码' }]"
              >
                <template #left-icon>
                  <i class="iconfont iconyanzhengma"></i>
                </template> </van-field
            ></van-col>
            <van-col span="8" class="btn-col">
              <van-button @click="getCode" class="btn van-hairline--left"
                >获取验证码</van-button
              >
            </van-col>
          </van-row>
          <div class="line"></div>
          <p>
            登录即同意<span>《用户使用协议》</span>和<span>《隐私协议》</span>
          </p>
          <div>
            <van-button
              class="sure"
              round
              block
              type="info"
              native-type="submit"
            >
              确定
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from './navbar'
import { getCode } from '@/api/login.js'
export default {
  name: 'login',
  components: {
    navBar
  },
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onClickLeft () {
      console.log('点击了')
    },
    onSubmit (values) {
      console.log('submit', values)
    },
    getCode () {
      this.$toast.success()
      getCode({ mobile: this.mobile }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less">
.login {
  height: 100%;
  background-color: #fff;
  font-family: PingFangSC, PingFangSC-Semibold;
  .top {
    box-shadow: 0px 2px 4px 0px rgba(24, 26, 57, 0.04);
    .header {
      height: 44px;
    }
  }
  .content {
    padding: 0 15px;
    h2 {
      font-size: 18px;
      font-weight: 600;
      color: #222222;
      margin-top: 50px;
      margin-bottom: 50px;
    }

    .van-field__control {
      padding-left: 20px;
    }
    .btn-col {
      height: 45px;
      display: flex;
      align-items: center;
    }
    .btn {
      display: inline-block;
      line-height: 29px;
      height: 29px;
      padding-left: 15px;
      font-size: 16px;
      color: #00b8d4;
      border: none;
    }
    .line {
      width: 345px;
      height: 1px;
      border: 1px solid #f7f4f5;
    }
    p {
      font-size: 12px;
      font-weight: 400;
      color: #181a39;
      margin-top: 15px;
      span {
        color: #00b8d4;
      }
    }
    .sure {
      margin-top: 44px;
      background-color: @main-color;
      width: 100%;
      font-size: 18px;
      font-weight: 600;
      border: none;
    }
  }
}
</style>
