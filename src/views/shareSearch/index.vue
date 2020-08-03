<template>
  <div class="shareSearch">
    <!--  吸顶 -->
    <van-sticky>
      <div class="top">
        <navbar title="面试技巧"></navbar>
        <div class="inputsearch">
          <van-search
            v-model="inputValue"
            shape="round"
            clearable
            placeholder="请输入搜索关键词"
            @search="search"
            @clear="isShow = false"
            ref="input"
          >
            <template #left-icon>
              <i class="iconfont iconicon_search"></i>
            </template>
          </van-search>
        </div>
      </div>
    </van-sticky>

    <div class="search" v-if="!isShow">
      <div class="everyonesearch">
        <div class="hearder"><span>大家都在搜</span></div>
        <div
          @click="tagClick(item)"
          v-for="(item, index) in everyonesearchValue"
          :key="index"
          class="tag"
        >
          {{ item }}
        </div>
      </div>
      <div class="history">
        <div class="hearder">
          <span>历史搜索</span
          ><span @click="clearHistory" class="clear">清空</span>
        </div>
        <div
          @click="tagClick(item)"
          v-for="(item, index) in historyValue"
          :key="index"
          class="tag"
          ref="historyTag"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="searchres" v-if="isShow">
      <shareItem :shareList="searchList"></shareItem>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
import { shareTopSearch, shareList } from '@/api/find.js'
import { getToken } from '@/utils/local.js'
export default {
  name: 'shareSearch',
  data () {
    return {
      inputValue: '',
      historyValue: [],
      everyonesearchValue: [],
      searchList: [],
      isShow: false
    }
  },
  methods: {
    // 清空历史纪录
    clearHistory () {
      this.historyValue = []
    },
    //
    tagClick (item) {
      this.inputValue = item
      this.search()
      // this.$refs.input.focus()
    },
    search () {
      // 非空判断  push到数组中
      if (this.inputValue !== '') {
        if (this.historyValue.indexOf(this.inputValue) === -1) {
          this.historyValue.push(this.inputValue)
        }
        if (this.historyValue.length >= 5) {
          this.historyValue.shift()
        }
        // 调用接口
        shareList({ q: this.inputValue }).then(res => {
          // console.log(111)
          res.data.list.forEach(v => {
            v.author.avatar = process.env.VUE_APP_URL + v.author.avatar
            v.title = v.title.replace(
              this.inputValue,
              `<span>${this.inputValue}</span>`
            )
          })
          this.searchList = res.data.list
          this.isShow = true
        })
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    shareTopSearch().then(res => {
      // console.log('shareTopSearch', res)
      this.everyonesearchValue = res.data
    })
    // 是否有TOKEN
    if (getToken()) {
      if (this.userInfo) {
        this.historyValue = this.userInfo.history.share
      } else {
        getUserInfo().then(res => {
          console.log('res', res.data.history.share)
          this.historyValue = res.data.history.share
        })
      }
    }
  }
  // mounted () {
  //   this.$refs.input.focus()
  // }
}
</script>

<style lang="less">
.shareSearch {
  height: 100vh;
  background-color: #fff;
  font-family: PingFangSC, PingFangSC-Medium;
  .top {
    box-shadow: 0px 2px 4px 0px rgba(24, 26, 57, 0.04);
    background-color: #fff;
    .inputsearch {
      padding: 0 15px 11px 15px;

      .van-search {
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
    .hearder {
      display: flex;
      justify-content: space-between;
      span {
        padding: 18px 0;
        font-size: 18px;
        font-weight: 600;
        color: #222222;
      }

      .clear {
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
  .searchres {
    padding: 0 15px;
  }
}
</style>
