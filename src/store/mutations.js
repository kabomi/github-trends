// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
export default {
	setRepositories (state, items) {
		state.items = items.map(({
			name, owner: { login, avatar_url },
			watchers, open_issues,
			url, stargazers_count
		}) => {
			return {
				name: name,
				user: login,
				avatar: avatar_url,
				watchers: watchers,
				open_issues: open_issues,
				url: url,
				stars: stargazers_count
			}
		})
	},
	setError (state, error) {
		state.error = 'There has been a problem: ' + error.message
	},
	reset(state) {
		state.error = ''
		state.items = []
	}
}
