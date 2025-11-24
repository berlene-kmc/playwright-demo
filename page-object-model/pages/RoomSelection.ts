import { Page, Locator } from '@playwright/test';

export class RoomSelection {
  readonly page: Page;
  readonly boardroomCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.boardroomCard = page.getByText('9F - BOARDROOM', { exact: true });
  }

  async goto() {
    await this.page.goto(
      'https://kmc-hub-git-feat-new-checkout-kmc-dev-team.vercel.app/products/board-room/6/room-selection'
    );
  }

  async selectBoardroom() {
    await this.boardroomCard.click();
  }

  async selectTimeSlot(time: string) {
    const slot = this.page.locator(`.rbc-event:has-text("${time}")`);
    await slot.click();
  }
}
