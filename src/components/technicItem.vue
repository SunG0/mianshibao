<template>
  <div class="technicItem">
    <div class="forItem" v-for="item in technicList" :key="item.id">
      <div class="left">
        <h3 v-html="item.title"></h3>
        <div class="detil">
          <div class="time">
            {{ item.created_at | formatTime }}
          </div>
          <div class="read">
            <i class="iconfont iconicon_liulanliang"></i>{{ item.read }}
          </div>
          <div class="star">
            <i
              class="iconfont iconicon_dianzanliang
"
            ></i
            >{{ item.star }}
          </div>
        </div>
      </div>
      <div class="cover" v-if="item.cover">
        <img :src="item.cover" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'technicItem',
  props: ['technicList'],
  data () {
    return {}
  }
}
</script>

<style lang="less">
.technicItem {
  .forItem {
    font-family: PingFangSC, PingFangSC-Medium;
    display: flex;
    align-items: center;
    margin-top: 20px;
    padding-bottom: 10px;
    .left {
      flex: 1;
      margin-right: 10px;
      h3 {
        overflow: hidden;
        text-overflow: ellipsis;
        /* 弹性伸缩盒子模型显示 */
        display: -webkit-box;
        /* 限制在一个块元素显示的文本的行数 */
        -webkit-line-clamp: 2;
        /* 设置或检索伸缩盒对象的子元素的排列方式 */
        -webkit-box-orient: vertical;
        font-size: 16px;
        font-weight: 500;
        color: #181a39;
        font-size: 16px;
        height: 52px;
        line-height: 23px;
        span {
          color: @main-color;
        }
      }
      .detil {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #b4b4bd;
        margin-top: 5px;
        .time {
          flex: 1;
        }
        .read {
          margin-right: 20px;
          i {
            font-size: 16px;
            margin-right: 5px;
          }
        }
        .star {
          i {
            font-size: 16px;
            margin-right: 5px;
          }
        }
      }
    }
    .cover {
      img {
        width: 113px;
        height: 75px;
        border-radius: 8px;
      }
    }
  }
}
</style>
