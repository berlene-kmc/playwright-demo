import { test } from '../fixtures/authFixtures';
import { expect } from '@playwright/test';

// test('login and signout', async ({ loginPage, dashboard }) => {
//   await loginPage.goto();
//   await loginPage.login('bernabebf@students.nu-moa.edu.ph', 'Mikmik1224!');

//   await dashboard.checkHeaderVisible();
//   await dashboard.closeModal();
//   await dashboard.goToInventory();
//   await dashboard.page.pause();
//   await dashboard.signOut();
// });

test.describe('Login Tests', () => {

  test('Login with valid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('bernabebf@students.nu-moa.edu.ph', 'Mikmik1224!');
  });

});
