<template>
  <div class="bottom-bar">
    <div class="bar-left">
      <div>
        <i class="icon icon-left"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="icon icon-center"></i>
        <span>店铺</span>
      </div>
      <div>
        <i class="icon icon-right"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bar-right">
      <div class="enter-cart" @click="addCart">加入购物车</div>
      <div class="detail-buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style>
  .bottom-bar {
    width: 100%;
    height: 55px;
    position: fixed;
    bottom: 0;
    z-index: 10;
    background-color: #fff;

    display: flex;
    text-align: center;
  }

  .bar-left, .bar-right {
    flex: 1;
    display: flex;
  }

  .bar-left>div {
    flex: 1;
  }

  .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 6px auto 5px;
    background: url("../../../assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .icon-left {
    background-position: 0 -53px;
  }

  .icon-center {
    background-position: 0 -98px;
  }

  .bar-right>div {
    flex: 1;
    line-height: 55px;
  }

  .enter-cart {
    background-color: #ffe817;
    color: #333;
  }

  .detail-buy {
    background-color: #f69;
    color: #fff;
  }
</style>