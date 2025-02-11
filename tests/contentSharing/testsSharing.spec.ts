import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import { PomManager } from '../../pages/PomManager';
import { chromium } from 'playwright';

test.describe('Tests Content Sharing Test', () => {
    let pm: PomManager;

    test.beforeEach('Navigate to the test environment URL', async ({ page }) => {
        pm = new PomManager(page);
        await pm.loginPage.goto('https://test.iprep.in/');
    });

    // Test Case: Check if the Test opened through the Shared link is the Shared Test in the same tab
    test('Verify that the test from the shared link matches the original in the same tab', async ({ page }) => {

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

        await test.step('Go to the Tests section', async () => {
            await pm.yourSubjects.goToTestsSection();
        });

        await test.step('Click on first Chapter', async () => {
            await pm.tests.clickOnTest();
        });

        await test.step('Click on Start Test button', async () => {
            await pm.tests.clickOnStartTestbtn(page, 30000);
        });

        let expectedTestsTopic = await test.step('Get the opened test topic detail', async () => {
            return await pm.tests.getTestsChapterName();
        });

        await test.step('Click on the Share button to generate the share code', async () => {
            await pm.tests.clickOnShareBtn();
        });

        const shareCode = await test.step('Get the share code of the video', async () => {
            return await pm.tests.getShareCode();
        });

        await test.step('Navigate to the shared link using the share code', async () => {
            await pm.loginPage.goto(shareCode);
        });

        let retry: boolean = false;
        const actualTestsTopic = await test.step('Get the currently opened test topic title from the shared link', async () => {
            try {
                await pm.tests.clickOnStartTestbtn(page, 30000);
                return await pm.tests.getCurrentOpenedTest(page, 30000);

            } catch (error) {
                // If the topic is not found, reload and retry once
                console.log('Test topic not found, reloading and retrying...');
                await page.reload();
                retry = true;
                await pm.tests.clickOnStartTestbtn(page, 30000);
                return await pm.tests.getCurrentOpenedTest(page, 30000);
            }
        });

        // If retry was needed and still fails, exit test
        if (retry && !actualTestsTopic) {
            console.error('Test failed: Unable to retrieve test topic after reload.');
            await page.close();
            test.fail(); // Exit the test after failure
        }

        await test.step('Verify that the test topic from the shared link matches the original shared test', async () => {
            expect(actualTestsTopic).toContain(expectedTestsTopic);
        });

    });


    // Test Case: Check if the Test opened through the Shared link is the Shared Test in the new tab
    test('Verify that the Test from the shared link matches the original in a new tab', async ({ page }) => {

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

        await test.step('Go to the Tests section', async () => {
            await pm.yourSubjects.goToTestsSection();
        });

        await test.step('Click on first Chapter', async () => {
            await pm.tests.clickOnTest();
        });

        await test.step('Click on Start Test button', async () => {
            await pm.tests.clickOnStartTestbtn(page, 30000);
        });

        let expectedTestTopic = await test.step('Get the opened test topic detail', async () => {
            return await pm.tests.getTestsChapterName();
        });

        await test.step('Click on the Share button to generate the share code', async () => {
            await pm.tests.clickOnShareBtn();
        });

        const shareCode = await test.step('Get the share code of the video', async () => {
            return await pm.tests.getShareCode();
        });

        let actualTestTopic: string | null;
        let retry: boolean = false;

        await test.step('Open a new tab and navigate to the shared link', async () => {
            const newPage = await page.context().newPage();
            await newPage.goto(shareCode);

            await test.step('Attempt to get the current opened test topic title from the shared link', async () => {
                try {
                    await pm.tests.clickOnStartTestbtn(newPage, 30000);
                    actualTestTopic = await pm.tests.getCurrentOpenedTest(newPage, 30000);

                } catch (error) {
                    // If the topic is not found, reload and retry once
                    console.log('Test topic not found, reloading and retrying...');
                    await newPage.reload();
                    retry = true;
                    await pm.tests.clickOnStartTestbtn(newPage, 30000);
                    actualTestTopic = await pm.tests.getCurrentOpenedTest(newPage, 30000);
                }
            });

            // If retry was needed and still fails, exit test
            if (retry && !actualTestTopic) {
                console.error('Test failed: Unable to retrieve test topic after reload.');
                await newPage.close();
                test.fail(); // Exit the test after failure
            }

            // Close the new tab after verification
            await newPage.close();
        });

        await test.step('Verify that the test topic from the shared link matches the original shared test', async () => {
            expect(actualTestTopic).toContain(expectedTestTopic);
        });

    });


    // Test Case: Check if the Test opened through the Shared link is the Shared Test in the new browser tab
    test.only('Verify that the Test from the shared link matches the original in a new browser', async ({ page }) => {

        // Step 1: Login in the first browser
        await test.step('Login with valid credentials in the first browser', async () => {
            await pm.loginPage.login('6969696969');
            await pm.otpPopUp.otpVerify('696969');
        });

        // Step 2: Navigate to the required Test
        await test.step('Navigate to the Tests section and select a test', async () => {
            await pm.homePage.goToAcademics();
            await pm.academics.clickOnMath();
            await pm.yourSubjects.goToTestsSection();
            await pm.tests.clickOnTest();
        });

        // Step 3: Retrieve Test details
        let expectedTestTopic = await test.step('Get the expected test topic before sharing', async () => {
            await pm.tests.clickOnStartTestbtn(page, 30000);
            return await pm.tests.getTestsChapterName();
        });

        // Step 4: Share the Test
        let shareCode: string;
        await test.step('Generate a share link', async () => {
            await pm.tests.clickOnShareBtn();
            shareCode = await pm.tests.getShareCode();
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

        await test.step('Check visibility of Lets Get Started Text and reload if not found', async () => {
            try {
                expect(await newPm.loginPage.getLetsGetStartedText(newPage, 20000)).toContain("Let's Get Started");

            } catch (error) {
                // If the topic is not found, reload and retry once
                console.log('Test topic not found, reloading and retrying...');
                await newPage.reload();
                retry = true;
                expect(await newPm.loginPage.getLetsGetStartedText(newPage, 30000)).toContain("Let's Get Started");
            }
        });

        // Step 7: Complete login in the new browser
        await test.step('Login in the new browser instance', async () => {
            await newPm.loginPage.login('6969696969');
            await newPm.otpPopUp.otpVerify('696969');
        });

        // Step 8: Retry mechanism for getting the test topic in the new browser
        let actualTestTopic = await test.step('Retrieve the currently opened practice topic in the new browser', async () => {
            await pm.tests.clickOnStartTestbtn(newPage, 30000);
            return await newPm.tests.getCurrentOpenedTest(newPage, 30000);
        });


        // Step 9: Validate the shared test
        await test.step('Verify that the shared practice matches the original test', async () => {
            expect(actualTestTopic).toContain(expectedTestTopic);
        });

        // Step 10: Close the new browser instance
        await test.step('Close the new browser instance', async () => {
            await newBrowser.close();
        });

    });
});