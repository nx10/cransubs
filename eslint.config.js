import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

export default ts.config(
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		},
		rules: {
			// $state/$derived runes require `let`, not `const`
			'prefer-const': 'off'
		}
	},
	{
		files: ['**/*.svelte'],
		rules: {
			// Hash-based routing (/pkg#name) doesn't work with resolveRoute
			'svelte/no-navigation-without-resolve': 'off'
		}
	},
	{
		files: ['src/lib/components/ui/**/*.svelte'],
		rules: {
			// shadcn-svelte generated components
			'@typescript-eslint/no-unused-vars': 'off'
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/']
	}
);
