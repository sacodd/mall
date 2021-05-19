<template>
  <div v-if="Object.keys(commentInfo) != 0" class="comment-info">
    <div class="comment-header">
      <div>用户评价</div>
      <div>更多</div>
    </div>
    <div class="comment-main">
      <div class="comment-user">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div>{{commentInfo.content}}</div>
      <div class="comment-message">
        <span>{{showTime}}</span>
        <span>{{commentInfo.style}}</span>
      </div >
      <div class="comment-img">
        <img :src="item" alt="" v-for="(item, index) in commentInfo.images" :key="index" >
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from '@/common/utils'

export default {
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showTime() {
      // 先将时间戳转换为Date对象
      const date = new Date(this.commentInfo.created * 1000)
      // 将date进行格式化
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style>
  .comment-info {
    padding: 0 15px 35px;
    border-bottom: 5px solid #eee;
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 2px solid #eee;
    font-size: 19px;
    color: #000;
  }

  .comment-user {
    height: 80px;
  }

  .comment-user img {
    margin-top: 15px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

  .comment-user span {
    position: relative;
    left: 10px;
    top: -16px;
    font-size: 18px;
    font-weight: 700;
  }

  .comment-message {
    margin: 10px 0;
    color: #ccc;
    font-size: 14px;
  }

  .comment-message :first-child {
    margin-right: 10px;
  }

  .comment-img img {
    margin: 2px;
    width: 120px;
    height: 120px;
  }
</style>