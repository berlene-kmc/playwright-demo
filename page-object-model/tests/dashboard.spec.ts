import { test } from '../fixtures/authFixtures';
import { expect } from '@playwright/test';

test.describe('Dashboard Tests', () => {

  test('Open user profile and check dashboard button', async ({ dashboard }) => {
    console.log('Test started');

    await dashboard.goto();

    await expect(dashboard.solutionsDropdown).toBeVisible();
    await dashboard.solutionsDropdown.click();
    await dashboard.meetingRoomsButton.click({ force: true });
    await dashboard.getStartedButton.click();
    await dashboard.boardRoom.click();

    // const boardRoom = dashboard.getBoardRoom();
    // await expect(boardRoom).toBeVisible();
    // await boardRoom.scrollIntoViewIfNeeded();
    // await boardRoom.click();
  });

});
