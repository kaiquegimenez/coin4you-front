<template>
  <div>
    <div id="infinite-list" class="body-container">
      <ListExtract v-for="(notification, index) in notifications" :key="index" :userId="idUser" :dateNotificationOld="notifications[index-1] ? notifications[index-1].enviado_em : ''" :notification="notification"/>
    </div>
  </div>
</template>

<script>
import ListExtract from '../components/ListExtract.vue'
import api from '../api';
export default {
  components: {
    ListExtract,
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
    if(this.$router.currentRoute.params.id) {
      this.idUser = this.$router.currentRoute.params.id;
    }
    this.getNotifications()
  },
  mounted() {
    const listElm = document.querySelector('#infinite-list')
    listElm.addEventListener('scroll', () => {
        if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight){
          this.getNotifications()
        }
      });
  },
  methods: {
    getNotifications() {
      this.page++
      return api.get("https://back-coin.herokuapp.com/extrato", { params: { id:this.idUser, page: this.page } })
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