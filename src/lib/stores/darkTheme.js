import { writable } from "svelte/store";
import { browser } from '$app/env';

const darkThemeLocalStorageKey = "isDarkTheme"
const doesPreferDark = browser && window.matchMedia("(prefers-color-scheme: dark)").matches;

const isSavedDarkThemeExists = browser && !!localStorage.getItem(darkThemeLocalStorageKey);
const isSavedDarkTheme = browser && localStorage.getItem(darkThemeLocalStorageKey) === "true";

const isInitialDarkTheme = isSavedDarkThemeExists ? isSavedDarkTheme : doesPreferDark;

export const isDarkTheme = writable(isInitialDarkTheme);

isDarkTheme.subscribe((value) => {
	if (browser) {
		localStorage.setItem(darkThemeLocalStorageKey, String(value));
	}
});
