<template>
  <div class="cart">
    <nav-bar class="cart-nav-bar">
      <template #center>
        <div>购物车({{cartLength}})</div>
      </template>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom></cart-bottom>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottom from './childComps/CartBottom'

import { mapGetters } from 'vuex'

export default {
  name: 'ShopCart',
  components: {
    NavBar,
    CartList,
    CartBottom
  },
  computed: {
    ...mapGetters(['cartLength', 'cartList'])
  }
}
</script>

<style>
  .cart {
    height: 100vh;
  }

  .cart-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 20px;
    position: relative;
    z-index: 9;
  }
</style>