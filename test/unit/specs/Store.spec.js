import Vuex from 'vuex'

import fetchMock from 'fetch-mock'
import { immutable } from '../tools'
import RepoListData from './RepoList'



describe('Store', () => {
	let store, state, mutations, storeOptions

	beforeAll(() => {
		const storeOptionsInjector = require('inject-loader!../../../src/store')
		// create the module with our mocks
		storeOptions = storeOptionsInjector({})
		// storeOptions = storeOptionsInjector({
		// 	'./actions': {
		// 		fetchRepositories () {
		// 			return getResolvedPromise({ name: 'test' })
		// 		}
		// 	}
		// })
	})

	beforeEach(() => {
		store = new Vuex.Store(storeOptions)
		state = store.state
		mutations = storeOptions.mutations
	})

	afterEach(() => {
		fetchMock.restore()
		mutations.reset(state)
	})

	describe('Mutations', () => {
		it('updates repositories', ()=>{
			const expectedState= jasmine.objectContaining({
				name: jasmine.any(String),
				user: jasmine.any(String),
				avatar: jasmine.any(String),
				watchers: jasmine.any(Number),
				stars: jasmine.any(Number),
				open_issues: jasmine.any(Number),
			})
			mutations.setRepositories(state, immutable(RepoListData.items))
			expect(state.items).toContain(expectedState)
		})
		it('resets state', ()=>{
			state.error = 'something'
			state.items = ['something']

			mutations.reset(state)

			expect(state).toEqual({
				error: '',
				items: []
			})
		})
	})

	describe('Actions', () => {
		it('updates repositories', (done)=>{
			fetchMock.mock(/.*/, immutable(RepoListData))
			const expectedState= {}
			mutations.setRepositories(expectedState, immutable(RepoListData.items))

			store.dispatch('fetchRepositories').finally((data) => {

				expect(state.items).toEqual(expectedState.items)
				expect(state.error).toBe('')
				done()
			})
		})

		it('does not update repositories on error', (done)=>{
			fetchMock.mock(/.*/, 500)
			const expectedState= {}
			mutations.setRepositories(expectedState, immutable(RepoListData.items))

			expect(state.items.length).toBe(0)
			store.dispatch('fetchRepositories').finally((data) => {

				expect(state.items).toEqual([])
				expect(state.error).not.toBe('')
				done()
			})
		})
	})
})
