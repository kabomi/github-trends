// getters are functions
const baseUrl = 'https://github.com/'
export default {
	selectedRepo: ({ selectedRepo }) => () => selectedRepo,
	repoUrl: ({ selectedRepo: repo }) => () => {
		if (repo) { return `${baseUrl}${repo.user}/${repo.name}` }
	},
	repoIssues: ({ issues }) => () => issues,
	issueAuthor: (state) => (issue) => {
		if (issue) { return `${baseUrl}${issue.user}` }
	},
	issueUrl: (state, getters) => (issue) => {
		if (issue) { return `${getters.repoUrl()}/issues/${issue.number}` }
	}
}
