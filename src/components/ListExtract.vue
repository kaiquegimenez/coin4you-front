<template>
  <div class="list" :class="convertData(dateNotificationOld) !== convertData(notification.enviado_em) ? 'list__with-date' : ''">
    <div class="list__container">
      <div class="list__notification">
        <div class="list__text">
          <div class="date" v-if="convertData(dateNotificationOld) !== convertData(notification.enviado_em)">{{convertData(notification.enviado_em)}}</div>
          <span class="received" v-if="userId == notification.id_recebeu"> {{notification.valor}}KC </span>
          <span class="send" v-if="userId == notification.id_enviou"> {{notification.valor}}KC </span>
          <span class="list__message">{{notification.notificacao}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'ListExtract',
  data() {
    return {
      isAdmin: false,
    };
  },
  props: {
    dateNotificationOld: {},
    userId: {},
    notification: {
      default: {
        notificacao: '',
        valor: 0,
        enviado_em: '',
        nome: '',
        id_recebeu: '',
        id_enviou: ''
      },
    },
  },
  mounted() {
    this.convertData()
  },
  methods: {
    convertData(data) {
      const day = data
      return `${moment(day).locale('pt-br').format('DD')} de ${moment(day).locale('pt-br').format('MMM')} de ${moment(day).locale('pt-br').format('YYYY')}`
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
    height: 50px;
    border-bottom: solid 1px #00000026;
    cursor: pointer;

    .date {
      margin-bottom: 5px;
      font-size: 10px;
    }

    &__with-date {
      height: 80px;
    }

    &__container {
      display: flex;
      margin: 0 10px 5px 10px;
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

      .send {
        color: rgb(207, 3, 3);
      }

      .received {
        color: green;
      }
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