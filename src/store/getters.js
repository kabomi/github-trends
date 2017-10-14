// getters are functions
export default {
	selectedRepo: ({ selectedRepo }) => () => selectedRepo,
	repoUrl: ({ selectedRepo: repo }) => () => {
		if (repo) { return `https://github.com/${repo.user}/${repo.name}` }
	}
}
