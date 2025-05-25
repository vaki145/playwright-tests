import { test, expect, Page } from '@playwright/test';
import { Register, Login } from '../utils/common-setup';

let page: Page;

const username = 'test';
const email = `test+${Date.now()}@example.com`;
const password = '12345abc';

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
});

test.afterAll(async () => {
    await page.close();
});

test('Test Case 2: Login User with correct email and password', async () => {
    await Register(page, username, email, password);
    await page.getByRole('link', { name: ' Logout' }).click();
    await Login(page, email, password);
    await expect(page.locator('text=Logged in as')).toContainText(`Logged in as ${username}`);
    const loggedInText = await page.locator('text=Logged in as').textContent();
    const loginSuccess = loggedInText?.includes(username) ?? false;
        console.log(`"Logged in as ${username}": is visible`, loginSuccess);
        
    await page.getByRole('link', { name: ' Delete Account' }).click();
    await expect(page.getByText('Account Deleted!')).toBeVisible();
    const deleted= await page.getByText('Account Deleted!').isVisible();
        console.log('"Account Deleted!" is visible', deleted);
});