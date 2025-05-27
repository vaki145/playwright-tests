import { test, expect, Page } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LogInPage';
import { DeleteAcc } from '../utils/common-setup';

let page: Page;

const username = 'ABC';
const email = `test12test@example.com`;
const password = '12345abc';

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
});

test.afterAll(async () => {
    await page.close();
});

test('Test Case 2: Login User with correct email and password', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    await registerPage.goto();
    await registerPage.register(username, email, password);

    await page.getByRole('link', { name: ' Logout' }).click();

    await loginPage.goto();
    await loginPage.login(email, password);

    await expect(page.locator('text=Logged in as')).toContainText(`Logged in as ${username}`);
    const loggedInText = await page.locator('text=Logged in as').textContent();
    const loginSuccess = loggedInText?.includes(username) ?? false;
        console.log(`"Logged in as ${username}": is visible`, loginSuccess);

    await DeleteAcc(page);
});