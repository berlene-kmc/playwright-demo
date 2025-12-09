import { Page, expect } from '@playwright/test';
import chalk from 'chalk';

export class Dashboard {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://kmc-hub-git-feat-new-checkout-kmc-dev-team.vercel.app/');
    console.log(chalk.green('✅ Navigated to dashboard page'));
  }

  async clickSolutionsDropdown() {
    try {
      const solutionsDropdown = this.page.locator('//button[.//span[contains(text(), "Solutions")]]');
      await expect(solutionsDropdown).toBeVisible({ timeout: 60000 });
      await expect(solutionsDropdown).toBeEnabled({ timeout: 60000 });
      await solutionsDropdown.click();
      console.log(chalk.green('✅ Clicked Solutions dropdown'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Solutions dropdown: ${e.message}`));
    }
  }

  async clickProworkingButton() {
    try {
      const meetingRoomsButton = this.page.locator(
        '//a[@href="/proworking" and .//span[contains(text(), "Proworking")]]'
      );

      await expect(meetingRoomsButton).toBeVisible({ timeout: 60000 });
      await expect(meetingRoomsButton).toBeEnabled({ timeout: 60000 });
      await meetingRoomsButton.click({ force: true });
      console.log(chalk.green('✅ Clicked Meeting Rooms button'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Meeting Rooms button: ${e.message}`));
    }
  }

  async clickGetStarted() {
    try {
      const getStartedButton = this.page.locator('//div[@class="mt-8"]');
      await expect(getStartedButton).toBeVisible({ timeout: 60000 });
      await expect(getStartedButton).toBeEnabled({ timeout: 60000 });
      await getStartedButton.click();
      console.log(chalk.green('✅ Clicked Get Started button'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Get Started button: ${e.message}`));
    }
  }

  async clickBoardRoom() {
    try {
      const boardRoom = this.page.locator('//button[contains(.,\'Get Started\')]').nth(2);
      await expect(boardRoom).toBeVisible({ timeout: 60000 });
      await expect(boardRoom).toBeEnabled({ timeout: 60000 });
      await boardRoom.click();
      console.log(chalk.green('✅ Clicked Board Room button'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking Board Room button: ${e.message}`));
    }
  }

  async goToBoardroomLocation() {
    await this.goto();
    await this.clickSolutionsDropdown();
    await this.clickProworkingButton();
    await this.clickGetStarted()
    await this.clickBoardRoom();
  }

  async waitForProworkingPremiumListAPI() {
    const apiUrl = 'https://erp-hub-api-v2-new-checkout.azurewebsites.net/api/hub/buildings/packages/proworking-premium/list';
    console.log(chalk.cyan(`🔍 Waiting for API: ${apiUrl}`));
    
    try {
      const response = await this.page.waitForResponse(
        (response) => {
          const url = response.url();
          if (url.includes(apiUrl)) {
            console.log(chalk.green(`✅ API Response captured: ${url} - Status: ${response.status()}`));
            return true;
          }
          return false;
        },
        { timeout: 60000 }
      );
      console.log(chalk.green(`✅ Proworking Premium List API call successful - Status: ${response.status()}`));
      return response;
    } catch (e: any) {
      console.log(chalk.red(`❌ Failed to capture API response: ${e.message}`));
      throw e;
    }
  }
}
