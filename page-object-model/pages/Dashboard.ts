import { Page, Locator } from '@playwright/test';

export class Dashboard {
  public page: Page;
  public solutionsDropdown: Locator;
  public meetingRoomsButton: Locator;
  public getStartedButton: Locator;
  public boardRoom: Locator;

  constructor(page: Page) {
    this.page = page;

    this.solutionsDropdown = page.locator(
      '//button[.//span[contains(text(), "Solutions")]]'
    );

    this.meetingRoomsButton = page.locator(
      '//a[@href="/meeting-room" and .//span[contains(normalize-space(), "Meeting Rooms")]]'
    );

    this.getStartedButton = page.locator(
      '//div[@class="mt-8"]'
    );

    this.boardRoom = page.locator(
      '//button[contains(.,\'Get Started\')]',
    ).nth(1);
  }

  async goto() {
    await this.page.goto('https://alpha-hub.kmc.solutions/');
  }

  // getBoardRoom(): Locator {
  //   return this.page.locator('div.flex.flex-col', { 
  //     has: this.page.locator('span', { hasText: 'Boardroom' })
  //   }).getByRole('button', { name: 'Get Started' }).nth(1);
  // }

  async goToBoardroomLocation() {
    await this.goto();
    await this.solutionsDropdown.click();
    await this.meetingRoomsButton.click({ force: true });
    await this.getStartedButton.click();
    await this.boardRoom.click();
  }
}
