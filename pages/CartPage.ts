import { Page, expect } from '@playwright/test';

export class CartPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectOnCartPage() {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.page.getByTestId('title')).toHaveText('Your Cart');
  }

  async getProductNames() {
    return await this.page.getByTestId('inventory-item-name').allTextContents();
  }

  async expectItemCount(count: number) {
    await expect(this.page.getByTestId('inventory-item')).toHaveCount(count);
  }

  async removeItem(productName: string) {
    await this.page
      .getByTestId('inventory-item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async continueShopping() {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async checkout() {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }
}
