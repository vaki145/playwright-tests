import { test, expect, Page } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LogInPage';
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
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(email, password);
    await DeleteAcc(page);
    await page.close();
});

test('Test Case 4: Logout User', async () => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    await registerPage.goto();
    await registerPage.register(username, email, password);

    await page.getByRole('link', { name: ' Logout' }).click();

    await loginPage.goto();
    await loginPage.login(email, password);

    await expect(page.locator('text=Logged in as')).toContainText(`Logged in as ${username}`);
    console.log(`"Logged in as ${username}": is visible`);

    await page.getByRole('link', { name: ' Logout' }).click();
    await expect(page.getByText('Login to your account')).toBeVisible();
    console.log('Logout successfully > "Login to your account" is visible');
});