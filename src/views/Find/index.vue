<template>
  <div class="find">
    <div class="top">
      发现
    </div>
    <div class="content">
      <div class="skill">
        <mycell title="面试技巧" value="查看更多"></mycell>
        <div class="item">
          <!-- <van-row>
            <van-col span="16">12</van-col>
            <van-col span="8">
              <img src="@/assets/user.png" alt="" />
            </van-col>
          </van-row> -->
          <div class="left"></div>
          <div class="right">
            <img src="" alt="" />
          </div>
        </div>
      </div>
      <div class="data">
        <mycell title="市场数据" value="查看更多"></mycell>
      </div>
      <div class="share">
        <mycell title="面经分享" value="查看更多"></mycell>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'find',
  data () {
    return {}
  },
  methods: {},
  created: {}
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
    padding: 0 15px;
    background: #ffffff;
    .van-cell {
      font-family: PingFangSC, PingFangSC-Medium;
      padding: 0;
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
      margin-top: 1px;
      img {
        width: 100%;
        height: 75px;
      }
    }
    .data {
      margin: 10px 0;
    }
  }
}
</style>
