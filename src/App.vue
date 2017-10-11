<template>
  <div id="app">
    <b-alert class="msgBox" :show="!!error">{{ error }}</b-alert>
    <div v-if="ready">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'app',
	data () {
		return {
			loading: false
		}
	},
	created () {
		// fetch the data when the view is created and the data is
		// already being observed
		this.fetchData()
	},
	watch: {
		// call again the method if the route changes
		'$route': 'fetchData'
	},
	computed: {
		error() {
			return this.$store.state.error
		},
		ready() {
			return !this.loading
		}
	},
	methods: {
		fetchData () {
			this.loading = true

			this.updateRepositories().then((response) => {
				this.loading = false
			})
		},
		...mapActions([
			'updateRepositories'
		])
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
