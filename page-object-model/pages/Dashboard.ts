import { Page, Locator, expect } from '@playwright/test';

export class Dashboard {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get header(): Locator {
    return this.page.getByRole('heading', { name: 'National University Laboratory System' });
  }

  get okButton(): Locator {
    return this.page.getByRole('button', { name: 'OK' });
  }

  get adminButton(): Locator {
    return this.page.getByText('Admin Panel', { exact: true });
  }

  get inventoryButton(): Locator {
    return this.page.getByText('Inventory', { exact: true });
  }

  get signOutMenuItem(): Locator {
    return this.page.getByRole('menuitem', { name: /Sign Out/i });
  }

  get confirmSignOutButton(): Locator {
    return this.page.getByRole('button', { name: 'Yes, Sign Out' });
  }

  async checkHeaderVisible() {
    // await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('load');

    if (await this.okButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.okButton.click();
    }

    await expect(this.header).toBeVisible({ timeout: 15000 });
  }

  async closeModal() {
    if (await this.okButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.okButton.click();
    }
  }

  async goToInventory() {
    await this.adminButton.click();
    await expect(this.inventoryButton).toBeVisible({ timeout: 10000 });
    await this.inventoryButton.click();
    // await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('load');
  }

  async signOut() {
    await this.signOutMenuItem.click();
    await this.confirmSignOutButton.click();
  }
}
