import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Should successfully log in with valid credentials', async ({ page }) => {
    await loginPage.fillMobileNumber('6969696969');
    await loginPage.continue();
    await loginPage.fillOTP('696969');
    await loginPage.verifyOtp();

    // Assertion: Check if the logout link is visible
    await expect(loginPage.logoutLink).toBeVisible();
  });
});
