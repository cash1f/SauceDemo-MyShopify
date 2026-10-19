import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { standardUser, password } from '../test-data/users';

export async function loginAsStandardUser(page: Page) {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(standardUser, password);
}

export async function addProducts(page: Page, productNames: string[]) {
  const inventoryPage = new InventoryPage(page);
  for (const name of productNames) {
    await inventoryPage.addToCart(name);
  }
}

// Login, add the products, and open the checkout info page
export async function goToCheckout(page: Page, productNames: string[]) {
  await loginAsStandardUser(page);
  await addProducts(page, productNames);
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.openCart();
  const cartPage = new CartPage(page);
  await cartPage.checkout();
}
