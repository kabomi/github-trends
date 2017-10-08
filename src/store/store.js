import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import state from './state'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
const store = new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})

export default store
