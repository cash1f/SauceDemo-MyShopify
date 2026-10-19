import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { loginAsStandardUser } from '../helpers/shop';
import { products } from '../test-data/users';
import { nameSorts, priceSorts } from '../test-data/sortCases';

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

  // P02: one test per sort option
  for (const row of nameSorts) {
    test(`${row.id} sort by ${row.option}`, { tag: '@regression' }, async ({ page }) => {
      const inventoryPage = new InventoryPage(page);

      await inventoryPage.sortBy(row.option);

      await expect(page.getByTestId('inventory-item-name')).toHaveText(row.expected);
    });
  }

  // P03: one test per sort option
  for (const row of priceSorts) {
    test(`${row.id} sort by ${row.option}`, { tag: '@regression' }, async ({ page }) => {
      const inventoryPage = new InventoryPage(page);

      await inventoryPage.sortBy(row.option);

      const expectedTexts: string[] = [];
      for (const price of row.expected) {
        expectedTexts.push('$' + price);
      }
      await expect(page.getByTestId('inventory-item-price')).toHaveText(expectedTexts);
    });
  }

  test('P04 open a product details page and go back', { tag: '@regression' }, async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.openProduct(products.backpack);
    await inventoryPage.expectProductDetails(products.backpack);

    await inventoryPage.backToProducts();
    await inventoryPage.expectOnProductsPage();
  });
});
