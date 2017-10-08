<template>
  <div>
    {{ name }}
  </div>
</template>

<script>
	export default {
		data() {
			return {
				routeName: ''
			}
		},
		beforeRouteEnter (to, from, next) {
			next((vm) => {
				vm.$data.routeName = to.params.name
				vm.$emit('init')
			})
		},
		computed: {
			name() {
				// return this.$store.state.selectedRepo.name
				return this.$data.routeName
			}
		},
	}
</script>
