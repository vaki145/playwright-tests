import { chromium, test, expect, Page } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LogInPage';
import { DeleteAcc } from '../utils/common-setup';
import { AddProduct, CheckCart } from '../utils/common-setup';

let page1: Page;

const username = 'ABC';
const email = `test+${Date.now()}@example.com`;
const password = '12345abc';

test('Test case 7: Verify products in cart are persisted when user logins in another browser', async () => {

  const browser1 = await chromium.launch();
  const context1 = await browser1.newContext();
  const page1 = await context1.newPage();

  const registerPage = new RegisterPage(page1);
  await registerPage.goto();
  await registerPage.register(username, email, password);

  const addedProductNames = await AddProduct(page1);
  await page1.waitForTimeout(3000);
  await browser1.close();

  const browser2 = await chromium.launch();
  const context2 = await browser2.newContext();
  const page2 = await context2.newPage();

  const loginPage = new LoginPage(page2);
  await loginPage.goto();
  await loginPage.login(email, password);
  await expect(page2.locator('text=Logged in as')).toContainText(`Logged in as ${username}`);
  const loggedInText = await page2.locator('text=Logged in as').textContent();
  const loginSuccess = loggedInText?.includes(username) ?? false;
    console.log(`"Logged in as ${username}": is visible`, loginSuccess);

  const cartNames = await CheckCart(page2);
  expect(cartNames.sort()).toEqual(addedProductNames.sort());

  await browser2.close();
});