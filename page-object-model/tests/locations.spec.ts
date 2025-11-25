import { test } from '../fixtures/authFixtures';
import { expect } from '@playwright/test';
import { Location } from '../pages/Location';

test.describe('Location Page Tests', () => {

  test('Select Picadilly Star card', async ({ dashboard, page }) => {
    const location = new Location(page);

    await dashboard.goToBoardroomLocation();
    await location.picadillyStarCard.click();

    // await location.selectPicadillyStar();

    // await location.selectDate("2025-11-30");

    // await expect(page.locator('#input-date')).toHaveValue("2025-11-30");

  });

});
