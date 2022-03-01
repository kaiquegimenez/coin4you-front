<template>
  <transition name="fade">
    <div v-if="visible" class="container w-100">
      <div class="toast" :class="[bgColor]">
       
        <span class="toast__text">{{ message }}</span>
        <span class="toast__close" @click="close()">
          <img src="../assets/icons/close_white.svg" alt="">
        </span>
        
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    duration: {
      type: Number,
      default: 3500
    },
  },

  computed: {
    ...mapState('toast', ['message', 'visible', 'type']),

    iconName() {
      const icons = {
        info: "icon-info-outline",
        success: "icon-success-outline",
        warning: "icon-warning-outline",
        danger: "icon-warning",
      };

      return icons[this.type] || icons.info;
    },

    bgColor() {
      const colors = {
        info: "bg-light-blue",
        success: "bg-green",
        warning: "bg-mustard",
        danger: "bg-red-2",
      };

      return colors[this.type] || colors.info;
    },
  },

  mounted() {
    setTimeout(() => {
      this.close();
    }, this.$props.duration);
  },

  methods: {
    close(){
      this.$store.dispatch('toast/changeVisible', false)
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px;
  width: 100%;

  &.desktop {
    width: 500px;
    left: 50%;
    transform: translateX(-50%);
  }
  z-index: 3000;
}

.toast {
  padding: 10px;
  width: 100%;
  min-height: 50px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  color: white;

  &__icon {
    flex: 0 0 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__text {
    line-height: 16px;
    font-size: 14px;
    flex-grow: 1;
    padding: 6px 0;
  }

  &__close {
    flex: 0 0 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>