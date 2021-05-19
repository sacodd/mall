<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar"></detail-nav-bar>
    <scroll class="detail-wrapper" ref="scroll">
      <detail-swiper :swiper="topSwiper"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-info :detailInfo="detailInfo" @detailImgLoad="detailImgLoad"></detail-info>
      <detail-item-params :itemParams="itemParams"></detail-item-params>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
    </scroll>
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

import Scroll from '@/components/common/scroll/Scroll'

import { getDetail, Goods, Shop, GoodsParam } from '@/network/detail'

export default {
  name: 'detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailInfo,
    DetailItemParams,
    DetailCommentInfo,
    Scroll
  },
  data() {
    return {
      iid: null,
      topSwiper: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {}
    }
  },
  created() {
    // 得到iid
    this.iid = this.$route.query.iid
    // 通过iid请求数据
    getDetail(this.iid).then(res => {
      console.log(res);
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
      console.log(this.commentInfo);
    })
  },
  methods: {
    detailImgLoad() {
      this.$refs.scroll.refresh()
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
    height: calc(100% - 44px);
  }
</style>