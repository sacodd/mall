<template>
  <div class="recommends">
    <div v-for="item in recommends" :key="item.acm" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .recommends {
    display: flex;
    width: 100%;
    padding: 12px 0 20px;
    font-size: 15px;
    border-bottom: 8px solid #eee;
  }

  .recommend-item {
    flex: 1;
    text-align: center;
  }

  .recommend-item img {
    width: 85%;
    margin-bottom: 5px;
  }
</style>