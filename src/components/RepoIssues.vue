<template>
	<b-modal id="modalDialog" v-model="show"
	@hidden="onHidden"
	title="Issues" ok-only>
  	<b-table
    		v-if="!loading"
        hover
        show-empty
        @row-clicked="onSelectIssue"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :items="issues"
        :fields="fields">
      <template slot="avatar" scope="data">
      	<a :href="getUserUrl(data.item)" v-b-tooltip :title="data.item.user">
	        <b-img rounded width="25"
	          height="25"  alt="img" class="m-1"
	          :src="data.value"/>
        </a>
      </template>
      <template slot="title" scope="data">
      	<a :href="getIssueUrl(data.item)" v-b-tooltip :title="data.item.body">
	        {{ data.value }}
        </a>
      </template>
    </b-table>
  </b-modal>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		data () {
			return {
				loading: false,
				show: true,

				sortBy: 'age',
				sortDesc: false,
				fields: [
					{ key: 'number', sortable: true },
					{ key: 'avatar', sortable: false },
					{ key: 'title', sortable: false },
					{ key: 'body', sortable: false },
				]
			}
		},
		created () {
			// fetch the data when the view is created and the data is
			// already being observed
			this.fetchData()
		},
		computed: {
			issues() {
				return [{ number: 0,
					avatar: 'https://avatars3.githubusercontent.com/u/3832179?v=4',
					title: 'Title',
					body: 'blablablablalbalbabl'}]// this.$store.state.issues
			},
			...mapGetters([
				'selectedRepo',
			])
		},
		methods: {
			fetchData () {
				// this.loading = true

				// this.updateRepositories().then((response) => {
				// 	this.loading = false
				// })
			},
			onSelectIssue (repo) {
				// this.$router.push({ name: 'repo', params: { name: repo.name } })
			},
			getUserUrl(issue) {
				console.log(issue)
				return 'https://avatars3.githubusercontent.com/u/3832179?v=4'
			},
			getIssueUrl(issue) {
				console.log(issue)
			},
			onHidden (ev) {
				this.$router.push({ name: 'repo', params: { name: this.selectedRepo().name } })
			},
		},
	}
</script>
