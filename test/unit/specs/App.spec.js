import Vue from 'vue'
import Vuex from 'vuex'

import router from '../../../src/router'
import { getResolvedPromise } from '../tools'

import App from '@/App'

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)


describe('App', () => {
	let vm, component, store, state, storeOptions

	beforeAll(() => {
		const storeOptionsInjector = require('inject-loader!../../../src/store')
		// create the module with our mocks
		storeOptions = storeOptionsInjector({
			'./actions': {
				updateRepositories () {
					return getResolvedPromise({ name: 'test' })
				}
			}
		})
	})

	beforeEach((done) => {
		store = new Vuex.Store(storeOptions)
		state = store.state
		spyOn(App, 'created')
		vm = new Vue({
			template: '<div><test></test></div>',
			store: store,
			router: router,
			components: {
				'test': App
			}
		}).$mount()
		component = vm.$children[0]


		component.updateRepositories().then((data) => {
			done()
		})
	})

	it('fetchs data on initialization', () => {
		spyOn(component, 'updateRepositories').and.callThrough()

		component.fetchData()

		expect(component.updateRepositories).toHaveBeenCalled()
	})

	it('should render correct contents', () => {
		const mainElement = component.$el.querySelector('#app')
		expect(mainElement)
			.toBeDefined()
	})
	it('should hide msg box if there is not an error', () => {
		const msgBoxElement = component.$el.querySelector('.msgBox')
		expect(msgBoxElement).toBe(null)
	})
	it('should show msg box if there is an error', (done) => {
		state.error = 'error'

		component.updateRepositories().then((data) => {
			const msgBoxElement = component.$el.querySelector('.msgBox')
			expect(msgBoxElement).not.toBe(null)
			done()
		})
	})
})
