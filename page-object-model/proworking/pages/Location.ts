import { Page, Locator, expect } from "@playwright/test";
import chalk from "chalk";

export class Location {
  private page: Page;
  private picadillyStarCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.picadillyStarCard = page.locator(
      '//figcaption[contains(text(), "Picadilly Star")]'
    );
  }

  async clickPicadillyStarCard() {
    try {
      await expect(this.picadillyStarCard).toBeVisible({ timeout: 60000 });
      await expect(this.picadillyStarCard).toBeEnabled({ timeout: 60000 });

      await this.picadillyStarCard.click();
      console.log(chalk.green("✅ Picadilly Star card clicked."));
    } catch (e: any) {
      throw new Error(
        chalk.red(`Error clicking Picadilly Star card: ${e.message}`)
      );
    }
  }

  // Waits for SPA API response instead of direct request
  async waitForBoardRoomList(endpoint: string) {
    try {
      const response = await this.page.waitForResponse(
        (res) =>
          res.url().includes(endpoint) &&
          res.status() === 200,
        { timeout: 60000 }
      );

      const data = await response.json();
      console.log(chalk.green("📦 Boardroom list fetched from SPA:"), data);

      return data;
    } catch (e: any) {
      throw new Error(
        chalk.red(`Failed to fetch boardroom list: ${e.message}`)
      );
    }
  }

  async assertBoardRoomList(endpoint = "/api/hub/buildings/3/packages/proworking") {
    const data = await this.waitForBoardRoomList(endpoint);

    // Safe check for any structure
    const buildings = data?.data?.buildings || data?.buildings;
    if (!Array.isArray(buildings) || buildings.length === 0) {
      throw new Error("Boardroom list is empty or invalid");
    }

    console.log(
      chalk.green(`✅ Boardroom list has ${buildings.length} buildings.`)
    );
  }

  async clickPicadillyStarCardWithAssertion(endpoint: string) {
    // Click and wait for the SPA response
    await Promise.all([
      this.waitForBoardRoomList(endpoint),
      this.clickPicadillyStarCard(),
    ]);

    console.log(chalk.green("✅ Picadilly Star clicked and data fetched."));
  }
}
