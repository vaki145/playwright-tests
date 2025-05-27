import { chromium, test, expect } from '@playwright/test';
import { AddProduct, CheckCart } from '../utils/common-setup';

test('Test case 6: Verify products in cart are persisted when user opens another tab', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const addedProductNames = await AddProduct(page);
  
  const page1 = await context.newPage();
  await page1.goto('/');
  
  const cartNames = await CheckCart(page1);
  
  expect(cartNames.sort()).toEqual(addedProductNames.sort());

  await browser.close();
});

