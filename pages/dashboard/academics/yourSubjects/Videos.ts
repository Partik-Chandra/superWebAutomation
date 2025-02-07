import { Page, Locator } from '@playwright/test';

export class Videos {
    readonly page: Page;
    readonly chapterList: Locator;
    readonly videoTopic: Locator;
    readonly videoPlayTimming: Locator;
    readonly videoShareButton: Locator;
    readonly videoShareCode: Locator;
    readonly copyBtn: Locator;
    readonly currentlyPlaying: Locator;

    constructor(page: Page) {
        this.page = page;
        this.chapterList = page.locator('.chapter__container').nth(0);
        this.videoTopic = page.locator('.content-header-text.video-name').nth(0);
        this.videoPlayTimming = page.locator('.currentvideoduration');
        this.videoShareButton = page.locator('.sharebutton > .flex');
        this.videoShareCode = page.getByRole('textbox');
        this.copyBtn = page.getByRole('button', { name: 'Copy' });
        this.currentlyPlaying = page.getByText('Currently Playing');
    }

    // Clicks on the chapter in Chapter list
    async goToChaptersTopics() {
        await this.chapterList.click();
    }

    // Get the data of video topic
    async getVideoTopic() {
        return await this.videoTopic.textContent();
    }

    // Clicks on the video at Videos topic List
    async playTheTopicVideo() {
        await this.videoTopic.click();
    }

    // Gets the Data of video playing time
    async checkVideoPlayerOpens() {
        return await this.videoPlayTimming.textContent();
    }

    // Clicks on the Share button of Video player
    async clickOnShareBtn() {
        await this.videoShareButton.click();
    }

    // Get the value of share code
    async getShareCode() {
        return this.videoShareCode.inputValue();
    }

    // Clicks on copy btn of custom share screen
    async clickOnCopyBtn() {
        await this.copyBtn.click();
    }

    // Get the topic of Currently playing Video
    async getCurrentPlayingVideo(newPage: Page) {
        return newPage.getByText('Currently Playing').locator('xpath=preceding-sibling::span').textContent();
    }
}