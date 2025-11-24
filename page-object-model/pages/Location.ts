import { Page, Locator } from '@playwright/test';

export class Location {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  picadillyStarCard(): Locator {
    return this.page.locator('button', { 
      has: this.page.locator('p', { hasText: /picadilly star/i }) 
    });
  }

  async selectPicadillyStar() {
    const card = this.picadillyStarCard();
    await card.waitFor({ state: 'visible', timeout: 10000 });
    await card.click();
  }

  async selectDate(date: string) {
    await this.page.locator('#input-date').fill(date);
  }
}