<template>
  <div class="list">
    <div class="list__container">
      <div class="list__notification">
        <div v-if="!isAdmin" class="list__text">
          <span> <b>{{notification.nome}}</b> te mandou {{notification.valor}}KC </span>
          <span class="list__message">{{notification.notificacao}}</span>
        </div>
        <div v-if="isAdmin" @click="showMoreDetails = true" class="list__text">
          <span> <b>Compra</b> </span>
          <span class="list__message">{{notification.nome}}{{notification.notificacao}}</span>
          <div class="list__date">
            <div>
              {{convertData()}}
            </div>
            <div class="more-infos">
              mais informações
            </div>
          </div>
        </div>
      </div>
    </div>
    <DialogMoreInfos v-if="showMoreDetails" @close="showMoreDetails = false" :infos="notification"/>
  </div>
</template>

<script>
import moment from 'moment';
import DialogMoreInfos from '../components/DialogMoreInfos.vue'
export default {
  name: 'ListNotifications',
  components: {
    DialogMoreInfos
  },
  data() {
    return {
      isAdmin: false,
      showMoreDetails:  false
    };
  },
  props: {
    notification: {
      default: {
        notificacao: '',
        valor: 0,
        enviado_em: '',
        nome: ''
      },
    },
  },
  mounted() {
    this.isAdmin = JSON.parse(localStorage.getItem("user")).roles === 'ADM' ? true : false;
    this.convertData()
  },
  methods: {
    convertData() {
      const day = this.$props.notification.enviado_em
      return `${moment(day).locale('pt-br').format('DD')} de ${moment(day).locale('pt-br').format('MMM')} de ${moment(day).locale('pt-br').format('YYYY')} às ${moment(day).format('HH:mm')}`
    },
  }
}
</script>

<style lang="scss" scoped>
  .list {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    width: 100vw;
    height: 80px;
    border-top: solid 10px #f5f5f5;
    cursor: pointer;

    &__container {
      display: flex;
      margin: 0 10px 10px 10px;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    &__notification {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      margin-top: 10px;
    }

    &__text {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    &__message {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 90%;
    }

    &__icon {
      margin-right: 10px;
    }
    
    &__date {
      display: flex;
      justify-content: space-between;
      width: calc(100% - 30px);
      font-size: 12px;
      left: 10px;
      color: gray;

      .more-infos {
        color: blue;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
</style>