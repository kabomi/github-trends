import Vue from 'vue'
import Vuex from 'vuex'

import router from '../../../src/router'
import fetchMock from 'fetch-mock'
import { immutable } from '../tools'
import RepoListData from './RepoList'

import RepoDetail from '@/components/RepoDetail'

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)


describe('RepoDetail', () => {
	let vm, component, store, mutations, state, storeOptions

	beforeAll(() => {
		const storeOptionsInjector = require('inject-loader!../../../src/store')
		// create the module with our mocks
		storeOptions = storeOptionsInjector({})
	})

	beforeEach((done) => {
		store = new Vuex.Store(storeOptions)
		state = store.state
		mutations = storeOptions.mutations
		vm = new Vue({
			template: '<div><test></test></div>',
			store: store,
			router: router,
			components: {
				'test': RepoDetail
			}
		}).$mount()
		component = vm.$children[0]

		fetchMock.mock(/.*/, immutable(RepoListData))

		store.dispatch('updateRepositories').finally((data) => {
			mutations.setSelectedRepo(state, RepoListData.items[0].name)
			Vue.nextTick(() => {
				done()
			})
		})
	})

	afterEach(() => {
		fetchMock.restore()
		mutations.reset(state)
	})

	it('should render correct contents', () => {
		const issuesElement = component.$el.querySelector('#issuesButton')
		expect(issuesElement)
			.not.toBe(null)
	})

	it('navigates to open issues list', () => {
		spyOn(component.$router, 'push')
		const issuesElement = component.$el.querySelector('#issuesButton')
		issuesElement.click()

		expect(component.$router.push).toHaveBeenCalledWith(
			jasmine.objectContaining({name: 'issues'}))
	})

	xit('selects repo from url when component is initialized the first time', (done) => {
		// spyOn(RepoDetail, 'beforeRouteEnter').and.callThrough()
		spyOn(component, 'selectRepo')

		router.push({ name: 'repo', params: [{name: 'teachable-machine'}] }, () => {
			spyOn(router, 'push')
			Vue.nextTick(() => {
				expect(component.selectRepo).toHaveBeenCalledWith('teachable-machine')
				expect(router.push).not.toHaveBeenCalled()
				done()
			})

			// expect(RepoDetail.beforeRouteEnter).toHaveBeenCalled()

		})

	})
})
