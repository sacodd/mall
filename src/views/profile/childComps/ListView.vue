<template>
  <div class="list-view">
    <div v-for="(item, index) in list" :key="index" class="list-item">{{item}}</div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      dafault() {
        return []
      }
    }
  }
}
</script>

<style>
  .list-view {
    border-top: 10px solid #eee;
  }

  .list-item {
    padding: 0 20px;
    height: 40px;
    border-bottom: 1px solid #eee;
    line-height: 40px;
  }
</style>