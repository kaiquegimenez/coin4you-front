<template>
  <div class="container">
    <div class="body-container">
      <div>
        <ListStore v-for="(product, index) in products" :key="index" :product="product" />
      </div>
    </div>
  </div>
  
</template>
<script>
import ListStore from '../components/ListStrore.vue'
import api from "../api";
export default{
  components: {
    ListStore,
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
  }
  .body-container {
    height: 100%;
    overflow: auto;
    z-index: 0;
  }
</style>