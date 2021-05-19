<template>
  <div v-if="Object.keys(goods) != 0">
    <div class="detail-goods-title">{{goods.title}}</div>
    <div>
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services">
      <span v-for="index in goods.services.length - 1" :key="index">
        <img v-if="goods.services[index - 1].icon" :src="goods.services[index - 1].icon" alt="">
        <span>{{goods.services[index - 1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style>
  .detail-goods-title {
    font-size: 20px;
    padding: 15px 8px;
    color: #222;
  }

  .new-price {
    color: var(--color-high-text);
    padding: 0 8px;
    font-size: 22px;
  }

  .old-price {
    color: #aaa;
    text-decoration: line-through;
    font-size: 13px;
  }

  .discount {
    position: relative;
    bottom: 4px;
    margin-left: 5px;
    border-radius: 10px;
    color: #fff;
    font-size: 15px;
    background-color: var(--color-high-text);
  }

  .info-other {
    display: flex;
    justify-content: space-between;
    margin: 18px 8px;
    height: 25px;
    font-size: 14px;
    color: #aaa;
    border-bottom: 1px solid rgba(100, 100, 100, .2);
  }

  .info-services{
    display: flex;
    justify-content: space-between;
    padding: 2px 8px 20px;
    font-size: 14px;
    color: #444;
    border-bottom: 4px solid rgba(0, 0, 0, .05);
  }

  .info-services img {
    height: 12px;
    width: 12px;
  }
</style>