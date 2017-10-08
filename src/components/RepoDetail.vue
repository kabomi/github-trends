<template>
  <div>
    {{ name }}
  </div>
</template>

<script>
	export default {
		computed: {
			name() {
				// return this.$store.state.selectedRepo.name
				return this.$router.history.current.params.name
			}
		},
	}
</script>
