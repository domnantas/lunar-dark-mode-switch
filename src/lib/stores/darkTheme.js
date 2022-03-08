import { writable } from "svelte/store";
import { browser } from '$app/env';

const doesPreferDark = browser && window.matchMedia("(prefers-color-scheme: dark)").matches;

const isSavedDarkThemeExists = browser && !!localStorage.getItem("isDarkTheme");
const isSavedDarkTheme = browser && localStorage.getItem("isDarkTheme") === "true";

const isInitialDarkTheme = isSavedDarkThemeExists ? isSavedDarkTheme : doesPreferDark;

export const isDarkTheme = writable(isInitialDarkTheme);

isDarkTheme.subscribe((value) => {
	if (browser) {
		localStorage.setItem("isDarkTheme", String(value));
	}
});
