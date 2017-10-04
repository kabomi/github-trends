<template>
  <div>
    <b-table :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :items="$store.state.items"
             :fields="fields">
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
          { key: 'url', sortable: false },
          { key: 'watchers', sortable: true },
          { key: 'stars', sortable: true },
          { key: 'open_issues', sortable: true },
        ]
      }
    }
  }
</script>
