// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {

  fetchRepositories ({ commit, state }) {
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
      state.error = 'There has been a problem: ' + error.message
    })
  },
}

export default actions
