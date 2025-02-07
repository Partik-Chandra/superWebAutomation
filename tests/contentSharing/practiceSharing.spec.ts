import { test, expect } from '@playwright/test';
import { PomManager } from '../../pages/PomManager';
import { chromium } from 'playwright';

test.describe('Practice Content Sharing Test', () => {
    let pm: PomManager;

    test.beforeEach('Navigate to the test environment URL', async ({ page }) => {
        pm = new PomManager(page);
        await pm.loginPage.goto('https://test.iprep.in/');
    });

    // Test Case: Check if the Practice Test opened through the Shared link is the Shared Practice Test in the same tab
    test.only('Verify that the practice test from the shared link matches the original in the same tab', async ({ page }) => {

        await test.step('Login with valid credentials', async () => {
            await pm.loginPage.login('6969696969');
            await pm.otpPopUp.otpVerify('696969');
        });

        await test.step('Navigate to the Academics section', async () => {
            await pm.homePage.goToAcademics();
        });

        await test.step('Click on first subject', async () => {
            await pm.academics.clickOnMath();
        });

        await test.step('Go to the Practice section', async () => {
            await pm.yourSubjects.goToPracticeSection();
        });

        await test.step('Click on first Chapter', async () => {
            await pm.practice.clickOnPracticeTest();
        });

        let expectedPracticeTopic = await test.step('Get the opened practice topic detail', async () => {
            return await pm.practice.getPracticeChapterName();
        });

        await test.step('Click on the Share button to generate the share code', async () => {
            await pm.practice.clickOnShareBtn();
        });

        const shareCode = await test.step('Get the share code of the video', async () => {
            return await pm.practice.getShareCode();
        });

        await test.step('Navigate to the shared link using the share code', async () => {
            await pm.loginPage.goto(shareCode);
        });

        let retry: boolean = false;
        const actualPracticeTopic = await test.step('Get the currently opened practice topic title from the shared link', async () => {
            try {
                return await pm.practice.getCurrentOpenedPractice(page, 30000);

            } catch (error) {
                // If the topic is not found, reload and retry once
                console.log('Practice topic not found, reloading and retrying...');
                await page.reload();
                retry = true;
                return await pm.practice.getCurrentOpenedPractice(page, 30000);
            }
        });

        // If retry was needed and still fails, exit test
        if (retry && !actualPracticeTopic) {
            console.error('Test failed: Unable to retrieve practice topic after reload.');
            await page.close();
            test.fail(); // Exit the test after failure
        }

        await test.step('Verify that the practice topic from the shared link matches the original shared practice', async () => {
            expect(actualPracticeTopic).toContain(expectedPracticeTopic);
        });

    });


    // Test Case: Check if the Practice test opened through the Shared link is the Shared Practice test in the new tab
    test.only('Verify that the practice test from the shared link matches the original in a new tab', async ({ page }) => {

        await test.step('Login with valid credentials', async () => {
            await pm.loginPage.login('6969696969');
            await pm.otpPopUp.otpVerify('696969');
        });

        await test.step('Navigate to the Academics section', async () => {
            await pm.homePage.goToAcademics();
        });

        await test.step('Click on first subject', async () => {
            await pm.academics.clickOnMath();
        });

        await test.step('Go to the Practice section', async () => {
            await pm.yourSubjects.goToPracticeSection();
        });

        await test.step('Click on first Chapter', async () => {
            await pm.practice.clickOnPracticeTest();
        });

        let expectedPracticeTopic = await test.step('Get the opened practice topic detail', async () => {
            return await pm.practice.getPracticeChapterName();
        });

        await test.step('Click on the Share button to generate the share code', async () => {
            await pm.practice.clickOnShareBtn();
        });

        const shareCode = await test.step('Get the share code of the practice', async () => {
            return await pm.practice.getShareCode();
        });

        let actualPracticeTopic: string | null;
        let retry: boolean = false;

        await test.step('Open a new tab and navigate to the shared link', async () => {
            const newPage = await page.context().newPage();
            await newPage.goto(shareCode);

            await test.step('Attempt to get the current opened practice topic title from the shared link', async () => {
                try {
                    actualPracticeTopic = await pm.practice.getCurrentOpenedPractice(page, 30000);

                } catch (error) {
                    // If the topic is not found, reload and retry once
                    console.log('Practice topic not found, reloading and retrying...');
                    await newPage.reload();
                    retry = true;
                    actualPracticeTopic = await pm.practice.getCurrentOpenedPractice(page, 30000);
                }
            });

            // If retry was needed and still fails, exit test
            if (retry && !actualPracticeTopic) {
                console.error('Test failed: Unable to retrieve practice topic after reload.');
                await newPage.close();
                test.fail(); // Exit the test after failure
            }

            // Close the new tab after verification
            await newPage.close();
        });

        await test.step('Verify that the practice topic from the shared link matches the original shared practice', async () => {
            expect(actualPracticeTopic).toContain(expectedPracticeTopic);
        });

    });


    // Test Case: Check if the Video Playing through the Shared link is the Shared Video in the new browser tab
    test.only('Verify that the practice test from the shared link matches the original in a new browser', async () => {

        // Step 1: Login in the first browser
        await test.step('Login with valid credentials in the first browser', async () => {
            await pm.loginPage.login('6969696969');
            await pm.otpPopUp.otpVerify('696969');
        });

        // Step 2: Navigate to the required Practice
        await test.step('Navigate to the practice section and select a practice test', async () => {
            await pm.homePage.goToAcademics();
            await pm.academics.clickOnMath();
            await pm.yourSubjects.goToPracticeSection();
            await pm.practice.clickOnPracticeTest();
        });

        // Step 3: Retrieve practice test details
        let expectedPracticeTopic = await test.step('Get the expected practice topic before sharing', async () => {
            return await pm.practice.getPracticeChapterName();
        });

        // Step 4: Share the Practice Test
        let shareCode: string;
        await test.step('Generate a share link', async () => {
            await pm.practice.clickOnShareBtn();
            shareCode = await pm.practice.getShareCode();
        });

        // Step 5: Open a new browser instance
        let newBrowser = await chromium.launch(); 
        let newContext = await newBrowser.newContext();
        let newPage = await newContext.newPage();

        await test.step('Launch a new browser instance and open the shared link', async () => {
            await newPage.goto(shareCode, { timeout: 20000 });
        });

        // Step 6: Login again in the new browser with a reload mechanism
        const newPm = new PomManager(newPage);
        let retry: boolean = false;

        await test.step('Check visibility of iPrep logo and reload if not found', async () => {
            try {
                await newPm.loginPage.checkVisibilityOfLogo(newPage, 30000);

            } catch (error) {
                // If the topic is not found, reload and retry once
                console.log('Video topic not found, reloading and retrying...');
                await newPage.reload();
                retry = true;
                await newPm.loginPage.checkVisibilityOfLogo(newPage, 30000);
            }
        });

        // Step 7: Complete login in the new browser
        await test.step('Login in the new browser instance', async () => {
            await newPm.loginPage.login('6969696969');
            await newPm.otpPopUp.otpVerify('696969');
        });

        // Step 8: Retry mechanism for getting the video topic in the new browser
        let actualPracticeTopic = await test.step('Retrieve the currently opened practice topic in the new browser', async () => {
            return await newPm.practice.getCurrentOpenedPractice(newPage, 30000);
        });


        // Step 9: Validate the shared video
        await test.step('Verify that the shared practice matches the original practice', async () => {
            expect(actualPracticeTopic).toContain(expectedPracticeTopic);
        });

        // Step 10: Close the new browser instance
        await test.step('Close the new browser instance', async () => {
            await newBrowser.close();
        });

    });

});