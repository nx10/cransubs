<script lang="ts">
	import { base } from '$app/paths';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
</script>

<svelte:head>
	<title>About - CRAN Submissions</title>
</svelte:head>

<div class="animate-fade-in space-y-8">
	<a
		href="{base}/"
		class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
	>
		<ArrowLeft class="size-3.5" />
		Back to submissions
	</a>

	<div class="space-y-6">
		<section>
			<h2 class="text-foreground text-lg font-semibold">About</h2>
			<div class="text-foreground/80 mt-3 space-y-2 text-sm leading-relaxed">
				<p>
					This is an unofficial tracker for R package submissions to
					<a href="https://cran.r-project.org/" class="underline hover:text-foreground">CRAN</a>.
					It is not affiliated with CRAN or the R Project in any way.
				</p>
				<p>
					The primary goal is to make tracking the status of package submissions more accessible
					and transparent for package maintainers.
				</p>
				<p>
					Both the
					<a href="https://github.com/nx10/cransubs-server" class="underline hover:text-foreground"
						>backend</a
					>
					and
					<a href="https://github.com/nx10/cransubs" class="underline hover:text-foreground"
						>frontend</a
					>
					are fully open source on GitHub. Issues and contributions are welcome.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-foreground text-lg font-semibold">How it works</h2>
			<div class="text-foreground/80 mt-3 space-y-2 text-sm leading-relaxed">
				<p>
					The backend lazily fetches data from the CRAN incoming FTP server
					(<a
						href="ftp://cran.r-project.org/incoming/"
						class="underline hover:text-foreground">ftp://cran.r-project.org/incoming/</a
					>) and caches it in memory. When nobody is viewing this page, there is no traffic to CRAN.
					Concurrent users share the same cached data.
				</p>
				<p>A big thanks to the CRAN team members who review hundreds of packages every week.</p>
			</div>
		</section>

		<section>
			<h2 class="text-foreground text-lg font-semibold">Alternatives</h2>
			<ul class="text-foreground/80 mt-3 list-inside list-disc space-y-1.5 text-sm">
				<li>
					<a
						class="underline hover:text-foreground"
						href="https://r-hub.github.io/cransays/articles/dashboard.html"
					>
						r-hub/cransays CRAN incoming dashboard
					</a>
				</li>
				<li>
					<a
						class="underline hover:text-foreground"
						href="https://cran.r-project.org/incoming/"
					>
						CRAN incoming FTP directory
					</a>
				</li>
				<li>
					<a
						class="underline hover:text-foreground"
						href="https://cran.r-project.org/web/packages/foghorn/index.html"
					>
						foghorn (R package)
					</a>
				</li>
			</ul>
		</section>

		<section>
			<h2 class="text-foreground text-lg font-semibold">References</h2>
			<ul class="text-foreground/80 mt-3 list-inside list-disc space-y-1.5 text-sm">
				<li>
					<a
						class="underline hover:text-foreground"
						href="https://journal.r-project.org/archive/2018-1/cran.pdf"
					>
						Changes on CRAN (Hornik, Ligges & Zeileis, 2018) &mdash; R Journal
					</a>
				</li>
				<li>
					<a
						class="underline hover:text-foreground"
						href="https://stat.ethz.ch/pipermail/r-package-devel/2019q1/003631.html"
					>
						Meaning of "action pending" in the submission pipeline &mdash; R-pkg-devel
					</a>
				</li>
				<li>
					<a
						class="underline hover:text-foreground"
						href="https://github.com/edgararuiz-zz/cran-stages"
					>
						CRAN stages analysis (Edgar Ruiz, 2018)
					</a>
				</li>
			</ul>
		</section>
	</div>
</div>
