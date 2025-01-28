import { test, expect } from '@playwright/test';
import { PomManager } from '../../pages/PomManager';

test.describe('Login Tests', () => {
  let pm: PomManager;

  test.beforeEach(async ({ page }) => {
    pm = new PomManager(page);
    await pm.loginPage.goto();
  });

  // Test Case: Checks if the Existing user can logged-in in the app with valid credentials 
  test('Existing Users should successfully log in with valid credentials', async ({ page }) => {
    await pm.loginPage.fillMobileNumber('6969696969');
    await pm.loginPage.clickOnContinueBtn();
    await pm.otpPopUp.fillOTP('696969');
    await pm.otpPopUp.clickOnVerifyBtn();

    // Assertion: Check if the iPrep image is visible
    await expect(page.getByRole('img', { name: 'iPrep' })).toBeVisible();

    // Assertion: Check if the Academics is visible
    await expect(page.locator('#home')).toContainText('Academics');
  });

  // Test Case: Checks the Error msg for invalid mobile no.
  test('Should display valid error message for invalid mobile number', async ({ page }) => {
    await pm.loginPage.login('5969696969');
    let message = await pm.loginPage.getErrorMsgForInvalidMobileNo();

    // Assertion: Check if the error message is valid
    expect(message).toContain('Enter a valid mobile number');
  });

  // Test Case: Check the error message for invalid otp
  test('Should display valid error message for invalid otp number', async ({ page }) => {
    await pm.loginPage.login('6969696969');
    await pm.otpPopUp.otpVerify('111111');
    let message = await pm.otpPopUp.getErrorMessageForInvalidOtp();
    console.log(message);

    // Assertion: Check if the error message is valid
    expect(message).toContain('Invalid OTP. Please try again.');
  });

  // Test Case: Checks if the New User can login into the app with valid credendials
  test('New Users should successfully log in with valid credentials', async ({ page }) => {
    await pm.loginPage.login('6969696969');
    await pm.otpPopUp.otpVerify('696969');
    await pm.selectBoardPage.selectBoard();
    await pm.chooseLanguagePage.selectlanguage();
    await pm.chooseGradePage.selectGrade();
    await pm.shareAboutYourselfPage.fillNameField('Test');
    await pm.shareAboutYourselfPage.clicksOnGetStartedBtn();

    // Assertion: Check if the iPrep image is visible
    await expect(page.getByRole('img', { name: 'iPrep' })).toBeVisible();

    // Assertion: Check if the user is trial user
    await expect(page.getByRole('main')).toContainText('trial');

    // Assertion: Check if the Academics is visible
    await expect(page.locator('#home')).toContainText('Academics');
  });
});
