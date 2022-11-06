<template>
<div>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h3>Adicionar Novo Usuário</h3>
            </slot>
          </div>

          <div class="modal-body">
            <div class="input2">
              Nome:
              <input class="input" type="text" placeholder="Nome" v-model="name">
            </div>
            <div class="input2">
              Email:
              <input class="input" type="text" placeholder="E-mail" v-model="email">
            </div>
            <div class="input-container" >
              <div class="space">
                Cidade:
                <input class="input" type="text" placeholder="Cidade" v-model="city">
              </div>
              <div>
                Rua:
                <input class="input" type="text" placeholder="Rua" v-model="street">
              </div>
            </div>
            <div class="input-container">
              <div class="space">
                Bairro:
                <input class="input" type="text" placeholder="Bairro" v-model="neighborhood">
              </div>
              <div>
                Número:
                <input class="input" type="text" placeholder="Número" v-model="number">
              </div>
            </div>
            <div class="input-container">
              <div class="space">
                Estado:
                <input class="input" type="text" placeholder="Estado" v-model="state">
              </div>
              <div>
                CEP:
                <input class="input" type="text" placeholder="Cep" v-model="cep">
              </div>
            </div>
            <div class="input-container">
              <div class="space">
                Telefone:
                <input class="input" type="text" placeholder="Telefone" v-model="phone">
              </div>
              <div>
                Senha:
                <input class="input" type="password" placeholder="Senha" v-model="password">
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="button button__cancel" @click="$emit('close')">
                Cancelar
              </button>
              <button class="button button__confirm" @click="confirm()">
                Confirmar
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
export default {
  name:'DialogAddNewUser',
  data() {
    return {
      name: '',
      password: '',
      email: '',
      city: '',
      phone: '',
      number: '',
      street: '',
      state: '',
      cep: '',
      neighborhood: '',
      showToast: false,
      message: '',
      typeToast: ''
    }
  },
  props: {
    person: {},
  },
  methods: {
    confirm(){
      /* eslint-disable no-debugger */
      const dataUser = {
        nome: this.name,
        email: this.email,
        cidade: this.city,
        telefone: this.phone,
        numero: this.number,
        rua: this.street,
        estado: this.state,
        cep: this.cep,
        bairro: this.neighborhood,
        senha: this.password
      } 
      this.$emit('close');
      this.$emit('addUser', dataUser)
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
  width: 95%;
  height: 80%;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
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
  align-items: center;
  margin: 10px;

  .input-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    padding: 5px 0;
  }
  .input {
    border: 1px solid rgba(0, 0, 0, 0.425);
    height: 40px;
    padding: 5px;
    width: 100%;
    border-radius: 5px;
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