import Vuex from 'vuex'

import fetchMock from 'fetch-mock'
import { immutable } from '../tools'
import RepoListData from './RepoList'



describe('Store', () => {
	let store, state, mutations, getters, storeOptions

	beforeAll(() => {
		const storeOptionsInjector = require('inject-loader!../../../src/store')
		// create the module with our mocks
		storeOptions = storeOptionsInjector({})
	})

	beforeEach(() => {
		store = new Vuex.Store(storeOptions)
		state = store.state
		mutations = storeOptions.mutations
		getters = store.getters
	})

	afterEach(() => {
		fetchMock.restore()
		mutations.reset(state)
	})

	describe('Mutations', () => {
		it('updates repositories', () => {
			const expectedState = jasmine.objectContaining({
				name: jasmine.any(String),
				user: jasmine.any(String),
				avatar: jasmine.any(String),
				forks: jasmine.any(Number),
				stars: jasmine.any(Number),
				open_issues: jasmine.any(Number),
			})
			mutations.setRepositories(state, immutable(RepoListData.items))
			expect(state.items).toContain(expectedState)
		})
		it('sets selected repo', () => {
			state.items = [ { name: 'test' }, { name: 'test2' } ]

			mutations.setSelectedRepo(state, 'test2')

			expect(state).toEqual(jasmine.objectContaining({
				error: '',
				items: state.items,
				selectedRepo: state.items[1]
			}))
		})
		it('resets state', () => {
			state.error = 'something'
			state.items = ['something']

			mutations.reset(state)

			expect(state).toEqual(jasmine.objectContaining({
				error: '',
				items: [],
				selectedRepo: null
			}))
		})
	})

	describe('Actions', () => {
		it('updates repositories', (done) => {
			fetchMock.mock(/.*/, immutable(RepoListData))
			const expectedState = {}
			mutations.setRepositories(expectedState, immutable(RepoListData.items))

			store.dispatch('updateRepositories').finally((data) => {

				expect(state.items).toEqual(expectedState.items)
				expect(state.error).toBe('')
				done()
			})
		})

		it('does not update repositories on error', (done) => {
			fetchMock.mock(/.*/, 500)
			const expectedState = {}
			mutations.setRepositories(expectedState, immutable(RepoListData.items))

			expect(state.items.length).toBe(0)
			store.dispatch('updateRepositories').finally((data) => {

				expect(state.items).toEqual([])
				expect(state.error).not.toBe('')
				done()
			})
		})
	})
	describe('Getters', () => {
		const selectedRepo = {
			name: 'test',
			user: 'user'
		}
		it('gets selected repo', () => {
			state.selectedRepo = selectedRepo
			expect(getters.selectedRepo()).toBe(state.selectedRepo)
		})
		it('gets repository url by name', () => {
			state.selectedRepo = selectedRepo
			expect(getters.repoUrl('repoName')).toEqual(`https://github.com/${selectedRepo.user}/repoName`)
		})
	})
})
