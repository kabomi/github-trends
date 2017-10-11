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
		mutations.setSelectedRepo(state, RepoListData.items[0].name)
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

			done()
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
})
