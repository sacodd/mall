<template>
  <div class="category">
    <nav-bar class="category-nav">
      <template #center>
        <div>商品分类</div>
      </template>
    </nav-bar>
    <div class="category-content">
      <tab-menu :categories="categories" @menubtn="menubtn"></tab-menu>
      <scroll class="category-wrapper" ref="scroll">
        <category-header :showHeader="showHeader"></category-header>
        <tab-control :title="['综合', '新品', '销售']" @tabItemClick="tabItemClick"></tab-control>
        <goods-list :goods="showDetail"></goods-list>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import tabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'

import TabMenu from './childComps/TabMenu'
import CategoryHeader from './childComps/CategoryHeader'

import Scroll from '@/components/common/scroll/Scroll'
import emitter from '@/components/common/mitt/Mitt'
import {debouce} from '@/common/utils'

import {getCategory, getCategoryHeader, getCategoryDetail} from '@/network/category'

export default {
  data() {
    return {
      categories: [],
      categoryData: [],
      currentIndex: -1,
      showIndex: -1,
      currentGoods: 'pop'
    }
  },
  components: {
    NavBar,
    tabControl,
    GoodsList,
    TabMenu,
    CategoryHeader,
    Scroll
  },
  created() {
    // 获取分类页面数据
    getCategory().then(res => {
      // 获取分类数据
      this.categories = res.data.category.list
      // 初始化数据格式
      for (let i = 0; i < this.categories.length; i ++) {
        this.categoryData[i] = {
          categoryHeader: [],
          categoryDetail: {
            'pop': [],
            'new': [],
            'sell': []
          }
        }
      }
      // 获取第一份数据
      this._getCategoryHeader(0)
    })

    
  },
  mounted() {
    let refresh = debouce(this.$refs.scroll.refresh, 200)
    emitter.on('categoryLoad', () => {
      refresh()
    })
  },
  computed: {
    showHeader () {
      if(this.currentIndex !== -1) {
        return this.categoryData[this.currentIndex].categoryHeader
      } else {
        return []
      }
    },
    showDetail () {
      if(this.showIndex !== -1) {
        switch(this.showIndex) {
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
        return this.categoryData[this.currentIndex].categoryDetail[this.currentGoods]
      } else {
        return []
      }
    }
  },
  methods: {
    menubtn (index) {
      this.currentIndex = index
      this._getCategoryHeader(index)
    },
    _getCategoryHeader (index) {
      this.currentIndex = index
      const maitKey = this.categories[index].maitKey
      getCategoryHeader(maitKey).then(res => {
        this.categoryData[this.currentIndex].categoryHeader = res.data.list
      })
      // 获取详情数据
      this._getCategoryDetail('pop')
      this._getCategoryDetail('new')
      this._getCategoryDetail('sell')
    },
    _getCategoryDetail (type) {
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      getCategoryDetail(miniWallkey, type).then(res => {
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        if(type = 'pop') {
          this.showIndex = 0
        }
      })
    },
    tabItemClick (index) {
      this.showIndex = index
    }
  }
}
</script>

<style>
  .category-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 18px;
    position: relative;
    z-index: 9;
  }

  .category-content {
    display: flex;
  }

  .category-wrapper {
    flex: 1;
    height: calc(100vh - 44px - 49px);
  }

  .category-control {
    float: left;
  }
</style>