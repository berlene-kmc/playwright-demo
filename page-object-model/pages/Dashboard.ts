import { Page, Locator, expect } from '@playwright/test';

export class Dashboard {
  readonly page: Page;
  readonly header: Locator;
  readonly okButton: Locator;
  readonly adminButton: Locator;
  readonly inventoryButton: Locator;
  readonly signOutMenuItem: Locator; 
  readonly confirmSignOutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByRole('heading', { name: 'National University Laboratory System' });
    this.okButton = page.getByRole('button', { name: 'OK' });
    this.adminButton = page.getByText('Admin Panel', { exact: true });
    this.inventoryButton = page.getByText('Inventory', { exact: true });
    this.signOutMenuItem = page.getByRole('menuitem', { name: /Sign Out/i });
    this.confirmSignOutButton = page.getByRole('button', { name: 'Yes, Sign Out' });
  }

async checkHeaderVisible() {
  await this.page.waitForLoadState('networkidle');

  if (await this.okButton.isVisible()) {
    await this.okButton.click();
  }

  await expect(this.header).toBeVisible({ timeout: 10000 });
}

  async closeModal() {
    await this.okButton.click();
  }

  async goToInventory() {
    await this.adminButton.click();
    await expect(this.inventoryButton).toBeVisible();
    await this.inventoryButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async signOut() {
    await this.signOutMenuItem.click();
    await this.confirmSignOutButton.click();
  }
}