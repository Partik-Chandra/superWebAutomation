import { Page, Locator } from '@playwright/test';

export class Academics {
    readonly page: Page;
    readonly sectionHeading: Locator;
    readonly sectionTopic: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sectionHeading = page.locator('.homeContent_category-name__xe_Xr').nth(0); // Locator for the Your Subjects Section Title
        this.sectionTopic = page.locator('.homeContent_subjectList__container__G_Hs1').nth(0); // Locator for the Math subject at Subjects
    }

    // Clicks on Math Subject of Your Subjects Scetion
    async clickOnMath() {
        await this.sectionTopic.click();
    }
}