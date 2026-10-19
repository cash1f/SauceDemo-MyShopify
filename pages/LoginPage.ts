import { Page, expect } from '@playwright/test';

export class LoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async expectError(message: string) {
    await expect(this.page.getByTestId('error')).toContainText(message);
  }

  async expectOnLoginPage() {
    await expect(this.page).toHaveURL('/');
    await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
  }
}
