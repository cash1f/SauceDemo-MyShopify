import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { goToCheckout, roundMoney } from '../helpers/shop';
import { checkoutInfo, products } from '../test-data/users';
import { checkoutFormCases } from '../test-data/checkoutCases';

test.describe('Checkout', () => {
  test('K01 full happy path ends with Thank you for your order!', { tag: '@smoke' }, async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await goToCheckout(page, [products.backpack]);
    await checkoutPage.fillInfo(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.postcode);
    await checkoutPage.clickContinue();
    await checkoutPage.expectOnOverviewPage();
    await checkoutPage.finish();

    await checkoutPage.expectOrderComplete();
  });

  // K02: one test per row of data
  for (const row of checkoutFormCases) {
    test(`${row.id} ${row.title}`, { tag: '@regression' }, async ({ page }) => {
      const checkoutPage = new CheckoutPage(page);

      await goToCheckout(page, [products.backpack]);
      await checkoutPage.fillInfo(row.firstName, row.lastName, row.postcode);
      await checkoutPage.clickContinue();

      await checkoutPage.expectError(row.error);
    });
  }

  test('K03 overview item total equals the sum of item prices', { tag: '@regression' }, async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await goToCheckout(page, [products.backpack, products.bikeLight, products.boltShirt]);
    await checkoutPage.fillInfo(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.postcode);
    await checkoutPage.clickContinue();
    await checkoutPage.expectOnOverviewPage();

    const prices = await checkoutPage.getItemPrices();
    let sum = 0;
    for (const price of prices) {
      sum = sum + price;
    }
    const itemTotal = await checkoutPage.getItemTotal();
    expect(itemTotal).toBe(roundMoney(sum));
  });

  test('K04 overview total equals item total plus tax', { tag: '@regression' }, async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await goToCheckout(page, [products.backpack, products.fleeceJacket]);
    await checkoutPage.fillInfo(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.postcode);
    await checkoutPage.clickContinue();
    await checkoutPage.expectOnOverviewPage();

    const itemTotal = await checkoutPage.getItemTotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();
    expect(total).toBe(roundMoney(itemTotal + tax));
  });

  test('K05 cancel on the info page returns to the cart', { tag: '@regression' }, async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page);

    await goToCheckout(page, [products.backpack]);
    await checkoutPage.cancel();

    await cartPage.expectOnCartPage();
  });

  test('K06 Back Home after the order clears the cart', { tag: '@regression' }, async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const inventoryPage = new InventoryPage(page);

    await goToCheckout(page, [products.backpack]);
    await checkoutPage.fillInfo(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.postcode);
    await checkoutPage.clickContinue();
    await checkoutPage.finish();
    await checkoutPage.backHome();

    await inventoryPage.expectOnProductsPage();
    await inventoryPage.expectNoCartBadge();
  });
});
