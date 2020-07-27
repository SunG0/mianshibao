<template>
  <div class="login">
    <div class="top">
      <div class="header"></div>
      <div>
        <navbar @onClickLeft="onClickLeft"></navbar>
      </div>
    </div>
    <div class="content">
      <h2>您好，请登录</h2>
      <div class="form">
        <van-form @submit="onSubmit" ref="loginForm">
          <van-row class="item">
            <van-col span="24"></van-col>
            <van-field
              v-model="mobile"
              name="mobile"
              type="tel"
              placeholder="请输入手机号"
              :rules="[
                {
                  pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
                  message: '请填写手机号'
                }
              ]"
            >
              <template #left-icon>
                <i class="iconfont iconbianzu1"></i> </template
            ></van-field>
          </van-row>
          <div class="line"></div>
          <van-row class="item">
            <van-col span="16"
              ><van-field
                v-model="code"
                name="cide"
                placeholder="请输入验证码"
                :rules="[{ required: true, message: '请填写验证码' }]"
              >
                <template #left-icon>
                  <i class="iconfont iconyanzhengma"></i>
                </template> </van-field
            ></van-col>
            <van-col span="8" class="btn-col">
              <van-button
                @click.prevent="getCode"
                :disabled="delay !== -1"
                class="btn van-hairline--left"
                >{{ btnText }}</van-button
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
import { getCode, userLogin } from '@/api/login.js'
import { setToken } from '@/utils/local'
export default {
  name: 'login',
  components: {},
  data () {
    return {
      mobile: '',
      code: '',
      btnText: '获取验证码',
      delay: -1
    }
  },
  methods: {
    onClickLeft () {
      console.log('点击了')
    },
    // 提交按钮
    onSubmit (values) {
      // console.log('submit', values)
      // 用户登录
      // 加载框
      this.$toast.loading({
        duration: 0
      })
      userLogin(values).then(res => {
        console.log(res)
        this.$toast.success(res.message)
        // 保存token
        setToken(res.data.jwt)
        // 存储个人信息
        // 修改图片地址
        res.data.user.avatar = process.env.VUE_APP_URL + res.data.user.avatar
        this.$store.commit('SETUSERINFO', res.data.user)
        // 跳转到my页面
        this.$router.push('/My')
      })
    },
    getCode () {
      // 当使用的不是button标签的时候用这种方法
      // if (this.delay !== 0) {
      //   return
      // }
      // 单独表单验证
      this.$refs.loginForm.validate('mobile').then(res => {
        // 加载框
        this.$toast.loading({
          duration: 0
        })
        // 设置60秒点击一次
        this.delay = 59
        this.btnText = `${this.delay}S后重试`
        const timeId = setInterval(() => {
          this.delay--
          this.btnText = `${this.delay}S后重试`
          if (this.delay < 0) {
            clearInterval(timeId)
            this.btnText = '获取验证码'
          }
        }, 1000)
        // 调用接口
        getCode({ mobile: this.mobile }).then(res => {
          this.$toast.success(res.data)
        })
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
    height: 88px;
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
    .item {
      border-bottom: 1px solid #f7f4f5;
      color: #000;
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
