<script lang="ts">
	import { base } from '$app/paths';
	import { iso2ago } from '../utils';
	import { pkg_url_full } from '../server_data';
	import { subrepo } from '../stores.js';
	import { page } from '$app/stores';

	const expanded: CranQueue[] = [];

	let search = decodeURIComponent($page.url.hash.substring(1)) || '';

	$: subrepo_filtered = $subrepo.then((subrepo) => subrepo.filter(search));

	let expand: CranQueue[] = [];
	function expand_q(q: CranQueue): () => void {
		return () => {
			expand.push(q);
			expand = expand; // for reactivity
		};
	}
</script>

<svelte:head>
	<title>CRAN sub tracker</title>
</svelte:head>

<main class="my-0 mx-auto max-w-3xl px-2">
	<a href="{base}/"
		><div class="text-3xl font-bold pr-2 text-slate-600 text-center mb-5 mt-4">
			CRAN submission tracker
		</div></a
	>

	<div class="relative mt-3">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width={2}
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/>
		</svg>
		<input
			type="text"
			placeholder="Search"
			class="w-full py-3 pl-12 pr-4 text-slate-500 border rounded-md outline-none bg-gray-50 focus:text-slate-900 focus:bg-white focus:border-slate-500"
			bind:value={search}
		/>
	</div>

	{#await subrepo_filtered}
		<p>Fetching snapshot...</p>
	{:then subrepo}
		{#each subrepo.queues as queue}
			<div class="flex flex-row space-x-1 items-end pt-3 mb-1">
				<div class="flex-auto text-2xl font-bold">{queue.info.name}</div>
				<div class="text-slate-500">{queue.queue.length} packages</div>
			</div>
			<p class="italic text-sm text-slate-600">{queue.info.description}</p>
			<div class="flex flex-col border border-slate-300 rounded-md mt-2">
				{#each queue.queue as sub, idx_sub}
					{#if expand.indexOf(queue) !== -1 || idx_sub < 5 || idx_sub > queue.queue.length - 6}
						<a
							href={base + pkg_url_full(sub)}
							class="flex flex-row space-x-1 items-center hover:bg-slate-200 odd:bg-white even:bg-slate-50 px-2 py-1 first:rounded-t-md last:rounded-b-md"
						>
							<div class="font-light text-sm w-14 text-slate-500">#{idx_sub + 1}</div>
							<div class="text-slate-900">
								{sub.pkg_name}
							</div>
							<div class="text-sm text-slate-500 flex-auto">{sub.pkg_version}</div>
							<div class="text-sm font-light">{iso2ago(sub.file_time)}</div>
						</a>
					{:else if idx_sub == 5}
						<div
							on:click|once={expand_q(queue)}
							class="flex flex-row space-x-1 items-center justify-center hover:bg-slate-200 odd:bg-white even:bg-slate-50 cursor-pointer"
						>
							<div class="text-slate-600 py-1">Show {queue.queue.length - 10} more...</div>
						</div>
					{/if}
				{/each}
			</div>
		{:else}
			<p class="text-slate-800">No submissions match the search query.</p>
		{/each}

		<div class="text-slate-500 my-4">
			<span class="hover:underline text-slate-600"
				><a href="{base}/about" class="my-4">About this page</a></span
			>

			<span class="float-right text-sm font-light"
				>Updated {iso2ago(subrepo.capture_time)} in {subrepo.capture_duration / 1000} seconds. Updating
				every {subrepo.update_interval / 60} minutes.</span
			>
		</div>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</main>
