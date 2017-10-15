// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
export default {
	setRepositories (state, items) {
		state.items = items.map(({
			name, description, owner: { login, avatar_url },
			forks, open_issues,
			url, stargazers_count
		}) => {
			return {
				name: name,
				description: description,
				user: login,
				avatar: avatar_url,
				forks: forks,
				open_issues: open_issues,
				url: url,
				stars: stargazers_count
			}
		})
	},
	setIssues (state, items) {
		state.issues = items.map(({
			number, user: { login, avatar_url, url: user_url },
			title, body,
			url, comments
		}) => {
			return {
				number: number,
				title: title,
				user: login,
				user_url: user_url,
				avatar: avatar_url,
				body: body,
				comments: comments,
				url: url,
			}
		})
	},
	setSelectedRepo (state, repoName) {
		state.selectedRepo = state.items.filter((repo) => repo.name === repoName)[0]
	},
	setError (state, error) {
		state.error = 'There has been a problem: ' + error.message
	},
	reset(state) {
		state.error = ''
		state.items = []
		state.issues = []
		state.selectedRepo = null
	}
}
