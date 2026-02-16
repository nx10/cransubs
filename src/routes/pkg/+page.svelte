<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { iso2ago, humanReadableMemoryUnits } from '$lib/utils.js';
	import { pkg_url_full, pkg_url_name } from '$lib/server-data.js';
	import { getSubrepo } from '$lib/stores.svelte.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';

	const pkgid = decodeURIComponent(page.url.hash.substring(1));

	let pkg = $derived(
		getSubrepo().then((subrepo) => {
			const uc = pkgid.split('_');
			return uc.length > 1 ? subrepo.find_pkg(uc[0], uc[1]) : subrepo.find_pkg(uc[0]);
		})
	);
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

	{#await pkg}
		<div class="space-y-4">
			<div class="flex items-baseline gap-2">
				<Skeleton class="h-12 w-48" />
				<Skeleton class="h-10 w-24" />
			</div>
			<div class="grid grid-cols-3 gap-4">
				<Skeleton class="h-28" />
				<Skeleton class="h-28" />
				<Skeleton class="h-28" />
			</div>
			<Skeleton class="h-20 w-full" />
		</div>
	{:then pkg}
		{#if pkg}
			<h1>
				<span class="text-foreground pr-2 text-5xl font-bold">{pkg[0].pkg_name}</span>
				<span class="text-muted-foreground text-4xl font-bold">{pkg[0].pkg_version}</span>
			</h1>

			<div class="my-4 grid grid-cols-3 gap-4">
				<Card.Card class="text-center">
					<Card.CardHeader class="pb-2">
						<Card.CardTitle class="text-muted-foreground text-xl">Submitted</Card.CardTitle>
					</Card.CardHeader>
					<Card.CardContent>
						<p class="text-3xl">{iso2ago(pkg[0].file_time)}</p>
						<p class="text-muted-foreground mt-1 font-light">
							Oldest: {iso2ago(pkg[1].queue[0].file_time)}
						</p>
					</Card.CardContent>
				</Card.Card>

				<Card.Card class="text-center">
					<Card.CardHeader class="pb-2">
						<Card.CardTitle class="text-muted-foreground text-xl">Status</Card.CardTitle>
					</Card.CardHeader>
					<Card.CardContent>
						<p class="text-3xl">{pkg[1].info.name}</p>
						<p class="text-muted-foreground mt-1 font-light">
							#{pkg[1].queue.indexOf(pkg[0]) + 1} of {pkg[1].queue.length}
						</p>
					</Card.CardContent>
				</Card.Card>

				<Card.Card class="text-center">
					<Card.CardHeader class="pb-2">
						<Card.CardTitle class="text-muted-foreground text-xl">Size</Card.CardTitle>
					</Card.CardHeader>
					<Card.CardContent>
						<p class="text-3xl">{humanReadableMemoryUnits(pkg[0].file_bytes)}</p>
						<p class="text-muted-foreground mt-1 font-light">.tar.gz</p>
					</Card.CardContent>
				</Card.Card>
			</div>

			<div class="text-foreground/80 my-3 px-10">
				{pkg[1].info.longdescription}
				<span class="text-muted-foreground text-sm font-light">
					<a href={pkg[1].info.reference}>({pkg[1].info.reference_label})</a>
				</span>
			</div>

			<div class="mt-4 space-y-3">
				<div>
					<p class="text-foreground font-bold">Track this submission:</p>
					<Input
						type="text"
						readonly
						value={'nx10.github.io/cransubs' + pkg_url_full(pkg[0])}
						class="mt-1"
					/>
				</div>
				<div>
					<p class="text-foreground font-bold">Track the newest submission with this name:</p>
					<Input
						type="text"
						readonly
						value={'nx10.github.io/cransubs' + pkg_url_name(pkg[0])}
						class="mt-1"
					/>
				</div>
			</div>

			<div class="mt-3 space-y-1">
				{#if pkg[0].folder !== 'newbies'}
					<Button
						variant="link"
						href={'https://CRAN.R-project.org/package=' + pkg[0].pkg_name}
						class="h-auto p-0"
					>
						Find on CRAN (previous version)
					</Button>
				{/if}
				<div>
					<Button
						variant="link"
						href={'https://cran.r-project.org/incoming/' + pkg[0].folder}
						class="h-auto p-0"
					>
						Find on CRAN_incoming
					</Button>
				</div>
			</div>

			<Separator class="mt-4" />

			<div
				class="text-muted-foreground my-3 flex items-center justify-end gap-2 text-sm font-light"
			>
				<span>Updated {iso2ago(pkg[0].request_time)}.</span>
				<a href="{base}/about" class="text-foreground/70 hover:underline">About this page</a>
			</div>
		{:else}
			<p class="text-foreground">Package does not exist (anymore?)</p>
		{/if}
	{:catch error}
		<p class="text-destructive">{error.message}</p>
	{/await}

	<div class="mt-3">
		<a href="{base}/" class="text-muted-foreground hover:text-foreground hover:underline">
			&larr; Back to browse
		</a>
	</div>
</main>
