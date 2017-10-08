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
	    	class="nested-child"
	    	@init="hideList"></router-view>
	  </transition>
  </div>
</template>

<script>
	export default {
		data () {
			return {
				showList: true,
				sortBy: 'age',
				sortDesc: false,
				fields: [
					{ key: 'name', sortable: true },
					{ key: 'user', sortable: true },
					{ key: 'avatar', sortable: false },
					{ key: 'url', sortable: false },
					{ key: 'watchers', sortable: true },
					{ key: 'stars', sortable: true },
					{ key: 'open_issues', sortable: true },
				]
			}
		},
		computed: {
			items() {
				return this.$store.state.items
			}
		},
		methods: {
			onSelectRepo (repo) {
				this.$router.push({ name: 'repo', params: { name: repo.name } })
			},
			hideList() {
				this.$data.showList = false
			}
		},
	}
</script>
