import { test } from '../fixtures/authFixtures';
import { expect } from '@playwright/test';
import { RoomSelection } from '../pages/RoomSelection';

test.describe('Room Selection', () => {
  test('select 9F - BOARDROOM', async ({ page }) => {
    const roomSelection = new RoomSelection(page);

    await roomSelection.goto();
    await roomSelection.selectDate('2025-11-27');
    await expect(roomSelection.dateInput).toHaveValue('2025-11-27');
    await roomSelection.timeInput.click();
    await roomSelection.agreeButton.click();
    await roomSelection.boardroomCard.click();
    await roomSelection.continueButton.click(); 
  });

});
