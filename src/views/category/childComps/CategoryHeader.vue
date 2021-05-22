<template>
    <div class="category-header">
      <div v-for="(item, index) in showHeader" :key="index" class="header-item">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div class="header-item-title">{{item.title}}</div>
        </a>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    showHeader: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .category-header {
    padding: 10px 10px;
    text-align: center;
    font-size: 12px;
    overflow: auto;
  }

  .header-item {
    float: left;
    margin-bottom: 25px;
    margin-right: 20px;
  }

  .header-item a img {
    width: 65px;
    height: 65px;
  }

  .header-item-title {
    margin: 5px 0 ;
    width: 65px;
  }
</style>