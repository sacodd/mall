<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImg" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
import emitter from '@/components/common/mitt/Mitt'

export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImg() {
      // return this.goodsItem.show ? this.goodsItem.show.img : this.goodsItem.image
      if(this.goodsItem.show) {
        return this.goodsItem.show.img
      } else if(this.goodsItem.image) {
        return this.goodsItem.image
      } else {
        return this.goodsItem.img
      }
    }
  },
  methods: {
    imgLoad() {
      // 通过mitt插件实现事件总线的事件传递
      if(this.$route.path.indexOf('/home') != -1) {
        emitter.emit('imgLoad')
      } else if(this.$route.path.indexOf('/category') != -1) {
        emitter.emit('categoryLoad')
      }else if(this.$route.path.indexOf('/detail') != -1) {
        emitter.emit('detailImgLoad')
      }
    },
    itemClick() {
      this.$router.push({
        path: '/detail',
        query: {
          iid: this.goodsItem.iid
        }
      })
    }
  }
}
</script>

<style>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 47%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 15px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>