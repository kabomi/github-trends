import Vue from 'vue'
import Router from 'vue-router'
import RepoList from '@/components/RepoList'
import RepoDetail from '@/components/RepoDetail'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			alias: '/repo',
			name: 'repositories',
			component: RepoList,
			children: [
				{
					path: '/repo/:name',
					name: 'repo',
					component: RepoDetail
				}
			]
		},
	]
})
