import { test } from '../fixtures/mobile-authFixtures';
import { expect } from '@playwright/test';
import { RoomSelection } from '../pages-responsive/RoomSelection';

test.describe('Room Selection', () => {
  test('select 9F - BOARDROOM', async ({ page }) => {
    const roomSelection = new RoomSelection(page);

    await roomSelection.goto();

    await roomSelection.completeReservationFlow("berlene.bernabe@kmc.solutions");
  });

});
