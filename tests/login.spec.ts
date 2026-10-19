import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { loginAsStandardUser } from '../helpers/shop';
import { standardUser, lockedOutUser, password } from '../test-data/users';

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

  test('L03 wrong password shows the do not match error', { tag: '@smoke' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(standardUser, 'wrong_password');

    await loginPage.expectError('Username and password do not match any user in this service');
  });

  test('L04 empty username shows Username is required', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('', password);

    await loginPage.expectError('Username is required');
  });

  test('L05 empty password shows Password is required', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(standardUser, '');

    await loginPage.expectError('Password is required');
  });

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
