import { Page, Locator, expect } from "@playwright/test";
import chalk from "chalk";
import { AssertEndpoint } from "../utils/assertEndpoints"; 

export class Location {
  private page: Page;
  private picadillyStarCard: Locator;
  private assertEndpoint: AssertEndpoint;

  constructor(page: Page) {
    this.page = page;
    this.assertEndpoint = new AssertEndpoint(page);

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

  async fetchBoardRoomList(): Promise<any> {
    try {
      const apiUrl =
        "https://erp-hub-api-v2-new-checkout.azurewebsites.net/api/hub/buildings/3/packages/proworking";

      const response = await this.page.request.get(apiUrl);

      if (!response.ok()) {
        throw new Error(
          `Failed to fetch board rooms. Status: ${response.status()}`
        );
      }

      const data = await response.json();
      console.log(chalk.green("📦 Boardroom List Fetched:"), data);

      return data;

    } catch (e: any) {
      throw new Error(
        chalk.red(`API Error fetching board rooms: ${e.message}`)
      );
    }
  }

  async assertBoardRoomList(): Promise<void> {
    try {
      const data = await this.fetchBoardRoomList();

      if (
        !data?.data?.buildings ||
        !Array.isArray(data.data.buildings) ||
        data.data.buildings.length === 0
      ) {
        throw new Error("Boardroom list is empty or invalid");
      }

      console.log(
        chalk.green(
          `✅ Boardroom list has ${data.data.buildings.length} buildings.`
        )
      );

    } catch (e: any) {
      throw new Error(
        chalk.red(`Boardroom assertion failed: ${e.message}`)
      );
    }
  }

async assertEndpointOnPage(
  page: Page,
  endpoint: string,
  expectedStatus: number
): Promise<void> {
  const response = await page.waitForResponse(
    (res) => res.url().includes(endpoint) && res.status() === expectedStatus,
    { timeout: 60000 }
  );

  console.log("✅ API found:", response.url());
}

async clickPicadillyStarCardWithAssertion(endpoint: string) {
  const [newPage] = await Promise.all([
    this.page.context().waitForEvent("page"),
    this.clickPicadillyStarCard(),
  ]);

  console.log(chalk.green("🆕 New tab opened."));

  await this.assertEndpoint.assertEndpointOnPage(newPage, endpoint, 200);
}
}
