const changeMessage = ({ commit }, message) => {
  commit('SETMESSAGE', message)
}

const changeVisible = ({ commit }, visible) => {
  commit('SETVISIBLE', visible)
}
const changeType = ({ commit }, type) => {
  commit('SETTYPE', type)
}

export {
  changeMessage,
  changeVisible,
  changeType,
}
