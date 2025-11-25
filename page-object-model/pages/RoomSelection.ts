import { Page, Locator, expect } from '@playwright/test';

export class RoomSelection {
  public page: Page;
  public dateInput: Locator;
  public timeInput: Locator;
  public boardroomCard: Locator;
  public continueButton: Locator;
  public agreeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.dateInput = page.locator(
      '//input[@id="input-date"]'
    );

    this.timeInput = page.locator(
      '//div[@id="timeSlot-04:00 AM"]'
    );
    
    this.boardroomCard = page.locator(
      '//span[contains(text(), "MEDIUM ROOM FOR 8 PAX")]'
    );

    this.continueButton = page.locator(
      '//button[contains(text(), "Continue")]'
    );

    this.agreeButton = page.locator(
      '//a[@id="hs-eu-confirmation-button" and contains(text(), "Accept")]'
    );
  }

  async goto() {
    await this.page.goto(
      'https://alpha-hub.kmc.solutions/guest-booking/3?bsid=26'
    );
  }

  async selectDate(date: string) {
    await this.dateInput.fill('');
    await this.dateInput.fill(date);
  }

  async locationInformation() {
    await this.goto();
    await this.selectDate('2025-11-27');
    await expect(this.dateInput).toHaveValue('2025-11-27');
    await this.timeInput.click();
    await this.agreeButton.click();
    await this.boardroomCard.click();
    await this.continueButton.click(); 
  }
}
