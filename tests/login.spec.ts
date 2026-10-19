import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { loginAsStandardUser } from '../helpers/shop';
import { standardUser, lockedOutUser, password } from '../test-data/users';
import { invalidLogins } from '../test-data/loginCases';

test.describe('Login', () => {
  test('L01 standard_user logs in and lands on Products', { tag: '@smoke' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login(standardUser, password);

    await inventoryPage.expectOnProductsPage();
  });

  test('L02 locked_out_user sees the locked out error', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(lockedOutUser, password);

    await loginPage.expectError('Sorry, this user has been locked out.');
  });

  // L03 to L05: one test per row of data
  for (const row of invalidLogins) {
    test(`${row.id} ${row.title}`, { tag: row.tag }, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.open();
      await loginPage.login(row.username, row.password);

      await loginPage.expectError(row.error);
    });
  }

  test('L06 opening inventory without login shows the access error', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.open();

    await loginPage.expectOnLoginPage();
    await loginPage.expectError("You can only access '/inventory.html' when you are logged in.");
  });

  test('L07 logout from the menu returns to the login page', { tag: '@smoke' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginAsStandardUser(page);
    await inventoryPage.logout();

    await loginPage.expectOnLoginPage();
  });
});
