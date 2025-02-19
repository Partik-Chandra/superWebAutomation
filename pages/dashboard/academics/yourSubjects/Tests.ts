import { Page, Locator } from '@playwright/test';

export class Tests {
    readonly page: Page;
    readonly chapterList: Locator;
    readonly startTestbtn: string;
    readonly testsShareButton: Locator;
    readonly testsShareCode: Locator;
    readonly copyBtn: Locator;
    readonly currentlyOpenTest: Locator;

    constructor(page: Page) {
        this.page = page;
        this.chapterList = page.locator('.practice__container .content-header-text').nth(0); // Locator for the Tests Chapter Topic in Practice page
        this.startTestbtn = '.proceedButton'; // Locator for the Start Test button on Tests Instructions Screen
        this.currentlyOpenTest = page.locator('.topicName_container span'); // Locator for Tests Title in Test
        this.testsShareButton = page.locator('.cursor-pointer .cursor-pointer'); // locator for Tests share button
        this.testsShareCode = page.getByRole('textbox'); // Locator for the textbox of Tests share code
        this.copyBtn = page.getByRole('button', { name: 'Copy' }); // Locator for the copy btn of sahre pop-up of Test
    }

    // Clicks on the chapter in Test
    async clickOnTest() {
        await this.page.waitForTimeout(3000); // Wait for 3 seconds

        await this.chapterList.click();
    }

    async clickOnStartTestbtn(newPage: Page, timeout: number) {
        await newPage.locator(this.startTestbtn).click({ timeout });
    }

    // Get the data of Tests topic in Practice Test
    async getTestsChapterName() {
        return await this.currentlyOpenTest.textContent();
    }

    // Clicks on the Share button of Tests Section
    async clickOnShareBtn() {
        await this.testsShareButton.click();
    }

    // Get the value of share code
    async getShareCode() {
        return this.testsShareCode.inputValue();
    }

    // Clicks on copy btn of custom share screen
    async clickOnCopyBtn() {
        await this.copyBtn.click();
    }

    // Get the topic of Currently Opened Test
    async getCurrentOpenedTest(newPage: Page, timeout: number) {
        return newPage.locator('.topicName_container span').textContent({ timeout });
    }
}