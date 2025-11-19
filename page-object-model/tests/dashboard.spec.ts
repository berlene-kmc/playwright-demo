import { test } from '../fixtures/authFixtures';
import { expect } from '@playwright/test';

test.describe('Dashboard Tests', () => {

  test.beforeEach(async ({ loginPage, dashboard }) => {
    await loginPage.goto();
    await loginPage.login('bernabebf@students.nu-moa.edu.ph', 'Mikmik1224!');
    await dashboard.checkHeaderVisible();
    await dashboard.closeModal();
  });

  test.afterEach(async ({ dashboard }) => {
    await dashboard.signOut();
  });

  test('Navigate to Inventory', async ({ dashboard }) => {
    await dashboard.goToInventory();
    await expect(dashboard.inventoryButton).toBeVisible();
  });

});
