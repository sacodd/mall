<template>
  <div v-if="Object.keys(shop) != 0" class="detail-shop">
    <div class="shop-base">
      <div class="shop-log"><img :src="shop.log" alt=""></div>
      <span>{{shop.name}}</span>
    </div>
    <div class="shop-other">
      <div class="shop-count">
        <div>
          <div class="shop-count-num">{{showFans}}</div>
          <div>总销量</div>
        </div>
        <div class="shop-count-second">
          <div class="shop-count-num">{{shop.goodsCount}}</div>
          <div>全部宝贝</div>
        </div>
      </div>
      <div class="shop-space"></div>
      <div class="shop-sell">
        <div v-for="(item, index) in shop.sells" :key="index" class="shop-sell-item">
          <div>
            <span>{{item.name}}</span>
            <span :style="item.isBetter? 'color:red' : 'color: lightgreen'">{{item.score}}</span>
          </div>
          <span v-if="item.isBetter" class="shop-better">高</span>
          <span v-else class="shop-nobetter">低</span>
        </div>
      </div>
    </div>
    <div class="shop-bottom">
        <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showFans() {
      return this.shop.fans > 10000 ? (this.shop.fans / 10000).toFixed(1) + '万' : this.shop.fans
    }
  }
}
</script>

<style>
  .detail-shop {
    padding: 30px 8px;
  }

  .shop-base {
    display: flex;
    line-height: 54px;
    font-size: 18px;
  }

  .shop-log {
    width: 54px;
    height: 54px;
    border: 3px solid rgba(100, 100, 100, .1);
    border-radius: 27px;
    overflow: hidden;
    margin-right: 10px;
  }

  .shop-base img {
    width: 50px;
    height: 50px;
  }

  .shop-other {
    display: flex;
    justify-content: space-evenly;
    margin: 50px 8px 10px; 
  }

  .shop-count {
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    font-size: 15px;
  }

  .shop-count-num {
    margin-bottom: 5px;
    font-size: 18px;
  }

  .shop-count-second {
    margin-left: 20px;
  }

  .shop-space {
    width: 1px;
    height: 45px;
    background-color: #ccc;
  }

  .shop-sell {
    position: relative;
    bottom: 18px;
  }

  .shop-sell-item {
    margin-bottom: 10px;
    display: flex;
  }

  .shop-sell-item div {
    width: 110px;
  }

  .shop-sell-item span {
    margin-right: 5px;
  }

  .shop-better {
    background-color: red;
    color: #fff;
  }

  .shop-nobetter {
    background-color: lightgreen;
    color: #fff;
  }

  .shop-bottom {
    position: relative;
    left: calc(50% - 60px);
    height: 40px;
    width: 120px;
    text-align: center;
    background-color: #bbb;
    line-height: 40px;
    border-radius: 20px;
    color: #fff;
  }
</style>