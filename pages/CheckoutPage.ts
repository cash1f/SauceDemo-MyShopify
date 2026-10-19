import { Page, expect } from '@playwright/test';
import { parsePrice } from '../helpers/price';

export class CheckoutPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillInfo(firstName: string, lastName: string, postcode: string) {
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);
    await this.page.getByPlaceholder('Zip/Postal Code').fill(postcode);
  }

  async clickContinue() {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async cancel() {
    await this.page.getByRole('button', { name: 'Cancel' }).click();
  }

  async expectError(message: string) {
    await expect(this.page.getByTestId('error')).toContainText(message);
  }

  async expectOnOverviewPage() {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await expect(this.page.getByTestId('title')).toHaveText('Checkout: Overview');
  }

  // Reads "Item total: $29.99" and returns 29.99
  async getItemTotal() {
    const text = await this.page.getByTestId('subtotal-label').innerText();
    return parsePrice(text);
  }

  async getTax() {
    const text = await this.page.getByTestId('tax-label').innerText();
    return parsePrice(text);
  }

  async getTotal() {
    const text = await this.page.getByTestId('total-label').innerText();
    return parsePrice(text);
  }

  async getItemPrices() {
    const texts = await this.page.getByTestId('inventory-item-price').allTextContents();
    const prices: number[] = [];
    for (const text of texts) {
      prices.push(parsePrice(text));
    }
    return prices;
  }

  async finish() {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }

  async expectOrderComplete() {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
  }

  async backHome() {
    await this.page.getByRole('button', { name: 'Back Home' }).click();
  }
}
