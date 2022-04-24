<template>
  <div id="app">
    <Header v-if="$route.name !== 'Home'"/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
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
