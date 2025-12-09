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

//  async fetchBoardRoomList(): Promise<any> {
//   try {
//     // Get the base URL from the current page
//     const baseUrl = this.page.url().split('/').slice(0, 3).join('/');
//     const apiUrl = `${baseUrl}/api/hub/buildings/packages/board-room/list`;
    
//     // Use page.request.get instead of evaluate with fetch for better reliability
//     const response = await this.page.request.get(apiUrl);

//     if (!response.ok()) {
//       throw new Error(`Failed to fetch board rooms. Status: ${response.status()}`);
//     }

//     const data = await response.json();
//     console.log('📦 Boardroom List Fetched:', data);
//     return data;
//   } catch (e: any) {
//     throw new Error(`API Error fetching board rooms: ${e.message}`);
//   }
// }

  // async assertBoardRoomList(): Promise<void> {
  //   try {
  //     const data = await this.fetchBoardRoomList();

  //     // Safely handle different API response structures
  //     const buildings = data?.buildings || data?.data?.buildings;

  //     if (!buildings || !Array.isArray(buildings) || buildings.length === 0) {
  //       throw new Error("Boardroom list is empty or invalid");
  //     }

  //     console.log(
  //       chalk.green(`✅ Boardroom list has ${buildings.length} buildings.`)
  //     );
  //   } catch (e: any) {
  //     throw new Error(
  //       chalk.red(`Boardroom assertion failed: ${e.message}`)
  //     );
  //   }
  // }

  // async clickPicadillyStarCardWithAssertion(endpoint: string) {
  //   await this.assertEndpoint.assertEndpoint(
  //     endpoint,
  //     200,
  //     async () => {
  //       await this.clickPicadillyStarCard();
  //     }
  //   );
  // }
}
