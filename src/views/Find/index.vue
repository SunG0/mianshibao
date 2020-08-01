<template>
  <div class="find">
    <div class="top">
      发现
    </div>
    <div class="content">
      <div class="skill">
        <mycell title="面试技巧" value="查看更多"></mycell>
        <div class="technicList">
          <technicItem
            v-for="item in technicList"
            :key="item.id"
            :title="item.title"
            :time="item.created_at | formatTime"
            :read="item.read"
            :star="item.star"
            :cover="item.cover"
          ></technicItem>
        </div>
      </div>
      <div class="data">
        <mycell title="市场数据" value="查看更多"></mycell>
        <div class="tag">
          <span>{{ hotData.city }}</span>
        </div>
        <div class="tag">
          <span>{{ hotData.position }}</span>
        </div>
        <div class="hot_data">
          <div class="item" v-for="(item, index) in hotList" :key="index">
            <div class="year">{{ item.year }}</div>
            <div class="box">
              <div
                class="percent"
                :style="{
                  width:
                    ((item.salary / hotData.topSalary) * 100).toFixed(1) + '%'
                }"
              >
                ￥{{ item.salary }}
              </div>
            </div>
            <div class="upDown">
              <i
                class="iconfont"
                :class="{
                  iconicon_shangsheng: item.percent > 0,
                  iconicon_xiajiang: item.percent < 0
                }"
              ></i>
              {{ item.percent }} <span v-if="item.percent">%</span>
            </div>
          </div>
        </div>
        <div class="more" @click="Unfold">
          展开更多
          <i
            class="iconfont iconicon_zhankai"
            :class="{ rotate: isUnfold }"
          ></i>
        </div>
      </div>
      <div class="share">
        <mycell title="面经分享" value="查看更多"></mycell>
        <div
          class="item van-hairline--bottom"
          v-for="item in shareList"
          :key="item.id"
        >
          <h3>
            {{ item.title }}
          </h3>
          <p>
            {{ item.content }}
          </p>
          <div class="detil">
            <div class="user">
              <img :src="item.author.avatar" alt="" />
              <div class="username">{{ item.author.nickname }}</div>
            </div>
            <div class="time">{{ item.created_at | formatTime }}</div>
            <div class="comment">
              <i class="iconfont iconicon_pinglunliang"></i
              >{{ item.article_comments }}
            </div>
            <div class="star">
              <i class="iconfont iconbtn_dianzan_small_nor"></i>{{ item.star }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { technicList, shareList, hotData } from '@/api/find.js'
import moment from 'moment'
export default {
  name: 'find',
  filters: {
    formatTime (value) {
      return moment(value).format('YYYY/MM/DD')
    }
  },
  data () {
    return {
      technicList: [],
      hotData: {},
      hotList: [],
      shareList: [],
      isUnfold: false
    }
  },
  methods: {
    // 展开显示
    Unfold () {
      this.isUnfold = !this.isUnfold
      if (this.isUnfold === true) {
        this.hotList = this.hotData.yearSalary
      } else {
        this.hotList = this.hotData.yearSalary.slice(0, 4)
      }
    },
    // 获取数据
    getData () {
      technicList().then(res => {
        // console.log('technicList', res)
        res.data.list.forEach(v => {
          v.cover = process.env.VUE_APP_URL + v.cover
        })
        this.technicList = res.data.list
      })
      shareList().then(res => {
        // console.log('shareList', res)
        res.data.list.forEach(v => {
          v.author.avatar = process.env.VUE_APP_URL + v.author.avatar
        })
        this.shareList = res.data.list
      })
      hotData().then(res => {
        console.log('hotData', res)
        res.data.yearSalary = res.data.yearSalary.reverse()
        res.data.yearSalary.forEach(v => {
          v.year = v.year.split('年')[0]
        })
        this.hotData = res.data
        this.hotList = res.data.yearSalary.slice(0, 4)
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="less">
.find {
  .top {
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(24, 26, 57, 0.04);
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: #222222;
  }
  .content {
    font-family: PingFangSC, PingFangSC-Medium;
    margin-top: 1px;
    .van-cell {
      padding: 0;
      i.left {
        margin-right: 0px;
      }
      .van-cell__title {
        font-size: 18px;
        font-weight: 500;
        color: #222222;
      }
      .van-cell__value {
        font-size: 14px;
        font-weight: 400;
        color: #5b5d75;
      }
    }
    .skill {
      background: #ffffff;
      padding: 0 15px;
    }
    .data {
      background: #ffffff;
      margin: 10px 0;
      padding: 0 15px;
      .tag {
        display: inline-block;
        height: 24px;
        margin-right: 10px;
        padding: 0 5px;
        background: #eceaea;
        border-radius: 4px;
        line-height: 24px;
        font-size: 14px;
        text-align: center;
        color: #545671;
        margin-bottom: 20px;
      }
      .hot_data {
        .item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          .year {
            font-size: 14px;
            color: #75757a;
            // margin-right: 10px;
            width: 50px;
          }
          .box {
            flex: 1;
            height: 12px;
            background: #ebdfdf;
            border-radius: 4px;
            margin-right: 10px;
            .percent {
              // width: 50%;
              height: 12px;
              background: #fe6d67;
              border-radius: 4px;
              color: #fff;
              text-align: right;
              font-size: 12px;
              padding-right: 10px;
            }
          }
          .upDown {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #5b5d75;
            width: 45px;
            justify-content: space-between;
            i {
              font-size: 16px;
              &.iconicon_xiajiang {
                color: @error-color;
              }
              // 箭头上
              &.iconicon_shangsheng {
                color: @success-color;
              }
            }
          }
        }
      }
      .more {
        display: flex;
        justify-content: center;
        font-size: 12px;
        color: @subdominant-font-color;
        align-items: center;
        padding-bottom: 20px;
        i {
          color: @minor-font-color;
          font-size: 14px;
        }
        .rotate {
          transform: rotate(180deg);
        }
      }
    }
    .share {
      background: #ffffff;
      padding: 0 15px;
      .item {
        padding-bottom: 25px;
        h3 {
          font-size: 16px;
          margin: 15px 0;
          color: #181a39;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          /* 弹性伸缩盒子模型显示 */
          display: -webkit-box;
          /* 限制在一个块元素显示的文本的行数 */
          -webkit-line-clamp: 2;
          /* 设置或检索伸缩盒对象的子元素的排列方式 */
          -webkit-box-orient: vertical;
        }
        p {
          font-size: 13px;
          margin-bottom: 15px;
          color: #545671;
          overflow: hidden;
          text-overflow: ellipsis;
          /* 弹性伸缩盒子模型显示 */
          display: -webkit-box;
          /* 限制在一个块元素显示的文本的行数 */
          -webkit-line-clamp: 2;
          /* 设置或检索伸缩盒对象的子元素的排列方式 */
          -webkit-box-orient: vertical;
          line-height: 19px;
        }
        .detil {
          display: flex;
          align-items: center;
          .user {
            flex: 1;
            display: flex;
            align-items: center;
            img {
              margin-right: 8px;
              display: block;
              width: 22px;
              height: 22px;
              border-radius: 50%;
            }
            .username {
              font-size: 12px;
              color: #545671;
            }
          }
          .time {
            font-size: 12px;
            margin-right: 15px;
            color: #b4b4bd;
          }
          .comment {
            font-size: 12px;
            color: #b4b4bd;
            margin-right: 15px;
            display: flex;
            align-items: center;
            i {
              margin-right: 5px;
            }
          }
          .star {
            font-size: 12px;
            color: #b4b4bd;
            display: flex;
            align-items: center;
            i {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
