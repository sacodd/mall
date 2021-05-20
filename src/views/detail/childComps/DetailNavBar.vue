<template>
  <nav-bar>
    <template #left>
      <div class="detail-back" @click="backClick">
        <img src="@/assets/img/common/back.svg" alt="">
      </div>
    </template>
    <template #center>
      <div class="detail-nav-bar">
        <div v-for="(item, index) in title" :key="index" 
            class="detail-nav-bar-item" 
            :class="{active: index ==currentIndex}" @click="titleClick(index)">
            {{item}}
        </div>
      </div>
    </template>
  </nav-bar>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      title: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
       this.currentIndex = index
       this.$emit('titleClick', index)
    },
    backClick() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .detail-back img {
    vertical-align: middle;
  }

  .detail-nav-bar {
    display: flex;
    padding: 0 30px;
  }

  .detail-nav-bar-item {
    flex: 1;
    font-size: 14px;
  }

  .active {
    color: var(--color-high-text)
  }
</style>