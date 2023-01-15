import { createStore, createLogger } from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
import * as getters from './getters'
import * as actions from './actions'
const debug=process.env.NODE_ENV!=='production'
export default createStore({
  state,
  getters,
  mutations,
  actions,
  strict:debug,
  plugins:debug?[createLogger()]:[]
})
