<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
	height: 100%;
}
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";     /*深色主题*/
</style>
