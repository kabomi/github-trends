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
				commit('setRepositories', [])
				commit('setError', error)
				resolve()
			})
		})
	},
	updateIssues ({ commit, state }) {
		const issuesUrl = 'https://api.github.com/repos/asciimoo/colly/issues'
		return new Promise((resolve, reject) => {
			fetch(issuesUrl).then((response) => {
				if (response.ok) {
					return response.json()
				}
				throw new Error('Network response was not ok.')
			})
			.then((data) => {
				commit('setIssues', data)
				resolve()
			})
			.catch((error) => {
				console.log('harry petas', error)
				commit('setIssues', [])
				commit('setError', error)
				resolve()
			})
		})
	},
	selectRepo({ commit }, repoName) {
		commit('setSelectedRepo', repoName)
	},
}

export default actions
