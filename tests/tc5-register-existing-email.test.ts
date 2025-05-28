import { test, expect, Page } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LogInPage';
import { DeleteAcc } from '../utils/common-setup';

let page: Page;

const username = 'test';
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

test('Test Case 5: Register User with existing email', async () => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    await registerPage.goto();
    await registerPage.register(username, email, password);
    await page.getByRole('link', { name: ' Logout' }).click();
    
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'AutomationExercise' })).toBeVisible();
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill(username);
    await page.getByRole('textbox', { name: 'Email Address' }).nth(1).click();
    await page.getByRole('textbox', { name: 'Email Address' }).nth(1).fill(email);
    await page.getByRole('button', { name: 'Signup' }).click();
    await expect(page.getByText('Email Address already exist!')).toBeVisible();
    console.log('"Email Address already exist!" is visible');
});