<template>
  <div v-if="product.deletado_em === null" class="list">
    <div class="list__container">
      <div class="list__user-data">
        <div class="list__image">
          <img src="../assets/icons/shop.svg" alt="">
        </div>
        <div class="items">
          {{product.nome}}
          <span class="items__price">{{product.valor}} KC</span>
          <div class="items__decription">
            {{product.descricao}}
          </div>
        </div>
      </div>
    </div>
    <button v-if="!edit" @click="buyItem()" class="button-buy">Comprar</button>
    <div v-else>
      <button @click="editProduct()" class="button button__edit">
        <img src="../assets/icons/edit.svg" width="24px" height="24px" alt="">
      </button>
      <button @click="deleteProduct()" class="button button__delete">
        <img src="../assets/icons/delete.svg" width="24px" height="24px" alt="">
      </button>
    </div>
    <Toast :duration="3500" @close="false"></Toast>
    <DialogEdit @confirmEditProduct="confirmEditProduct" @close="showDialogProduct= false" v-if="showDialogProduct" :data="product" title="Editar Produto" type="product"/>
    <ConfirmDialog @confirmBuy="confirmBuy" :product="product" @close="showModal = false" v-if="showModal"/>
  </div>
</template>
<script>
import ConfirmDialog from '../components/ConfirmDialog.vue'
import DialogEdit from '../components/DialogEdit.vue'
import api from '../api';
import Toast from '../components/Toast.vue';
import moment from 'moment'

export default {
  name: 'ListStore',
  components: {
    ConfirmDialog,
    DialogEdit,
    Toast
  },
  data() {
    return {
      idUser: '',
      showModal: false,
      showDialogProduct: false
    }
  },
  props: {
    product: {
      type: Object,
      default() {
        return {
          name: '',
          description: '',
          price: ''
        }
      },
    },
    edit: {
      default: false,
      type: Boolean
    }
  },

  mounted() {
    this.idUser = JSON.parse(localStorage.getItem('user')).id
  },

  methods: {
    buyItem() {
      this.showModal = true;
    },

    confirmEditProduct(product) {
      return api.put("https://back-coin.herokuapp.com/adm/product", {id: this.product.id, nome: product.nameProduct, valor: product.value, descricao: product.description})
        .then((res) => {
          if (res.data.success) {
            this.$store.dispatch('toast/changeVisible', true)
            this.$store.dispatch('toast/changeMessage', res.data.message)
            this.$store.dispatch('toast/changeType', 'success')
            this.$emit('getProducts');
          } else {
            this.$store.dispatch('toast/changeVisible', true)
            this.$store.dispatch('toast/changeMessage', res.data.message)
            this.$store.dispatch('toast/changeType', 'warning')
          }
        })
        .catch((err) => {
          console.log(err);
          this.$store.dispatch('toast/changeVisible', true)
          this.$store.dispatch('toast/changeMessage', err.data.message)
          this.$store.dispatch('toast/changeType', 'danger')
          if(err.message.includes('401')) {
            this.$router.push('/')
          }
        });
    },

    editProduct(){
      this.showDialogProduct = true
    },

    confirmBuy(){
      /* eslint-disable no-debugger */
      return api.post("https://back-coin.herokuapp.com/coins/changes", {idProduto: this.product.id, idUsuario: this.idUser, enviadoEm: moment() })
        .then((res) => {
          if (res.data.success) {
            this.$store.dispatch('toast/changeVisible', true)
            this.$store.dispatch('toast/changeMessage', 'Item comprado!')
            this.$store.dispatch('toast/changeType', 'success')
          } else {
            this.$store.dispatch('toast/changeVisible', true)
            this.$store.dispatch('toast/changeMessage', 'Não foi possível comprar o item!')
            this.$store.dispatch('toast/changeType', 'warning')
          }
        })
        .catch((err) => {
          this.$store.dispatch('toast/changeVisible', true)
          this.$store.dispatch('toast/changeMessage', 'Não foi possível comprar o item!')
          this.$store.dispatch('toast/changeType', 'danger')
          console.log(err);
          if(err.message.includes('401')) {
            this.$router.push('/')
          }
        });
    },

    deleteProduct() {
      const id = this.product.id
      return api.put("https://back-coin.herokuapp.com/delete/product", {id})
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.message)
            this.$store.dispatch('toast/changeVisible', true)
            this.$store.dispatch('toast/changeMessage', res.data.message)
            this.$store.dispatch('toast/changeType', 'success')
            this.$emit('getProducts');
          } else {
            this.$store.dispatch('toast/changeVisible', true)
            this.$store.dispatch('toast/changeMessage', res.data.message)
            this.$store.dispatch('toast/changeType', 'warning')
          }
        })
        .catch((err) => {
          console.log(err);
          this.$store.dispatch('toast/changeVisible', true)
          this.$store.dispatch('toast/changeMessage', err.data.message)
          this.$store.dispatch('toast/changeType', 'danger')
          if(err.message.includes('401')) {
            this.$router.push('/')
          }
        });
    },
  }
}
</script>

<style lang="scss" scoped>
  .list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 49.8vw;
    padding: 5px 0 0.5px;
    margin-bottom: 0.5px;

    &__container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    &__user-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
    }

    &__image {
      background-color: #aaa;
      height: 60%;
      width: 45vw;
      overflow: hidden;
      position: relative;
      display: flex;
      align-content: center;
      align-items: center;
      img {
        width: 100%;
      }
    }
  }

  .items{ 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 5px;
    &__price {
      color: #f3c011;
    }
    &__decription {
      font-size: 11px;
    }
  }

  .button-buy{
    background-color: #06bf06;
    color: white;
    border: 1px solid #06bf06;
    border-radius: 2px;
    margin-right: 10px;
    padding: 5px;
    margin: 5px;
    cursor: pointer;
  }

  .button {
    margin: 5px;
    border-radius: 50%;
    cursor: pointer;
    &__edit {
      border: 1px solid #f3c011;
      background-color: #f3c011;
    }

    &__delete {
      border: 1px solid #f3c011;
      background-color: #FFFFFF;
    }
  }
</style>