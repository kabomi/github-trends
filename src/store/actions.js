// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {

	updateRepositories ({ commit, state }) {
		const trendingUrl = 'https://api.github.com/search/repositories?sort=stars&order=desc&q=language:javascript&q=created:>2017-09-27'
		return new Promise((resolve, reject) => {
			if (state.items.length > 0) {
				// cached
				return resolve()
			}
			fetch(trendingUrl).then((response) => {
				if (response.ok) {
					return response.json()
				}
				throw new Error('Network response was not ok.')
			})
			.then((data) => {
				commit('setRepositories', data.items)
				resolve()
			})
			.catch((error) => {
				commit('setError', error)
				resolve()
			})
		})
	},
	selectRepo({ commit }, repoName) {
		commit('setSelectedRepo', repoName)
	},
	displayRepoList({ commit }, isVisible) {
		commit('setRepoListVisibility', isVisible)
	}
}

export default actions
