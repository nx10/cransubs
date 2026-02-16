<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { iso2ago } from '$lib/utils.js';
	import { pkg_url_full } from '$lib/server-data.js';
	import { getSubrepo } from '$lib/stores.svelte.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import Search from '@lucide/svelte/icons/search';

	let search = $state(decodeURIComponent(page.url.hash.substring(1)) || '');

	let subrepoFiltered = $derived.by(() => {
		const currentSearch = search;
		return getSubrepo().then((subrepo) => subrepo.filter(currentSearch));
	});

	let expandedNames: Set<string> = $state(new Set());

	function expandQueue(queueName: string) {
		expandedNames = new Set([...expandedNames, queueName]);
	}
</script>

<svelte:head>
	<title>CRAN sub tracker</title>
</svelte:head>

<main class="mx-auto my-0 max-w-3xl px-2">
	<a href="{base}/">
		<div class="text-muted-foreground mt-4 mb-5 pr-2 text-center text-3xl font-bold">
			CRAN submission tracker
		</div>
	</a>

	<div class="relative mt-3">
		<Search class="text-muted-foreground absolute top-0 bottom-0 left-3 my-auto size-5" />
		<Input type="text" placeholder="Search" class="pl-10" bind:value={search} />
	</div>

	{#await subrepoFiltered}
		<div class="mt-6 space-y-4">
			{#each [0, 1, 2] as i (i)}
				<div class="space-y-2">
					<Skeleton class="h-8 w-32" />
					<Skeleton class="h-4 w-48" />
					<Skeleton class="h-40 w-full" />
				</div>
			{/each}
		</div>
	{:then subrepo}
		{#each subrepo.queues as queue (queue.info.name)}
			<Card.Card class="mt-4 py-0">
				<Card.CardHeader class="pt-4 pb-2">
					<div class="flex items-end gap-2">
						<Card.CardTitle class="text-2xl">{queue.info.name}</Card.CardTitle>
						<Badge variant="secondary">{queue.queue.length} packages</Badge>
					</div>
					<Card.CardDescription>{queue.info.description}</Card.CardDescription>
				</Card.CardHeader>
				<Card.CardContent class="px-0 pb-0">
					<div class="flex flex-col">
						{#each queue.queue as sub, idx_sub (sub.pkg_name + sub.file_time)}
							{#if expandedNames.has(queue.info.name) || idx_sub < 5 || idx_sub > queue.queue.length - 6}
								<a
									href={base + pkg_url_full(sub)}
									class="even:bg-muted/50 hover:bg-accent flex flex-row items-center gap-1 px-6 py-1.5 first:border-t last:rounded-b-xl"
								>
									<div class="text-muted-foreground w-14 text-sm font-light">
										#{sub.original_position ?? idx_sub + 1}
									</div>
									<div class="text-foreground">{sub.pkg_name}</div>
									<div class="text-muted-foreground flex-auto text-sm">{sub.pkg_version}</div>
									<div class="text-muted-foreground text-sm font-light">
										{iso2ago(sub.file_time)}
									</div>
								</a>
							{:else if idx_sub === 5}
								<div class="flex items-center justify-center border-t">
									<Button
										variant="ghost"
										class="w-full cursor-pointer rounded-none"
										onclick={() => expandQueue(queue.info.name)}
									>
										Show {queue.queue.length - 10} more...
									</Button>
								</div>
							{/if}
						{/each}
					</div>
				</Card.CardContent>
			</Card.Card>
		{:else}
			<p class="mt-4 text-foreground">No submissions match the search query.</p>
		{/each}

		<Separator class="mt-6" />

		<div class="text-muted-foreground my-4 flex items-center justify-between">
			<a href="{base}/about" class="text-foreground/70 hover:underline">About this page</a>
			<span class="text-sm font-light">
				Updated {iso2ago(subrepo.capture_time)} in {subrepo.capture_duration / 1000} seconds. Updating
				every {subrepo.update_interval / 60} minutes.
			</span>
		</div>
	{:catch error}
		<p class="text-destructive mt-4">{error.message}</p>
	{/await}
</main>
