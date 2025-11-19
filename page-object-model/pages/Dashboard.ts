import { Page, Locator, expect } from '@playwright/test';

export class Dashboard {
  readonly page: Page;
  readonly header: Locator;
  readonly okButton: Locator;
  readonly signOutMenuItem: Locator; 
  readonly confirmSignOutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByRole('heading', { name: 'National University Laboratory System' });
    this.okButton = page.getByRole('button', { name: 'OK' });
    this.signOutMenuItem = page.getByRole('menuitem', { name: /Sign Out/i });
    this.confirmSignOutButton = page.getByRole('button', { name: 'Yes, Sign Out' });
  }

  async checkHeaderVisible() {
    await expect(this.header).toBeVisible();
  }

  async closeModal() {
    await this.okButton.click();
  }

  async signOut() {
    await this.signOutMenuItem.click();
    await this.confirmSignOutButton.click();
  }
}