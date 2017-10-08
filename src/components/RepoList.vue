<template>
  <div>
    <b-table
        hover
        show-empty
        @row-clicked="onSelectRepo"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :items="$store.state.items"
        :fields="fields">
      <template slot="avatar" scope="row">
        <b-img rounded width="25"
          height="25"  alt="img" class="m-1"
          :src="row.value"/>
      </template>
    </b-table>
  </div>
</template>

<script>
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
					{ key: 'watchers', sortable: true },
					{ key: 'stars', sortable: true },
					{ key: 'open_issues', sortable: true },
				]
			}
		},
		methods: {
			onSelectRepo ({ name }) {
				this.$router.push({ name: 'repo', params: { name } })
			}
		}
	}
</script>
