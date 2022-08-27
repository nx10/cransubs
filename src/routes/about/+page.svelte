<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>CRAN sub tracker: About</title>
</svelte:head>

<main class="my-0 mx-auto max-w-3xl px-2">
	<a href="{base}/"
		><div class="text-3xl font-bold pr-2 text-slate-600 text-center mb-5 mt-4">
			CRAN submission tracker
		</div></a
	>
	<p>Please report issues with this site via the GitHub issue tracker or contact me directly.</p>
	<h3 class="font-bold text-xl my-4">About</h3>
	<ul class="list-disc">
		<li>This tracker is inofficial and in no way affiliated with CRAN or the R Project.</li>
		<li>The primary goal of this site is to make tracking package submissions more accessible.</li>
		<li>Both backend (<a class="hover:underline" href="https://github.com/nx10/cransubs-server">nx10/cransubs-server</a>) 
            and frontend (<a class="hover:underline" href="https://github.com/nx10/cransubs">nx10/cransubs</a>) 
            are fully open source and available on GitHub.</li>
		<li>
			To minimize traffic to the CRAN network, the backend lazily fetches data from the CRAN
			incoming FTP server (<a
				href="ftp://cran.r-project.org/incoming/"
				class="no-underline hover:underline">ftp://cran.r-project.org/incoming/</a
			>) and caches it in memory. (This means when nobody is looking at this page, there will be no
			traffic to CRAN and there is no increased traffic for concurrent users.)
		</li>
		<li>A big shout-out to the CRAN members reviewing many packages every week.</li>
	</ul>
	<h3 class="font-bold text-xl my-4">Alternatives</h3>
	<ul class="list-disc">
		<li>
			<a class="hover:underline" href="https://r-hub.github.io/cransays/articles/dashboard.html"
				>r-hub/cransays CRAN incoming dashbord (website)</a
			>
		</li>
		<li>
			<a class="hover:underline" href="https://cran.r-project.org/incoming/"
				>CRAN incoming FTP (website)</a
			>
		</li>
		<li>
			<a class="hover:underline" href="https://cran.r-project.org/web/packages/foghorn/index.html"
				>foghorn (R package)</a
			>
		</li>
	</ul>

	<h3 class="font-bold text-xl my-4">References</h3>
	<ul class="list-disc">
		<li>
			<a class="hover:underline" href="https://journal.r-project.org/archive/2018-1/cran.pdf"
				>R journal (2017): Changes on CRAN (Kurt Hornik, Uwe Ligges and Achim Zeileis)</a
			>
		</li>
		<li>
			<a
				class="hover:underline"
				href="https://stat.ethz.ch/pipermail/r-package-devel/2019q1/003631.html"
				>[R-pkg-devel] Meaning and consequences of action pending in the submission pipeline</a
			>
		</li>
		<li>
			<a class="hover:underline" href="https://github.com/edgararuiz-zz/cran-stages"
				>CRAN Analysis: Edgar Ruiz (2018)</a
			>
		</li>
	</ul>

	<div class="mt-3 ">
		<a href="{base}/" class="text-l text-slate-500 hover:underline hover:text-slate-800"
			>&larr; Back to browse</a
		>
	</div>
</main>
