import { Page, Locator } from '@playwright/test';

export class SelectYourBoard {
    readonly page: Page;
    readonly selectBoardHeading: Locator;
    readonly board: Locator;

    constructor(page: Page) {
        this.page = page;
        this.selectBoardHeading = page.locator('title');
        this.board = page.locator('div').filter({ hasText: /^CBSE$/ });
    }

    // Get the Board page heading
    async getBoardPageHeading() {
        return await this.selectBoardHeading.textContent();
    }

    // Selects the CBSE board
    async selectBoard() {
        await this.board.click();
    }
}