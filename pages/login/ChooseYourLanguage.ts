import { Page, Locator } from '@playwright/test';

export class ChooseYourLanguage {
    readonly page: Page;
    readonly chooseLanguageHeading: Locator;
    readonly language: Locator;

    constructor(page: Page) {
        this.page = page;
        this.chooseLanguageHeading = page.locator('title');
        this.language = page.locator('div').filter({ hasText: /^English$/ });
    }

    // Get the Language page heading
    async getLanguagePageHeading() {
        return await this.chooseLanguageHeading.textContent();
    }

    // Selects the English language
    async selectlanguage() {
        await this.language.click();
    }
}