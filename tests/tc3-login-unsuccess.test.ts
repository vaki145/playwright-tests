import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LogInPage';

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
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(email, password);
    
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
    const errorMess = await page.getByText('Your email or password is incorrect!').isVisible();
        console.log('"Your email or password is incorrect!" is visible', errorMess);
});