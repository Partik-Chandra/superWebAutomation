import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly inputMobileNumber: Locator;
  readonly continueBtn: Locator;
  readonly googleSSOBtn: Locator;
  readonly appleSSOBtn: Locator;
  readonly inputOTP: Locator;
  readonly verifyBtn: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locator the mobileno input field
    this.inputMobileNumber = page.locator('.input_mob_number');
    // Locator the continue button
    this.continueBtn = page.locator(".btn_continue");

    // locator for otp input filed at otp pop-up
    this.inputOTP = page.locator('.onetimepass_input');
    // Locator for the verify button
    this.verifyBtn = page.locator(".verify_btn");

    // Locator for logout link
    this.logoutLink = page.locator("span:has-text('Log Out')");
  }

  async goto() {
    await this.page.goto('https://test.iprep.in/');
  }

  async fillMobileNumber(mobileno: string) {
    await this.inputMobileNumber.fill(mobileno);
  }

  async continue() {
    await this.continueBtn.click();
  }

  async fillOTP(otp: string) {
    await this.inputOTP.fill(otp);
  }

  async verifyOtp() {
    await this.verifyBtn.click();
  }

  async logout() {
    await this.logoutLink.click();
  }
}
