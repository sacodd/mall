<template>
  <swiper>
      <swiper-item v-for="item in banners" :key="item.acm">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/common/swiper'

export default {
  data() {
    return {
      isEmit: false
    }
  },
  props: {
    banners: Array,
    default() {
      return []
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    swiperLoad() {
      if(!this.isEmit) {
        this.$emit('swiperLoad')
        this.isEmit = true
      }
    }
  }
}
</script>

<style>

</style>