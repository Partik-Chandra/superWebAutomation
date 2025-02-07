import { Page, Locator } from '@playwright/test';

export class YourSubjects {
    readonly page: Page;
    readonly yourSubjectsInnerHeading: Locator;
    readonly yourSubjectsHeader: Locator;
    readonly practiceHeader: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.yourSubjectsInnerHeading = page.getByText('Math').first(); // Locator for the Subject Title of the Subject Page
        this.yourSubjectsHeader = page.locator('#video_lessons'); // Locator for the Videos section in Inner section header    
        this.practiceHeader = page.locator('#practice'); // Locator for the Practice section in Inner section header    
    }

    // Clicks on the Videos header
    async goToVideoSection() {
        await this.yourSubjectsHeader.click();
    }

    // Clicks on the Practice header
    async goToPracticeSection() {
        await this.practiceHeader.click();
    }
  
}