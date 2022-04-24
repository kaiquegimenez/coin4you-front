<template>
  <div>
    <Header/>
    <div class="body-container">
      <ListNotifications v-for="(notification, index) in notifications" :key="index" :notification="notification"/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from '../components/Footer.vue'
import ListNotifications from '../components/ListNotifications.vue'
import Header from '../components/Header.vue'
export default {
  components: {
    Footer,
    ListNotifications,
    Header
  },
  data() {
    return {
      notifications: [
        {
          description: 'Teste de notificação',
          valor: '10',
          type: 'received',
          person: 'João'
        },
        {
          description: 'Teste de notificação',
          valor: '300',
          type: 'received',
          person: 'Letícia'
        },
        {
          description: 'Teste de notificação',
          valor: '22',
          type: 'sent',
          person: 'Marcos'
        },
        {
          description: 'Teste de notificação',
          valor: '5',
          type: 'sent',
          person: 'Fernando'
        },
        {
          description: 'Teste de notificação',
          valor: '1323',
          type: 'received',
          person: 'Sueli'
        },
        {
          description: 'Teste de notificação ',
          valor: '103',
          type: 'sent',
          person: 'João'
        },
        {
          description: 'Teste de notificaçãoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          valor: '369',
          type: 'sent',
          person: 'Letícia'
        },
        {
          description: 'Teste de notificação',
          valor: '369',
          type: 'sent',
          person: 'Letícia'
        },
        {
          description: 'Teste de notificação',
          valor: '369',
          type: 'sent',
          person: 'Letícia'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .body-container {
    height: calc(100vh - 90px);
    overflow-x: hidden;
    overflow-y: auto;
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 1px;
  }
</style>