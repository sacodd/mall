<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <div class="user-icon"><img src="../../../assets/img/profile/user_icon.jpg" alt=""></div>
      </slot>
      <div class="login-info">
        <div class="user-name">
          <slot name="user-name">登陆/注册</slot>
        </div>
        <div class="user-phone">
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
	export default {
		
	}
</script>

<style>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }

  .user-icon {
    float: left;
    width: 80px;
    height: 80px;
    margin-right: 15px;
  }

  .user-icon img {
    width: 80px;
    height: 80px;
    border-radius: 40px;
  }

  .login-info {
    height: 80px;
    color: #fff;
    font-size: 20px;
    overflow: hidden;
  }

  .user-name {
    margin: 20px 0 5px;
  }

  .user-phone {
    font-size: 14px;
  }

</style>
