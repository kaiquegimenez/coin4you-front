<template>
<div>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h3>Informações da compra</h3>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body"> 
              <span>{{infos.nome}} comprou {{infos.notificacao}}</span>
              <h3 style="margin: 5px 0">Dados de envio</h3>
              <span><b>Endereço:</b> {{infos.rua}}, {{infos.numero}} - {{infos.bairro}}, {{infos.cidade}}/{{infos.estado}} - {{infos.cep}}</span>
              <p style="margin: 5px 0"><b>Telefone de contato:</b> {{infos.telefone}}</p>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="button button__cancel" @click="$emit('close')">
                Fechar
              </button>
              <!-- <button class="button button__confirm" @click="confirm()">
                Confirmar
              </button> -->
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
export default {
  name:'DialogMoreInfos',
  data() {
    return {
    }
  },
  props: {
    infos: {}
  },
  mounted() {
    console.log(this.infos)
  },
  methods: {
    confirm(){
      /* eslint-disable no-debugger */
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}


.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  border-top: 1px solid #f3c011;
  border-bottom: 1px solid white;
  width: 90%;
  height: 40%;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 0px 0px 0px;
  background-color: #f3c011;
  border: 1px solid #f3c011;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  h3{
    color: white;
  }
}

.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 10px;
  .input {
    border: 1px solid rgba(0, 0, 0, 0.425);
    height: 40px;
    padding: 5px;
    border-radius: 5px;
    margin: 5px;
  }
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 20px 10px 0px 0px;
  .button {
    &__confirm {
      background-color: #f3c011;
      color: white;
    }
    &__cancel {
      background-color: white;
      color: #f3c011;
    }
    border: 1px solid #f3c011;
    border-radius: 10px;
    height: 30px;
    width: 100px;
    margin: 5px;
    cursor: pointer;
  }
}


.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>