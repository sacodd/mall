<template>
  <div class="account">
    <div class="account-item">
      <div>
        <span class="account-num">0.00</span>元
      </div>
      <div class="account-info">我的余额</div>
    </div>
    <div class="account-item">
      <div>
        <span class="account-num">0</span>个
      </div>
      <div class="account-info">我的优惠</div>
    </div>
    <div class="account-item">
      <div>
        <span class="account-num">0</span>分
      </div>
      <div class="account-info">我的积分</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .account {
    height: 80px;
    display: flex;
  }

  .account-item {
    flex: 1;
    text-align: center;
    padding: 20px 0;
    border-right: 1px solid #eee;
  }

  .account-num {
    color: red;
    font-size: 25px;
  }

  .account-info {
    margin-top: 6px;
    font-size: 14px;
  }

</style>