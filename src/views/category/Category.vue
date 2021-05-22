<template>
  <div class="category">
    <nav-bar class="category-nav">
      <template #center>
        <div>商品分类</div>
      </template>
    </nav-bar>
    <div class="category-content">
      <tab-menu :categories="categories" @menubtn="menubtn"></tab-menu>
      <scroll class="category-wrapper">
        <category-header :showHeader="showHeader"></category-header>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

import TabMenu from './childComps/TabMenu'
import CategoryHeader from './childComps/CategoryHeader'

import Scroll from '@/components/common/scroll/Scroll'

import {getCategory, getCategoryHeader} from '@/network/category'

export default {
  data() {
    return {
      categories: [],
      categoryData: [],
      currentIndex: -1
    }
  },
  components: {
    NavBar,
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
  computed: {
    showHeader () {
      if(this.currentIndex !== -1) {
        return this.categoryData[this.currentIndex].categoryHeader
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
        console.log(this.categoryData[this.currentIndex].categoryHeader);
      })
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
</style>