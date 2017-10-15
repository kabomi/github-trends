<template>
	<b-modal id="modalDialog" size="lg" v-model="show"
	@hidden="onHidden"
	title="Issues" ok-only>
  	<b-table
    		v-if="ready"
        hover
        show-empty
        @row-clicked="onSelectIssue"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :items="issues"
        :fields="fields">
      <template slot="avatar" scope="data">
      	<a :href="getUserUrl(data.item)" v-b-tooltip :title="data.item.user">
	        <b-img rounded width="40"
	          height="40"  alt="img" class="m-1"
	          :src="data.value"/>
        </a>
      </template>
      <template slot="title" scope="data">
      	<a :href="getIssueUrl(data.item)">
	        {{ data.value }}
        </a>
      </template>
      <template slot="body" scope="data">
      	<p class="truncateH100" :title="data.item.body">
	        {{ data.value }}
        </p>
      </template>
      <template slot="comments" scope="data">
      	<b-badge pill variant="success">
	        {{ data.value }}
        </b-badge>
      </template>
    </b-table>
  </b-modal>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'

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
					{ key: 'title', sortable: true, class: 'columnW200' },
					{ key: 'body', sortable: false },
					{ key: 'comments', sortable: true },
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
				return this.$store.state.issues
			},
			ready() {
				return !this.loading
			},
			...mapGetters([
				'selectedRepo',
				'repoIssues',
				'issueAuthor',
				'issueUrl'
			])
		},
		methods: {
			fetchData () {
				this.loading = true

				this.updateIssues().then((response) => {
					this.loading = false
				})
			},
			getUserUrl(issue) {
				return this.issueAuthor(issue)
			},
			getIssueUrl(issue) {
				return this.issueUrl(issue)
			},
			onHidden (ev) {
				this.$router.push({ name: 'repo', params: { name: this.selectedRepo().name } })
			},
			onSelectIssue(rowEvent) {
			},
			...mapActions([
				'updateIssues'
			])
		},
	}
</script>

<style>
.columnW200 {
	min-width: 200px
}
.truncateH100 {
	overflow: hidden;
  text-overflow: ellipsis;
  max-height: 100px;
}
</style>
