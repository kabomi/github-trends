// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {

	updateRepositories ({ commit, state }) {
		const nDays = 7
		const dateNDaysAgo = new Date(new Date().getTime() - (nDays * 24 * 60 * 60 * 1000))
			.toISOString('YYYY-MM-DD').split('T')[0]
		const reposUrl = 'https://api.github.com/search/repositories'
		const queryString = `sort=stars&order=desc&q=language:javascript&q=created:>${dateNDaysAgo}`
		const trendingUrl = `${reposUrl}?${queryString}`
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
		const repo = state.selectedRepo
		const issuesUrl = `https://api.github.com/repos/${repo.user}/${repo.name}/issues`
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
