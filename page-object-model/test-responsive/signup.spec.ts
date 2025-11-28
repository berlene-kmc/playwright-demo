import { test } from '../fixtures/mobile-authFixtures';
import { expect, devices} from '@playwright/test';
import { Signup } from '../pages-responsive/Signup';

test.describe('Signup Tests', () => {
  
  test('Click Google Signup Button', async ({ page }) => {
    const signup = new Signup(page);

    await page.goto('https://kmc-hub-git-feat-new-checkout-kmc-dev-team.vercel.app/auth/sign-up'); 

    // await signup.clickContinueButton();

    // await expect(page).toHaveURL(/accounts\.google\.com/);');

    // await signup.clickNextButton();

    await signup.completeSignup("berlene.bernabe@kmc.solutions", "Berlene", "Bernabe", "Software Engineer", "StrongPassword123!", "StrongPassword123!");   

    // await page.pause();

  });

});
