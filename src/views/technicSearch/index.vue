<template>
  <div class="technicSearch">
    <div class="top">
      <navbar title="面试技巧"></navbar>
      <div class="search">
        <van-field v-model="inputValue">
          <template #left-icon>
            <i class="iconfont iconicon_search"></i> </template
        ></van-field>
      </div>
    </div>
    <div class="everyonesearch">
      <mycell title="大家都在搜"></mycell>
      <div class="tag">架构师的面试</div>
      <div class="tag">架构师的面试</div>
    </div>
    <div class="history">
      <mycell title="历史搜索" value="清空"></mycell>
      <div class="tag">架构师的面试</div>
      <div class="tag">架构师的面试</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'technicSearch',
  data () {
    return {
      inputValue: ''
    }
  }
}
</script>

<style lang="less">
.technicSearch {
  height: 100vh;
  background-color: #fff;
  font-family: PingFangSC, PingFangSC-Medium;
  .top {
    box-shadow: 0px 2px 4px 0px rgba(24, 26, 57, 0.04);
    .search {
      padding: 0 15px 11px 15px;

      .van-field {
        display: flex;
        align-items: center;
        height: 34px;
        background: #f7f4f5;
        border-radius: 17px;
        font-size: 14px;
        text-align: left;
        color: #b3b3b3;
        line-height: 35px;
        .van-field__left-icon {
          i {
            font-size: 19px;
            padding-bottom: 10px;
          }
        }
      }
    }
  }
  .history,
  .everyonesearch {
    padding: 0 15px;
    margin-bottom: 20px;
    .my-cell {
      padding: 18px 0;
      font-size: 18px;
      font-weight: 600;
      color: #222222;
      .left,
      .iconicon_more {
        display: none;
      }
      .van-cell__value {
        font-size: 12px;
        font-weight: 400;
        color: #545671;
      }
    }
    .tag {
      display: inline-block;
      margin-right: 10px;
      background: #f7f4f5;
      border-radius: 8px;
      padding: 8px 11px;
      font-size: 12px;
      color: #545671;
    }
  }
}
</style>
