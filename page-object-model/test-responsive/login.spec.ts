import { test } from '../fixtures/mobile-authFixtures';
import { expect } from '@playwright/test';

test.describe('Login Tests', () => {

  test('Login with valid credentials', async ({ loginPage, assertEndpoint, dashboard }) => {
    await loginPage.goto();

    await assertEndpoint.assertEndpoint(
      "/api/Hub/login",
      200,
      async () => {
        await loginPage.login("berlene.bernabe@kmc.solutions", "Cats09122430!");
      }
    );
  });
});

