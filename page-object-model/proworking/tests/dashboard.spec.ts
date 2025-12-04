import { test } from '../fixtures/authFixtures';
import { expect } from '@playwright/test';

test.describe('Dashboard Tests', () => {

  test('Open user profile and check dashboard button', async ({ dashboard }) => {
    console.log('Test started');

    await dashboard.goToBoardroomLocation();

  });

});
