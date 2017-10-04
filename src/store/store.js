import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  error: '',
  items: []
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  setRepositories (state, items) {
    state.items = items.map(({
      name, owner: { login },
      watchers, open_issues,
      url, stargazers_count
    }) => {
      return {
        name: name,
        user: login,
        watchers: watchers,
        open_issues: open_issues,
        url: url,
        stars: stargazers_count
      }
    })
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {

  fetchRepositories ({ commit }) {
    const trendingUrl = 'https://api.github.com/search/repositories?sort=stars&order=desc&q=language:javascript&q=created:>2017-09-27'
    return fetch(trendingUrl).then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.')
    })
    .then((data) => {
      commit('setRepositories', data.items)
    })
    .catch((error) => {
      this.error = 'There has been a problem: ' + error.message
    })
  },
  someMethod ({ commit }) {
    return new Promise((resolve, reject) => {

    })
  },
}

// getters are functions
const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
