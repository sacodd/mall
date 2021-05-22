<template>
    <scroll class="tab-menu">
      <ul>
        <li v-for="(item, index) in categories" :key="index" :class="{menuactive: index == currentIndex}" @click="isActive(index)">{{item.title}}</li>
      </ul>
    </scroll>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll'

export default {
  props: {
    categories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Scroll
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    isActive(index) {
      this.currentIndex = index
      this.$emit('menubtn', index)
    }
  }
}
</script>

<style>
  .tab-menu {
    width: 100px;
    height: calc(100vh - 44px - 49px);
  }

  .tab-menu ul li {
    height: 50px;
    line-height: 45px;
    font-size: 16px;
    text-align: center;
    background-color: #eee;
  }

  .menuactive {
    border-left: 3px solid pink;
    background-color: #fff !important;
  }
</style>