import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'cransubs-theme';

function getStoredTheme(): Theme {
	if (!browser) return 'system';
	return (localStorage.getItem(STORAGE_KEY) as Theme) ?? 'system';
}

function getSystemPrefersDark(): boolean {
	if (!browser) return false;
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

let theme = $state<Theme>(getStoredTheme());
let isDark = $derived(theme === 'dark' || (theme === 'system' && getSystemPrefersDark()));

function applyTheme() {
	if (!browser) return;
	document.documentElement.classList.toggle('dark', isDark);
}

$effect.root(() => {
	$effect(() => {
		applyTheme();
	});

	if (browser) {
		const mql = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = () => applyTheme();
		mql.addEventListener('change', handler);
		return () => mql.removeEventListener('change', handler);
	}
});

export function getTheme() {
	return theme;
}

export function getIsDark() {
	return isDark;
}

export function toggleTheme() {
	if (isDark) {
		theme = 'light';
	} else {
		theme = 'dark';
	}
	if (browser) {
		localStorage.setItem(STORAGE_KEY, theme);
	}
}
