<template>
  <div class="userInfo">
    <div class="top">
      <navbar @onClickLeft="onClickLeft" title="我的资料"> </navbar>
    </div>
    <div class="content">
      <mycell class="userImg" @click="editUserInfo('avatar')" title="头像">
        <template>
          <slot><img :src="userInfo.avatar" alt=""/></slot>
        </template>
      </mycell>
      <van-cell-group>
        <mycell
          title="昵称"
          @click="editUserInfo('nickname')"
          :value="userInfo.nickname"
        ></mycell>
        <mycell
          title="性别"
          :value="SETGENDER"
          @click="showPicker = true"
        ></mycell>
        <mycell title="地区" :value="userArea" @click="show = true"></mycell>
        <!-- 城市选择弹出层 -->
        <van-popup
          v-model="show"
          @closed="onAreaCancel"
          position="bottom"
          :style="{ height: '30%' }"
        >
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
        <mycell
          title="个人简介"
          @click="editUserInfo('intro')"
          :value="userInfo.intro"
        ></mycell>
      </van-cell-group>
      <van-button block class="logout_btn" @click="logout">
        退出登录
      </van-button>
    </div>
    <!-- 性别pick -->
    <van-popup v-model="showPicker" position="bottom" @closed="onGenderCancel">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="onGenderCancel"
        @confirm="onGenderConfirm"
        :default-index="userInfo.gender"
        ref="genderPicker"
      />
    </van-popup>
  </div>
</template>

<script>
import { removeToken } from '@/utils/local.js'
import { mapState, mapMutations, mapGetters } from 'vuex'
import { Dialog } from 'vant'
import { areaList } from '@/utils/area.js'
import { userEdit } from '@/api/user.js'
export default {
  name: 'userInfo',
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  data () {
    return {
      show: false,
      areaList,
      showPicker: false,
      columns: ['未知', '男', '女']
    }
  },
  methods: {
    ...mapMutations(['SETISLOGIN', 'SETUSERINFO', 'SETUSERINFOVALUE']),
    // 后退
    onClickLeft () {
      // 如果使用go-1的话会有些隐患
      this.$router.push('/My')
    },
    // 跳转至编辑页
    editUserInfo (prop) {
      this.$router.push(`/edit?propName=${prop}`)
    },
    // 性别弹框取消
    onGenderCancel () {
      // 恢复默认值
      this.$refs.genderPicker.setColumnIndex(0, this.userInfo.gender)
      // 关闭弹框
      this.showPicker = false
    },
    // 行性别弹框确认按钮
    onGenderConfirm (value, index) {
      // 加载弹窗
      this.$toast.loading({ duration: 0 })
      // 调用接口
      userEdit({ gender: index }).then(res => {
        // 弹出修改成功 覆盖加载弹窗
        this.$toast.success('修改成功')
        // 关闭弹窗
        this.showPicker = false
        // 调用方法  修改userinfo的gender
        this.SETUSERINFOVALUE({
          key: 'gender',
          value: index
        })
      })
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
          // 清除userInfo信息
          this.SETUSERINFO('')
          // 跳转至登录页
          this.$router.push('/My')
        })
        .catch(() => {
          // on cancel
        })
    },
    // 城市选择弹框取消
    onAreaCancel () {
      // 关闭
      this.show = false
      // 重置数据
      this.$refs.area.reset(this.userInfo.area)
    },
    // 城市选择弹框确认
    onAreaConfirm (col) {
      this.$toast.loading({ duration: 0 })
      // 调用接口
      userEdit({ area: col[1].code }).then(res => {
        // 弹出修改成功 覆盖加载弹窗
        this.$toast.success('修改成功')
        // 关闭弹窗
        this.show = false
        // 调用方法  修改userinfo的area
        this.SETUSERINFOVALUE({
          key: 'area',
          value: col[1].code
        })
      })
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['SETGENDER', 'userArea'])
  },
  created () {}
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
