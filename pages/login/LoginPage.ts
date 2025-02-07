import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly iPrepLogo: Locator;
  readonly inputMobileNumber: Locator;
  readonly continueBtn: Locator;
  readonly googleSSOBtn: Locator;
  readonly appleSSOBtn: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.iPrepLogo = page.getByRole('img', { name: 'logo' }); // Locator for iPrep logo at iprep page

    // Locator the mobileno input field
    this.inputMobileNumber = page.locator('.input_mob_number');

    // Locator the continue button
    this.continueBtn = page.locator(".btn_continue");

    // locator for the google sso button
    this.googleSSOBtn = page.locator('.btn_google');

    // Locator for the apple sso button
    this.appleSSOBtn = page.locator(".verify_btn");

    this.errorMessage = page.locator(".error_txt");
  }

  // Navigate to the learn.iprep.in website
  async goto(url: string) {
    await this.page.goto(url);
  }

  // Fill the mobile no. in mobile no. input field
  async fillMobileNumber(mobileno: string) {
    await this.inputMobileNumber.fill(mobileno);
  }

  // Click the continue button
  async clickOnContinueBtn() {
    await this.continueBtn.click();
  }

  // Convenience function to fill the login details (Mobile No)
  async login(mobileno: string) {
    await this.fillMobileNumber(mobileno);
    await this.clickOnContinueBtn();
  }

  // Get the error msg text for invalid login details (Mobile No)
  async getErrorMsgForInvalidMobileNo() {
    return await this.errorMessage.textContent();
  }

  // Check visibility of iPrep logo at login page
  async checkVisibilityOfLogo(newPage: Page, timeout: number) {
    await newPage.getByRole('img', { name: 'logo' }).isVisible({timeout});
  }
}