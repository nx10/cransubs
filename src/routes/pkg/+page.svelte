<script lang="ts">
	import { base } from '$app/paths';
	import { subrepo } from '../../stores.js';
	import { page } from '$app/stores';
	import { humanRedableMemoryUnits, iso2ago } from '../../utils.js';
	import { pkg_url_full, pkg_url_name } from '../../server_data.js';

	const pkgid = decodeURIComponent($page.url.hash.substring(1));

	$: pkg = $subrepo.then((subrepo) => {
		const uc = pkgid.split('_');
		return (uc.length > 1) ? subrepo.find_pkg(uc[0], uc[1]) : subrepo.find_pkg(uc[0]);
	});
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

	{#await pkg}
		<p>Fetching snapshot...</p>
	{:then pkg}
		{#if pkg}
			<h1>
				<span class="text-5xl font-bold pr-2 text-slate-800">{pkg[0].pkg_name}</span>
				<span class="text-4xl font-bold text-slate-600">{pkg[0].pkg_version}</span>
			</h1>

			<div class="flex border border-slate-300 rounded-md my-4 divide-x divide-y text-center">
				<div class="p-3 text-slate-900 grow">
					<h4 class="text-xl text-slate-600 font-bold rounded-l-md">Submitted</h4>
					<p class="text-3xl">{iso2ago(pkg[0].file_time)}</p>
					<p class="text-slate-500 font-light mt-1">Oldest: {iso2ago(pkg[1].queue[0].file_time)}</p>
				</div>
				<div class="p-3 text-slate-900 grow">
					<h4 class="text-xl text-slate-600 font-bold rounded-l-md ">Status</h4>
					<p class="text-3xl">{pkg[1].info.name}</p>
					<p class="text-slate-500 font-light mt-1">
						#{pkg[1].queue.indexOf(pkg[0]) + 1} of {pkg[1].queue.length}
					</p>
				</div>
				<div class="p-3 text-slate-900 grow">
					<h4 class="text-xl text-slate-600 font-bold rounded-l-md">Size</h4>
					<span class="text-3xl">{humanRedableMemoryUnits(pkg[0].file_bytes)}</span>
					<p class="text-slate-500 font-light mt-1">.tar.gz</p>
				</div>
			</div>

			<div class="px-10 my-3 text-slate-700">
				{pkg[1].info.longdescription}
				<span class="text-sm font-light text-slate-500">
					<a href={base + '/' + pkg[1].info.reference} class="my-4">({pkg[1].info.reference_label})</a>
				</span>
			</div>

			<p class="font-bold text-slate-800">Track this submission:</p>
			<input
				type="text"
				readonly
				value={'nx10.github.io/cransubs' + pkg_url_full(pkg[0])}
				class="w-full my-1 py-1 px-3 text-slate-900 border rounded-md outline-none bg-gray-50 focus:text-slate-900 focus:bg-white focus:border-slate-500"
			/>
			<p class="font-bold text-slate-800">Track the newest submission with this name:</p>
			<input
				type="text"
				readonly
				value={'nx10.github.io/cransubs' + pkg_url_name(pkg[0])}
				class="w-full  my-1 py-1 px-3 text-slate-900 border rounded-md outline-none bg-gray-50 focus:text-slate-900 focus:bg-white focus:border-slate-500"
			/>

			<div class="mt-1 text-blue-800">
				{#if pkg[0].folder !== 'newbies'}
					<p>
						<a
							class="hover:underline hover:text-blue-900"
							href={'https://CRAN.R-project.org/package=' + pkg[0].pkg_name}
							>Find on CRAN (previous version)</a
						>
					</p>
				{/if}
				<p>
					<a
						class="hover:underline hover:text-blue-900"
						href={'https://cran.r-project.org/incoming/' + pkg[0].folder}>Find on CRAN_incoming</a
					>
				</p>
			</div>

			<div class="float-right text-sm font-light text-slate-500">
				<span class="">Updated {iso2ago(pkg[0].request_time)}.</span>
				<span class="hover:underline text-slate-600"
					><a href="{base}/about" class="my-4"> About this page</a></span
				>
			</div>
		{:else}
			Package does not exist (anymore?)
		{/if}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}

	<div class="mt-3 ">
		<a href="{base}/" class="text-l text-slate-500 hover:underline hover:text-slate-800"
			>&larr; Back to browse</a
		>
	</div>
</main>
