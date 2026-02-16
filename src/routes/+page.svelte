<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { iso2ago } from '$lib/utils.js';
	import { pkg_url_full } from '$lib/server-data.js';
	import { getSubrepo, getSummaryStats, type SummaryStats } from '$lib/stores.svelte.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Search from '@lucide/svelte/icons/search';
	import Package from '@lucide/svelte/icons/package';
	import Clock from '@lucide/svelte/icons/clock';
	import Hourglass from '@lucide/svelte/icons/hourglass';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';

	let search = $state(decodeURIComponent(page.url.hash.substring(1)) || '');

	let subrepoFiltered = $derived.by(() => {
		const currentSearch = search;
		return getSubrepo().then((subrepo) => subrepo.filter(currentSearch));
	});

	let stats = $derived(getSummaryStats());

	let expandedNames: Set<string> = $state(new Set());

	function expandQueue(queueName: string) {
		expandedNames = new Set([...expandedNames, queueName]);
	}
</script>

<svelte:head>
	<title>CRAN Submissions</title>
</svelte:head>

<!-- Search -->
<div class="relative animate-fade-in">
	<Search class="text-muted-foreground absolute top-0 bottom-0 left-3 my-auto size-4" />
	<Input
		type="text"
		placeholder="Search packages..."
		class="border-border/60 bg-muted/30 pl-10 transition-all duration-200 focus:shadow-sm focus:ring-2"
		bind:value={search}
	/>
</div>

<!-- Stats summary -->
{#await stats then data}
	{#if data}
		<div
			class="text-muted-foreground mt-5 flex flex-wrap items-stretch justify-center gap-6 animate-fade-in-up sm:justify-start"
			style="animation-delay: 50ms"
		>
			<div class="flex items-center gap-2">
				<Package class="size-4 opacity-60" />
				<div>
					<div class="text-foreground text-sm font-semibold">{data.totalPackages}</div>
					<div class="text-xs">total packages</div>
				</div>
			</div>
			<div class="bg-border hidden h-8 w-px self-center sm:block" aria-hidden="true"></div>
			<div class="flex items-center gap-2">
				<Clock class="size-4 opacity-60" />
				<div>
					<div class="text-foreground text-sm font-semibold">{iso2ago(data.newestTime)}</div>
					<div class="text-xs">newest submission</div>
				</div>
			</div>
			<div class="bg-border hidden h-8 w-px self-center sm:block" aria-hidden="true"></div>
			<div class="flex items-center gap-2">
				<Hourglass class="size-4 opacity-60" />
				<div>
					<div class="text-foreground text-sm font-semibold">{iso2ago(data.oldestTime)}</div>
					<div class="text-xs">oldest submission</div>
				</div>
			</div>
		</div>
	{/if}
{/await}

<!-- Queues -->
{#await subrepoFiltered}
	<div class="mt-8 space-y-6">
		{#each [0, 1, 2] as i (i)}
			<div class="space-y-3">
				<Skeleton class="h-6 w-40" />
				<Skeleton class="h-3 w-56" />
				<Skeleton class="h-48 w-full rounded-lg" />
			</div>
		{/each}
	</div>
{:then subrepo}
	<div class="mt-8 space-y-2">
		{#each subrepo.queues as queue, idx (queue.info.name)}
			<section
				class="animate-fade-in-up"
				style="animation-delay: {Math.min(idx * 50, 300)}ms"
			>
				<!-- Queue header -->
				<div class="mb-1 flex items-baseline gap-2.5 pt-5 pb-2">
					<Tooltip.Root>
						<Tooltip.Trigger class="cursor-default">
							<h2 class="text-foreground text-lg font-semibold">{queue.info.name}</h2>
						</Tooltip.Trigger>
						<Tooltip.Portal>
							<Tooltip.Content>
								<p class="max-w-xs text-sm">{queue.info.description}</p>
							</Tooltip.Content>
						</Tooltip.Portal>
					</Tooltip.Root>
					<Badge variant="secondary" class="text-xs font-normal">{queue.queue.length}</Badge>
					<span class="text-muted-foreground hidden text-sm sm:inline">{queue.info.description}</span>
				</div>

				<!-- Submission rows -->
				<div class="rounded-lg border">
					{#each queue.queue as sub, idx_sub (sub.pkg_name + sub.file_time)}
						{#if expandedNames.has(queue.info.name) || idx_sub < 5 || idx_sub > queue.queue.length - 6}
							<a
								href={base + pkg_url_full(sub)}
								class="hover:bg-muted/50 flex items-center gap-2 border-b px-4 py-2 transition-colors last:border-b-0 sm:gap-3"
							>
								<span
									class="text-muted-foreground hidden w-10 text-right font-mono text-xs sm:inline-block"
								>
									#{sub.original_position ?? idx_sub + 1}
								</span>
								<span class="text-foreground min-w-0 flex-shrink-0 text-sm font-medium">
									{sub.pkg_name}
								</span>
								<span class="text-muted-foreground text-xs">{sub.pkg_version}</span>
								<span class="text-muted-foreground ml-auto flex-shrink-0 text-xs">
									{iso2ago(sub.file_time)}
								</span>
							</a>
						{:else if idx_sub === 5}
							<button
								class="text-muted-foreground hover:text-foreground hover:bg-muted/50 flex w-full cursor-pointer items-center justify-center gap-1 border-b py-2 text-sm transition-colors"
								onclick={() => expandQueue(queue.info.name)}
							>
								<ChevronDown class="size-3.5" />
								Show {queue.queue.length - 10} more
							</button>
						{/if}
					{/each}
				</div>
			</section>
		{:else}
			<p class="text-muted-foreground mt-8 text-center text-sm">
				No submissions match your search.
			</p>
		{/each}
	</div>
{:catch error}
	<p class="text-destructive mt-8">{error.message}</p>
{/await}
