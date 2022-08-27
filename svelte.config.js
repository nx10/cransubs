import static_adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { build } from 'vite';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],

	kit: {
		adapter: static_adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
		}),
		prerender: {
			default: true,
		},
		paths: {
			base: dev ? '' : '/cransubs',
		}
	},
};

export default config;
