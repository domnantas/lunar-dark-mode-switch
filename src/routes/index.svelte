<script>
	import DarkModeSwitch from '$lib/components/DarkModeSwitch.svelte';
</script>

<main>
	<DarkModeSwitch />
</main>

<style>
	:global(body, html) {
		margin: 0;
		height: 100%;
	}

	:global(:root) {
		--background-color: #fcf8f9;
		--foreground-color: #2e3232;
		--primary-color: #ea5559;
		--secondary-color: #e8e3dd;
	}

	:global(body.dark) {
		--background-color: #2f3132;
		--foreground-color: #fcf8f9;
	}

	main {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--background-color);
		color: var(--foreground-color);
		transition: 0.3s ease;
	}
</style>
