<template>
  <div class="item-params">
    <div class="item-sizes">
      <table v-for="(table, index) in itemParams.sizes" :key="index" class="params-sizes">
        <tr v-for="(tr, indey) in table" :key="indey">
          <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
        </tr>
      </table>
    </div>
    <div>
      <table>
        <tr v-for="(item, index) in itemParams.infos" :key="index">
          <td class="item-info-key">{{item.key}}</td>
          <td class="item-info-value">{{item.value}}</td>
        </tr>
      </table>
    </div>
    <div v-if="itemParams.image != ''" class="item-info-img">
      <img :src="itemParams.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemParams: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style>
  .item-params {
    padding: 0 15px 40px;
    font-size: 18px;
    border-bottom: 5px solid #eee;
  }

  .item-params table {
    width: 100%;
    border-collapse: collapse;
  }

  .item-params table tr {
    height: 50px;
    border-bottom: 2px solid #eee;
  }

  .item-sizes {
    border-bottom: 4px solid #ccc;
  }

  .item-info-key {
    width: 80px;
  }

  .item-info-value {
    color: #eb4868;
  }

  .item-info-img img {
    width: 100%;
  }
</style>