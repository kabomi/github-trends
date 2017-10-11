<template>

  <div v-if="repo" class="text-center">
  	<b-card :title="repo.name"
  			:img-src="repo.avatar"
        img-alt="Image"
        img-top
        style="max-width: 20rem; margin: auto"
        class="mb-2">
      <b-card-header>
      	{{ repo.description }}
      </b-card-header>
  		<b-list-group flush>
        <b-list-group-item>
        	<a :href="url"
          		class="card-link">Go To Repository</a>
        </b-list-group-item>
        <b-list-group-item>
        	<b-row>
        		<b-col align="end">
        			Stars
        		</b-col>
        		<b-col align="start">
        			<b-badge pill variant="success">{{ repo.stars }}</b-badge>
        		</b-col>
        	</b-row>
        </b-list-group-item>
        <b-list-group-item>
        	<b-row>
        		<b-col align="end">
        			Forks
        		</b-col>
        		<b-col align="start">
        			<b-badge pill>{{ repo.forks }}</b-badge>
        		</b-col>
        	</b-row>
        </b-list-group-item>
      </b-list-group>
      <p class="text-card"></p>
	    <b-button id="issuesButton" :to="{ name: 'issues'}">
	    	Open Issues <b-badge pill variant="warning">{{ repo.open_issues }}</b-badge>
	    </b-button>
  	</b-card>
  </div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				repoName: ''
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
				return this.repoName
			},
			repo() {
				return this.selectedRepo()
			},
			url() {
				return this.repoUrl(this.name)
			},
			issuesUrl() {
				return `${this.url}/issues`
			},
			...mapGetters([
				'repoUrl',
				'selectedRepo',
			])
		},
		methods: {
			...mapActions([
				'selectRepo'
			])
		}
	}
</script>
