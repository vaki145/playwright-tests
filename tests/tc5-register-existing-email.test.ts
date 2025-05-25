import { test, expect, Page } from '@playwright/test';
import { Register, Login  } from '../utils/common-setup';

let page: Page;

const username = 'test';
const email = `test+${Date.now()}@example.com`;
const password = '12345abc';

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
});

test.afterAll(async () => {
    await Login(page, email, password);
    await page.getByRole('link', { name: ' Delete Account' }).click();
    const deleted = await page.getByText('Account Deleted!').isVisible();
        console.log('The account is deleted', deleted);
    await page.close();
});

test('Test Case 5: Register User with existing email', async () => {
    await Register(page, username, email, password);
    await page.getByRole('link', { name: ' Logout' }).click();
    await page.goto('https://www.automationexercise.com');
    await expect(page.getByRole('heading', { name: 'AutomationExercise' })).toBeVisible();
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill(username);
    await page.getByRole('textbox', { name: 'Email Address' }).nth(1).click();
    await page.getByRole('textbox', { name: 'Email Address' }).nth(1).fill(email);
    await page.getByRole('button', { name: 'Signup' }).click();
    await expect(page.getByText('Email Address already exist!')).toBeVisible();
        const errorMess = await page.getByText('Email Address already exist!').isVisible();
        console.log('"Email Address already exist!" is visible', errorMess);
});