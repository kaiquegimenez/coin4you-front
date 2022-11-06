<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container modal-container--user">
          <div class="modal-header">
            <slot name="header">
              <h3>{{title}}</h3>
            </slot>
          </div>
          <div v-if="type === 'user'" class="modal-body">
            <div class="input2">
              Nome:
              <input class="input" type="text" placeholder="Nome" v-model="nameUser">
            </div>
            <div class="input2">
              Email:
              <input class="input" type="text" placeholder="E-mail" v-model="email">
            </div>
            <div class="input-container" >
              <div style="width: 100%" class="space">
                Cidade:
                <input class="input" type="text" placeholder="Cidade" v-model="city">
              </div>
              <div style="width: 100%">
                Rua:
                <input class="input" type="text" placeholder="Rua" v-model="street">
              </div>
            </div>
            <div class="input-container">
              <div style="width: 100%" class="space">
                Bairro:
                <input class="input" type="text" placeholder="Bairro" v-model="neighborhood">
              </div>
              <div style="width: 100%">
                Número:
                <input class="input" type="text" placeholder="Número" v-model="number">
              </div>
            </div>
            <div class="input-container">
              <div style="width: 100%" class="space">
                Estado:
                <input class="input" type="text" placeholder="Estado" v-model="state">
              </div>
              <div style="width: 100%">
                CEP:
                <input class="input" type="text" placeholder="Cep" v-model="cep">
              </div>
            </div>
            <div class="input-container">
              <div style="width: 100%" class="space">
                Telefone:
                <input class="input" type="text" placeholder="Telefone" v-model="phone">
              </div>
              <div style="width: 100%">
                Senha:
                <input class="input" type="password" placeholder="Senha" v-model="password">
              </div>
            </div>
          </div>

          <div v-else class="modal-body">
            Nome:
            <input class="input" type="text" placeholder="Nome do Produto" v-model="nameProduct">
            Valor:
            <input class="input" type="number" placeholder="Valor do Produto" v-model="value">
            Descrição:
            <input class="input" type="text" placeholder="Descrição do Produto" v-model="description">
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="button button__cancel" @click="$emit('close')">
                Cancelar
              </button>
              <button class="button button__confirm" @click="type === 'user' ? editPerson() : editProduct()">
                Confirmar
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name:'DialogEditUser',
  props: {
    data: {},
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }

  },
  data() {
    return {
      email: '',
      nameUser:'',
      city: '',
      phone: '',
      number: '',
      street: '',
      state: '',
      cep: '',
      neighborhood: '',
      password: '',
      nameProduct: '',
      value: 0,
      description: '',
    }
  },
  mounted() {
    if(this.$props.type === 'user'){
      this.email = this.$props.data.email;
      this.nameUser = this.$props.data.nome;
      this.city = this.$props.data.cidade;
      this.phone = this.$props.data.telefone;
      this.number = this.$props.data.numero;
      this.street = this.$props.data.rua;
      this.state = this.$props.data.estado;
      this.cep = this.$props.data.cep;
      this.neighborhood = this.$props.data.bairro;
    } else {
      this.nameProduct = this.$props.data.nome;
      this.value = this.$props.data.valor;
      this.description = this.$props.data.descricao;
    }
    console.log(this.$props.data)
  },
  methods: {
    editProduct(){
      this.$emit('close');
      const product = {
        nome: this.nameProduct,
        valor: this.value,
        descricao: this.description
      }
      this.$emit('confirmEditProduct', product)
      // return api.put("https://back-coin.herokuapp.com/adm/product", {id: this.$props.data.id, nome: this.nameProduct, valor: this.value, descricao: this.description})
      //   .then((res) => {
      //     if (res.data.success) {
      //       console.log(res.data.message)
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     if(err.message.includes('401')) {
      //       this.$router.push('/')
      //     }
      //   });
    },
    editPerson(){
      const person = {
        nome: this.nameUser,
        senha: this.password,
        email: this.email,
        cidade: this.city,
        telefone: this.phone,
        numero: this.number,
        rua: this.street,
        estado: this.state,
        cep: this.cep,
        bairro: this.neighborhood
      }
      this.$emit('confirmEditUser', person);
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}


.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  border-top: 1px solid #f3c011;
  border-bottom: 1px solid white;
  width: 90%;
  height: 50%;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;

  &--user {
    height: 80%;
  }
}

.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 0px 0px 0px;
  background-color: #f3c011;
  border: 1px solid #f3c011;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  h3{
    color: white;
  }
}

.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 10px;
  .input-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    padding: 5px 0;
    margin-top: 5px;
  }
  .input {
    border: 1px solid rgba(0, 0, 0, 0.425);
    height: 35px;
    padding: 5px;
    width: 100%;
    border-radius: 5px;
    margin-top: 5px;
  }
  .space {
    margin-right: 5px;
  }
  .input2 {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 5px;
  }
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 20px 10px 0px 0px;
  .button {
    &__confirm {
      background-color: #f3c011;
      color: white;
    }
    &__cancel {
      background-color: white;
      color: #f3c011;
    }
    border: 1px solid #f3c011;
    border-radius: 10px;
    height: 30px;
    width: 100px;
    margin: 5px;
    cursor: pointer;
  }
}


.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>