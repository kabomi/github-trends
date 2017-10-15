import Vuex from 'vuex'

import fetchMock from 'fetch-mock'
import { immutable } from '../tools'
import RepoListData from './RepoList'
import RepoIssuesData from './RepoIssues'



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
		it('updates issues', () => {
			const expectedState = jasmine.objectContaining({
				number: jasmine.any(Number),
				user: jasmine.any(String),
				user_url: jasmine.any(String),
				comments: jasmine.any(Number),
				avatar: jasmine.any(String),
				title: jasmine.any(String),
				body: jasmine.any(String),
			})
			mutations.setIssues(state, immutable(RepoIssuesData))
			expect(state.issues).toContain(expectedState)
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
				issues: [],
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
			const previousItemsState = state.items

			store.dispatch('updateRepositories').finally((data) => {
				expect(state.items).toEqual([])
				expect(state.items).not.toBe(previousItemsState)
				expect(state.error).not.toBe('')
				done()
			})
		})

		it('update issues', (done) => {
			fetchMock.mock(/.*/, immutable(RepoIssuesData))
			const expectedState = {}
			state.selectedRepo = { name: 'test', user: 'test' }
			mutations.setIssues(expectedState, immutable(RepoIssuesData))

			store.dispatch('updateIssues').finally((data) => {

				expect(state.issues).toEqual(expectedState.issues)
				expect(state.error).toBe('')
				done()
			})
		})

		it('does not update issues on error', (done) => {
			fetchMock.mock(/.*/, 500)
			state.selectedRepo = { name: 'test', user: 'test' }
			mutations.setIssues(state, immutable(RepoIssuesData))

			store.dispatch('updateIssues').finally((data) => {
				expect(state.issues).toEqual([])
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
		it('gets repository url', () => {
			state.selectedRepo = selectedRepo
			expect(getters.repoUrl()).toEqual(`https://github.com/${selectedRepo.user}/${selectedRepo.name}`)
		})
		it('gets issues', () => {
			state.issues = [{name: 'test'}]
			expect(getters.repoIssues()).toBe(state.issues)
		})
		it('gets issue\'s author', () => {
			state.issues = [{user: 'test'}]
			expect(getters.issueAuthor(state.issues[0])).toBe('https://github.com/test')
		})
		it('gets issue\'s url', () => {
			state.selectedRepo = selectedRepo
			state.issues = [{number: 0}]
			expect(getters.issueUrl(state.issues[0])).toBe(`https://github.com/${selectedRepo.user}/${selectedRepo.name}/issues/0`)
		})
	})
})
