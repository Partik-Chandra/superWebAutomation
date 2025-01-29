import { Page, Locator } from '@playwright/test';

export class ShareABitAboutYourself {
    readonly page: Page;
    readonly shareBitYourselfHeading: Locator;
    readonly nameInput: Locator;
    readonly getStartedBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shareBitYourselfHeading = page.locator('title');
        this.nameInput = page.getByPlaceholder('Enter Your Name');
        this.getStartedBtn = page.getByRole('button', { name: /Get Started/i });
    }

    // Get the Language page heading
    async getGradePageHeading() {
        return await this.shareBitYourselfHeading.textContent();
    }

    // Input name in name input field
    async fillNameField(name: string) {
        await this.nameInput.fill(name);
    }

    // Clicks on Get Started button
    async clicksOnGetStartedBtn() {
        await this.getStartedBtn.click();
    }
}