import { Page } from '@playwright/test';

export async function DeleteAcc (page: Page) {
  await page.getByRole('link', { name: ' Delete Account' }).click();
  const deleted= await page.getByText('Account Deleted!').isVisible();
  console.log('"Account Deleted!" is visible', deleted);
}

export async function AddProduct(page: Page): Promise<string[]> {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  // Wait until enough products are rendered
  await page.waitForFunction(() => {
    return document.querySelectorAll('.single-products').length >= 4;
  });

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

  console.log('Added Products:', addedProductNames);
  return addedProductNames;
}

export async function CheckCart(page: Page): Promise<string[]> {
  await page.getByRole('link', { name: /Cart/i }).click();
  await page.waitForSelector('tr[id^="product-"]', { timeout: 10000 });

  const cartRows = page.locator('tr[id^="product-"]');
  const cartNames: string[] = [];

  const rowCount = await cartRows.count();
  for (let i = 0; i < rowCount; i++) {
    const name = await cartRows.nth(i).locator('.cart_description h4 a').textContent();
    cartNames.push(name?.trim() ?? '');
  }

  console.log('Products in cart:', cartNames);
  return cartNames;
}
