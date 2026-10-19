import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/inventory.html');
  }

  async expectOnProductsPage() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.getByTestId('title')).toHaveText('Products');
  }

  async logout() {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
    await this.page.getByRole('button', { name: 'Logout' }).click();
  }

  async resetAppState() {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
    await this.page.getByRole('button', { name: 'Reset App State' }).click();
  }

  // Each product card on the page
  items() {
    return this.page.getByTestId('inventory-item');
  }

  async getProductNames() {
    return await this.page.getByTestId('inventory-item-name').allTextContents();
  }

  async getProductPrices() {
    const texts = await this.page.getByTestId('inventory-item-price').allTextContents();
    const prices: number[] = [];
    for (const text of texts) {
      prices.push(Number(text.replace('$', '')));
    }
    return prices;
  }

  async sortBy(option: string) {
    await this.page.getByTestId('product-sort-container').selectOption({ label: option });
  }

  async addToCart(productName: string) {
    await this.page
      .getByTestId('inventory-item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async removeFromCart(productName: string) {
    await this.page
      .getByTestId('inventory-item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async expectRemoveButton(productName: string) {
    await expect(
      this.page.getByTestId('inventory-item').filter({ hasText: productName }).getByRole('button', { name: 'Remove' })
    ).toBeVisible();
  }

  async openProduct(productName: string) {
    await this.page.getByTestId('inventory-item-name').filter({ hasText: productName }).click();
  }

  async expectProductDetails(productName: string) {
    await expect(this.page).toHaveURL(/inventory-item\.html/);
    await expect(this.page.getByText(productName, { exact: true })).toBeVisible();
  }

  async backToProducts() {
    await this.page.getByRole('button', { name: 'Back to products' }).click();
  }

  async openCart() {
    await this.page.getByTestId('shopping-cart-link').click();
  }

  async expectCartBadge(count: number) {
    await expect(this.page.getByTestId('shopping-cart-badge')).toHaveText(String(count));
  }

  async expectNoCartBadge() {
    await expect(this.page.getByTestId('shopping-cart-badge')).toBeHidden();
  }
}
