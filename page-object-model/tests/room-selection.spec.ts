import { test } from '../fixtures/authFixtures';
import { expect } from '@playwright/test';
import { RoomSelection } from '../pages/RoomSelection';

test.describe('Room Selection', () => {
  test('select 9F - BOARDROOM', async ({ page }) => {
    const roomSelection = new RoomSelection(page);

    await roomSelection.goto();

    await roomSelection.selectBoardroom();

    await expect(roomSelection.boardroomCard).toBeVisible();

    await roomSelection.selectTimeSlot('07:30 AM - 07:30 PM');
  });
});
