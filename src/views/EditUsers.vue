<template>
  <div>
    <div class="body-container">
      <div class="button-container">
        <button @click="showModal = true" class="button">+ Cadastrar Novo Usuário</button>
      </div>
      <div class="list-persons">
        <ListPersons
          v-for="(person, index) in persons"
          :key="index"
          :person="person"
          :edit="true"
          @getUsers="getListUsers()"
        />
        <Toast :duration="3500" @close="false"></Toast>
        <DialogAddNewUser @addUser="registerNewUser($event)"  @close="showModal = false" v-if="showModal" />
      </div>
    </div>
  </div>
</template>
<script>
import ListPersons from '../components/ListPersons.vue'
import Toast from '../components/Toast.vue';
import api from '../api'
import DialogAddNewUser from '../components/DialogAddNewUser.vue';
export default {
  components: {
    ListPersons,
    Toast,
    DialogAddNewUser
},
  data() {
    return {
      persons: [],
      showModal: false
    }
  },
  mounted(){
    this.getListUsers()
  },
  methods: {
    getListUsers() {
      return api.get("https://back-coin.herokuapp.com/list/users")
        .then((res) => {
          if (res.status === 200) {
            this.persons = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
          if(err.message.includes('401')) {
            this.$router.push('/')
          }
        });
    },

    toast(message, type) {
      this.$store.dispatch('toast/changeVisible', true)
      this.$store.dispatch('toast/changeMessage', message)
      this.$store.dispatch('toast/changeType', type)
    },

    registerNewUser(user) {
      return api.post("https://back-coin.herokuapp.com/users", {nome: user.nome, email: user.email, senha: user.senha, bairro: user.bairro, cep: user.cep, cidade: user.cidade, estado: user.estado, numero: user.numero, rua: user.rua, telefone: user.telefone})
        .then((res) => {
          if (res.data.success) {
            this.getListUsers()
            this.toast(res.data.message, 'success');
            console.log(res.data.message);
            this.password = '';
            this.email = '';
            this.name = '';
          } else {
            this.toast(res.data.message, 'warning');
          }
        })
        .catch((err) => {
          this.toast(err.data.message, 'danger');
          console.log(err);
          if(err.message.includes('401')) {
            this.$router.push('/')
          }
        });
    }
  }
  
}
</script>

<style lang="scss" scoped>
  .body-container {
    height: calc(95vh - 50px);
  }
  .input-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 15%;
  }
  .list-persons {
    height: calc(100% - 50px);;
    overflow: auto;
  }
  .input {
    border: 1px solid rgba(0, 0, 0, 0.425);
    height: 40px;
    padding: 5px;
    border-radius: 5px;
    margin: 5px;
    width: calc(50% - 22px);
    &__email {
      width: calc(100% - 22px);
    }
  }
  .input-email {
    width: 100%;
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
  }

  .button {
    background-color: #f3c011;
    color: white;
    border: 1px solid #f3c011;
    border-radius: 10px;
    height: 40px;
    width: 100%;
    font-size: 18px;
    margin: 5px;
    cursor: pointer;
  }
</style>