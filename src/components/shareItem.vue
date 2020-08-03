<template>
  <div class="shareItem">
    <div
      class="item van-hairline--bottom"
      v-for="item in shareList"
      :key="item.id"
    >
      <h3 v-html="item.title"></h3>
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
</template>

<script>
export default {
  name: 'shareItem',
  props: ['shareList'],
  data () {
    return {}
  }
}
</script>

<style lang="less">
.shareItem {
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
      span {
        color: @main-color;
      }
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
</style>
