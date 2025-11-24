import { test } from '../fixtures/authFixtures';
import { expect } from '@playwright/test';

test.describe('Login Tests', () => {

  test('Login with valid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('berlene.bernabe@kmc.solutions', 'Cats09122430!');
  });

});

