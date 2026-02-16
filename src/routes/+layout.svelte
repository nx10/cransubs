<script lang="ts">
	import '../app.css';
	import { toggleTheme, getIsDark } from '$lib/theme.svelte.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';

	let { children } = $props();
</script>

<div class="fixed top-3 right-3 z-50">
	<Button variant="ghost" size="icon-sm" onclick={toggleTheme} aria-label="Toggle dark mode">
		{#if getIsDark()}
			<Sun class="size-4" />
		{:else}
			<Moon class="size-4" />
		{/if}
	</Button>
</div>

{@render children()}
