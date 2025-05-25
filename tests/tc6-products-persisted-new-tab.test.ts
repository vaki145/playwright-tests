import { chromium, test, expect } from '@playwright/test';

test('Test case 6: Verify products in cart are persisted when user opens another tab', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://automationexercise.com');
    await page.waitForTimeout(3000);

    await page.mouse.wheel(0, 2000);
    await page.waitForSelector('.single-products', { timeout: 10000 });
    const productBlocks = page.locator('.single-products');
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

    const modal = page.locator('#cartModal');
    await modal.waitFor({ state: 'visible' });
    await modal.locator('button:has-text("Continue Shopping")').click();
    await modal.waitFor({ state: 'hidden' });

    await page.waitForTimeout(1500);
  }
    await page.waitForTimeout(3000);

  const page1 = await context.newPage();
  await page1.goto('http://automationexercise.com');

  await Promise.all([
    page1.waitForNavigation(),
    page1.getByRole('link', { name: /Cart/i }).click(),
  ]);

  await page1.waitForSelector('tr[id^="product-"]', { timeout: 10000 });

  const cartRows = page1.locator('tr[id^="product-"]');
  const cartNames: string[] = [];

  const rowCount = await cartRows.count();
  for (let i = 0; i < rowCount; i++) {
    const name = await cartRows.nth(i).locator('.cart_description h4 a').textContent();
    cartNames.push(name?.trim() ?? '');
  }

  console.log('Added Products:', addedProductNames);
  console.log('Cart in New Tab:', cartNames);

  expect(cartNames.sort()).toEqual(addedProductNames.sort());

  await browser.close();
});

