<template>
  <div id="app">
    <router-view/>
    <Footer v-if="$route.path !== '/'"/>
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
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
}
</style>
