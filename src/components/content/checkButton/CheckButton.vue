<template>
  <div class="check-button" :class="{check: isCheck}">
    <img src="../../../assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  props: {
    isCheck: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style>
  .check-button {
    height: 20px;
    width: 20px;
    border-radius: 10px;
    border: 2px solid #aaa;
  }

  .check-button img {
    width: 15px;
  }

  .check {
    background-color: pink;
    border-color: pink
  }
</style>