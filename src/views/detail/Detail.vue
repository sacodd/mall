<template>
  <div>详情页</div>
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
      iid: null
    }
  },
  created() {
    this.iid = this.$route.query.iid
    console.log(this.iid);
  }
}
</script>

<style>

</style>