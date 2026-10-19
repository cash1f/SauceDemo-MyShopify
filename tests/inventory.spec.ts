import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { loginAsStandardUser } from '../helpers/shop';
import { products } from '../test-data/users';

test.describe('Products', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('P01 six products shown, each with name, price and Add to cart', { tag: '@smoke' }, async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await expect(inventoryPage.items()).toHaveCount(6);
    await expect(page.getByTestId('inventory-item-name')).toHaveCount(6);
    await expect(page.getByTestId('inventory-item-price')).toHaveCount(6);
    await expect(page.getByRole('button', { name: 'Add to cart' })).toHaveCount(6);
  });

  test('P02 sort by name A to Z and Z to A', { tag: '@regression' }, async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortBy('Name (A to Z)');
    let names = await inventoryPage.getProductNames();
    expect(names).toEqual([...names].sort());

    await inventoryPage.sortBy('Name (Z to A)');
    names = await inventoryPage.getProductNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('P03 sort by price low to high and high to low', { tag: '@regression' }, async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortBy('Price (low to high)');
    let prices = await inventoryPage.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));

    await inventoryPage.sortBy('Price (high to low)');
    prices = await inventoryPage.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('P04 open a product details page and go back', { tag: '@regression' }, async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.openProduct(products.backpack);
    await inventoryPage.expectProductDetails(products.backpack);

    await inventoryPage.backToProducts();
    await inventoryPage.expectOnProductsPage();
  });
});
