import { Page, Locator } from '@playwright/test';
// import CommonActions from '../../utils/CommonActions';

export class HomePage {
    readonly page: Page;
    // readonly actions: CommonActions;
    readonly academicsHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.academicsHeader = page.locator('#home'); // Locator for the Academics Header at Homepage
    }

    // Clicks on Academics Header Option
    async goToAcademics() {
        await this.academicsHeader.click();
    }
}