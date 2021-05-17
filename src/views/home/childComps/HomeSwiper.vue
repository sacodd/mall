<template>
  <swiper>
      <swiper-item v-for="item in banners" :key="item.acm">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/common/swiper'

export default {
  props: {
    banners: Array,
    default() {
      return []
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style>

</style>