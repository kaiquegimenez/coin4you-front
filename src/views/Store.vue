<template>
  <div>
    <Header/>
    <div class="container">
      <div class="body-container">
        <div class="grid-container"> 
          <ListStore class="grid-item" v-for="(product, index) in products" :key="index" :product="product" />
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Footer from '../components/Footer.vue'
import ListStore from '../components/ListStrore.vue'
import Header from '../components/Header.vue'
import api from "../api";
export default{
  components: {
    Header,
    ListStore,
    Footer
  },
  data() {
    return {
      products: []
    }
  },
  mounted() {
    this.getListProducts()
  },
  methods: {
    getListProducts() {
      return api.get("https://back-coin.herokuapp.com/adm/product")
        .then((res) => {
          if (res.status === 200) {
            this.products = res.data;
          }
        })
        .catch((err) => {
          console.log(err.message);
          if(err.message.includes('401')) {
            this.$router.push('/')
          }
        });
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    height: calc(100vh - 90px);
    width: 100%;
  }

  .grid-container {
    display: grid;
    grid-template-columns: auto auto;
    background-color: gray;
    overflow: auto;
    height: calc(100vh - 90px);
  }
  .grid-item {
    background-color: white;
  }
</style>