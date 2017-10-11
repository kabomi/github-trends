<template>
  <div>
    <b-table
    		v-if="showList"
        hover
        show-empty
        @row-clicked="onSelectRepo"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :items="items"
        :fields="fields">
      <template slot="avatar" scope="row">
        <b-img rounded width="25"
          height="25"  alt="img" class="m-1"
          :src="row.value"/>
      </template>
    </b-table>
    <transition>
	    <router-view
	    	class="nested-child"></router-view>
	  </transition>
  </div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'

	export default {
		data () {
			return {

				sortBy: 'age',
				sortDesc: false,
				fields: [
					{ key: 'name', sortable: true },
					{ key: 'user', sortable: true },
					{ key: 'avatar', sortable: false },
					{ key: 'url', sortable: false },
					{ key: 'forks', sortable: true },
					{ key: 'stars', sortable: true },
					{ key: 'open_issues', sortable: true },
				]
			}
		},
		beforeRouteEnter (to, from, next) {
			next((vm) => {
				vm.displayRepoList(!to.params.name)
			})
		},
		beforeRouteUpdate (to, from, next) {
			this.displayRepoList(!to.params.name)
			next()
		},
		computed: {
			items() {
				return this.$store.state.items
			},
			showList() {
				return this.isRepoListVisible()
			},
			...mapGetters([
				'isRepoListVisible',
			])
		},
		methods: {
			onSelectRepo (repo) {
				this.$router.push({ name: 'repo', params: { name: repo.name } })
			},
			...mapActions([
				'displayRepoList'
			]),
		},
	}
</script>
