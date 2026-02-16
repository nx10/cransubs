<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { iso2ago, humanReadableMemoryUnits, copyToClipboard } from '$lib/utils.js';
	import { pkg_url_full, pkg_url_name } from '$lib/server-data.js';
	import { getSubrepo } from '$lib/stores.svelte.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import Copy from '@lucide/svelte/icons/copy';
	import Check from '@lucide/svelte/icons/check';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import { toast } from 'svelte-sonner';

	const pkgid = decodeURIComponent(page.url.hash.substring(1));

	let pkg = $derived(
		getSubrepo().then((subrepo) => {
			const uc = pkgid.split('_');
			return uc.length > 1 ? subrepo.find_pkg(uc[0], uc[1]) : subrepo.find_pkg(uc[0]);
		})
	);

	let copiedField: string | null = $state(null);

	async function handleCopy(text: string, field: string) {
		const ok = await copyToClipboard(text);
		if (ok) {
			copiedField = field;
			toast.success('Copied to clipboard');
			setTimeout(() => (copiedField = null), 2000);
		}
	}
</script>

<svelte:head>
	<title>CRAN Submissions</title>
</svelte:head>

{#await pkg}
	<div class="space-y-6 animate-fade-in">
		<Skeleton class="h-5 w-40" />
		<div class="flex items-baseline gap-3">
			<Skeleton class="h-10 w-48" />
			<Skeleton class="h-8 w-24" />
		</div>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
			<Skeleton class="h-20" />
			<Skeleton class="h-20" />
			<Skeleton class="h-20" />
		</div>
		<Skeleton class="h-16 w-full" />
	</div>
{:then pkg}
	{#if pkg}
		<div class="animate-fade-in space-y-6">
			<!-- Breadcrumb -->
			<a
				href="{base}/"
				class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
			>
				<ArrowLeft class="size-3.5" />
				All submissions
			</a>

			<!-- Package header -->
			<div class="flex flex-wrap items-baseline gap-3">
				<h1 class="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
					{pkg[0].pkg_name}
				</h1>
				<span class="text-muted-foreground text-xl font-medium sm:text-2xl">
					v{pkg[0].pkg_version}
				</span>
			</div>

			<!-- Info grid -->
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
				<div>
					<div class="text-muted-foreground text-xs font-medium uppercase tracking-wider">
						Submitted
					</div>
					<div class="text-foreground mt-1 text-2xl font-semibold">
						{iso2ago(pkg[0].file_time)}
					</div>
					<div class="text-muted-foreground mt-0.5 text-xs">
						Oldest in queue: {iso2ago(pkg[1].queue[0].file_time)}
					</div>
				</div>

				<div>
					<div class="text-muted-foreground text-xs font-medium uppercase tracking-wider">
						Status
					</div>
					<div class="text-foreground mt-1 text-2xl font-semibold">
						{pkg[1].info.name}
					</div>
					<div class="text-muted-foreground mt-0.5 text-xs">
						#{pkg[1].queue.indexOf(pkg[0]) + 1} of {pkg[1].queue.length} in queue
					</div>
				</div>

				<div>
					<div class="text-muted-foreground text-xs font-medium uppercase tracking-wider">
						Size
					</div>
					<div class="text-foreground mt-1 text-2xl font-semibold">
						{humanReadableMemoryUnits(pkg[0].file_bytes)}
					</div>
					<div class="text-muted-foreground mt-0.5 text-xs">.tar.gz</div>
				</div>
			</div>

			<!-- Queue description -->
			<div class="bg-muted/40 rounded-lg px-4 py-3">
				<p class="text-foreground/80 text-sm leading-relaxed">
					{pkg[1].info.longdescription}
					<a
						href={pkg[1].info.reference}
						class="text-muted-foreground ml-1 text-xs underline transition-colors hover:text-foreground"
					>
						{pkg[1].info.reference_label}
					</a>
				</p>
			</div>

			<!-- Track URLs -->
			<div class="space-y-3">
				<div>
					<label
						for="track-full"
						class="text-foreground mb-1 block text-sm font-medium"
					>
						Track this submission
					</label>
					<div class="flex gap-2">
						<Input
							id="track-full"
							type="text"
							readonly
							value={'nx10.github.io/cransubs' + pkg_url_full(pkg[0])}
							class="bg-muted/30 font-mono text-xs"
						/>
						<Button
							variant="outline"
							size="icon"
							class="flex-shrink-0"
							onclick={() =>
								handleCopy(
									'https://nx10.github.io/cransubs' + pkg_url_full(pkg[0]),
									'full'
								)}
						>
							{#if copiedField === 'full'}
								<Check class="size-4 text-green-500" />
							{:else}
								<Copy class="size-4" />
							{/if}
						</Button>
					</div>
				</div>
				<div>
					<label
						for="track-name"
						class="text-foreground mb-1 block text-sm font-medium"
					>
						Track newest submission with this name
					</label>
					<div class="flex gap-2">
						<Input
							id="track-name"
							type="text"
							readonly
							value={'nx10.github.io/cransubs' + pkg_url_name(pkg[0])}
							class="bg-muted/30 font-mono text-xs"
						/>
						<Button
							variant="outline"
							size="icon"
							class="flex-shrink-0"
							onclick={() =>
								handleCopy(
									'https://nx10.github.io/cransubs' + pkg_url_name(pkg[0]),
									'name'
								)}
						>
							{#if copiedField === 'name'}
								<Check class="size-4 text-green-500" />
							{:else}
								<Copy class="size-4" />
							{/if}
						</Button>
					</div>
				</div>
			</div>

			<!-- External links -->
			<div class="flex flex-wrap gap-x-4 gap-y-1 pt-1">
				{#if pkg[0].folder !== 'newbies'}
					<a
						href={'https://CRAN.R-project.org/package=' + pkg[0].pkg_name}
						class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm underline transition-colors"
					>
						CRAN (previous version)
						<ExternalLink class="size-3" />
					</a>
				{/if}
				<a
					href={'https://cran.r-project.org/incoming/' + pkg[0].folder}
					class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm underline transition-colors"
				>
					CRAN incoming
					<ExternalLink class="size-3" />
				</a>
			</div>

			<!-- Last updated -->
			<div class="text-muted-foreground border-t pt-4 text-xs">
				Last updated {iso2ago(pkg[0].request_time)}
			</div>
		</div>
	{:else}
		<div class="animate-fade-in space-y-4">
			<a
				href="{base}/"
				class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
			>
				<ArrowLeft class="size-3.5" />
				All submissions
			</a>
			<p class="text-muted-foreground">This package does not exist (anymore?).</p>
		</div>
	{/if}
{:catch error}
	<p class="text-destructive">{error.message}</p>
{/await}
