<template>
  <div v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-desc">
      <div class="desc-start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="desc-end"></div>
    </div>
    <div class="detail-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="detail-img">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt="" @load="imgLoad">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgLoad() {
        this.$emit('detailImgLoad')
    }
  }
}
</script>

<style>
  .info-desc {
    padding: 40px 15px 30px;
    border-top: 3px solid #ccc;
  }

  .info-desc .desc {
    margin: 20px 0;
    font-size: 18px;
  }

  .info-desc .desc-start,
  .info-desc .desc-end {
    position: relative;
    width: 120px;
    height: 9px;
  }

  .info-desc .desc-start {
    border-top: 1px solid #000;
    float: left;
  }

  .info-desc .desc-end {
    border-bottom: 1px solid #000;
    float: right;
  }

  .info-desc .desc-start::before,
  .info-desc .desc-end::after {
    content: '';
    width: 8px;
    height: 8px;
    background-color: #000;
    position: absolute;
    top: 0;
  }

  .info-desc .desc-end::after {
    right: 0;
  }

  .detail-key {
    margin: 0 15px;
    font-size: 20px;
    color: #222;
  }

  .detail-img {
    width: 100%;
    padding-bottom: 30px;
    border-bottom: 5px solid #eee;
  }

  .detail-img img {
    width: 100%;
  }
</style>