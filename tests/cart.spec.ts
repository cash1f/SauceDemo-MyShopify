import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { loginAsStandardUser, addProducts } from '../helpers/shop';
import { products } from '../test-data/users';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('C01 add one item: badge shows 1, button changes to Remove', { tag: '@smoke' }, async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addToCart(products.backpack);

    await inventoryPage.expectCartBadge(1);
    await inventoryPage.expectRemoveButton(products.backpack);
  });

  test('C02 add several items: badge count and cart contents match', { tag: '@regression' }, async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const chosen = [products.backpack, products.bikeLight, products.onesie];

    await addProducts(page, chosen);
    await inventoryPage.expectCartBadge(3);

    await inventoryPage.openCart();
    await cartPage.expectOnCartPage();
    await cartPage.expectItemCount(3);
    const names = await cartPage.getProductNames();
    expect(names.sort()).toEqual([...chosen].sort());
  });

  test('C03 remove an item on the cart page: badge and list update', { tag: '@regression' }, async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await addProducts(page, [products.backpack, products.bikeLight]);
    await inventoryPage.openCart();
    await cartPage.removeItem(products.backpack);

    await cartPage.expectItemCount(1);
    await inventoryPage.expectCartBadge(1);
    const names = await cartPage.getProductNames();
    expect(names).toEqual([products.bikeLight]);
  });

  test('C04 cart contents are kept after going back to products', { tag: '@regression' }, async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await addProducts(page, [products.backpack, products.onesie]);
    await inventoryPage.openCart();
    await cartPage.continueShopping();

    await inventoryPage.expectOnProductsPage();
    await inventoryPage.expectCartBadge(2);
    await inventoryPage.expectRemoveButton(products.backpack);
    await inventoryPage.expectRemoveButton(products.onesie);
  });

  test('C05 Reset App State empties the cart', { tag: '@regression' }, async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await addProducts(page, [products.backpack, products.bikeLight]);
    await inventoryPage.expectCartBadge(2);

    await inventoryPage.resetAppState();

    await inventoryPage.expectNoCartBadge();
    await inventoryPage.openCart();
    await cartPage.expectItemCount(0);
  });
});
