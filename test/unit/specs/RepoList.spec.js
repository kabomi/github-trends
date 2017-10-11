import Vue from 'vue'
import Vuex from 'vuex'

import router from '../../../src/router'
import fetchMock from 'fetch-mock'
import { immutable } from '../tools'
import RepoListData from './RepoList'

import RepoList from '@/components/RepoList'

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)


describe('RepoList', () => {
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
				'test': RepoList
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
		const tableElement = component.$el.querySelector('table')
		expect(tableElement)
			.not.toBe(null)
		expect(tableElement.querySelectorAll('tbody tr').length)
			.toBe(RepoListData.items.length)
	})

	it('navigates to selected repo', () => {
		spyOn(component.$router, 'push')

		component.onSelectRepo({ name: 'test' })

		expect(component.$router.push).toHaveBeenCalledWith(
			jasmine.objectContaining({name: 'repo', params: { name: 'test' }}))
	})
})
