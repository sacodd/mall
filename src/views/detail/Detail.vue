<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="detail-wrapper" ref="scroll" :probeType="3" @scrollPos="scrollPos">
      <detail-swiper :swiper="topSwiper"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-info :detailInfo="detailInfo" @detailImgLoad="detailImgLoad"></detail-info>
      <detail-item-params :itemParams="itemParams" ref="param"></detail-item-params>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <back-top @click="backClick" v-show="isShow"></back-top>
    <toast :message="message" :isShow="toastShow"></toast>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailInfo from './childComps/DetailInfo'
import DetailItemParams from './childComps/DetailItemParams'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DeatailBottomBar'

import Scroll from '@/components/common/scroll/Scroll'
import GoodsList from '@/components/content/goods/GoodsList'
import emitter from '@/components/common/mitt/Mitt'
import BackTop from '@/components/content/backtop/BackTop'
import Toast from '@/components/common/toast/Toast'

import { debouce } from '@/common/utils'

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from '@/network/detail'

export default {
  name: 'detail',
  emits: ['click'],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailInfo,
    DetailItemParams,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop,
    Toast
  },
  data() {
    return {
      iid: null,
      topSwiper: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommend: [],
      topY: [],
      getTopY: null,
      isShow: false,
      message: '',
      toastShow: false
    }
  },
  created() {
    // 得到iid
    this.iid = this.$route.query.iid
    // 通过iid请求数据
    getDetail(this.iid).then(res => {
      // 获取轮播图数据
      this.topSwiper = res.result.itemInfo.topImages
      // 获取商品基本信息
      this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
      // 获取商家信息
      this.shop = new Shop(res.result.shopInfo)
      // 获取商品详细信息
      this.detailInfo = res.result.detailInfo
      // 获取参数信息
      this.itemParams = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule)
      // 获取评论信息
      if(res.result.rate.cRate !== 0) {
        this.commentInfo = res.result.rate.list[0]
      }
    })
    // 获取推荐信息
    getRecommend().then(res => {
      this.recommend.push(...res.data.list)
    })
    // 获取各个组件的offsetTop
    this.getTopY = debouce(() => {
      this.topY[0] = 0
      this.topY[1] = this.$refs.param.$el.offsetTop - 44 
      this.topY[2] = this.$refs.comment.$el.offsetTop - 44
      this.topY[3] = this.$refs.recommend.$el.offsetTop - 44
    }, 50)
  },
  mounted() {
    let refresh = debouce(this.$refs.scroll.refresh, 100)
    emitter.on('detailImgLoad', () => {
      refresh()
    })
  },
  methods: {
    detailImgLoad() {
      this.$refs.scroll.refresh()
      this.getTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.topY[index], 500)
    },
    scrollPos(position) {
      let positionY = - position.y
      if(positionY >= this.topY[0] && positionY < this.topY[1]) {
        this.$refs.nav.currentIndex = 0
      } else if(positionY >= this.topY[1] && positionY < this.topY[2]) {
        this.$refs.nav.currentIndex = 1
      } else if(positionY >= this.topY[2] && positionY < this.topY[3]) {
        this.$refs.nav.currentIndex = 2
      } else if(positionY >= this.topY[3]) {
        this.$refs.nav.currentIndex = 3
      }
      // 监听backTo
      this.isShow = position.y < -1000
    },
    // 实现backTop
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    addCart() {
      // 获取购物车需要展示的信息
      const product = {}
      product.img = this.topSwiper[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 将商品添加进入购物车
      this.$store.dispatch('addCart', product).then(res => {
        this.message = res
        this.toastShow = true
        setTimeout(() => {
          this.message = ''
          this.toastShow = false
        }, 1000);
      })
    }
  }
}
</script>

<style>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
  }

  .detail-navbar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .detail-wrapper {
    height: calc(100% - 44px - 55px);
  }
</style>