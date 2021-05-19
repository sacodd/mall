<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item,index) in swiper" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper'

export default {
  components: {
    Swiper, 
    SwiperItem
  },
  props: {
    swiper: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .detail-swiper {
    height: 400px;
    overflow: hidden;
  }
</style>