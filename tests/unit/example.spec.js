import { shallowMount } from '@vue/test-utils'
import DialogMoreInfos from '@/components/DialogMoreInfos.vue'
import Dialog from '@/components/Dialog.vue'

describe('DialogMoreInfos.vue', () => {
  const infos = {
    nome: 'Kaique',
    notificacao: 'teste',
    rua: '7 de setembro',
    numero: '13',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '96205200',
    telefone: '11997152328'
  }
  it('Verifica se está mostrando o nome da pessoa e do item comprado corretamente', () => {
    const wrapper = shallowMount(DialogMoreInfos,
      {propsData: {infos}})
    expect(wrapper.find('#name').text()).toEqual('Kaique comprou teste')
  })
  it('Verifica se está mostrando as informações do comprador corretamente', () => {
    const wrapper = shallowMount(DialogMoreInfos,
      {propsData: {infos}})
    expect(wrapper.find('#compra').text()).toEqual('Endereço: 7 de setembro, 13 - Centro, São Paulo/SP - 96205200')
  })
  it('Verifica se está mostrando o telefone corretamente', () => {
    const wrapper = shallowMount(DialogMoreInfos,
      {propsData: {infos}})
    expect(wrapper.find('#telefone').text()).toEqual('Telefone de contato: 11997152328')
  })
})

describe('Dialog.vue', () => {
  const person = {
    nome: 'Kaique'
  }
  it('Verifica se está mostrando o nome da pessoa que ira ser enviado os coins corretamente', () => {
    const wrapper = shallowMount(Dialog,
      {propsData: {person}})
    expect(wrapper.find('#nome').text()).toEqual('Digite o valor que deseja enviar para Kaique')
  })
})
