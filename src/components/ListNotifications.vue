<template>
  <div class="list">
    <div class="list__container">
      <div class="list__notification">
        <div class="list__text">
          <span> <b>{{notification.person}}</b> te mandou {{notification.valor}}KC </span>
          <span class="list__message">{{notification.description}}</span>
        </div>
      </div>
    </div>
    <div class="list__date">
      10 de nov às 16:58
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListNotifications',
  data() {
    return {};
  },
  props: {
    notification: {
      default: {
        description: '',
        valor: 0,
        type: '',
        person: ''
      },
    },
  },
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
      font-size: 12px;
      position: absolute;
      bottom: 5px;
      left: 10px;
      color: gray;
    }
  }
</style>