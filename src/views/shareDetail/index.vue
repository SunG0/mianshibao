<template>
  <div class="shareDetail">
    <div class="top">
      <navbar></navbar>
    </div>
    <van-skeleton title avatar :row="30" v-if="shareDetail === ''" />
    <template v-else>
      <!-- 文章内容 -->
      <div class="shareContent">
        <!-- 文章标题 -->
        <div class="title">{{ shareDetail.title }}</div>
        <!-- 发表用户信息 -->
        <div class="userInfo">
          <img :src="shareDetail.author.avatar" alt="" />
          <div class="name-box">
            <span class="name">{{ shareDetail.author.nickname }}</span>
            <span class="time">{{ shareDetail.created_at | formatTime }}</span>
          </div>
        </div>
        <!-- 文章内容 -->
        <div class="experience-content" v-html="shareDetail.content"></div>
      </div>
    </template>
    <!-- 评论区域盒子 -->

    <div class="comment_box">
      <div class="comment">
        <!-- 评论盒子标题 -->
        <div class="comment_title">
          评论 <span class="num">{{ commentTotal }}</span>
        </div>
        <!-- 评论item -->
        <!-- 触底加载 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="comment_item" v-for="item in commentList" :key="item.id">
            <!-- 用户信息及点赞 -->
            <div class="comment_user">
              <div class="left" @click="showPop(item)">
                <img :src="item.author.avatar" alt="" />
                <div class="name-box">
                  <span class="name">{{ item.author.nickname }}</span>
                  <span class="time">{{ item.created_at | formatTime }}</span>
                </div>
              </div>
              <div class="star">
                <span>{{ item.star }}</span>
                <i class="iconfont iconbtn_dianzan_small_nor"></i>
              </div>
            </div>
            <!-- 评论内容盒子 -->
            <div class="comment_content">
              <!-- 评论内容 -->
              <div class="content">{{ item.content }}</div>
              <!-- 回复评论内容 -->
              <div class="replay_box" v-if="item.children_comments.length > 0">
                <div
                  class="replay"
                  v-for="it in item.children_comments"
                  :key="it.id"
                >
                  <span class="name">{{ it.author }}:</span>
                  {{ it.content }}
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>

    <!-- 底部盒子 -->
    <div class="bottom-box">
      <div class="input" @click="showPop()">我来补充两句</div>
      <div class="shoucang">
        <i class="iconfont iconbtn_shoucang_nor"></i>
        {{ shareDetail.collect }}
      </div>
      <div class="star" :class="{ actived: isStar }" @click="starClick()">
        <i class="iconfont iconbtn_dianzan_small_nor"></i>
        {{ shareDetail.star }}
      </div>
      <div class="share" @click="showShare">
        <i class="iconfont iconbtn_share"></i>
        {{ shareDetail.share }}
      </div>
    </div>
    <!-- 评论弹出层 -->
    <van-popup
      class="input-pop"
      v-model="replayShow"
      position="bottom"
      :style="{ height: '24%' }"
    >
      <van-field
        v-model="inputValue"
        rows="3"
        autosize
        type="textarea"
        :placeholder="placeholder"
      />
      <span @click="submitComment">发送</span></van-popup
    >
    <!-- 分享弹出层 -->
    <van-popup v-model="shareImg">
      <div class="bgc" v-if="!popImgUrl" ref="shareBox">
        <p>长按图片下载并分享</p>
        <div class="paper">
          <div class="title">{{ shareDetail.title }}</div>
          <div class="user">
            <img :src="shareDetail && shareDetail.author.avatar" alt="" />
            <span>{{ shareDetail && shareDetail.author.nickname }}</span>
          </div>
          <div class="content">
            {{ shareDetail.contentText }}
            <div class="mask"></div>
          </div>
          <div class="logo">
            <img src="@/assets/logo.png" alt="" />
          </div>
          <div class="code">
            <img :src="codeUrl" alt="" />
          </div>
          <p>长按识别二维码查看原文</p>
        </div>
      </div>
      <div class="share-img" v-else>
        <img :src="popImgUrl" alt="" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  shareDetail,
  shareComments,
  sendComment,
  nicePaper
} from '@/api/find.js'
import { mapState, mapMutations } from 'vuex'
// 导入 二维码模块
import QRCode from 'qrcode'
// 发哦如 截图模块
import html2canvas from 'html2canvas'
export default {
  name: 'shareDetail',
  data () {
    return {
      // 面经详情
      shareDetail: '',
      // 评论列表
      commentList: [],
      // 评论总数
      commentTotal: 0,
      // 评论起始
      start: 0,
      // 数据个数
      limit: 5,
      // 触底加载
      loading: false,
      finished: false,
      // 评论弹出层
      replayShow: false,
      // 评论内容
      inputValue: '',
      // 评论的对象为已发表的评论的内容
      parentComment: '',
      // 评论框占位
      placeholder: '',
      // 分享弹出层
      shareImg: false,
      // 文章二维码地址
      codeUrl: '',
      // 截图地址
      popImgUrl: ''
    }
  },
  // 获取文章的二维码地址，在页面加载完成的时候获取
  async mounted () {
    const codeUrl = await QRCode.toDataURL(window.location.href)
    // console.log(codeUrl)
    this.codeUrl = codeUrl
  },
  computed: {
    ...mapState(['userInfo']),
    // 添加计算属性判断该文章是否点赞了
    isStar () {
      if (this.userInfo) {
        const id = +this.$route.params.id
        const isStar = this.userInfo.starArticles.includes(id)
        // console.log(isStar)
        return isStar
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapMutations(['SETUSERINFOVALUE']),
    // 点赞文章
    starClick () {
      this.$toast.loading({ duration: 0 })
      // 确定是否登录  发送请求
      this.$checkLogin().then(res => {
        nicePaper({ article: this.$route.params.id }).then(res => {
          console.log('star', res)
          this.SETUSERINFOVALUE({
            key: 'starArticles',
            value: res.data.list
          })
          this.$toast.clear()
        })
      })
    },
    // 显示分享框
    showShare () {
      // 判断是否登录
      this.$checkLogin().then(() => {
        this.shareImg = true
        window.scrollTo(0, 0)
        this.$nextTick(async () => {
          const canvas = await html2canvas(this.$refs.shareBox, {
            allowTaint: true,
            useCORS: true
          })
          // 把上面获取的canvas 转为地址
          const popImgUrl = canvas.toDataURL()
          this.popImgUrl = popImgUrl
        })
      })
    },
    // 点击显示评论框
    showPop (item) {
      // console.log(item)
      this.parentComment = item
      if (item) {
        this.placeholder = `回复：${item.author.nickname}`
      } else {
        this.placeholder = '我来补充两句'
      }
      this.replayShow = true
    },
    // 发送回复
    submitComment () {
      // 判断用户是否登录
      this.$checkLogin().then(() => {
        // 表示用户已经登录 发表评论
        const data = { content: this.inputValue }
        // 判断是给谁评论
        if (this.parentComment) {
          data.parent = this.parentComment.id
        } else {
          data.article = this.$route.params.id
        }
        sendComment(data).then(res => {
          console.log(res)
          if (res.data.parent) {
            this.parentComment.children_comments.push(res.data)
            this.parentComment = ''
          } else {
            if (res.data.author.avatar) {
              res.data.author.avatar =
                process.env.VUE_APP_URL + res.data.author.avatar
            }
            this.commentList.unshift(res.data)
          }
          this.$toast.success('发表成功')
          this.inputValue = ''
          this.replayShow = false
        })
      })
    },
    // 触底加载
    onLoad () {
      // 接口调用
      // 评论列表t
      shareComments({
        id: this.$route.params.id,
        start: this.start,
        limit: this.limit
      }).then(res => {
        console.log(res)
        res.data.list.forEach(v => {
          v.author.avatar = process.env.VUE_APP_URL + v.author.avatar
        })
        this.commentList.push(...res.data.list)
        this.commentTotal = res.data.total
        this.loading = false
        this.start += this.limit
        if (this.commentList.length >= res.data.total) {
          this.finished = true
        }
      })
    }
  },
  created () {
    // console.log(this.$route.params.id)
    // console.log(this.isStar())
    // 获取文章详情
    shareDetail(this.$route.params.id).then(res => {
      console.log('shareDetail', res)
      res.data.author.avatar = process.env.VUE_APP_URL + res.data.author.avatar
      this.shareDetail = res.data
    })
  }
}
</script>

<style lang="less">
.shareDetail {
  font-family: PingFangSC, PingFangSC-Medium;
  .actived {
    color: @main-color !important;
  }
  .shareContent {
    background-color: #fff;
    padding: 15px;
    margin-bottom: 10px;
    .title {
      font-size: 18px;
      font-weight: 600;
      color: #181a39;
    }
    .userInfo {
      display: flex;
      align-items: center;
      margin-top: 15px;
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 5px;
      }
      .name-box {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 35px;
        flex: 1;
        .name {
          font-size: 12px;
          font-weight: 600;
          color: #545671;
        }
        .time {
          font-size: 12px;
          color: #b4b4bd;
        }
      }
    }
    .experience-content {
      margin-top: 20px;
      font-size: 16px;
      text-align: justify;
      color: #181a39;
      line-height: 27px;
      img {
        width: 100%;
        height: 100%;
        margin: 20px 0;
      }
    }
  }
  .comment_box {
    margin-bottom: 85px;
    .comment {
      background-color: #fff;
      padding: 25px 15px;
      .comment_title {
        height: 25px;
        font-size: 18px;
        font-weight: 600;
        color: #222222;
        line-height: 25px;
        position: relative;
        .num {
          font-size: 12px;
          font-weight: 600;
          color: #b4b4bd;
          position: absolute;
          left: 40px;
          top: -5px;
        }
      }
      .comment_item {
        margin-top: 30px;
        .comment_user {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .left {
            flex: 1;
            display: flex;
            img {
              width: 35px;
              height: 35px;
              border-radius: 50%;
              margin-right: 9px;
            }
            .name-box {
              height: 35px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              .name {
                font-size: 12px;
                font-weight: 600;
                color: #545671;
              }
              .time {
                font-size: 12px;
                color: #b4b4bd;
              }
            }
          }
          .star {
            font-size: 12px;
            color: #b4b4bd;
            i {
              font-size: 16px;
            }
          }
        }
      }
      .comment_content {
        padding: 10px 18px 0 40px;
        .content {
          padding: 3px;
          font-size: 16px;
          color: #181a39;
          line-height: 27px;
          letter-spacing: 1px;
          overflow: hidden;
        }
        .replay_box {
          margin-top: 10px;
          padding: 13px 15px;
          font-size: 14px;
          color: #545671;
          line-height: 20px;
          background: #f7f4f5;
          border-radius: 4px;
          overflow: hidden;
          .replay {
            margin-bottom: 8px;
            letter-spacing: 1px;
            .name {
              font-weight: 600;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }

  .bottom-box {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 85px;
    display: flex;
    box-sizing: border-box;
    padding: 10px 15px 0;
    background-color: @white-color;
    width: 100%;
    justify-content: space-between;
    .input {
      height: 34px;
      background: @border-color;
      border-radius: 4px;
      flex: 1;
      font-size: 14px;
      margin-top: 10px;
      color: @subdominant-font-color;
      margin-right: 24px;
      line-height: 34px;
      padding-left: 6px;
    }
    div:not(.input) {
      font-size: 12px;
      color: @subdominant-font-color;
      i {
        display: block;
        font-size: 28px;
      }
    }
    .shoucang {
      margin-right: 24px;
    }
    .star {
      margin-right: 24px;
    }
  }
  .input-pop {
    padding: 25px 15px 0;
    overflow: hidden;
    // 弹出层
    .van-cell::after {
      border-bottom: none;
    }
    .van-field {
      height: 99px;
      width: 100%;
      background: @border-color;
      border-radius: 4px;
    }
    span {
      font-size: 16px;
      color: @subdominant-font-color;
      float: right;
      margin-top: 11px;
    }
  }
  // 分享部分
  .bgc {
    width: 311px;
    height: 553px;
    background: url('../../assets/bj.png');
    background-size: cover;
    text-align: center;
    padding: 13px;
    p {
      font-size: 12px;
      font-weight: 500;
      color: #ffffff;
      letter-spacing: 5px;
      margin-bottom: 10px;
    }
    .paper {
      width: 100%;
      height: 500px;
      background: #ffffff;
      border-radius: 8px;
      padding: 15px;
      .title {
        font-size: 16px;
        font-weight: 600;
        text-align: left;
        color: #181a39;
        margin-bottom: 10px;
      }
      .user {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        img {
          margin-right: 5px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
        }
        span {
          font-size: 12px;
          font-weight: 600;
          color: #545671;
        }
      }
      .content {
        height: 186px;
        position: relative;
        font-size: 14px;
        color: #181a39;
        overflow: hidden;
        margin-bottom: 5px;
        .mask {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 34px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.87),
            #ffffff
          );
        }
      }
      .logo {
        margin-bottom: 25px;
        img {
          width: 120px;
          height: 36px;
        }
      }
      .code {
        margin-bottom: 15px;
        img {
          width: 72px;
          height: 72px;
        }
      }
      p {
        font-size: 14px;
        text-align: center;
        color: #b4b4bd;
      }
    }
  }
  .share-img {
    img {
      width: 311px;
      height: 553px;
      display: block;
    }
  }
}
</style>
