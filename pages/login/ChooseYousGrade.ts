import { Page, Locator } from '@playwright/test';

export class ChooseYourGrade {
    readonly page: Page;
    readonly chooseGradeHeading: Locator;
    readonly grade: Locator;

    constructor(page: Page) {
        this.page = page;
        this.chooseGradeHeading = page.locator('title');
        this.grade = page.locator('div').filter({ hasText: '10th' }).nth(4);
    }

    // Get the Language page heading
    async getGradePageHeading() {
        return await this.chooseGradeHeading.textContent();
    }

    // Selects the English language
    async selectGrade() {
        await this.grade.click();
    }
}