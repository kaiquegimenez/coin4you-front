<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  height: 100%;
}
body, html {
  margin: 0;
  height: 100%;
  overflow: hidden;
}
</style>
