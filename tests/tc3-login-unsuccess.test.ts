import { test, expect, Page } from '@playwright/test';
import { Login } from '../utils/common-setup';

let page: Page;

const email = 'testabc@gmail.com';
const password = '1234abc';

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
});

test.afterAll(async () => {
    await page.close();
});

test('Test Case 3: Login User with incorrect email and password', async () => {
    await Login(page, email, password);
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
    const errorMess = await page.getByText('Your email or password is incorrect!').isVisible();
        console.log('"Your email or password is incorrect!" is visible', errorMess);
});