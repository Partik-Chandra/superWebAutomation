import { Page, Locator } from '@playwright/test';

export class OtpPopUp {
  readonly page: Page;
  readonly otpPopUpHeader: Locator;
  readonly inputOTP: Locator;
  readonly verifyBtn: Locator;
  readonly errorMessage: Locator;
  readonly resendLink: Locator;
  readonly editLink: Locator;
  readonly closeIconOtpPopUp: Locator;

  constructor(page: Page) {
    this.page = page;
    this.otpPopUpHeader = page.locator('h5.heading'); //Locator for the OTP PopUp Heading
    this.inputOTP = page.locator('.onetimepass_input'); // Locator for the otp input
    this.verifyBtn = page.locator(".verify_btn"); // Locator for the verify button
    this.errorMessage = page.locator('.error_txt'); // Locator for the error message
    this.resendLink = page.locator('.resend_txt'); // Locator for the resend link
    this.editLink = page.locator('.btn_edit'); // Locator for the edit link
    this.closeIconOtpPopUp = page.locator('.cross_icon_box'); // Locator for the close btn in otp pop-up
    this.errorMessage = page.locator('.content_box.error_txt'); // Locator for error message for invalid otp
  }

  // Get the Otp pop-up heading
  async getOtpPopUpHeading() {
    return await this.otpPopUpHeader.innerText();
  }

  // Input otp in otp input field
  async fillOTP(otp: string) {
    await this.inputOTP.fill(otp);
  }

  // Click the verify otp button
  async clickOnVerifyBtn() {
    await this.verifyBtn.click();
  }

  // Get the error text message
  async getErrorMessage() {
    return await this.errorMessage.innerText();
  }

  // Click the resend link in otp pop-up
  async clickOnResendOtpLink() {
    await this.resendLink.click();
  }

  // Click the edit link in otp inputfield
  async clickOnEditLink() {
    await this.editLink.click();
  }

  // Click the close icon on otp pop-up
  async clickOnCloseIconBtn() {
    await this.closeIconOtpPopUp.click();
  }

  // Convenience function for otp verification
  async otpVerify(otp: string) {
    await this.fillOTP(otp);
    await this.clickOnVerifyBtn();
  }

  async getErrorMessageForInvalidOtp() {
    return await this.errorMessage.textContent();
  }
}