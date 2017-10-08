<template>
  <div n-if="repo" class="text-center">
  	<b-card :title="repo ? repo.name : ''"
  			:img-src="repo ? repo.avatar : ''"
        img-alt="Image"
        img-top
        style="max-width: 20rem; margin: auto"
        class="mb-2">
      <b-card-header>
      	{{ repo ? repo.description : '' }}
      </b-card-header>
  		<b-list-group flush>
        <b-list-group-item>
        	<a :href="repo ? userUrl : '#'"
          		class="card-link">Go To Repository</a>
        </b-list-group-item>
        <b-list-group-item>
        	<b-row>
        		<b-col align="end">
        			Stars
        		</b-col>
        		<b-col align="start">
        			<b-badge pill variant="success">{{ repo ? repo.stars : '' }}</b-badge>
        		</b-col>
        	</b-row>
        </b-list-group-item>
        <b-list-group-item>
        	<b-row>
        		<b-col align="end">
        			Forks
        		</b-col>
        		<b-col align="start">
        			<b-badge pill>{{ repo ? repo.forks : '' }}</b-badge>
        		</b-col>
        	</b-row>
        </b-list-group-item>
      </b-list-group>
      <p class="text-card"></p>
	    <b-button :href="repo ? issuesUrl : '#'">
	    	Open Issues <b-badge pill variant="warning">{{ repo ? repo.open_issues : '' }}</b-badge>
	    </b-button>
  	</b-card>
  </div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				routeName: ''
			}
		},
		beforeRouteEnter (to, from, next) {
			next((vm) => {
				vm.$data.routeName = to.params.name

				vm.selectRepo(vm.name)

				vm.$emit('init')
			})
		},
		computed: {
			name() {
				// return this.$store.state.selectedRepo.name
				return this.$data.routeName
			},
			repo() {
				return this.$store.state.selectedRepo
			},
			userUrl() {
				return `https://github.com/${this.repo.user}/${this.name}`
			},
			issuesUrl() {
				return `${this.userUrl}/issues`
			}
		},
		methods: {
			...mapActions([
				'selectRepo'
			])
		}
	}
</script>
