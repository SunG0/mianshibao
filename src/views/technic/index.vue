<template>
  <div class="technic">
    <van-sticky>
      <div class="top">
        <navbar title="面试技巧"></navbar>
        <div class="search">
          <van-field
            class="iconfont search"
            input-align="center"
            v-model="inputValue"
            :placeholder="icon"
            @click="$router.push('/technicSearch')"
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
        <technicItem :technicList="technicList"></technicItem>
      </van-list>
    </div>
  </div>
</template>

<script>
import { technicList } from '@/api/find.js'
export default {
  name: 'technic',
  data () {
    return {
      inputValue: '',
      icon: '\ue647 请输入关键字',
      technicList: [],
      loading: false,
      finished: false,
      start: 0,
      limit: 5
    }
  },
  methods: {
    onLoad () {
      technicList({ start: this.start, limit: this.limit }).then(res => {
        // console.log('technicList', res)
        res.data.list.forEach(v => {
          v.cover = process.env.VUE_APP_URL + v.cover
        })
        this.technicList.push(...res.data.list)
        // 第二次从上次的条数向下获取
        this.start += this.limit
        // 判断当前的列表是否为最大
        if (this.technicList.length >= res.data.total) {
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
.technic {
  height: 100vh;
  background-color: #fff;
  .top {
    box-shadow: 0px 2px 4px 0px rgba(24, 26, 57, 0.04);
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
