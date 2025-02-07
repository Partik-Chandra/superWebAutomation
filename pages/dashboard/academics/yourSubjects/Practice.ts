import { Page, Locator } from '@playwright/test';

export class Practice {
    readonly page: Page;
    readonly chapterList: Locator;
    readonly practiceShareButton: Locator;
    readonly practiceShareCode: Locator;
    readonly copyBtn: Locator;
    readonly currentlyOpenPractice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.chapterList = page.locator('.practice__container > .flex > .content-header-text').nth(0); // Locator for the Practice Chapter Topic in Practice page
        this.currentlyOpenPractice = page.locator('.closePractice h2'); // Locator for Practice Title in Practice Test
        this.practiceShareButton = page.locator('.masteryContainer > .flex'); // locator for Practice test share button
        this.practiceShareCode = page.getByRole('textbox'); // Locator for the textbox of Practice test share code
        this.copyBtn = page.getByRole('button', { name: 'Copy' }); // Locator for the copy btn of sahre pop-up of Practice Test
    }

    // Clicks on the chapter in Practice Test
    async clickOnPracticeTest() {
        await this.chapterList.click();
    }

    // Get the data of Practice topic in Practice Test
    async getPracticeChapterName() {
        return await this.currentlyOpenPractice.textContent();
    }

    // Clicks on the Share button of Practice Section
    async clickOnShareBtn() {
        await this.practiceShareButton.click();
    }

    // Get the value of share code
    async getShareCode() {
        return this.practiceShareCode.inputValue();
    }

    // Clicks on copy btn of custom share screen
    async clickOnCopyBtn() {
        await this.copyBtn.click();
    }

    // Get the topic of Currently Opened Practice
    async getCurrentOpenedPractice(newPage: Page, timeout: number) {
        return newPage.locator('.closePractice h2').textContent({ timeout });
    }
}