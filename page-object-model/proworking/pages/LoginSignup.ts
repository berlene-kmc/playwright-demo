import { Page, expect, Locator } from '@playwright/test';
import chalk from 'chalk';

export class LoginSignupPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://kmc-hub-git-feat-new-checkout-kmc-dev-team.vercel.app/auth/sign-in');
    console.log(chalk.green('✅ Navigated to login page'));
  }

  async fillEmail(email: string) {
    try {
      const emailInput = this.page.locator(
        '//input[@type="email" or contains(@placeholder, "mail") or @name="email"]'
      );

      await expect(emailInput).toBeVisible({ timeout: 60000 });
      await expect(emailInput).toBeEnabled({ timeout: 60000 });
      await emailInput.fill(email);
      console.log(chalk.green(`✅ Filled email: ${email}`));

    } catch (e: any) {
      throw new Error(chalk.red(`Error filling email input: ${e.message}`));
    }
  }

  async fillPassword(password: string) {
    try {
      const passwordInput = this.page.locator('//input[@type="password"]');
      await expect(passwordInput).toBeVisible({ timeout: 60000 });
      await expect(passwordInput).toBeEnabled({ timeout: 60000 });
      await passwordInput.fill(password);
      console.log(chalk.green(`✅ Filled password`));

    } catch (e: any) {
      throw new Error(chalk.red(`Error filling password input: ${e.message}`));
    }
  }

  async clickAgree() {
    try {
      const agreeButton = this.page.locator('//a[@id="hs-eu-confirmation-button" and contains(text(), "Accept")]');
      await expect(agreeButton).toBeVisible({ timeout: 60000 });
      await expect(agreeButton).toBeEnabled({ timeout: 60000 });
      await agreeButton.click();
      console.log(chalk.green('✅ Clicked agree button'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking agree button: ${e.message}`));
    }
  }

  async clickSubmit() {
    try {
      const submitButton = this.page.locator('//button[@type="submit"]');
      await expect(submitButton).toBeVisible({ timeout: 60000 });
      await expect(submitButton).toBeEnabled({ timeout: 60000 });
      await submitButton.click();
      console.log(chalk.green('✅ Clicked submit button'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking submit button: ${e.message}`));
    }
  }

  ////////////////////////////////////////////////////////////////////////////

  async clickSignupButton() {
     try {
      const signupButton = this.page.locator('//a[contains(text(), "Sign up")]');
      await expect(signupButton).toBeVisible({ timeout: 60000 });
      await expect(signupButton).toBeEnabled({ timeout: 60000 });
      await signupButton.click();
      console.log(chalk.green('✅ Clicked signup button'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking signup button: ${e.message}`));
    }
  }

  async inputEmail(email: string) {
    try {
      const emailInput = this.page.locator('//input[@placeholder="name@company.com"]');
      await expect(emailInput).toBeVisible({ timeout: 60000 });
      await expect(emailInput).toBeEnabled({ timeout: 60000 });
      await emailInput.fill(email);
      console.log(chalk.green(`✅ Filled email: ${email}`));

    } catch (e: any) {
      throw new Error(chalk.red(`Error filling email input: ${e.message}`));
    }
  }

  async inputFirstName(fName: string) {
     try {
      const firstNameInput = this.page.locator('//input[@placeholder="First Name"]');
      await expect(firstNameInput).toBeVisible({ timeout: 60000 });
      await expect(firstNameInput).toBeEnabled({ timeout: 60000 });
      await firstNameInput.fill(fName);
      console.log(chalk.green('✅ Input First Name'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error input first name: ${e.message}`));
    }
  }

  async inputLastName(lName: string) {
     try {
      const lastNameInput = this.page.locator('//input[@placeholder="Last Name"]');
      await expect(lastNameInput).toBeVisible({ timeout: 60000 });
      await expect(lastNameInput).toBeEnabled({ timeout: 60000 });
      await lastNameInput.fill(lName);
      console.log(chalk.green('✅ Input Last Name'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error input last name: ${e.message}`));
    }
  }

  async inputJobTitle(jobTitle: string) {
     try {
      const jobTitleInput = this.page.locator('//input[@placeholder="Job Title"]');
      await expect(jobTitleInput).toBeVisible({ timeout: 60000 });
      await expect(jobTitleInput).toBeEnabled({ timeout: 60000 });
      await jobTitleInput.fill(jobTitle);
      console.log(chalk.green('✅ Input Job Title '));

    } catch (e: any) {
      throw new Error(chalk.red(`Error input Job Title: ${e.message}`));
    }
  }

  async inputPassword(password: string) {
     try {
      const passwordInput = this.page.locator('//input[@name="password"]');
      await expect(passwordInput).toBeVisible({ timeout: 60000 });
      await expect(passwordInput).toBeEnabled({ timeout: 60000 });
      await passwordInput.fill(password);
      console.log(chalk.green('✅ Input Password'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error input Password: ${e.message}`));
    }
  }

  async inputConfirmPassword(confirmPassword: string) {
     try {
      const confirmPasswordInput = this.page.locator('//input[@name="confirmPassword"]');
      await expect(confirmPasswordInput).toBeVisible({ timeout: 60000 });
      await expect(confirmPasswordInput).toBeEnabled({ timeout: 60000 });
      await confirmPasswordInput.fill(confirmPassword);
      console.log(chalk.green('✅ Input Confirm Password '));

    } catch (e: any) {
      throw new Error(chalk.red(`Error input Confirm Password: ${e.message}`));
    }
  }

  async clickContinue() {
    try {
      const continueButton = this.page.locator('//button[@type="submit" and contains(text(), "Continue")]');
      await expect(continueButton).toBeVisible({ timeout: 60000 });
      await expect(continueButton).toBeEnabled({ timeout: 60000 });
      await continueButton.click();
      console.log(chalk.green('✅ Clicked submit button'));

    } catch (e: any) {
      throw new Error(chalk.red(`Error clicking submit button: ${e.message}`));
    }
  }
  
  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickAgree();
    await this.clickSubmit();
  }

  async signup(email: string, fName: string, lName: string, jobTitle: string, password: string, confirmPass: string) {
    await this.clickSignupButton();
    await this.inputEmail(email);
    await this.inputFirstName(fName);
    await this.inputLastName(lName);
    await this.inputJobTitle(jobTitle);
    await this.inputPassword(password);
    await this.inputConfirmPassword(confirmPass);
    await this.clickContinue();
  }
}
