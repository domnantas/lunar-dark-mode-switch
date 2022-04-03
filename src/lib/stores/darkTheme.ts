import { writable } from 'svelte/store';
import { browser } from '$app/env';

const darkThemeLocalStorageKey = 'isDarkTheme';
const doesPreferDark: boolean =
	browser && window.matchMedia('(prefers-color-scheme: dark)').matches;

const isSavedDarkThemeExists = browser && !!localStorage.getItem(darkThemeLocalStorageKey);
const isSavedDarkTheme = browser && localStorage.getItem(darkThemeLocalStorageKey) === 'true';

const isInitialDarkTheme = isSavedDarkThemeExists ? isSavedDarkTheme : doesPreferDark;

export const isDarkTheme = writable(isInitialDarkTheme);

isDarkTheme.subscribe((isDark) => {
	if (browser) {
		if (isDark) {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
		localStorage.setItem(darkThemeLocalStorageKey, String(isDark));
	}
});
