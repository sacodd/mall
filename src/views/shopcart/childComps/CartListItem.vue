<template>
  <div class="cart-item">
    <check-button class="cart-check" :isCheck="item.checked" @click="checkClick"></check-button>
    <div class="cart-item-left">
      <img :src="item.img" alt="">
    </div>
    <div class="cart-item-right">
      <div class="cart-title">{{item.title}}</div>
      <div class="cart-desc">{{item.desc}}</div>
      <div class="cart-bottom">
        <div class="item-price">￥{{item.price}}</div>
        <div class="item-count">×{{item.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'

export default {
  components: {
    CheckButton
  },
  emits:['click'],
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created() {
    console.log(this.item);
  },
  methods: {
    checkClick() {
      this.item.checked = !this.item.checked
    }
  }
}
</script>

<style>
  .cart-item {
    width: 100%;
    padding: 8px 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
  }

  .cart-item-left img {
    width: 80px;
    height: 110px;
    border-radius: 5px;
    margin: 0 15px 0 10px;
  }

  .cart-item-right {
    overflow: hidden;
    position: relative;
  }

  .cart-title,
  .cart-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-bottom: 18px;
  }

  .cart-title {
    font-size: 24px;
  }

  .cart-bottom {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    font-size: 20px;
  }

  .item-price {
    float: left;
    color: orangered;
  }

  .item-count {
    float: right;
  }
</style>