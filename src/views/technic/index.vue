<template>
  <div class="technic">
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
    <div class="list">
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
</template>

<script>
import { technicList } from '@/api/find.js'
export default {
  name: 'technic',
  data () {
    return {
      inputValue: '',
      icon: '\ue647 请输入关键字',
      technicList: ''
    }
  },
  methods: {
    getData (params) {
      technicList(params).then(res => {
        // console.log('technicList', res)
        res.data.list.forEach(v => {
          v.cover = process.env.VUE_APP_URL + v.cover
        })
        this.technicList = res.data.list
      })
    }
  },
  created () {
    this.getData({ limit: 10 })
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
