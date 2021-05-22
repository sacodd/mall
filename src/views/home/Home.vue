<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center> 
        买买买
      </template>
    </nav-bar>
    <!-- 停留使用，开始隐藏 -->
    <tab-control :title="['流行', '新款', '精选']"
                    @tabItemClick="tabItemClick"
                    ref="tabControl1"
                    v-show="isTabFiexd"
                    class="fixed-tab-control"></tab-control>
    <scroll class="home-wrapper" 
            ref="scroll" 
            :probe-type="3" 
            @scrollPos="scrollPos"  
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperLoad="swiperLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature></feature>
      <tab-control :title="['流行', '新款', '精选']"
                    @tabItemClick="tabItemClick"
                    ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 监听子组件要在emits中注册 -->
    <back-top @click="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'
  import TabControl from '@/components/content/tabControl/TabControl'
  import GoodsList from '@/components/content/goods/GoodsList'
  import Scroll from '@/components/common/scroll/Scroll'
  import BackTop from '@/components/content/backtop/BackTop'
  import emitter from '@/components/common/mitt/Mitt'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import Feature from './childComps/Feature'

  import {getHomeMultidata, getHomeGoods} from '@/network/home'
  import {debouce} from '@/common/utils'
  
  export default {
    name: 'home',
    emits: ['click'],
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
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
        currentGoods: 'pop',
        isShow: false,
        fixedOffsetTop: 0,
        isTabFiexd: false,
        positionY: 0,
        saveTop: 0
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
    mounted() {
      // 监听图片加载
      // 通过mitt插件实现事件总线的事件接受
      // 通过防抖函数减少refresh()的调用次数
      const refresh = debouce(this.$refs.scroll.refresh, 100)
      emitter.on('imgLoad',() => {
          refresh()
      })
    },
    activated() {
      this.saveTop = this.positionY
    },
    deactivayed() {
      this.$refs.scroll.scrollTo(0, this.saveTop, 0)
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
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      // 实现backTop
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      // 滚动监听
      scrollPos(position) {
        // backTop按钮的v-show
        this.isShow = position.y < -1000
        // tab-control是否吸顶
        this.isTabFiexd = position.y < - this.fixedOffsetTop
        this.positionY = position.y
      },
      // 上拉加载
      loadMore() {
        this.getHomeGoods(this.currentGoods)
        this.$refs.scroll.finishPullUp()
      },
      swiperLoad() {
        this.fixedOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      }
    }
  }
</script>

<style>
#home {
  padding-top: 44px;
  padding-bottom: 49px;
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 3;
  font-size: 20px;
}
.fixed-tab-control {
  position: fixed;
  top: 44px;
  right: 0;
  left: 0;
  z-index: 9
}

.home-wrapper {
  height: 100%;
  overflow: hidden;
}
</style>