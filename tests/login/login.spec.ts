import { test, expect } from '@playwright/test';
import { PomManager } from '../../pages/PomManager';

test.describe('Login Tests', () => {
  let pm: PomManager;

  test.beforeEach('Navigate to the test environment URL', async ({ page }) => {
    pm = new PomManager(page);
    await pm.loginPage.goto('https://test.iprep.in/');
  });

  // Test Case: Checks if the Existing user can logged-in in the app with valid credentials 
  test('Existing users should successfully log in with valid credentials', async ({ page }) => {

    await test.step('Enter a valid mobile number in the input field', async () => {
      await pm.loginPage.fillMobileNumber('6969696969');
    });

    await test.step('Click on the "Continue" button to proceed', async () => {
      await pm.loginPage.clickOnContinueBtn();    
    });

    await test.step('Enter a valid OTP in the OTP input field', async () => {
      await pm.otpPopUp.fillOTP('696969');  
    });

    await test.step('Click on the "Verify" button to authenticate', async () => {
      await pm.otpPopUp.clickOnVerifyBtn();  
    });
    
    // Assertion: Check if the iPrep image is visible
    await test.step('Verify that the iPrep logo is displayed on the homepage', async () => {
      await expect(page.getByRole('img', { name: 'iPrep' })).toBeVisible();
    });   

    // Assertion: Check if the Academics is visible
    await test.step('Verify that the "Academics" header is visible on the homepage', async () => {
      await expect(page.locator('#home')).toContainText('Academics');
    });
    
  });

  // Test Case: Checks the Error msg for invalid mobile no.
  test('Should display valid error message for invalid mobile number', async () => {

    await test.step('Enter an invalid mobile number', async () => {
      await pm.loginPage.login('5969696969');
    });
    
    const actualErrMessage = await test.step('Retrieve the error message for invalid mobile number', async () => {
      return await pm.loginPage.getErrorMsgForInvalidMobileNo();
    });
    

    // Assertion: Check if the error message is valid
    await test.step('Verify that the expected error  message matches the actual error message', async () => {
      const expectedErrMessage = 'Enter a valid mobile number';
      expect(actualErrMessage).toContain(expectedErrMessage);
    });
    
  });

  // Test Case: Check the error message for invalid otp
  test('Should display valid error message for invalid OTP number', async () => {
  
    await test.step('Enter a valid mobile number and proceed', async () => {
      await pm.loginPage.login('6969696969');
    });
  
    await test.step('Enter an invalid OTP', async () => {
      await pm.otpPopUp.otpVerify('111111');
    });
  
    let errorMessage = await test.step('Retrieve the error message for invalid OTP', async () => {
      return await pm.otpPopUp.getErrorMessageForInvalidOtp();
    });
  
    await test.step('Verify that the error message matches the expected text', async () => {
      expect(errorMessage).toContain('Invalid OTP. Please try again.');
    });
  
  });
  

  // Test Case: Checks if the New User can login into the app with valid credendials
  test('New Users should successfully log in with valid credentials', async ({ page }) => {

    await test.step('Enter a valid mobile number and proceed', async () => {
      await pm.loginPage.login('6969696969');
    });
  
    await test.step('Enter a valid OTP and verify', async () => {
      await pm.otpPopUp.otpVerify('696969');
    });
  
    await test.step('Select the board from the available options', async () => {
      await pm.selectBoardPage.selectBoard();
    });
  
    await test.step('Select the preferred language', async () => {
      await pm.chooseLanguagePage.selectlanguage();
    });
  
    await test.step('Select the grade for the user', async () => {
      await pm.chooseGradePage.selectGrade();
    });
  
    await test.step('Fill in the name field on the "Share About Yourself" page', async () => {
      await pm.shareAboutYourselfPage.fillNameField('Test');
    });
  
    await test.step('Click on the "Get Started" button', async () => {
      await pm.shareAboutYourselfPage.clicksOnGetStartedBtn();
    });
  
    await test.step('Verify that the iPrep logo is visible on the home page', async () => {
      await expect(page.getByRole('img', { name: 'iPrep' })).toBeVisible();
    });
  
    await test.step('Verify that the user is a trial user', async () => {
      await expect(page.getByRole('main')).toContainText('trial');
    });
  
    await test.step('Verify that the Academics section is visible on the home page', async () => {
      await expect(page.locator('#home')).toContainText('Academics');
    });
  
  });
  
});
