import { test, expect, Page } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { DeleteAcc } from '../utils/common-setup';

let page: Page;

const username = 'ABC';
const email = `test+${Date.now()}@example.com`;
const password = '12345abc';

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
});

test.afterAll(async () => {
    await page.close();
});

test('Test Case 1: Register User', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register(username, email, password);

    await expect(page.locator('text=Logged in as')).toContainText(`Logged in as ${username}`);
    console.log(`"Logged in as ${username}": is visible`);
        
    await DeleteAcc(page);

    await page.getByRole('link', { name: 'Continue' }).click();
});