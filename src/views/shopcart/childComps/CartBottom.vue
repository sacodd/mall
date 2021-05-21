<template>
  <div class="cart-bottom">
    <div class="bottom-check">
      <check-button :isCheck="allCheck" @click="allCilick"></check-button>
      <div>全选</div>
    </div>
    <div>合计：￥{{totalPrice}}</div>
    <div class="bottom-to-shop">结算({{totalNum}})</div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'

export default {
  data() {
    return {
      checked: null
    }
  },
  emits:['click'],
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((pre, item) => {
        return pre + item.price * item.count
      }, 0).toFixed(2)
    },
    totalNum() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    allCheck() {
      return !this.$store.state.cartList.some(item => !item.checked)
    }
  },
  methods: {
    allCilick() {
      this.checked = !this.allCheck
      this.$store.state.cartList.map(item => item.checked = this.checked)
    }
  }
}
</script>

<style>
  .cart-bottom {
    height: 40px;
    margin-bottom: 44px;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .bottom-check {
    width: 60px;
    height: 20px;
    margin: 0 8px;
    display: flex;
  }

  .bottom-to-shop {
    height: 40px;
    width: 100px;
    line-height: 40px;
    text-align: center;
    background-color: pink;
    color: #fff;
  }
</style>