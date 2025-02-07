import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import { PomManager } from '../../pages/PomManager';
import { chromium } from 'playwright';

test.describe('Video Content Sharing Test', () => {
  let pm: PomManager;

  test.beforeEach('Navigate to the test environment URL', async ({ page }) => {
    pm = new PomManager(page);
    await pm.loginPage.goto('https://test.iprep.in/');
  });

  // Test Case: Check if the Video Playing through the Shared link is the Shared Video in the same tab
  test.only('Verify that the video from the shared link matches the original in the same tab', async ({ page }) => {

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

    await test.step('Go to the Videos section', async () => {
      await pm.yourSubjects.goToVideoSection();
    });

    await test.step('Click on first Chapter', async () => {
      await pm.videos.goToChaptersTopics();
    });

    let expectedVideoTopic = await test.step('Get the first video topic detail before playing the video', async () => {
      return await pm.videos.getVideoTopic();
    });

    await test.step('Click on the first video topic to play the video', async () => {
      await pm.videos.playTheTopicVideo();
    });

    await test.step('Click on the Share button to generate the share code', async () => {
      await pm.videos.clickOnShareBtn();
    });

    const shareCode = await test.step('Get the share code of the video', async () => {
      return await pm.videos.getShareCode();
    });

    await test.step('Navigate to the shared link using the share code', async () => {
      await pm.loginPage.goto(shareCode);
    });

    let retry: boolean = false;
    const actualVideoTopic = await test.step('Get the current playing video topic title from the shared link', async () => {
      try {
        return await pm.videos.getCurrentPlayingVideo(page, 30000);

      } catch (error) {
        // If the topic is not found, reload and retry once
        console.log('Video topic not found, reloading and retrying...');
        await page.reload();
        retry = true;
        return await pm.videos.getCurrentPlayingVideo(page, 30000);
      }
    });

    // If retry was needed and still fails, exit test
    if (retry && !actualVideoTopic) {
      console.error('Test failed: Unable to retrieve video topic after reload.');
      await page.close();
      test.fail(); // Exit the test after failure
    }

    await test.step('Verify that the video topic from the shared link matches the original video', async () => {
      expect(actualVideoTopic).toContain(expectedVideoTopic);
    });

  });


  // Test Case: Check if the Video Playing through the Shared link is the Shared Video in the new tab
  test.only('Verify that the video from the shared link matches the original in a new tab', async ({ page }) => {

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

    await test.step('Go to the Videos section', async () => {
      await pm.yourSubjects.goToVideoSection();
    });

    await test.step('Click on first Chapter', async () => {
      await pm.videos.goToChaptersTopics();
    });

    let expectedVideoTopic = await test.step('Get the first video topic detail before playing the video', async () => {
      return await pm.videos.getVideoTopic();
    });

    await test.step('Click on the first video topic to play the video', async () => {
      await pm.videos.playTheTopicVideo();
    });

    await test.step('Click on the Share button to generate the share code', async () => {
      await pm.videos.clickOnShareBtn();
    });

    const shareCode = await test.step('Get the share code of the video', async () => {
      return await pm.videos.getShareCode();
    });

    let actualVideoTopic: string | null;
    let retry: boolean = false;

    await test.step('Open a new tab and navigate to the shared link', async () => {
      const newPage = await page.context().newPage();
      await newPage.goto(shareCode);

      await test.step('Attempt to get the current playing video topic title from the shared link', async () => {
        try {
          actualVideoTopic = await pm.videos.getCurrentPlayingVideo(newPage, 30000);

        } catch (error) {
          // If the topic is not found, reload and retry once
          console.log('Video topic not found, reloading and retrying...');
          await newPage.reload();
          retry = true;
          actualVideoTopic = await pm.videos.getCurrentPlayingVideo(newPage, 30000);
        }
      });

      // If retry was needed and still fails, exit test
      if (retry && !actualVideoTopic) {
        console.error('Test failed: Unable to retrieve video topic after reload.');
        await newPage.close();
        test.fail(); // Exit the test after failure
      }

      // Close the new tab after verification
      await newPage.close();
    });

    await test.step('Verify that the video topic from the shared link matches the original video', async () => {
      expect(actualVideoTopic).toContain(expectedVideoTopic);
    });

  });


  // Test Case: Check if the Video Playing through the Shared link is the Shared Video in the new browser tab
  test.only('Verify that the video from the shared link matches the original in a new browser', async () => {

    // Step 1: Login in the first browser
    await test.step('Login with valid credentials in the first browser', async () => {
      await pm.loginPage.login('6969696969');
      await pm.otpPopUp.otpVerify('696969');
    });

    // Step 2: Navigate to the required video
    await test.step('Navigate to the video section and select a video', async () => {
      await pm.homePage.goToAcademics();
      await pm.academics.clickOnMath();
      await pm.yourSubjects.goToVideoSection();
      await pm.videos.goToChaptersTopics();
    });

    // Step 3: Retrieve video details
    let expectedVideoTopic = await test.step('Get the expected video topic before sharing', async () => {
      return await pm.videos.getVideoTopic();
    });

    // Step 4: Play and share the video
    let shareCode: string;
    await test.step('Play the selected video and generate a share link', async () => {
      await pm.videos.playTheTopicVideo();
      await pm.videos.clickOnShareBtn();
      shareCode = await pm.videos.getShareCode();
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
    let actualVideoTopic = await test.step('Retrieve the currently playing video topic in the new browser', async () => {
      return await newPm.videos.getCurrentPlayingVideo(newPage, 30000);
    });

    // Step 9: Validate the shared video
    await test.step('Verify that the shared video matches the original video', async () => {
      expect(actualVideoTopic).toContain(expectedVideoTopic);
    });

    // Step 10: Close the new browser instance
    await test.step('Close the new browser instance', async () => {
      await newBrowser.close();
    });

  });

});