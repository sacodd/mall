<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  #tab-bar {
    display: flex;
    background-color: hsl(0, 0%, 95%);

    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;

    box-shadow: 0 -2px 1px rgba(0, 0, 0, .1);
  }

</style>