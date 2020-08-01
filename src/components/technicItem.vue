<template>
  <div class="technicItem">
    <div class="left">
      <h3>
        {{ title }}
      </h3>
      <div class="detil">
        <div class="time">
          {{ time }}
        </div>
        <div class="read">
          <i class="iconfont iconicon_liulanliang"></i>{{ read }}
        </div>
        <div class="star">
          <i
            class="iconfont iconicon_dianzanliang
"
          ></i
          >{{ star }}
        </div>
      </div>
    </div>
    <div class="cover" v-if="cover">
      <img :src="cover" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'technicItem',
  props: ['title', 'time', 'read', 'star', 'cover'],
  data () {
    return {
      timeAfter: ''
    }
  }
}
</script>

<style lang="less">
.technicItem {
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
</style>
