<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { toggleTheme, getIsDark } from '$lib/theme.svelte.js';
	import { getSubrepo } from '$lib/stores.svelte.js';
	import { iso2ago } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { TooltipProvider } from '$lib/components/ui/tooltip/index.js';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import Package from '@lucide/svelte/icons/package';

	let { children } = $props();

	let totalPackages = $derived(
		getSubrepo().then((subrepo) => subrepo.queues.reduce((sum, q) => sum + q.queue.length, 0))
	);

	let subrepoData = $derived(
		getSubrepo().then((subrepo) => ({
			captureTime: subrepo.capture_time,
			captureDuration: subrepo.capture_duration,
			updateInterval: subrepo.update_interval
		}))
	);

	let isHome = $derived(page.url.pathname === `${base}/` || page.url.pathname === base);
</script>

<Toaster />
<TooltipProvider>

<div class="flex min-h-screen flex-col">
	<!-- Sticky navbar -->
	<header
		class="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-lg"
	>
		<nav class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
			<a
				href="{base}/"
				class="text-foreground text-lg font-semibold tracking-tight transition-colors hover:opacity-80"
			>
				CRAN Submissions
			</a>

			<div class="flex items-center gap-1">
				{#await totalPackages then count}
					<div
						class="bg-muted text-muted-foreground mr-2 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors"
					>
						<Package class="size-3" />
						{count} packages
					</div>
				{/await}

				<a
					href="{base}/about"
					class="text-muted-foreground hover:text-foreground rounded-md px-3 py-1.5 text-sm transition-colors"
					class:text-foreground={page.url.pathname.includes('/about')}
				>
					About
				</a>

				<Button
					variant="ghost"
					size="icon-sm"
					onclick={toggleTheme}
					aria-label="Toggle dark mode"
					class="ml-1"
				>
					{#if getIsDark()}
						<Sun class="size-4" />
					{:else}
						<Moon class="size-4" />
					{/if}
				</Button>
			</div>
		</nav>
	</header>

	<!-- Main content -->
	<main class="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="border-t">
		<div
			class="text-muted-foreground mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs"
		>
			{#await subrepoData then data}
				<span>
					Updated {iso2ago(data.captureTime)} in {data.captureDuration / 1000}s. Refreshes every {data.updateInterval / 60} min.
				</span>
			{/await}

			<div class="flex items-center gap-3">
				<a
					href="https://github.com/nx10/cransubs"
					class="hover:text-foreground transition-colors"
				>
					GitHub
				</a>
				<a
					href="https://github.com/nx10/cransubs/issues"
					class="hover:text-foreground transition-colors"
				>
					Report Issue
				</a>
			</div>
		</div>
	</footer>
</div>

</TooltipProvider>
