<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center> 
        买买买
      </template>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature></feature>
    <tab-control :title="['流行', '新款', '精选']" class="home-tab-control" @tabItemClick="tabItemClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'
  import TabControl from '@/components/content/tabControl/TabControl'
  import GoodsList from '@/components/content/goods/GoodsList'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import Feature from './childComps/Feature'


  import {getHomeMultidata, getHomeGoods} from '@/network/home'
  
  export default {
    name: 'home',
    components: {
      NavBar,
      TabControl,
      GoodsList,
      HomeSwiper,
      RecommendView,
      Feature,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentGoods: 'pop'
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentGoods].list
      }
    },
    created() {
      // 请求数据
      this.getHomeMultidata(),
      // 商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('sell')
      this.getHomeGoods('new')
    },
    methods: {
      // 数据请求
      getHomeMultidata() {
        getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page = page
        })
      },
      // 事件监听
      tabItemClick(index) {
        switch(index) {
          case 0: 
            this.currentGoods = 'pop'
            break
          case 1:
            this.currentGoods = 'new'
            break
          case 2:
            this.currentGoods = 'sell'
            break
        }
      }
    }
  }
</script>

<style>
#home {
  padding-top: 44px;
  padding-bottom: 49px;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 3;
}

.home-tab-control {
  position: sticky;
  top: 44px;
  z-index: 2;
}
</style>