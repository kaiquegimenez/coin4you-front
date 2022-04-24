<template>
  <div>
    <div id="infinite-list" class="body-container">
      <ListNotifications v-for="(notification, index) in notifications" :key="index" :notification="notification"/>
    </div>
  </div>
</template>

<script>
import ListNotifications from '../components/ListNotifications.vue'
import api from '../api';
export default {
  components: {
    ListNotifications,
  },
  data() {
    return {
      idUser: '',
      notifications: [],
      page: 0
    }
  },
  created() {
    this.idUser = JSON.parse(localStorage.getItem('user')).id
    this.getNotifications()
  },
  mounted() {
    const listElm = document.querySelector('#infinite-list')
    listElm.addEventListener('scroll', () => {
      console.log('teste')
        if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight){
          this.getNotifications()
        }
      });
  },
  methods: {
    getNotifications() {
      this.page++
      return api.get("http://localhost:3000/transferencias", { params: { id:this.idUser, page: this.page } })
        .then((res) => {
          if (res.data.success) {
            this.notifications = this.notifications.concat(res.data.notifications)
          } else {
            this.toast('Não foi possível carregar sua notificações!', 'warning')
          }
        })
        .catch((err) => {
          console.log(err);
          this.toast('Erro ao carregar suas notificações!', 'danger')
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
    height: calc(100vh - 90px);
    overflow-x: hidden;
    overflow-y: scroll;
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 1px;
  }
</style>