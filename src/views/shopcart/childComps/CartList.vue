<template>
  <div class="cart-list">
    <scroll class="cart-wrapper" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll'

import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'

export default {
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }

  .cart-wrapper {
    height: 100%;
    overflow: hidden;
  }
</style>