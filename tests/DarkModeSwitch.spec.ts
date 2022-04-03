import { expect, test } from '@playwright/test';

test('index page contains the switch', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('.toggle')).toBeVisible();
});

test('input gets checked when switch is clicked', async ({ page }) => {
	await page.goto('/');
	await expect(await page.locator('.toggle input')).not.toBeChecked();
	await page.click('.toggle');
	await expect(await page.locator('.toggle input')).toBeChecked();
});

// test('the switch is checked if local storage flag is set to true')

// test('clicking the switch changes the local storage flag value')

test('shows the correct moon phase emoji according to the current date', async ({ page }) => {
	page.evaluate(() => {
		Date.now = () => {
			return 1539806611024;
		};
	});
});

// test('shows correct daytime emoji according to the current time')
