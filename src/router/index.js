import Vue from 'vue'
import Router from 'vue-router'
import RepoList from '@/components/RepoList'
import RepoDetail from '@/components/RepoDetail'
import RepoIssues from '@/components/RepoIssues'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: 'repo'
		},
		{
			path: '/repo',
			name: 'repositories',
			component: RepoList,
			children: [
				{
					path: ':name',
					name: 'repo',
					component: RepoDetail,
					children: [
						{
							path: 'issues',
							name: 'issues',
							component: RepoIssues
						}
					]
				}
			]
		},
	]
})
