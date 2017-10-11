// getters are functions
export default {
	selectedRepo: ({ selectedRepo }) => () => selectedRepo,
	isRepoListVisible: ({ isRepoListVisible }) => () => isRepoListVisible,
	repoUrl: ({ selectedRepo: repo }) => (repoName) => `https://github.com/${repo.user}/${repoName}`
}
