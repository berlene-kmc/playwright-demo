import { Page, expect, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.locator(
      '//input[@type="email" or contains(@placeholder, "mail") or @name="email"]'
    );

    this.passwordInput = page.locator(
      '//input[@id="password"]',
    );

    this.submitButton = page.locator(
      '//button[@type="submit"]',
    );
  }

  async goto() {
    await this.page.goto('https://kmc-hub-git-feat-new-checkout-kmc-dev-team.vercel.app/auth/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
