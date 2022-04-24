<template>
  <div style="position: relative">
    <Header @openMenu="openMenu" />
    <div class="user">
      <div class="user__infos">
        <div class="user__image">
          <img src="../assets/icons/person.svg" alt="" />
        </div>
        <div class="user__data">
          <span>{{ user.nome }}</span>
        </div>
      </div>
      <div class="user__balance">
        <span>Saldo em KC</span>
        <b>KC {{ user.saldo }}</b>
      </div>
    </div>
    <div class="body-container">
      <ListPersons
        @click.native="openDialog(person)"
        v-for="(person, index) in persons"
        :key="index"
        :person="person"
        :idUser="user.id"
      />
    </div>
    <transition name="slide-fade">
      <div v-if="showMenu" class="menu">
        <div class="icon-arrow" @click="showMenu = false">
          <img src="../assets/icons/arrow_black.svg" alt="" />
        </div>
        <div class="user__infos">
          <div class="user__image">
            <img src="../assets/icons/person.svg" alt="" />
          </div>
          <div class="user__data user__data--menu">
            <span>{{ user.nome }}</span>
          </div>
        </div>
        <div class="menu__balance">
          <span>Saldo em KC</span>
          <b>KC {{ user.saldo }}</b>
        </div>
        <div @click="openEditUser()" class="list list__menu">
          <div class="list__container">
            <div class="list__user-data">
              <div>
                Editar Perfil
              </div>
              <div>
                <img src="../assets/icons/arrow_right.svg" alt="" />
              </div>
            </div>
          </div>
          <div v-if="isAdmin" @click="$router.push('editUsers')" class="list__container">
            <div class="list__user-data">
              <div>
                Editar Usuários
              </div>
              <div>
                <img src="../assets/icons/arrow_right.svg" alt="" />
              </div>
            </div>
          </div>
          <div v-if="isAdmin" @click="$router.push('editProducts')" class="list__container">
            <div class="list__user-data">
              <div>
                Editar Produtos
              </div>
              <div>
                <img src="../assets/icons/arrow_right.svg" alt="" />
              </div>
            </div>
          </div>
          <div @click="logout()" class="list__container">
            <div class="list__user-data list__user-data--logout">
              <div>
                Sair do App
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <Toast
      :type="typeToast"
      :message="message"
      :visible="showToast"
      :duration="3500"
      @close="false"
    ></Toast>
    <Dialog :person="person" @confirmTransfer="confirmTransfer" @close="showModal = false" v-if="showModal" />
    <DialogEdit @confirmEditUser="confirmEditUser" @close="showDialogEditUser= false" v-if="showDialogEditUser" type="user" :data="user" title="Editar Usuário"/>
  </div>
</template>

<script>
import Dialog from "../components/Dialog.vue";
import ListPersons from "../components/ListPersons.vue";
import Header from "../components/Header.vue";
import DialogEdit from '../components/DialogEdit.vue';
import Toast from '../components/Toast.vue'
import api from "../api";
import moment from 'moment'
export default {
  components: {
    ListPersons,
    Header,
    Dialog,
    DialogEdit,
    Toast
  },
  data() {
    return {
      persons: [],
      user: {},
      showModal: false,
      person: {},
      showMenu: false,
      showDialogEditUser: false,
      isAdmin: false,
      message: '',
      showToast: false,
      typeToast: ''
    };
  },
  mounted() {
    this.getUser();
    this.getListUsers();
    this.isAdmin = JSON.parse(localStorage.getItem("user")).roles === 'ADM' ? true : false;
  },
  methods: {
    getUser() {
      return api.get("https://back-coin.herokuapp.com/users")
        .then((res) => {
          if (res.status === 200) {
            this.user = res.data;
          }
        }).catch((err) => {
          this.$store.dispatch('toast/changeVisible', true)
          this.$store.dispatch('toast/changeMessage', 'Erro ao buscar os seus dadaos!')
          this.$store.dispatch('toast/changeType', 'danger')
          if(err.message.includes('401')) {
            /* eslint-disable */
            localStorage.clear('token');
            localStorage.clear('user');
            this.$router.push('/')
          }
          console.log(err);
        });
    },
    getListUsers() {
      return api.get("https://back-coin.herokuapp.com/list/users")
        .then((res) => {
          if (res.status === 200) {
            this.persons = res.data;
          }
        }).catch((err) => {
          this.$store.dispatch('toast/changeVisible', true)
          this.$store.dispatch('toast/changeMessage', 'Erro ao buscar os dados dos usuários!')
          this.$store.dispatch('toast/changeType', 'danger')
          if(err.message.includes('401')) {
            /* eslint-disable */
            localStorage.clear('token');
            localStorage.clear('user');
            this.$router.push('/')
          }
          console.log(err);
        });
    },
    openDialog(person) {
      this.person = person;
      this.showModal = true;
    },
    openMenu() {
      this.showMenu = true;
    },
    openEditUser() {
      this.showDialogEditUser = true;
    },
    confirmEditUser(person){
      return api.put("https://back-coin.herokuapp.com/users", {id: this.user.id, nome: person.nome, senha: person.senha, email: person.email})
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.message)
            this.toast(res.data.message, 'success')
            this.getUser()
          } else {
            this.toast(res.data.message, 'warning')
          }
        })
        .catch((err) => {
          console.log(err);
          this.toast(err.data.message, 'danger')
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
    confirmTransfer(value, description) {
      return api.post("http://localhost:3000/coins/transfer", {idDestino: this.person.id, valor: parseInt(value), idUser: this.user.id, notificacao: description, enviadoEm: moment()})
        .then((res) => {
          if (res.data.success) {
            this.toast('Transferencia realizada com sucesso!', 'success')
            this.getUser()
          } else {
            this.toast('Não foi possível fazer a transferencia!', 'warning')
          }
        })
        .catch((err) => {
          console.log(err);
          this.toast('Não foi possível fazer a transferencia!', 'danger')
          if(err.message.includes('401')) {
            this.$router.push('/')
          }
        });
    },
    logout() {
      /* eslint-disable */
      this.toast('Logout realizado com sucesso!', 'success')
      localStorage.clear('token');
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  background-color: #f3c011;
  display: flex;
  justify-content: center;
  height: 20vh;
  position: relative;
}

.user__infos {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.user__image {
  background-color: #aaa;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  overflow: hidden;
  position: relative;
}

.user__image img {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.user__data {
  color: white;
  font-size: 0.8em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &--menu {
    color: black;
  }
}

.user__balance {
  font-size: 0.8em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -3vh;
  background-color: white;
  width: 50vw;
  height: 6vh;
  box-shadow: 0px 4px 5px 0px #88888817;
  border-radius: 5px;
  color: #f3c011;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100vw);
}

.menu {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background-color: white;
  padding-top: 20px;
  height: 100%;
  z-index: 2;

  &__balance {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 80px;
  border-top: solid 10px #f5f5f5;
  cursor: pointer;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 20px);
    border-bottom: solid 1px #f5f5f5;
  }

  &__user-data {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    &--logout {
      color: #f3c011;
    }
  }

  &__menu {
    margin-top: 50px;
    height: 40px;
    justify-content: flex-start;
  }
}

.icon-arrow {
  position: absolute;
  top: 10px;
  left: 10px;
}

.body-container {
  height: calc(75vh - 50px);
  overflow: auto;
}
</style>