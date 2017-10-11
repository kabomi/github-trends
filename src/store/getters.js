// getters are functions
export default {
	selectedRepo: ({ selectedRepo }) => () => selectedRepo,
	repoUrl: ({ selectedRepo: repo }) => (repoName) => `https://github.com/${repo.user}/${repoName}`
}
