<template>
  <div>
    <nav-bar class="profile-nav">
      <template #center>
        <div>我的</div>
      </template>
    </nav-bar>
    <user-info></user-info>
    <user-account></user-account>
    <list-view :list="listCenter"></list-view>
    <list-view :list="listBottom"></list-view>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

import UserInfo from './childComps/UserInfo'
import UserAccount from './childComps/UserAccount'
import ListView from './childComps/ListView'

export default {
  data() {
    return {
      listCenter: ['我的消息', '积分商城', '会员卡'],
      listBottom: ['我的购物车', '下载App']
    }
  },
  components: {
    NavBar,
    UserInfo,
    UserAccount,
    ListView
  }
}
</script>

<style>
  .profile-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 20px;
  }

</style>