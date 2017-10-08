import Vue from 'vue'
import Router from 'vue-router'
import RepoList from '@/components/RepoList'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'RepoList',
			component: RepoList
		}
	]
})
