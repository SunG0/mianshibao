<template>
  <div class="my">
    <div class="top">
      <div class="header"></div>
      <div class="user">
        <div class="user_info">
          <div>
            <div class="username">Orange_Jc</div>
            <div class="userstyle">面试不求人，我有面试宝</div>
          </div>
          <div class="image">
            <img src="@/assets/user.png" alt="" />
          </div>
        </div>
        <ul>
          <li>
            <p>666</p>
            <p>累计答题</p>
          </li>
          <li>
            <p>666</p>
            <p>收藏题目</p>
          </li>
          <li>
            <p>666</p>
            <p>我的错题</p>
          </li>
          <li>
            <p>66%</p>
            <p>正确率</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="userdata">
        <div class="myjob">
          <!-- <div class="left">
            <i class="iconfont iconicon_mine_gangwei"></i>
            <span>我的岗位</span>
          </div>
          <div class="right">
            <span>产品经理</span>
            <i class="iconfont iconicon_more"></i>
          </div> -->
          <van-cell-group>
            <mycell
              title="我的岗位"
              value="产品经理"
              icon="iconicon_mine_gangwei"
            ></mycell>
          </van-cell-group>
        </div>
        <div class="experience_data">
          <h3>面经数据</h3>
          <ul>
            <li>
              <p>昨日阅读<span>+300</span></p>
              <p>17</p>
              <p>阅读总数</p>
            </li>
            <li>
              <p>昨日获赞<span>+300</span></p>
              <p>297</p>
              <p>获赞总数</p>
            </li>
            <li>
              <p>昨日新增<span>+300</span></p>
              <p>17</p>
              <p>评论总数</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="userlist">
        <van-cell-group>
          <mycell
            title="我的面经分享"
            value="23"
            icon="iconicon_mine_mianjing"
            @click="cellClick"
          ></mycell>
          <mycell
            title="我的消息"
            value="23"
            icon="iconicon_mine_xiaoxi"
          ></mycell>
          <mycell
            title="收藏的题库"
            value="23"
            icon="iconicon_mine_tikushoucang"
          ></mycell>
          <mycell
            title="收藏的企业"
            value="23"
            icon="iconicon_mine_qiyeshoucang"
          ></mycell>
          <mycell
            title="我的错题"
            value="23"
            icon="iconicon_mine_cuoti"
          ></mycell>
          <mycell
            title="收藏的面试经验"
            value="23"
            icon="iconbtn_shoucang_sel"
          ></mycell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import mycell from './mycell'
export default {
  name: 'my',
  components: {
    mycell
  },
  methods: {
    cellClick () {
      console.log('click')
    }
  }
}
</script>

<style lang="less">
.my {
  font-family: PingFangSC, PingFangSC-Semibold;
  .top {
    width: 100%;
    height: 260px;
    background: linear-gradient(45deg, #ce0031, #b8002c);
    .header {
      height: 44px;
    }
    .user {
      color: #ffffff;
      .user_info {
        display: flex;
        justify-content: space-between;
        padding: 15px 30px 50px 30px;
        .username {
          // width: 85px;
          // height: 30px;
          font-size: 21px;
          font-weight: 600;
          margin-bottom: 6px;
          // line-height: 30px;
        }
        .userstyle {
          // width: 146px;
          // height: 17px;
          opacity: 0.7;
          font-size: 12px;
          font-weight: 400;
          // line-height: 17px;
        }
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.38);
        }
      }
      ul {
        display: flex;
        justify-content: space-around;
        text-align: center;
        li p:nth-child(1) {
          font-size: 21px;
          font-weight: 700;
          margin-bottom: 6px;
        }
        li p:nth-child(2) {
          font-size: 12px;
          font-weight: 400;
          opacity: 0.7;
        }
      }
    }
  }
  .content {
    .userdata {
      .myjob {
        width: 345px;
        margin: -40px auto;
      }
      .experience_data {
        margin: 50px auto 0;
        width: 345px;
        height: 143px;
        background: #ffffff;
        border-radius: 8px;
        h3 {
          font-size: 14px;
          font-weight: 600;
          color: #181a39;
          padding: 20px 0 20px 15px;
        }
        ul {
          display: flex;

          li {
            flex: 1;
            text-align: center;
            p:nth-child(1) {
              font-size: 10px;
              font-weight: 400;
              text-align: center;
              color: #b4b4bd;
              span {
                color: #1fc1d9;
              }
            }
            p:nth-child(2) {
              font-size: 21px;
              font-weight: 700;
              text-align: center;
              color: #181a39;
              margin: 10px 0 6px;
            }
            p:nth-child(3) {
              font-size: 12px;
              font-weight: 400;
              text-align: center;
              color: #545671;
            }
          }
        }
      }
    }
    .userlist {
      width: 345px;
      // height: 322px;
      margin: 10px auto;
    }
    .van-cell-group {
      border-radius: 8px;
      overflow: hidden;
    }
  }
}
</style>
