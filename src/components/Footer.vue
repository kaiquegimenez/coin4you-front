<template>
  <div class="footer">
      <div @click="goTo('Home')" class="footer__icon">
        <img v-if="currentRoute !== 'Home'" src="../assets/icons/home.svg" width="30px" height="30px" alt="">
        <img v-if="currentRoute === 'Home'" src="../assets/icons/home_yellow.svg" width="30px" height="30px" alt="">
        Início
      </div>
      <div @click="goTo('Wallet')" class="footer__icon">
        <img v-if="currentRoute !== 'Wallet'" src="../assets/icons/wallet.svg" width="30px" height="30px" alt="">
        <img v-if="currentRoute === 'Wallet'" src="../assets/icons/wallet_yellow.svg" width="30px" height="30px" alt="">
        Extrato
      </div>
      <div class="footer__pay">
        <img src="../assets/icons/kriptocoin.svg" alt="">
        Pagar
      </div>
      <div @click="goTo('Notifications')" class="footer__icon">
        <img v-if="currentRoute !== 'Notifications'" src="../assets/icons/notifications.svg" width="30px" height="30px" alt="">
        <img v-if="currentRoute === 'Notifications'" src="../assets/icons/notifications_yellow.svg" width="30px" height="30px" alt="">
        Notificações
      </div>
      <div @click="goTo('Store')" class="footer__icon">
        <img v-if="currentRoute !== 'Store'" src="../assets/icons/store.svg" width="30px" height="30px" alt="">
        <img v-if="currentRoute === 'Store'" src="../assets/icons/shopping_bag.svg" width="30px" height="30px" alt="">
        Loja
      </div>  
    </div>
</template>

<script>
export default {
  data() {
    return {
      currentRoute: 'Home'
    }
  },
  methods: {
    goTo(name) {
      /* eslint-disable no-debugger */
      if(name !== this.currentRoute) {
        this.$router.push({ name });
        this.currentRoute = name;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: space-around;
    border-top: solid 1px #80808047;
    background-color: white;
    margin: 0px auto;
    position: fixed;
    bottom: 0;
    z-index: 2;
  }

  .footer__pay {
    transform: translateY(-13px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.8em;
    color: #f3c011;
    z-index: 0;
    cursor: pointer;
  }
  .footer__icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.8em;
    color: #f3c011;
    width: 20%;
    cursor: pointer;
  }
</style>