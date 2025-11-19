import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Dashboard } from '../pages/Dashboard';

test('login and signout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new Dashboard(page);

  await loginPage.goto();
  await loginPage.login('bernabebf@students.nu-moa.edu.ph', 'Mikmik1224!');
  await page.waitForLoadState('networkidle');
  await dashboard.checkHeaderVisible();
  await dashboard.closeModal();
  await dashboard.signOut();
});