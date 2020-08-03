<template>
  <div class="share">
    <van-sticky>
      <div class="top">
        <navbar title="面试技巧"></navbar>
        <div class="search">
          <van-field
            class="iconfont search"
            input-align="center"
            v-model="inputValue"
            :placeholder="icon"
            @click="$router.push('/shareSearch')"
          />
        </div>
      </div>
    </van-sticky>

    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <shareItem :shareList="shareList"></shareItem>
      </van-list>
    </div>
  </div>
</template>

<script>
import { shareList } from '@/api/find.js'
export default {
  name: 'share',
  data () {
    return {
      inputValue: '',
      icon: '\ue647 请输入关键字',
      shareList: [],
      loading: false,
      finished: false,
      start: 0,
      limit: 5
    }
  },
  methods: {
    onLoad () {
      shareList({ start: this.start, limit: this.limit }).then(res => {
        // console.log('shareList', res)
        res.data.list.forEach(v => {
          v.author.avatar = process.env.VUE_APP_URL + v.author.avatar
        })
        this.shareList.push(...res.data.list)
        // 第二次从上次的条数向下获取
        this.start += this.limit
        // 判断当前的列表是否为最大
        if (this.shareList.length >= res.data.total) {
          // 结束
          this.finished = true
        }
        // 结束加载状态
        this.loading = false
      })
    }
  },
  created () {
    // this.getData({ limit: 10 })
  }
}
</script>

<style lang="less">
.share {
  height: 100vh;
  background-color: #fff;
  .top {
    box-shadow: 0px 2px 4px 0px rgba(24, 26, 57, 0.04);
    background-color: #fff;
    .search {
      padding: 0 15px 11px 15px;
      .van-field {
        height: 34px;
        background: #f7f4f5;
        border-radius: 17px;
        font-size: 14px;
        text-align: left;
        color: #b3b3b3;
        line-height: 35px;
      }
    }
  }
  .list {
    padding: 0 15px;
  }
}
</style>
