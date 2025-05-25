import { chromium, test, expect, Page } from '@playwright/test';
import { Register, Login} from '../utils/common-setup';

let page1: Page;

const username = 'test';
const email = `test+${Date.now()}@example.com`;
const password = '12345abc';

test('Test case 7: Verify products in cart are persisted when user logins in another browser', async () => {

  const browser1 = await chromium.launch();
  const context1 = await browser1.newContext();
  const page1 = await context1.newPage();

  await Register(page1, username, email, password);
  await page1.waitForTimeout(3000);

  await page1.mouse.wheel(0, 2000);
  await page1.waitForSelector('.single-products', { timeout: 10000 });
  const productBlocks = page1.locator('.single-products');
  const productCount = await productBlocks.count();

  const indexes = new Set<number>();
  while (indexes.size < 2) indexes.add(Math.floor(Math.random() * productCount));
  const addedProductNames: string[] = [];

  for (const index of indexes) {
    const product = productBlocks.nth(index);
      const name = await product.locator('.productinfo.text-center p').textContent();
    addedProductNames.push(name?.trim() ?? '');

  await product.scrollIntoViewIfNeeded();
  await product.hover();
  const addButton = product.locator('.product-overlay .add-to-cart');
  await addButton.waitFor({ state: 'visible', timeout: 5000 });
  await addButton.click();

  const modal = page1.locator('#cartModal');
  await modal.waitFor({ state: 'visible' });
  await modal.locator('button:has-text("Continue Shopping")').click();
  await modal.waitFor({ state: 'hidden' });

  await page1.waitForTimeout(1500);
  }

  await page1.waitForTimeout(3000);
  await browser1.close();

  const browser2 = await chromium.launch();
  const context2 = await browser2.newContext();
  const page2 = await context2.newPage();

  await Login(page2, email, password);
  await expect(page2.locator('text=Logged in as')).toContainText(`Logged in as ${username}`);

  await Promise.all([
    page2.waitForNavigation(),
    page2.getByRole('link', { name: /Cart/i }).click(),
  ]);

  await page2.waitForSelector('tr[id^="product-"]', { timeout: 10000 });
  const cartRows = page2.locator('tr[id^="product-"]');
  const cartProductNames: string[] = [];

  const rowCount = await cartRows.count();
  for (let i = 0; i < rowCount; i++) {
    const name = await cartRows.nth(i).locator('.cart_description h4 a').textContent();
    cartProductNames.push(name?.trim() ?? '');
  }

  console.log('Originally added:', addedProductNames);
  console.log('Cart in second browser:', cartProductNames);

  expect(cartProductNames.sort()).toEqual(addedProductNames.sort());
  await page2.getByRole('link', { name: ' Delete Account' }).click();
  const deleted = await page2.getByText('Account Deleted!').isVisible();
    console.log('The account is deleted', deleted);
  await page2.close();

  await browser2.close();
});