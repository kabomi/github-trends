import Vue from 'vue'
import Vuex from 'vuex'

import router from '../../../src/router'
import { immutable, getResolvedPromise } from '../tools'
import RepoIssuesData from './RepoIssues'

import RepoIssues from '@/components/RepoIssues'

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)


describe('RepoIssues', () => {
	let vm, component, store, mutations, state, storeOptions

	beforeAll(() => {
		const storeOptionsInjector = require('inject-loader!../../../src/store')
		// create the module with our mocks
		storeOptions = storeOptionsInjector({
			'./actions': {
				updateIssues () {
					return getResolvedPromise(immutable(RepoIssuesData))
				}
			}
		})
	})

	beforeEach((done) => {
		store = new Vuex.Store(storeOptions)
		state = store.state
		mutations = storeOptions.mutations
		vm = createComponent().$mount()
		component = vm.$children[0]

		Vue.nextTick(() => {
			done()
		})
	})

	function createComponent() {
		return new Vue({
			template: '<div><test></test></div>',
			store: store,
			router: router,
			components: {
				'test': RepoIssues
			}
		})
	}

	afterEach(() => {
		mutations.reset(state)
	})

	it('fetchs data on initialization', () => {
		spyOn(component, 'updateIssues').and.callThrough()

		component.fetchData()

		expect(component.updateIssues).toHaveBeenCalled()
	})

	it('should render correct contents', () => {
		const issuesElement = component.$el.querySelector('#modalDialog')
		expect(issuesElement)
			.not.toBe(null)
	})

	it('should hide table if not ready', (done) => {
		component.$data.loading = true

		Vue.nextTick(() => {
			const tableElement = component.$el.querySelector('.table')
			expect(tableElement).toBe(null)
			done()
		})
	})
	it('should show table if ready', (done) => {
		component.$data.loading = false

		Vue.nextTick(() => {
			const tableElement = component.$el.querySelector('.table')
			expect(tableElement).not.toBe(null)
			done()
		})
	})

	it('navigates back to repo on close', () => {
		spyOn(component.$router, 'push')
		state.selectedRepo = { name: 'test' }
		state.items = [ state.selectedRepo ]

		component.onHidden()

		expect(component.$router.push).toHaveBeenCalledWith(
			jasmine.objectContaining({ name: 'repo', params: { name: 'test' } }))
	})
})
