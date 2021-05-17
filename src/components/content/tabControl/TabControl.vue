<template>
  <div class="tab-control">
    <div v-for='(item, index) in title' :key="index" class="tab-control-item" :class="{active: index == currentIndex}" @click="tabItemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    tabItemClick(index) {
      this.currentIndex = index
      this.$emit('tabItemClick', index)
    }
  }
}
</script>

<style>
  .tab-control {
    display: flex;
    font-size: 15px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
    text-align: center;
    line-height: 40px;
  }

  .active span {
    padding: 5px;
    color: var(--color-high-text) ;
    border-bottom: 2px solid var(--color-high-text);
  }  
</style>