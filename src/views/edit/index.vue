<template>
  <div class="fixname">
    <div class="top">
      <navbar
        :title="title"
        rightText="保存"
        @onClickRight="onClickRight"
        @onClickLeft="onClickLeft"
      ></navbar>
    </div>
    <div class="content">
      <!-- 输入框 -->
      <van-field class="input" v-if="prop != 'avatar'" v-model="inputValue" />
      <!-- 头像上传 -->
      <van-uploader
        v-else
        :after-read="afterRead"
        v-model="fileList"
        :max-count="1"
      />
    </div>
  </div>
</template>

<script>
// 导入辅助函数
import { mapState, mapMutations } from 'vuex'
import { userEdit, userUpload } from '@/api/user.js'
export default {
  name: 'fixname',
  data () {
    return {
      inputValue: '',
      title: '',
      fileList: [{ url: '' }],
      prop: '',
      avatar: ''
    }
  },
  methods: {
    // 合并方法
    ...mapMutations(['SETUSERINFOVALUE']),
    onClickRight () {
      // 判断是否修改了图片
      if (this.prop === 'avatar' && this.avatar === '') {
        // 没有修改图片  则提示并且阻止后面代码的执行
        this.$toast.fail('图片没有修改')
        return
      }
      // 获取数据
      const data = {}
      // 根据修改的值不同，传递的参数不同
      if (this.prop !== 'avatar') {
        data[this.prop] = this.inputValue
      } else {
        data[this.prop] = this.avatar
      }
      // 加载框
      this.$toast.loading({ duration: 0 })
      // 调用接口保存数据
      userEdit(data).then(res => {
        // 取消加载框
        this.$toast.success('修改成功')
        // 修改仓库中的数据
        // 根据修改的值不同 要判断
        if (this.prop !== 'avatar') {
          this.SETUSERINFOVALUE({
            key: this.prop,
            value: this.inputValue
          })
        } else {
          res.data.avatar = process.env.VUE_APP_URL + res.data.avatar
          this.SETUSERINFOVALUE({
            key: this.prop,
            value: res.data.avatar
          })
        }
        // 返回到上一页
        this.$router.go(-1)
      })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    // 上传头像
    afterRead (fileInfo) {
      // console.log('fileInfo', fileInfo.file)
      const data = new FormData()
      data.append('files', fileInfo.file)
      this.$toast.loading({ duration: 0, forbidClick: true })
      userUpload(data).then(res => {
        // console.log('res', res)
        this.avatar = res.data[0].id
        this.$toast.success('图片上传成功')
      })
    }
  },
  computed: {
    // 合并计算属性
    ...mapState(['userInfo'])
  },
  created () {
    // 获取传进来的参数
    this.prop = this.$route.query.propName
    const titleName = {
      nickname: '昵称',
      position: '岗位',
      avatar: '头像',
      intro: '个人简介'
    }
    // 根据传进来的参数修改标题名
    this.title = '修改' + titleName[this.prop]
    // 根据传进来的参数修改占位文字
    this.inputValue = this.userInfo[this.prop]
    // 如果传的参数为头像则 设置默认的预览头像
    if (this.prop === 'avatar') {
      this.fileList[0].url = this.userInfo[this.prop]
    }
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
